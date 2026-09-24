// ═══════════════════════════════════════════════════════════
// SWA Digital Solusindo — CMS Dashboard Logic
// ═══════════════════════════════════════════════════════════

let contentData = null;
let mediaList = [];
let targetInputForPicker = null;
let isAppInitialized = false;

const TOKEN_KEY = 'swa_cms_session_token';
function getToken() { return localStorage.getItem(TOKEN_KEY); }
function setToken(token) { localStorage.setItem(TOKEN_KEY, token); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

document.addEventListener('DOMContentLoaded', async () => {
  initAuth();
  const authenticated = await checkAuth();
  if (authenticated) {
    initApp();
  }
});

async function checkAuth() {
  const token = getToken();
  if (!token) {
    showLoginScreen();
    return false;
  }
  try {
    const res = await fetch('/api/cms/auth/status', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await res.json();
    if (data && data.authenticated) {
      showDashboard();
      return true;
    } else {
      clearToken();
      showLoginScreen();
      return false;
    }
  } catch (e) {
    clearToken();
    showLoginScreen();
    return false;
  }
}

function showLoginScreen() {
  const loginScreen = document.getElementById('cms-login-screen');
  const appScreen = document.getElementById('cms-app');
  if (loginScreen) loginScreen.style.display = 'flex';
  if (appScreen) appScreen.style.display = 'none';
}

function showDashboard() {
  const loginScreen = document.getElementById('cms-login-screen');
  const appScreen = document.getElementById('cms-app');
  if (loginScreen) loginScreen.style.display = 'none';
  if (appScreen) appScreen.style.display = 'block';
}

function initAuth() {
  const loginForm = document.getElementById('cms-login-form');
  const errorEl = document.getElementById('login-error');
  const togglePwdBtn = document.getElementById('btn-toggle-pwd');
  const pwdInput = document.getElementById('login-password');
  const logoutBtn = document.getElementById('btn-cms-logout');

  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener('click', () => {
      const isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      togglePwdBtn.setAttribute('title', isPwd ? 'Sembunyikan sandi' : 'Tampilkan sandi');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username');
      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = pwdInput ? pwdInput.value : '';
      const btnLogin = document.getElementById('btn-login');

      if (!username || !password) {
        if (errorEl) {
          errorEl.textContent = 'Mohon isi username dan password.';
          errorEl.style.display = 'block';
        }
        return;
      }

      if (btnLogin) {
        btnLogin.disabled = true;
        const span = btnLogin.querySelector('span');
        if (span) span.textContent = 'Memverifikasi...';
      }
      if (errorEl) errorEl.style.display = 'none';

      try {
        const res = await fetch('/api/cms/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setToken(data.token);
          if (pwdInput) pwdInput.value = '';
          showDashboard();
          initApp();
        } else {
          if (errorEl) {
            errorEl.textContent = data.error || 'Username atau password salah.';
            errorEl.style.display = 'block';
          }
        }
      } catch (err) {
        if (errorEl) {
          errorEl.textContent = 'Koneksi ke server gagal. Pastikan server aktif.';
          errorEl.style.display = 'block';
        }
      } finally {
        if (btnLogin) {
          btnLogin.disabled = false;
          const span = btnLogin.querySelector('span');
          if (span) span.textContent = 'Masuk ke Dashboard';
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const token = getToken();
      if (token) {
        try {
          await fetch('/api/cms/auth/logout', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
          });
        } catch (e) {}
      }
      clearToken();
      showLoginScreen();
      showToast('Anda berhasil keluar.');
    });
  }
}

function initApp() {
  if (isAppInitialized) {
    loadContent();
    loadMedia();
    return;
  }
  isAppInitialized = true;
  initTabs();
  initDropzone();
  initSaveButtons();
  loadContent();
  loadMedia();
}

// ── TAB SWITCHING ──
function initTabs() {
  const tabs = document.querySelectorAll('.cms-nav-item');
  const panes = document.querySelectorAll('.cms-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById('pane-' + targetTab);
      if (targetPane) targetPane.classList.add('active');

      if (targetTab === 'richz') renderRichzList();
      if (targetTab === 'projects') renderProjectList();
      if (targetTab === 'testimonials') renderTestimonialList();
    });
  });
}

