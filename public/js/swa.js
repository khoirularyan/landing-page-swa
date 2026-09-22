(function () {
  'use strict';
  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('nav-toggle');
  var menu   = document.getElementById('nav-menu');

  window.addEventListener('scroll', function () {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

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

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
})();
