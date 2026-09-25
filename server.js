'use strict';

// Auto-load .env in Node.js 20.12+ if present
try { if (typeof process.loadEnvFile === 'function') process.loadEnvFile(); } catch (e) {}

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');
const bcrypt = require('bcryptjs');

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  console.warn('[Sharp] Library sharp tidak tersedia atau belum terinstall, menggunakan fallback multer default.');
}

const app = express();
const PORT = process.env.PORT || 3002;

// ─── MIDDLEWARE ─────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ─── PRISMA / DATABASE INITIALIZATION (DUAL-MODE) ───────────
let prisma = null;
if (process.env.DATABASE_URL) {
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
    console.log('[Database] Menggunakan PostgreSQL via Prisma ORM.');
  } catch (err) {
    console.warn('[Database] Prisma Client gagal diinisialisasi, fallback ke mode file JSON:', err.message);
    prisma = null;
  }
} else {
  console.log('[Database] DATABASE_URL tidak ditemukan. Berjalan dalam mode Standalone Flat-file JSON.');
}

// ─── FILE PATHS & STORAGE HELPERS ────────────────────────────
const DATA_FILE   = path.join(__dirname, 'data', 'content.json');
const AUTH_FILE   = path.join(__dirname, 'data', 'auth.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readJsonFile(filePath, defaultVal) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.warn(`[Storage] Gagal membaca ${filePath}:`, e.message);
  }
  return defaultVal;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`[Storage] Gagal menulis ke ${filePath}:`, e.message);
  }
}

// ─── AUTHENTICATION (HMAC-SHA256 SIGNED TOKEN & BCRYPT) ──────
const AUTH_SECRET = process.env.AUTH_SECRET || 'swa_secret_key_prod_2026_digital_solusindo';