// ── LOAD & POPULATE CONTENT ──
async function loadContent() {
  try {
    const res = await fetch('/api/cms/content');
    if (!res.ok) throw new Error('Gagal memuat data konten');
    contentData = await res.json();
    populateHeroForm();
    populateCustomSolutionForm();
    renderRichzList();
    renderProjectList();
    renderTestimonialList();
    populateContactForm();
  } catch (err) {
    showToast('Error: ' + err.message);
    const statusEl = document.querySelector('.cms-status-text');
    if (statusEl) statusEl.textContent = 'Gagal tersambung';
  }
}

// ── HERO SETTINGS ──
function populateHeroForm() {
  if (!contentData || !contentData.hero) return;
  const hero = contentData.hero;

  const isVideo = hero.mediaType === 'video';
  document.getElementById('radio-hero-video').checked = isVideo;
  document.getElementById('radio-hero-image').checked = !isVideo;

  document.getElementById('hero-media-url').value = hero.mediaUrl || '';
  document.getElementById('hero-poster-url').value = hero.posterUrl || '';
  document.getElementById('hero-title').value = hero.title || '';
  document.getElementById('hero-title-accent').value = hero.titleAccent || '';
  document.getElementById('hero-desc').value = hero.desc || '';
  document.getElementById('hero-cta-text').value = hero.ctaPrimaryText || '';
  document.getElementById('hero-cta-link').value = hero.ctaPrimaryLink || '';

  togglePosterField(isVideo);
  updateHeroPreview();

  // Listeners for live preview
  document.getElementById('hero-media-url').addEventListener('input', updateHeroPreview);
  document.getElementById('radio-hero-video').addEventListener('change', () => {
    togglePosterField(true);
    updateHeroPreview();
  });
  document.getElementById('radio-hero-image').addEventListener('change', () => {
    togglePosterField(false);
    updateHeroPreview();
  });
}

function togglePosterField(isVideo) {
  const posterField = document.getElementById('hero-poster-field');
  if (posterField) posterField.style.display = isVideo ? 'block' : 'none';
}

function updateHeroPreview() {
  const isVideo = document.getElementById('radio-hero-video').checked;
  const url = document.getElementById('hero-media-url').value.trim();
  const box = document.getElementById('hero-preview-box');
  if (!box) return;

  if (!url) {
    box.innerHTML = '<span class="cms-preview-placeholder">Belum ada media latar yang dipilih</span>';
    return;
  }

  if (isVideo) {
    box.innerHTML = `<video src="${url}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;"></video>`;
  } else {
    box.innerHTML = `<img src="${url}" alt="Preview" style="width:100%;height:100%;object-fit:cover;">`;
  }
}

// ── CUSTOM SOLUTION IMAGE SETTINGS ──
function populateCustomSolutionForm() {
  if (!contentData) return;
  const customSol = contentData.customSolution || {};
  const input = document.getElementById('custom-sol-image-url');
  if (input) {
    input.value = customSol.imageUrl || '/assets/images/custom-solution-team.jpg';
    updateCustomSolPreview();
    input.addEventListener('input', updateCustomSolPreview);
  }
}

function updateCustomSolPreview() {
  const input = document.getElementById('custom-sol-image-url');
  const box = document.getElementById('custom-sol-preview-box');
  if (!input || !box) return;
  const url = input.value.trim();
  if (!url) {
    box.innerHTML = '<span class="cms-preview-placeholder">Belum ada gambar solusi kustom yang dipilih</span>';
  } else {
    box.innerHTML = `<img src="${url}" alt="Custom Solution Preview" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='/assets/images/custom-solution-team.jpg'">`;
  }
}

