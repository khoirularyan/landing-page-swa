const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/tentang', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tentang.html')));
app.get('/layanan', (req, res) => res.sendFile(path.join(__dirname, 'public', 'layanan.html')));
app.get('/proyek', (req, res) => res.sendFile(path.join(__dirname, 'public', 'proyek.html')));
app.get('/kontak', (req, res) => res.sendFile(path.join(__dirname, 'public', 'kontak.html')));

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