function generateToken(username) {
  const payload = {
    u: username,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 hari masa aktif
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(encoded).digest('hex');
  return `swa.${encoded}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    const [prefix, encoded, sig] = token.split('.');
    if (prefix !== 'swa') return null;
    const expected = crypto.createHmac('sha256', AUTH_SECRET).update(encoded).digest('hex');
    const eBuf = Buffer.from(sig);
    const xBuf = Buffer.from(expected);
    if (eBuf.length !== xBuf.length || !crypto.timingSafeEqual(eBuf, xBuf)) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString());
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Akses ditolak, silakan login kembali.' });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized: Sesi tidak valid atau telah kedaluwarsa.' });
  }
  req.user = payload;
  next();
}

function getAuthCredentialsFallback() {
  const data = readJsonFile(AUTH_FILE, null);
  if (data && data.username) return data;
  return { username: 'admin', password: 'swa123' };
}

async function verifyLoginCredentials(username, password) {
  // 1. Cek dari Prisma / PostgreSQL jika tersedia
  if (prisma) {
    try {
      const admin = await prisma.adminConfig.findUnique({ where: { username } });
      if (admin) {
        const match = await bcrypt.compare(password, admin.passwordHash);
        if (match) return true;
      }
    } catch (e) {
      console.warn('[Prisma] Auth lookup error, fallback ke file JSON:', e.message);
    }
  }

  // 2. Cek dari data/auth.json (fallback)
  const creds = getAuthCredentialsFallback();
  if (creds.username !== username) return false;

  let isValid = false;
  if (creds.passwordHash) {
    try {
      isValid = await bcrypt.compare(password, creds.passwordHash);
    } catch (e) {}
  }

  // Jika belum di-hash (masih plaintext, misal swa123)
  if (!isValid && creds.password && creds.password === password) {
    isValid = true;
    // Upgrade otomatis ke bcrypt hash
    try {
      const hash = await bcrypt.hash(password, 10);
      creds.passwordHash = hash;
      delete creds.password;
      writeJsonFile(AUTH_FILE, creds);
      console.log('[Auth] Password admin berhasil di-upgrade ke hash bcrypt.');
    } catch (e) {}
  }

  // Default hardcoded fallback jika auth.json belum ada
  if (!isValid && username === 'admin' && password === 'swa123') {
    isValid = true;
  }

  return isValid;
}

// ─── CONTENT STORAGE HELPERS ────────────────────────────────
async function getSiteContent() {
  if (prisma) {
    try {
      const row = await prisma.siteContent.findUnique({ where: { key: 'main' } });
      if (row?.data && Object.keys(row.data).length > 0) {
        return row.data;
      }
    } catch (e) {
      console.warn('[Prisma] getSiteContent error, fallback ke JSON:', e.message);
    }
  }
  return readJsonFile(DATA_FILE, {});
}

async function saveSiteContent(content) {
  if (prisma) {
    try {
      await prisma.siteContent.upsert({
        where:  { key: 'main' },
        update: { data: content },
        create: { key: 'main', data: content },
      });
    } catch (e) {
      console.warn('[Prisma] saveSiteContent error:', e.message);
    }
  }
  // Selalu sinkronkan juga ke data/content.json sebagai backup lokal
  writeJsonFile(DATA_FILE, content);
}

// ─── API AUTH (CMS) ──────────────────────────────────────────
app.post('/api/cms/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username dan password wajib diisi.' });
  }

  const isValid = await verifyLoginCredentials(username, password);
  if (isValid) {
    const token = generateToken(username);
    return res.json({ success: true, token, user: { username } });
  }

  return res.status(401).json({ success: false, error: 'Username atau password salah.' });
});

app.get('/api/cms/auth/status', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const payload = verifyToken(token);
  return res.json({ authenticated: Boolean(payload), username: payload?.u });
});

app.post('/api/cms/auth/logout', (req, res) => {
  return res.json({ success: true, message: 'Logout berhasil.' });
});

// ─── API CONTENT (CMS & LANDING PAGE) ────────────────────────
app.get('/api/cms/content', async (req, res) => {
  try {
    const data = await getSiteContent();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cms/content', requireAuth, async (req, res) => {
  try {
    const newContent = req.body;
    if (!newContent || typeof newContent !== 'object') {
      return res.status(400).json({ error: 'Format data konten tidak valid.' });
    }
    await saveSiteContent(newContent);
    res.json({ success: true, message: 'Konten berhasil disimpan!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── MULTER & SHARP MEDIA UPLOAD ─────────────────────────────
const storage = multer.memoryStorage(); // Gunakan memoryStorage agar sharp bisa memproses buffer
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

app.post('/api/cms/upload', requireAuth, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const baseName = path.basename(req.file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    const isVideo = /\.(mp4|webm|mov)$/i.test(ext);
    const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(ext);

    let finalFilename = '';
    let finalPath = '';
    let fileSize = req.file.size;

    if (isImage && sharp && !/\.(gif|svg)$/i.test(ext)) {
      // Optimasi gambar dengan Sharp: resize maksimal lebar 2560px, kompresi efisien
      finalFilename = `${baseName}-${uniqueSuffix}.webp`;
      finalPath = path.join(UPLOADS_DIR, finalFilename);

      await sharp(req.file.buffer)
        .resize({ width: 2560, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(finalPath);

      const stats = fs.statSync(finalPath);
      fileSize = stats.size;
    } else {
      // Video, GIF, SVG, atau jika sharp tidak tersedia
      finalFilename = `${baseName}-${uniqueSuffix}${ext}`;
      finalPath = path.join(UPLOADS_DIR, finalFilename);
      fs.writeFileSync(finalPath, req.file.buffer);
    }

    const fileUrl = '/uploads/' + finalFilename;
    res.json({
      success: true,
      file: {
        filename: finalFilename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: fileSize,
        isVideo: isVideo
      }
    });
  } catch (err) {
    console.error('[Upload Error]', err);
    res.status(500).json({ error: err.message });
  }
});

// List Media
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

// Delete Media (Protected)
app.delete('/api/cms/media/:filename', requireAuth, (req, res) => {
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

// ─── HEALTH CHECK (STATUS SERVER & DATABASE) ─────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SWA Digital Solusindo CMS',
    databaseMode: prisma ? 'PostgreSQL (Prisma)' : 'Flat-file (Standalone JSON)',
    timestamp: new Date().toISOString()
  });
});

// ─── HTML ROUTES ─────────────────────────────────────────────
app.get('/cms',     (req, res) => res.sendFile(path.join(__dirname, 'public', 'cms', 'index.html')));
app.get('/',        (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/tentang', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tentang.html')));
app.get('/layanan', (req, res) => res.sendFile(path.join(__dirname, 'public', 'layanan.html')));
app.get('/proyek',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'proyek.html')));
app.get('/galeri',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'galeri.html')));
app.get('/kontak',  (req, res) => res.sendFile(path.join(__dirname, 'public', 'kontak.html')));
app.get('/blog',    (req, res) => res.sendFile(path.join(__dirname, 'public', 'blog.html')));

app.listen(PORT, () => {
  console.log(`[SWA Server] Running on http://localhost:${PORT}`);
  console.log(`[SWA Mode] Database: ${prisma ? 'PostgreSQL (Prisma)' : 'Standalone JSON (data/content.json)'}`);
});