// ── PROJECT PORTFOLIO ──
function renderProjectList() {
  const container = document.getElementById('project-list-container');
  if (!container || !contentData || !contentData.projects) return;

  if (contentData.projects.length === 0) {
    container.innerHTML = '<div class="cms-empty">Belum ada proyek yang ditambahkan.</div>';
    return;
  }

  container.innerHTML = contentData.projects.map((proj, idx) => `
    <div class="cms-project-item" data-id="${proj.id}">
      <div class="cms-project-item__info">
        <div class="cms-project-thumb-mini">
          ${proj.imageUrl ? `<img src="${proj.imageUrl}" alt="${proj.title}">` : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`}
        </div>
        <div class="cms-project-item__text">
          <h4>${proj.title}</h4>
          <div class="cms-project-item__meta">
            <span><strong>Klien:</strong> ${proj.client || '-'}</span>
            <span>&bull;</span>
            <span class="cms-badge-sm">${proj.category || 'ERP'}</span>
            ${proj.featured ? '<span style="color:#10B981;font-weight:600">&check; Di Beranda</span>' : ''}
          </div>
        </div>
      </div>
      <div class="cms-project-item__actions">
        <button class="cms-btn cms-btn--sm cms-btn--outline" onclick="editProject('${proj.id}')">Edit</button>
        <button class="cms-btn cms-btn--sm cms-btn--danger" onclick="deleteProject('${proj.id}')">Hapus</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('btn-add-project').addEventListener('click', () => {
  openProjectModal();
});

function openProjectModal(proj = null) {
  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('project-modal-title');
  const idEl = document.getElementById('proj-edit-id');
  const titleInput = document.getElementById('proj-edit-title');
  const clientInput = document.getElementById('proj-edit-client');
  const catInput = document.getElementById('proj-edit-category');
  const imgInput = document.getElementById('proj-edit-image');
  const linkInput = document.getElementById('proj-edit-link');
  const featInput = document.getElementById('proj-edit-featured');

  if (proj) {
    titleEl.textContent = 'Edit Proyek';
    idEl.value = proj.id;
    titleInput.value = proj.title || '';
    clientInput.value = proj.client || '';
    catInput.value = proj.category || '';
    imgInput.value = proj.imageUrl || '';
    linkInput.value = proj.link || '/kontak';
    featInput.checked = !!proj.featured;
  } else {
    titleEl.textContent = 'Tambah Proyek Baru';
    idEl.value = '';
    titleInput.value = '';
    clientInput.value = '';
    catInput.value = '';
    imgInput.value = '';
    linkInput.value = '/kontak';
    featInput.checked = true;
  }

  modal.classList.add('open');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('open');
}

document.getElementById('btn-save-project-item').addEventListener('click', () => {
  const id = document.getElementById('proj-edit-id').value;
  const title = document.getElementById('proj-edit-title').value.trim();
  const client = document.getElementById('proj-edit-client').value.trim();
  const category = document.getElementById('proj-edit-category').value.trim();
  const imageUrl = document.getElementById('proj-edit-image').value.trim();
  const link = document.getElementById('proj-edit-link').value.trim() || '/kontak';
  const featured = document.getElementById('proj-edit-featured').checked;

  if (!title) {
    alert('Judul proyek tidak boleh kosong');
    return;
  }

  if (id) {
    // Update existing
    const item = contentData.projects.find(p => p.id === id);
    if (item) {
      item.title = title;
      item.client = client;
      item.category = category;
      item.imageUrl = imageUrl;
      item.link = link;
      item.featured = featured;
    }
  } else {
    // Add new
    const newProj = {
      id: 'proj-' + Date.now(),
      title,
      client,
      category,
      imageUrl,
      link,
      featured
    };
    contentData.projects.unshift(newProj);
  }

  renderProjectList();
  closeProjectModal();
  saveAllContent(false);
  showToast('Daftar proyek berhasil diperbarui!');
});

window.editProject = function(id) {
  const proj = contentData.projects.find(p => p.id === id);
  if (proj) openProjectModal(proj);
};

window.deleteProject = function(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus proyek ini?')) return;
  contentData.projects = contentData.projects.filter(p => p.id !== id);
  renderProjectList();
  saveAllContent(false);
  showToast('Proyek berhasil dihapus');
};

// ── TESTIMONIALS SETTINGS ──
function renderTestimonialList() {
  const container = document.getElementById('testi-list-container');
  if (!container || !contentData) return;

  if (!contentData.testimonials) contentData.testimonials = [];

  if (contentData.testimonials.length === 0) {
    container.innerHTML = '<div class="cms-empty">Belum ada testimoni klien. Silakan klik "Tambah Testimoni Baru".</div>';
    return;
  }

  container.innerHTML = contentData.testimonials.map((item) => `
    <div class="cms-project-item" data-id="${item.id}">
      <div class="cms-project-item__info">
        <div class="cms-project-thumb-mini" style="border-radius:12px;overflow:hidden">
          ${item.photoUrl ? `<img src="${item.photoUrl}" alt="${item.name}" onerror="this.style.display='none'">` : `<div style="font-weight:700;color:var(--red);">${item.name ? item.name.charAt(0) : 'T'}</div>`}
        </div>
        <div class="cms-project-item__text">
          <h4>${item.name}</h4>
          <div class="cms-project-item__meta">
            <span><strong>Jabatan:</strong> ${item.role || item.company || '-'}</span>
            <span>&bull;</span>
            <span class="cms-badge-sm">${item.badge || 'Testimoni'}</span>
          </div>
          <p style="font-size:12px;color:#6B7280;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">"${item.quote}"</p>
        </div>
      </div>
      <div class="cms-project-item__actions">
        <button class="cms-btn cms-btn--sm cms-btn--outline" onclick="editTestimonial('${item.id}')">Edit</button>
        <button class="cms-btn cms-btn--sm cms-btn--danger" onclick="deleteTestimonial('${item.id}')">Hapus</button>
      </div>
    </div>
  `).join('');
}

const btnAddTesti = document.getElementById('btn-add-testi');
if (btnAddTesti) {
  btnAddTesti.addEventListener('click', () => openTestiModal());
}

function openTestiModal(item = null) {
  const modal = document.getElementById('testi-modal');
  const titleEl = document.getElementById('testi-modal-title');
  const idEl = document.getElementById('testi-edit-id');
  const nameInput = document.getElementById('testi-edit-name');
  const roleInput = document.getElementById('testi-edit-role');
  const badgeInput = document.getElementById('testi-edit-badge');
  const photoInput = document.getElementById('testi-edit-photo');
  const quoteInput = document.getElementById('testi-edit-quote');

  if (item) {
    titleEl.textContent = 'Edit Testimoni Klien';
    idEl.value = item.id;
    nameInput.value = item.name || '';
    roleInput.value = item.role || item.company || '';
    badgeInput.value = item.badge || '';
    photoInput.value = item.photoUrl || '';
    quoteInput.value = item.quote || '';
  } else {
    titleEl.textContent = 'Tambah Testimoni Baru';
    idEl.value = '';
    nameInput.value = '';
    roleInput.value = '';
    badgeInput.value = '';
    photoInput.value = '';
    quoteInput.value = '';
  }

  modal.classList.add('open');
}

window.closeTestiModal = function() {
  const modal = document.getElementById('testi-modal');
  if (modal) modal.classList.remove('open');
};

const btnSaveTesti = document.getElementById('btn-save-testi-item');
if (btnSaveTesti) {
  btnSaveTesti.addEventListener('click', () => {
    const id = document.getElementById('testi-edit-id').value;
    const name = document.getElementById('testi-edit-name').value.trim();
    const role = document.getElementById('testi-edit-role').value.trim();
    const badge = document.getElementById('testi-edit-badge').value.trim();
    const photoUrl = document.getElementById('testi-edit-photo').value.trim();
    const quote = document.getElementById('testi-edit-quote').value.trim();

    if (!name || !quote) {
      alert('Nama dan isi testimoni tidak boleh kosong');
      return;
    }

    if (!contentData.testimonials) contentData.testimonials = [];

    if (id) {
      const item = contentData.testimonials.find(t => t.id === id);
      if (item) {
        item.name = name;
        item.role = role;
        item.company = role;
        item.badge = badge;
        item.photoUrl = photoUrl;
        item.quote = quote;
      }
    } else {
      const newItem = {
        id: 'tmn-' + Date.now(),
        name,
        role,
        company: role,
        badge,
        photoUrl,
        quote
      };
      contentData.testimonials.push(newItem);
    }

    renderTestimonialList();
    closeTestiModal();
    saveAllContent(false);
    showToast('Testimoni berhasil disimpan!');
  });
}

window.editTestimonial = function(id) {
  if (!contentData || !contentData.testimonials) return;
  const item = contentData.testimonials.find(t => t.id === id);
  if (item) openTestiModal(item);
};

window.deleteTestimonial = function(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) return;
  contentData.testimonials = contentData.testimonials.filter(t => t.id !== id);
  renderTestimonialList();
  saveAllContent(false);
  showToast('Testimoni berhasil dihapus');
};

