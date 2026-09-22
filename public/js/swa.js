(function () {
  'use strict';

  // ── NAVBAR SCROLL & MOBILE TOGGLE ──
  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('nav-menu');

  function updateNavbarScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
  }

  window.addEventListener('scroll', updateNavbarScroll, { passive: true });
  updateNavbarScroll(); // Trigger once on load

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      }
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  // ── SCROLL REVEAL ──
  function initObserver() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) { obs.observe(el); });
  }
  initObserver();

  // ── DYNAMIC CMS CONTENT SYNC ──
  fetch('/api/cms/content')
    .then(function (res) {
      if (res.ok) return res.json();
      throw new Error('No dynamic content');
    })
    .then(function (data) {
      syncHero(data.hero);
      syncProjects(data.projects);
      syncRichz(data.richz);
      syncContact(data.contact);
      initObserver();
    })
    .catch(function () {
      // Fallback cleanly to static HTML
    });

  function syncHero(hero) {
    if (!hero) return;
    var heroMedia = document.querySelector('.hero-cinematic__media');
    if (heroMedia && hero.mediaUrl) {
      if (hero.mediaType === 'image') {
        heroMedia.innerHTML = '<img src="' + hero.mediaUrl + '" alt="SWA Digital" class="hero-cinematic__img" style="width:100%;height:100%;object-fit:cover;"><div class="hero-cinematic__overlay"></div>';
      } else if (hero.mediaType === 'video') {
        heroMedia.innerHTML = '<video class="hero-cinematic__video" autoplay muted loop playsinline poster="' + (hero.posterUrl || '') + '">' +
          '<source src="' + hero.mediaUrl + '" type="video/mp4">' +
          '</video><div class="hero-cinematic__overlay"></div>';
      }
    }

    var titleEl = document.querySelector('.hero-cinematic__title');
    if (titleEl && hero.title) {
      var html = hero.title;
      if (hero.titleAccent) {
        html += ' <span>' + hero.titleAccent + '</span>';
      }
      if (hero.titleSub) {
        html += '<br>' + hero.titleSub;
      }
      titleEl.innerHTML = html;
    }

    var descEl = document.querySelector('.hero-cinematic__desc');
    if (descEl && hero.desc) {
      descEl.textContent = hero.desc;
    }

    var ctaEl = document.querySelector('.hero-cinematic__actions a');
    if (ctaEl && hero.ctaPrimaryText) {
      ctaEl.innerHTML = hero.ctaPrimaryText + ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      if (hero.ctaPrimaryLink) ctaEl.href = hero.ctaPrimaryLink;
    }
  }

  
  function syncRichz(richz) {
    if (!richz || !Array.isArray(richz) || richz.length === 0) return;
    var grid = document.querySelector('.richz-grid');
    if (!grid) return;

    var iconMap = {
      store: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
      utensils: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2M15 2v10M15 12v10M6 2v20M6 7h4"/></svg>',
      fingerprint: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 0-6.88 17.23l.11.1a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41A8 8 0 1 1 12 20a7.9 7.9 0 0 1-4.24-1.22 1 1 0 0 0-1.06 1.7A10 10 0 1 0 12 2z"/><path d="M12 6a6 6 0 0 0-6 6c0 2.22 1.21 4.16 3 5.2a1 1 0 0 0 1-1.73A4 4 0 0 1 8 12a4 4 0 1 1 8 0 4 4 0 0 1-2 3.46 1 1 0 0 0 1 1.74A6 6 0 0 0 18 12a6 6 0 0 0-6-6z"/></svg>',
      mobile: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
      card: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>'
    };

    grid.innerHTML = richz.map(function(item, idx) {
      var colorClass = item.accentColor === 'blue' ? 'richz-card--store' :
                       item.accentColor === 'orange' ? 'richz-card--fnb' :
                       item.accentColor === 'green' ? 'richz-card--spot' : 'richz-card--pos';

      var iconSvg = iconMap[item.icon] || iconMap.store;
      var delayClass = idx > 0 ? ' reveal--d' + Math.min(idx, 4) : '';

      return '<a href="' + (item.link || '/layanan') + '" class="richz-card ' + colorClass + ' reveal' + delayClass + '">' +
        '<div class="richz-card__media">' +
          '<img src="' + (item.imageUrl || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=80') + '" alt="' + item.name + '" loading="lazy">' +
        '</div>' +
        '<div class="richz-card__content">' +
          '<div class="richz-card__icon">' + iconSvg + '</div>' +
          '<div class="richz-card__text">' +
            '<h4>' + (item.brandPrefix || 'Richz') + '<span class="richz-title-accent">' + (item.brandSuffix || '') + '</span></h4>' +
            '<p>' + (item.category || '') + '</p>' +
          '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  function syncProjects(projects) {
    // Only run on pages that have .project-grid (e.g. /proyek)
    var grid = document.querySelector('.project-grid');
    if (!grid || !projects || !Array.isArray(projects) || projects.length === 0) return;

    grid.innerHTML = projects.map(function (item) {
      var thumbHtml = item.imageUrl
        ? '<div class="project-card__thumb"><span class="project-card__badge">' + (item.category || 'ERP') + '</span><img src="' + item.imageUrl + '" alt="' + item.title + '" loading="lazy"></div>'
        : '<div class="project-card__thumb"><span class="project-card__badge">' + (item.category || 'ERP') + '</span><div class="project-card__icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div></div>';

      return '<div class="project-card reveal">' +
        thumbHtml +
        '<div class="project-card__body">' +
          '<span class="project-card__client">' + (item.client || '') + '</span>' +
          '<h3 class="project-card__title">' + item.title + '</h3>' +
          '<div class="project-card__footer">' +
            '<a href="' + (item.link || '/kontak') + '" class="project-card__link">' +
              'Lihat Detail ' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function syncContact(contact) {
    if (!contact) return;
    var floatingWa = document.querySelector('.floating-wa');
    if (floatingWa && contact.waKaranganyarNum) {
      floatingWa.href = 'https://wa.me/' + contact.waKaranganyarNum;
    }
  }

})();
