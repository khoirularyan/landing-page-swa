const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static('public'));

// Data and uploads paths
const DATA_FILE = path.join(__dirname, 'data', 'content.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for media uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    cb(null, baseName + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// ─── API CMS ────────────────────────────────────────────────
// 1. Get Content
app.get('/api/cms/content', (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ error: 'Content file not found' });
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Save Content
app.post('/api/cms/content', (req, res) => {
  try {
    const newContent = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(newContent, null, 2), 'utf8');
    res.json({ success: true, message: 'Konten berhasil disimpan!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Upload File
app.post('/api/cms/upload', upload.single('media'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }
    const fileUrl = '/uploads/' + req.file.filename;
    const isVideo = /\.(mp4|webm|mov)$/i.test(req.file.filename);
    res.json({
      success: true,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        isVideo: isVideo
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. List Media
app.get('/api/cms/media', (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    const mediaList = files
      .filter(f => !f.startsWith('.'))
      .map(filename => {
        const stats = fs.statSync(path.join(UPLOADS_DIR, filename));
        const isVideo = /\.(mp4|webm|mov)$/i.test(filename);
        return {
          filename: filename,
          url: '/uploads/' + filename,
          size: stats.size,
          mtime: stats.mtime,
          isVideo: isVideo
        };
      })
      .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete Media
app.delete('/api/cms/media/:filename', (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(UPLOADS_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: 'File berhasil dihapus' });
    }
    res.status(404).json({ error: 'File tidak ditemukan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ROUTES ─────────────────────────────────────────────────
app.get('/cms', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cms', 'index.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/tentang', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tentang.html')));
app.get('/layanan', (req, res) => res.sendFile(path.join(__dirname, 'public', 'layanan.html')));
app.get('/proyek', (req, res) => res.sendFile(path.join(__dirname, 'public', 'proyek.html')));
app.get('/kontak', (req, res) => res.sendFile(path.join(__dirname, 'public', 'kontak.html')));

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