// ── CONTACT SETTINGS ──
function populateContactForm() {
  if (!contentData || !contentData.contact) return;
  const c = contentData.contact;
  document.getElementById('contact-email').value = c.email || '';
  document.getElementById('contact-wa-karanganyar').value = c.waKaranganyar || '';
  document.getElementById('contact-wa-karanganyar-num').value = c.waKaranganyarNum || '';
  document.getElementById('contact-wa-gresik').value = c.waGresik || '';
  document.getElementById('contact-wa-gresik-num').value = c.waGresikNum || '';
  document.getElementById('contact-address-gresik').value = c.addressGresik || '';
  document.getElementById('contact-address-karanganyar').value = c.addressKaranganyar || '';
}

// ── MEDIA GALLERY & UPLOADER ──
async function loadMedia() {
  try {
    const res = await fetch('/api/cms/media');
    if (!res.ok) throw new Error('Gagal memuat media');
    mediaList = await res.json();
    renderMediaGrid();
  } catch (err) {
    console.error(err);
  }
}

function renderMediaGrid() {
  const grid = document.getElementById('media-grid');
  const countEl = document.getElementById('media-count');
  if (countEl) countEl.textContent = mediaList.length;

  if (!grid) return;
  if (mediaList.length === 0) {
    grid.innerHTML = '<div class="cms-empty">Belum ada file yang diunggah. Silakan upload melalui area di atas.</div>';
    return;
  }

  grid.innerHTML = mediaList.map(item => `
    <div class="cms-media-card">
      <div class="cms-media-thumb" onclick="copyToClipboard('${item.url}')" title="Klik untuk salin tautan">
        ${item.isVideo 
          ? `<video src="${item.url}" muted></video>` 
          : `<img src="${item.url}" alt="${item.filename}" loading="lazy">`}
      </div>
      <div class="cms-media-info">
        <span class="cms-media-name" title="${item.filename}">${item.filename}</span>
        <span class="cms-media-meta">${formatBytes(item.size)} &bull; ${item.isVideo ? 'Video' : 'Gambar'}</span>
        <div class="cms-media-actions">
          <button class="cms-copy-btn" onclick="copyToClipboard('${item.url}')">Salin URL</button>
          <button class="cms-delete-btn" onclick="deleteMedia('${item.filename}')">Hapus</button>
        </div>
      </div>
    </div>
  `).join('');
}

