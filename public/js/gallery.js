// SWA Digital Solusindo — Galeri Project & Lightbox Logic
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var defaultGallery = [
    {
      id: "gal-1",
      title: "SIT Sistem ERP PT. Fokus Jasa Mitra (FJM)",
      client: "PT. Fokus Jasa Mitra (FJM)",
      category: "ERP & Bisnis",
      imageUrl: "/assets/images/projects/project-3.jpeg",
      description: "Implementasi Sistem Informasi Terpadu (SIT) ERP untuk PT. Fokus Jasa Mitra yang mengintegrasikan proses bisnis procurement, inventory, finance, hingga HR management dalam satu platform terpadu."
    },
    {
      id: "gal-2",
      title: "Assessment Sistem ERP PT. Cobra Dental Indonesia",
      client: "PT. Cobra Dental Indonesia",
      category: "Konsultasi & Analisis",
      imageUrl: "/assets/images/projects/project-4.jpeg",
      description: "Assessment menyeluruh terhadap kebutuhan sistem ERP PT. Cobra Dental Indonesia, mencakup analisis proses bisnis, gap analysis, dan rekomendasi solusi optimalisasi operasional dental nasional."
    },
    {
      id: "gal-3",
      title: "Demo Proyek Sistem ERP PT. Cobra Dental Indonesia",
      client: "PT. Cobra Dental Indonesia",
      category: "ERP & Bisnis",
      imageUrl: "/assets/images/projects/project-5.jpeg",
      description: "Sesi presentasi dan pengujian sistem ERP kustom yang menghubungkan modul persediaan multi-cabang, order purchasing, dan alur otorisasi keuangan secara realtime."
    },
    {
      id: "gal-4",
      title: "Demo Mobile & Customer App PT. Cobra Dental Indonesia",
      client: "PT. Cobra Dental Indonesia",
      category: "Mobile App",
      imageUrl: "/assets/images/projects/project-10.jpeg",
      description: "Demonstrasi aplikasi mobile dan customer portal terintegrasi sistem ERP, memudahkan tim sales lapangan dalam pengecekan stok gudang dan pembuatan pesanan klinis secara cepat."
    },
    {
      id: "gal-5",
      title: "Sistem Pembelajaran Farmasi Politeknik Indonusa",
      client: "Politeknik Indonusa Surakarta",
      category: "Web Platform",
      imageUrl: "/assets/images/projects/project-2.jpeg",
      description: "Demonstrasi sistem pembelajaran farmasi yang dikembangkan khusus untuk dosen Politeknik Indonusa dengan fitur manajemen kurikulum, e-learning, dan sistem evaluasi pembelajaran yang terintegrasi."
    },
    {
      id: "gal-6",
      title: "Assessment Sistem ERP di PT. Gamma Buana Persada",
      client: "PT. Gamma Buana Persada",
      category: "Konsultasi & Analisis",
      imageUrl: "/assets/images/projects/project-6.jpeg",
      description: "Melakukan assessment menyeluruh terhadap alur proses bisnis dan kebutuhan transformasi sistem ERP untuk efisiensi rantai pasok dan operasional perusahaan."
    },
    {
      id: "gal-7",
      title: "Training & Implementasi Sistem ERP SaVa Group",
      client: "SaVa Group",
      category: "ERP & Bisnis",
      imageUrl: "/assets/images/projects/project-7.jpeg",
      description: "Pelatihan dan pendampingan implementasi sistem ERP untuk SaVa Group guna meningkatkan efisiensi operasional dan integrasi sistem antar unit bisnis."
    },
    {
      id: "gal-8",
      title: "Implementasi Sistem Klinik Pratama Kusmahati Dua",
      client: "Klinik Pratama Kusmahati Dua",
      category: "Web Platform",
      imageUrl: "/assets/images/projects/project-1.jpeg",
      description: "Implementasi sistem rekam medis elektronik dan operasional administrasi klinik untuk mempercepat alur pelayanan pasien serta manajemen obat farmasi."
    },
    {
      id: "gal-9",
      title: "Uji Coba Lapangan Aplikasi Mobile Operasional",
      client: "PT. Cobra Dental Indonesia",
      category: "Mobile App",
      imageUrl: "/assets/images/projects/project-8.jpeg",
      description: "Pengujian lapangan aplikasi mobile terhubung ERP secara offline-first untuk koordinasi tim operasional dan tracking pengiriman produk secara presisi."
    },
    {
      id: "gal-10",
      title: "Handover & Evaluasi Sistem ERP Terintegrasi",
      client: "PT. Cobra Dental Indonesia",
      category: "ERP & Bisnis",
      imageUrl: "/assets/images/projects/project-9.jpeg",
      description: "Serah terima final modul ERP, evaluasi performa implementasi, dan pengesahan kesiapan go-live seluruh divisi operasional perusahaan."
    }
  ];

  var galleryItems = defaultGallery.slice();
  var activeCategory = 'all';
  var currentLightboxIndex = 0;
  var filteredItems = [];

  var galleryGrid = document.getElementById('gallery-grid');
  var emptyState = document.getElementById('gallery-empty');
  var filterButtons = document.querySelectorAll('.gallery-filter-btn');

  // Lightbox DOM Elements
  var lightbox = document.getElementById('lightbox-modal');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxTitle = document.getElementById('lightbox-title');
  var lightboxCategory = document.getElementById('lightbox-category');
  var lightboxDesc = document.getElementById('lightbox-desc');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var lightboxCounter = document.getElementById('lightbox-counter');
  var lightboxWaBtn = document.getElementById('lightbox-wa-btn');

  // Fetch dynamic gallery data from CMS API
  function loadGalleryData() {
    fetch('/api/cms/content')
      .then(function (res) {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(function (data) {
        if (data && Array.isArray(data.gallery) && data.gallery.length > 0) {
          galleryItems = data.gallery;
          renderGallery();
        }
      })
      .catch(function (err) {
        console.info('[Gallery] Using static default items:', err.message);
      });
  }

  // Render cards
  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    filteredItems = galleryItems.filter(function (item) {
      if (activeCategory === 'all') return true;
      return (item.category || '').toLowerCase().indexOf(activeCategory.toLowerCase()) !== -1;
    });

    if (filteredItems.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    filteredItems.forEach(function (item, index) {
      var card = document.createElement('div');
      card.className = 'gallery-card reveal';
      card.setAttribute('data-id', item.id);

      var clientHtml = item.client
        ? '<div class="gallery-card__client">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3"/></svg>' +
            '<span>' + escapeHtml(item.client) + '</span>' +
          '</div>'
        : '';

      card.innerHTML =
        '<div>' +
          '<div class="gallery-card__thumb">' +
            '<img src="' + (item.imageUrl || '/assets/images/projects/project-3.jpeg') + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' +
            '<div class="gallery-card__overlay">' +
              '<span class="gallery-card__view-btn">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2.5"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>' +
                '<span>Lihat Foto</span>' +
              '</span>' +
            '</div>' +
            '<span class="gallery-card__badge">' + escapeHtml(item.category || 'Solusi ERP') + '</span>' +
          '</div>' +
          '<div class="gallery-card__body">' +
            clientHtml +
            '<h3 class="gallery-card__title">' + escapeHtml(item.title) + '</h3>' +
            '<p class="gallery-card__desc">' + escapeHtml(item.description || 'Implementasi arsitektur sistem digital kustom yang dibangun terintegrasi sesuai kebutuhan proses operasional.') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="gallery-card__footer">' +
          '<span>Pratinjau Layar Penuh</span>' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>' +
        '</div>';

      card.addEventListener('click', function () {
        openLightbox(index);
      });

      galleryGrid.appendChild(card);
    });

    // Re-initialize reveal observer if present
    if (typeof window.initObserver === 'function') {
      window.initObserver();
    } else {
      var unrevealed = document.querySelectorAll('.gallery-card:not(.visible)');
      if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
          });
        }, { threshold: 0.1 });
        unrevealed.forEach(function (el) { obs.observe(el); });
      } else {
        unrevealed.forEach(function (el) { el.classList.add('visible'); });
      }
    }
  }

  // Filter Buttons Handler
  if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category') || 'all';
        renderGallery();
      });
    });
  }

  // Lightbox functions
  function openLightbox(index) {
    if (!lightbox || !filteredItems[index]) return;
    currentLightboxIndex = index;
    updateLightboxContent();

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    var item = filteredItems[currentLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.src = item.imageUrl || '';
      lightboxImg.alt = item.title || 'Dokumentasi Proyek';
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title || 'Dokumentasi Proyek';
    if (lightboxCategory) lightboxCategory.textContent = item.category || 'Sistem ERP';
    if (lightboxDesc) lightboxDesc.textContent = item.description || '';
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentLightboxIndex + 1) + ' / ' + filteredItems.length;
    }
    if (lightboxWaBtn) {
      var waUrl = 'https://wa.me/6282326743025?text=' + encodeURIComponent('Halo SWA Digital, saya tertarik dengan dokumentasi proyek: ' + item.title + '. Bisakah kami berdiskusi mengenai implementasi serupa?');
      lightboxWaBtn.href = waUrl;
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prevLightbox() {
    if (filteredItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  }

  function nextLightbox() {
    if (filteredItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function (e) { e.stopPropagation(); prevLightbox(); });
  if (lightboxNext) lightboxNext.addEventListener('click', function (e) { e.stopPropagation(); nextLightbox(); });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target.classList.contains('gallery-lightbox__backdrop') || e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initial render
  renderGallery();
  loadGalleryData();
});