function initDropzone() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) uploadFile(files[0]);
  });

  fileInput.addEventListener('change', (e) => {
    if (fileInput.files.length > 0) uploadFile(fileInput.files[0]);
  });

  const btnRefresh = document.getElementById('btn-refresh-media');
  if (btnRefresh) btnRefresh.addEventListener('click', loadMedia);
}

function uploadFile(file) {
  const progressBox = document.getElementById('upload-progress');
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');

  progressBox.style.display = 'block';
  fill.style.width = '30%';
  text.textContent = 'Mengunggah ' + file.name + '...';

  const formData = new FormData();
  formData.append('media', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/cms/upload', true);
  const token = getToken();
  if (token) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  }

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      fill.style.width = percent + '%';
      text.textContent = 'Mengunggah ' + percent + '%...';
    }
  };

  xhr.onload = () => {
    progressBox.style.display = 'none';
    fill.style.width = '0%';
    document.getElementById('file-input').value = '';

    if (xhr.status === 401) {
      clearToken();
      showLoginScreen();
      showToast('Sesi telah habis, silakan login kembali.');
      return;
    }

    if (xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      showToast('File berhasil diunggah: ' + res.file.originalName);
      loadMedia();
    } else {
      showToast('Upload gagal: ' + xhr.statusText);
    }
  };

  xhr.onerror = () => {
    progressBox.style.display = 'none';
    showToast('Koneksi terputus saat upload');
  };

  xhr.send(formData);
}

window.deleteMedia = async function(filename) {
  if (!confirm('Hapus file ' + filename + '? Tindakan ini tidak dapat dibatalkan.')) return;
  try {
    const token = getToken();
    const res = await fetch('/api/cms/media/' + encodeURIComponent(filename), {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.status === 401) {
      clearToken();
      showLoginScreen();
      showToast('Sesi telah habis, silakan login kembali.');
      return;
    }
    if (!res.ok) throw new Error('Gagal menghapus file');
    showToast('File berhasil dihapus');
    loadMedia();
  } catch (err) {
    showToast('Error: ' + err.message);
  }
};

// ── MEDIA PICKER MODAL ──
window.openMediaPicker = function(targetInputId) {
  targetInputForPicker = targetInputId;
  const modal = document.getElementById('media-picker-modal');
  const grid = document.getElementById('modal-media-grid');

  if (mediaList.length === 0) {
    grid.innerHTML = '<div class="cms-empty">Belum ada media terunggah. Silakan upload terlebih dahulu di tab Media.</div>';
  } else {
    grid.innerHTML = mediaList.map(item => `
      <div class="cms-media-card" style="cursor:pointer" onclick="selectMediaForInput('${item.url}')">
        <div class="cms-media-thumb">
          ${item.isVideo 
            ? `<video src="${item.url}" muted></video>` 
            : `<img src="${item.url}" alt="${item.filename}">`}
        </div>
        <div class="cms-media-info">
          <span class="cms-media-name">${item.filename}</span>
          <span class="cms-media-meta" style="color:var(--red);font-weight:600">Klik untuk Pilih &rarr;</span>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add('open');
};

window.selectMediaForInput = function(url) {
  if (targetInputForPicker) {
    const input = document.getElementById(targetInputForPicker);
    if (input) {
      input.value = url;
      input.dispatchEvent(new Event('input'));
    }
  }
  closeMediaPicker();
  showToast('Media terpilih!');
};

window.closeMediaPicker = function() {
  document.getElementById('media-picker-modal').classList.remove('open');
  targetInputForPicker = null;
};

// ── SAVE HANDLERS ──
function initSaveButtons() {
  document.getElementById('btn-save-all').addEventListener('click', () => saveAllContent(true));
  document.querySelectorAll('.btn-save-section').forEach(btn => {
    btn.addEventListener('click', () => saveAllContent(true));
  });
}

async function saveAllContent(showNotification = true) {
  if (!contentData) return;

  // 1. Gather Hero
  contentData.hero = {
    mediaType: document.getElementById('radio-hero-video').checked ? 'video' : 'image',
    mediaUrl: document.getElementById('hero-media-url').value.trim(),
    posterUrl: document.getElementById('hero-poster-url').value.trim(),
    title: document.getElementById('hero-title').value.trim(),
    titleAccent: document.getElementById('hero-title-accent').value.trim(),
    desc: document.getElementById('hero-desc').value.trim(),
    ctaPrimaryText: document.getElementById('hero-cta-text').value.trim(),
    ctaPrimaryLink: document.getElementById('hero-cta-link').value.trim()
  };

  // 1b. Gather Custom Solution Image
  const customSolInput = document.getElementById('custom-sol-image-url');
  if (customSolInput) {
    contentData.customSolution = {
      imageUrl: customSolInput.value.trim() || '/assets/images/custom-solution-team.jpg'
    };
  }

  // 2. Gather Contact
  contentData.contact = {
    email: document.getElementById('contact-email').value.trim(),
    waKaranganyar: document.getElementById('contact-wa-karanganyar').value.trim(),
    waKaranganyarNum: document.getElementById('contact-wa-karanganyar-num').value.trim(),
    waGresik: document.getElementById('contact-wa-gresik').value.trim(),
    waGresikNum: document.getElementById('contact-wa-gresik-num').value.trim(),
    addressGresik: document.getElementById('contact-address-gresik').value.trim(),
    addressKaranganyar: document.getElementById('contact-address-karanganyar').value.trim()
  };

  try {
    const token = getToken();
    const res = await fetch('/api/cms/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(contentData)
    });
    if (res.status === 401) {
      clearToken();
      showLoginScreen();
      showToast('Sesi telah habis, silakan login kembali.');
      return;
    }
    if (!res.ok) throw new Error('Gagal menyimpan ke server');
    if (showNotification) showToast('Semua perubahan berhasil disimpan ke website!');
  } catch (err) {
    showToast('Error: ' + err.message);
  }
}

// ── HELPERS ──
window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Tautan disalin ke clipboard: ' + text);
  }).catch(() => {
    prompt('Salin tautan ini:', text);
  });
};

function showToast(msg) {
  const toast = document.getElementById('cms-toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


// ── RICHZ PRODUCTS MANAGEMENT ──
function renderRichzList() {
  const container = document.getElementById('richz-list-container');
  if (!container || !contentData || !contentData.richz) return;

  if (contentData.richz.length === 0) {
    container.innerHTML = '<div class="cms-empty">Belum ada produk Richz. Klik tombol di atas untuk menambahkan.</div>';
    return;
  }

  container.innerHTML = contentData.richz.map((prod) => {
    const colorHex = prod.accentColor === 'blue' ? '#2563EB' :
                     prod.accentColor === 'orange' ? '#F97316' :
                     prod.accentColor === 'green' ? '#10B981' :
                     prod.accentColor === 'purple' ? '#8B5CF6' : '#EF4444';

    return `
      <div class="cms-project-item" data-id="${prod.id}">
        <div class="cms-project-item__info">
          <div class="cms-project-thumb-mini" style="background:${colorHex}15">
            ${prod.imageUrl ? `<img src="${prod.imageUrl}" alt="${prod.name}">` : `<div style="width:16px;height:16px;border-radius:4px;background:${colorHex}"></div>`}
          </div>
          <div class="cms-project-item__text">
            <h4>${prod.brandPrefix || 'Richz'}<span style="color:${colorHex}">${prod.brandSuffix || ''}</span></h4>
            <div class="cms-project-item__meta">
              <span><strong>Kategori:</strong> ${prod.category || '-'}</span>
              <span>&bull;</span>
              <span class="cms-badge-sm" style="background:${colorHex}20;color:${colorHex}">${prod.accentColor || 'red'}</span>
              <span>&bull;</span>
              <span>${prod.link || '/layanan'}</span>
            </div>
          </div>
        </div>
        <div class="cms-project-item__actions">
          <button class="cms-btn cms-btn--sm cms-btn--outline" onclick="editRichz('${prod.id}')">Edit</button>
          <button class="cms-btn cms-btn--sm cms-btn--danger" onclick="deleteRichz('${prod.id}')">Hapus</button>
        </div>
      </div>
    `;
  }).join('');
}

const btnAddRichz = document.getElementById('btn-add-richz');
if (btnAddRichz) {
  btnAddRichz.addEventListener('click', () => openRichzModal());
}

function openRichzModal(prod = null) {
  const modal = document.getElementById('richz-modal');
  const titleEl = document.getElementById('richz-modal-title');
  const idEl = document.getElementById('richz-edit-id');
  const prefixInput = document.getElementById('richz-edit-prefix');
  const suffixInput = document.getElementById('richz-edit-suffix');
  const catInput = document.getElementById('richz-edit-category');
  const colorInput = document.getElementById('richz-edit-color');
  const iconInput = document.getElementById('richz-edit-icon');
  const imgInput = document.getElementById('richz-edit-image');
  const logoInput = document.getElementById('richz-edit-logo');
  const linkInput = document.getElementById('richz-edit-link');

  if (prod) {
    titleEl.textContent = 'Edit Produk Richz';
    idEl.value = prod.id;
    prefixInput.value = prod.brandPrefix || 'Richz';
    suffixInput.value = prod.brandSuffix || '';
    catInput.value = prod.category || '';
    colorInput.value = prod.accentColor || 'red';
    iconInput.value = prod.icon || 'store';
    imgInput.value = prod.imageUrl || '';
    if (logoInput) logoInput.value = prod.logoUrl || '';
    linkInput.value = prod.link || '/layanan';
  } else {
    titleEl.textContent = 'Tambah Produk Richz Baru';
    idEl.value = '';
    prefixInput.value = 'Richz';
    suffixInput.value = '';
    catInput.value = '';
    colorInput.value = 'red';
    iconInput.value = 'store';
    imgInput.value = '';
    if (logoInput) logoInput.value = '';
    linkInput.value = '/layanan';
  }

  modal.classList.add('open');
}

window.closeRichzModal = function() {
  document.getElementById('richz-modal').classList.remove('open');
};

const btnSaveRichz = document.getElementById('btn-save-richz-item');
if (btnSaveRichz) {
  btnSaveRichz.addEventListener('click', () => {
    const id = document.getElementById('richz-edit-id').value;
    const prefix = document.getElementById('richz-edit-prefix').value.trim() || 'Richz';
    const suffix = document.getElementById('richz-edit-suffix').value.trim();
    const category = document.getElementById('richz-edit-category').value.trim();
    const accentColor = document.getElementById('richz-edit-color').value;
    const icon = document.getElementById('richz-edit-icon').value;
    const imageUrl = document.getElementById('richz-edit-image').value.trim();
    const logoUrl = document.getElementById('richz-edit-logo')?.value.trim() || '';
    const link = document.getElementById('richz-edit-link').value.trim() || '/layanan';

    if (!suffix) {
      alert('Mohon isi akhiran nama produk (contoh: POS, Store, FNB, dll)');
      return;
    }

    if (!contentData.richz) contentData.richz = [];

    const name = prefix + suffix;

    if (id) {
      const item = contentData.richz.find(p => p.id === id);
      if (item) {
        item.name = name;
        item.brandPrefix = prefix;
        item.brandSuffix = suffix;
        item.category = category;
        item.accentColor = accentColor;
        item.icon = icon;
        item.imageUrl = imageUrl;
        item.logoUrl = logoUrl;
        item.link = link;
      }
    } else {
      const newProd = {
        id: 'richz-' + Date.now(),
        name,
        brandPrefix: prefix,
        brandSuffix: suffix,
        category,
        accentColor,
        icon,
        imageUrl,
        logoUrl,
        link
      };
      contentData.richz.push(newProd);
    }

    renderRichzList();
    closeRichzModal();
    saveAllContent(false);
    showToast('Produk Richz berhasil diperbarui!');
  });
}

window.editRichz = function(id) {
  const prod = contentData.richz.find(p => p.id === id);
  if (prod) openRichzModal(prod);
};

window.deleteRichz = function(id) {
  if (!confirm('Apakah Anda yakin ingin menghapus produk Richz ini?')) return;
  contentData.richz = contentData.richz.filter(p => p.id !== id);
  renderRichzList();
  saveAllContent(false);
  showToast('Produk Richz berhasil dihapus');
};
