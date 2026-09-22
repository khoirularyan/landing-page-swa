/**
 * SWA Digital Solusindo — Interactive Landing Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSolutionFinder();
  initRichzShowcase();
  initIndustries();
  initScrollReveal();
});

/* -------------------------------------------------------------
 * 1. Navbar: Scroll blur & Mobile Menu Toggle
 * ----------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('[data-testid="navbar"]');
  const toggleBtn = document.querySelector('[data-testid="navbar-mobile-toggle"]');
  const mobileMenu = document.getElementById('navbar-mobile-menu');
  const menuIcon = document.getElementById('navbar-menu-icon');
  const closeIcon = document.getElementById('navbar-close-icon');

  if (!header) return;

  let isOpen = false;

  const updateHeaderState = () => {
    const isScrolled = window.scrollY > 24;
    if (isScrolled || isOpen) {
      header.classList.add('border-b', 'border-[#E5E7EB]', 'bg-white/90', 'backdrop-blur-md');
      header.classList.remove('border-transparent', 'bg-transparent');
    } else {
      header.classList.remove('border-b', 'border-[#E5E7EB]', 'bg-white/90', 'backdrop-blur-md');
      header.classList.add('border-transparent', 'bg-transparent');
    }
  };

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');

      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        if (menuIcon) menuIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
      }
      updateHeaderState();
    });

    // Close mobile menu on clicking any navigation link
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        isOpen = false;
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        updateHeaderState();
      });
    });
  }
}

/* -------------------------------------------------------------
 * 2. Solution Finder: Interactive problem tabs & details
 * ----------------------------------------------------------- */
const solutionProblems = [
  {
    id: "01",
    title: "Meningkatkan Penjualan",
    tag: "Sales & POS Solution",
    desc: "Transaksi lambat, stok tidak akurat, dan laporan penjualan yang terlambat membuat bisnis kehilangan momentum bertumbuh.",
    approach: ["RichzPOS — Point of Sale", "RichzStore — Omnichannel", "Dashboard penjualan real-time"],
  },
  {
    id: "02",
    title: "Merapikan Proses Bisnis",
    tag: "Business Process Solution",
    desc: "Proses manual dan data yang tersebar di banyak tempat membuat operasional sulit dikontrol dan rentan kesalahan.",
    approach: ["Business process analysis", "Otomasi alur kerja", "Integrasi antar sistem"],
  },
  {
    id: "03",
    title: "Mengembangkan Bisnis Secara Digital",
    tag: "Digital & E-Commerce Solution",
    desc: "Pelanggan beralih ke kanal digital, namun bisnis belum memiliki infrastruktur penjualan online yang matang.",
    approach: ["RichzStore — E-Commerce", "Integrasi payment gateway", "Sinkronisasi stok online & offline"],
  },
  {
    id: "04",
    title: "Mengelola Tim Lebih Efektif",
    tag: "HR & Attendance Solution",
    desc: "Presensi, jadwal, dan performa tim di banyak cabang sulit dipantau secara akurat dan real-time.",
    approach: ["RichzSPOT — Attendance", "Manajemen multi-cabang", "Laporan performa tim"],
  },
  {
    id: "05",
    title: "Membutuhkan Sistem Khusus",
    tag: "Custom Digital Solution",
    desc: "Kebutuhan bisnis Anda unik dan tidak dapat diselesaikan oleh produk siap pakai yang tersedia di pasaran.",
    approach: ["Konsultasi digital", "Custom development", "System integration"],
  },
];

function initSolutionFinder() {
  const problemButtons = document.querySelectorAll('[data-solution-index]');
  const detailPanel = document.getElementById('solution-finder-detail-container');

  if (!problemButtons.length || !detailPanel) return;

  function renderDesktopDetail(p) {
    detailPanel.innerHTML = `
      <div class="panel-in rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_10px_40px_rgba(11,18,32,0.05)]">
        <p class="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#0057D9]">
          ${p.id} — ${p.tag}
        </p>
        <h3 class="mt-4 font-display text-xl font-semibold tracking-tight text-[#0B1220]">
          ${p.title}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-[#4B5563]">${p.desc}</p>
        <p class="mt-6 mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
          Pendekatan yang disarankan
        </p>
        <ul class="mt-4 space-y-3">
          ${p.approach.map((a) => `
            <li class="flex items-center gap-3 text-sm font-medium text-[#0B1220]">
              <span class="h-1.5 w-1.5 rounded-full bg-[#0057D9]"></span>
              ${a}
            </li>
          `).join('')}
        </ul>
        <a
          href="#kontak"
          data-testid="solution-finder-cta"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0057D9]"
          class="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0057D9]"
        >
          Diskusikan kebutuhan ini
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>
    `;
  }

  function setActiveProblem(idx) {
    const current = solutionProblems[idx];
    if (!current) return;

    problemButtons.forEach((btn, i) => {
      const isSelected = i === idx;
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      
      const numSpan = btn.querySelector('.solution-num');
      const tagSpan = btn.querySelector('.solution-tag');
      const arrowSvg = btn.querySelector('.solution-arrow');
      const mobileAccordion = document.getElementById(`solution-mobile-acc-${i}`);

      if (isSelected) {
        btn.classList.add('text-[#0B1220]');
        btn.classList.remove('text-[#6B7280]');
        if (numSpan) { numSpan.classList.add('text-[#0057D9]'); numSpan.classList.remove('text-[#9CA3AF]'); }
        if (tagSpan) { tagSpan.classList.add('text-[#0057D9]'); tagSpan.classList.remove('text-[#9CA3AF]'); }
        if (arrowSvg) {
          arrowSvg.classList.add('translate-x-0', 'text-[#0057D9]', 'opacity-100');
          arrowSvg.classList.remove('-translate-x-1', 'opacity-0');
        }
        if (mobileAccordion) mobileAccordion.classList.remove('hidden');
      } else {
        btn.classList.remove('text-[#0B1220]');
        btn.classList.add('text-[#6B7280]');
        if (numSpan) { numSpan.classList.remove('text-[#0057D9]'); numSpan.classList.add('text-[#9CA3AF]'); }
        if (tagSpan) { tagSpan.classList.remove('text-[#0057D9]'); tagSpan.classList.add('text-[#9CA3AF]'); }
        if (arrowSvg) {
          arrowSvg.classList.remove('translate-x-0', 'text-[#0057D9]', 'opacity-100');
          arrowSvg.classList.add('-translate-x-1', 'opacity-0');
        }
        if (mobileAccordion) mobileAccordion.classList.add('hidden');
      }
    });

    renderDesktopDetail(current);
  }

  problemButtons.forEach((btn) => {
    const idx = parseInt(btn.getAttribute('data-solution-index'), 10);
    btn.addEventListener('mouseenter', () => setActiveProblem(idx));
    btn.addEventListener('click', () => setActiveProblem(idx));
  });

  // Initial state
  setActiveProblem(0);
}

/* -------------------------------------------------------------
 * 3. Richz Showcase: Tabs & Interactive Mock Screens
 * ----------------------------------------------------------- */
const richzProducts = [
  {
    id: "richzpos",
    name: "RichzPOS",
    badge: "Retail & Point of Sale",
    desc: "Kasir pintar dengan kontrol inventaris terpadu dan pencatatan transaksi yang presisi.",
    features: ["Transaksi cepat & akurat", "Manajemen stok terpadu", "Laporan penjualan real-time"],
    variant: "pos",
  },
  {
    id: "richzstore",
    name: "RichzStore",
    badge: "E-Commerce",
    desc: "Toko digital yang terintegrasi langsung dengan stok gudang dan sistem pembayaran.",
    features: ["Toko online siap pakai", "Sinkron dengan stok offline", "Pembayaran digital terintegrasi"],
    variant: "store",
  },
  {
    id: "richzfnb",
    name: "RichzFNB",
    badge: "Food & Beverage",
    desc: "Manajemen restoran modern: pemesanan digital, kitchen display, dan kontrol bahan baku.",
    features: ["Pemesanan digital di meja", "Kitchen display system", "Manajemen bahan & resep"],
    variant: "fnb",
  },
  {
    id: "richzspot",
    name: "RichzSPOT",
    badge: "Attendance & Workforce",
    desc: "Pemantauan presensi dan performa tim lintas cabang secara real-time.",
    features: ["Presensi digital", "Pantauan multi-cabang", "Analisis performa tim"],
    variant: "spot",
  },
];

function renderMockScreen(variant, name) {
  let innerContent = '';

  if (variant === 'pos') {
    const items = [
      ["Kopi Susu Gula Aren", "22.000"],
      ["Croissant Butter", "18.000"],
      ["Es Teh Melati", "12.000"]
    ];
    innerContent = `
      <div class="space-y-2.5">
        ${items.map(([n, p]) => `
          <div class="flex items-center justify-between rounded border border-[#F1F2F4] px-3 py-2">
            <span class="text-[11px] text-[#4B5563]">${n}</span>
            <span class="mono-accent text-[10px] text-[#0B1220]">${p}</span>
          </div>
        `).join('')}
        <div class="flex items-center justify-between rounded bg-[#0057D9] px-3 py-2.5">
          <span class="text-[11px] font-semibold text-white">Total Transaksi</span>
          <span class="mono-accent text-[11px] font-bold text-white">52.000</span>
        </div>
      </div>
    `;
  } else if (variant === 'store') {
    innerContent = `
      <div class="grid grid-cols-3 gap-2.5">
        ${[0, 1, 2, 3, 4, 5].map((i) => `
          <div class="rounded border border-[#F1F2F4] p-2">
            <div class="h-10 rounded-sm ${i === 0 ? "bg-[#0057D9]/15" : "bg-[#F1F2F4]"}"></div>
            <div class="mt-2 h-1.5 w-3/4 rounded-full bg-[#E5E7EB]"></div>
            <div class="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#F1F2F4]"></div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (variant === 'fnb') {
    const cols = ["Baru", "Dimasak", "Siap"];
    innerContent = `
      <div class="grid grid-cols-3 gap-2.5">
        ${cols.map((col, ci) => `
          <div>
            <p class="mono-accent mb-2 text-[8.5px] uppercase tracking-[0.15em] text-[#9CA3AF]">${col}</p>
            <div class="space-y-2">
              ${[0, 1].slice(0, ci === 2 ? 1 : 2).map(() => `
                <div class="rounded border p-2 ${ci === 2 ? "border-[#0057D9]/40 bg-[#0057D9]/5" : "border-[#F1F2F4]"}">
                  <div class="h-1.5 w-2/3 rounded-full bg-[#E5E7EB]"></div>
                  <div class="mt-1.5 h-1.5 w-1/3 rounded-full bg-[#F1F2F4]"></div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (variant === 'spot') {
    const heights = [42, 66, 50, 84, 58, 74, 92];
    innerContent = `
      <div>
        <div class="flex h-20 items-end gap-2">
          ${heights.map((h, i) => `
            <span class="w-full rounded-sm" style="height: ${h}%; background-color: ${i === 6 ? "#0057D9" : "#E5E7EB"};"></span>
          `).join('')}
        </div>
        <div class="mt-3 space-y-2">
          ${["Cabang Jakarta", "Cabang Surabaya"].map((b) => `
            <div class="flex items-center justify-between">
              <span class="text-[10.5px] text-[#4B5563]">${b}</span>
              <span class="flex items-center gap-1.5 text-[10px] font-medium text-[#0B1220]">
                <span class="h-1.5 w-1.5 rounded-full bg-[#0057D9]"></span>
                Online
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_16px_50px_rgba(11,18,32,0.08)]">
      <div class="flex items-center gap-2 border-b border-[#F1F2F4] px-4 py-2.5">
        <span class="h-2 w-2 rounded-full bg-[#E5E7EB]"></span>
        <span class="h-2 w-2 rounded-full bg-[#E5E7EB]"></span>
        <span class="h-2 w-2 rounded-full bg-[#0057D9]"></span>
        <span class="ml-2 mono-accent text-[9px] uppercase tracking-[0.2em] text-[#9CA3AF]">${name}</span>
      </div>
      <div class="p-4">
        ${innerContent}
      </div>
    </div>
  `;
}

function initRichzShowcase() {
  const tabs = document.querySelectorAll('[data-richz-index]');
  const panel = document.getElementById('richz-showcase-panel');

  if (!tabs.length || !panel) return;

  function renderShowcase(p) {
    panel.innerHTML = `
      <div class="panel-in lg:sticky lg:top-28">
        ${renderMockScreen(p.variant, p.name)}
        <div class="mt-8">
          <p class="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#0057D9]">
            ${p.badge}
          </p>
          <h3 class="mt-3 font-display text-2xl font-bold tracking-tight text-[#0B1220]">
            ${p.name}
          </h3>
          <p class="mt-3 max-w-lg text-[15px] leading-relaxed text-[#4B5563]">${p.desc}</p>
          <ul class="mt-6 space-y-3">
            ${p.features.map((f) => `
              <li class="flex items-center gap-3 text-sm font-medium text-[#0B1220]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0057D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${f}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  function setActiveTab(idx) {
    const current = richzProducts[idx];
    if (!current) return;

    tabs.forEach((tab, i) => {
      const isSelected = i === idx;
      tab.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      
      const badgeSpan = tab.querySelector('.richz-badge');
      const arrowSvg = tab.querySelector('.richz-arrow');

      if (isSelected) {
        tab.classList.add('text-[#0057D9]');
        tab.classList.remove('text-[#9CA3AF]');
        if (badgeSpan) { badgeSpan.classList.add('text-[#4B5563]'); badgeSpan.classList.remove('text-[#9CA3AF]'); }
        if (arrowSvg) {
          arrowSvg.classList.add('translate-x-0', 'opacity-100');
          arrowSvg.classList.remove('-translate-x-1', 'opacity-0');
        }
      } else {
        tab.classList.remove('text-[#0057D9]');
        tab.classList.add('text-[#9CA3AF]');
        if (badgeSpan) { badgeSpan.classList.remove('text-[#4B5563]'); badgeSpan.classList.add('text-[#9CA3AF]'); }
        if (arrowSvg) {
          arrowSvg.classList.remove('translate-x-0', 'opacity-100');
          arrowSvg.classList.add('-translate-x-1', 'opacity-0');
        }
      }
    });

    renderShowcase(current);
  }

  tabs.forEach((tab) => {
    const idx = parseInt(tab.getAttribute('data-richz-index'), 10);
    tab.addEventListener('click', () => setActiveTab(idx));
  });

  setActiveTab(0);
}

/* -------------------------------------------------------------
 * 4. Industries Section: Tabs & Dynamic Panel
 * ----------------------------------------------------------- */
const industryList = [
  {
    id: "retail",
    name: "Retail",
    challenge: "Variasi produk yang tinggi dan persediaan yang tidak sinkron antara toko fisik dan gudang.",
    solution: "Manajemen stok terpusat dengan pencatatan transaksi otomatis dan visibilitas persediaan real-time.",
    tech: ["RichzPOS", "Cloud Inventory", "Laporan Real-time"],
  },
  {
    id: "fnb",
    name: "F&B",
    challenge: "Penyajian pesanan lambat di jam sibuk dan pemakaian bahan baku yang sulit dilacak.",
    solution: "Alur pesanan digital dari meja ke dapur, lengkap dengan kontrol bahan dan resep.",
    tech: ["RichzFNB", "Kitchen Display", "Kontrol Bahan Baku"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    challenge: "Data pasien tersebar dan alur pendaftaran hingga layanan belum terorganisir.",
    solution: "Sistem manajemen klinik terpadu — dari pendaftaran, rekam data, hingga inventaris.",
    tech: ["Sistem Kustom", "Manajemen Antrean", "Integrasi Data"],
  },
  {
    id: "education",
    name: "Education",
    challenge: "Administrasi pembayaran dan rekapitulasi akademik masih dikerjakan manual.",
    solution: "Portal akademik terintegrasi dengan pembayaran digital dan laporan otomatis.",
    tech: ["Portal Kustom", "Payment Gateway", "Laporan Otomatis"],
  },
  {
    id: "distribution",
    name: "Distribution",
    challenge: "Pesanan tim lapangan dan pencatatan piutang berjalan tanpa validasi stok pusat.",
    solution: "Aplikasi penjualan lapangan yang terhubung langsung ke sistem gudang pusat.",
    tech: ["Aplikasi Mobile Kustom", "Integrasi ERP", "Validasi Real-time"],
  },
  {
    id: "corporate",
    name: "Corporate",
    challenge: "Proses persetujuan internal lambat dan data antar departemen tidak terhubung.",
    solution: "Otomasi alur kerja digital dengan hak akses berjenjang dan jejak audit yang jelas.",
    tech: ["Workflow Kustom", "System Integration", "Dashboard Manajemen"],
  },
];

function initIndustries() {
  const tabs = document.querySelectorAll('[data-industry-index]');
  const panel = document.getElementById('industry-detail-panel');

  if (!tabs.length || !panel) return;

  function renderIndustry(ind) {
    panel.innerHTML = `
      <div class="panel-in rounded-xl border border-[#E5E7EB] bg-white p-8 lg:p-10">
        <div>
          <p class="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
            Tantangan
          </p>
          <p class="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-[#0B1220] sm:text-xl">
            ${ind.challenge}
          </p>
        </div>
        <div class="my-7 flex items-center gap-3">
          <span class="h-px flex-1 bg-[#E5E7EB]"></span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0057D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          <span class="h-px flex-1 bg-[#E5E7EB]"></span>
        </div>
        <div>
          <p class="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
            Solusi
          </p>
          <p class="mt-3 text-[15px] leading-relaxed text-[#4B5563]">${ind.solution}</p>
        </div>
        <div class="mt-8 border-t border-[#F1F2F4] pt-6">
          <p class="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
            Teknologi
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            ${ind.tech.map((t) => `
              <span class="rounded border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#0B1220]">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function setActiveIndustry(idx) {
    const current = industryList[idx];
    if (!current) return;

    tabs.forEach((tab, i) => {
      const isSelected = i === idx;
      tab.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      const arrowSvg = tab.querySelector('.industry-arrow');

      if (isSelected) {
        tab.classList.add('border-[#0057D9]', 'bg-white', 'text-[#0B1220]', 'lg:border-[#E5E7EB]', 'lg:bg-transparent');
        tab.classList.remove('border-[#E5E7EB]', 'text-[#6B7280]');
        if (arrowSvg) {
          arrowSvg.classList.add('translate-x-0', 'text-[#0057D9]', 'opacity-100');
          arrowSvg.classList.remove('-translate-x-1', 'opacity-0');
        }
      } else {
        tab.classList.remove('border-[#0057D9]', 'bg-white', 'text-[#0B1220]');
        tab.classList.add('border-[#E5E7EB]', 'text-[#6B7280]');
        if (arrowSvg) {
          arrowSvg.classList.remove('translate-x-0', 'text-[#0057D9]', 'opacity-100');
          arrowSvg.classList.add('-translate-x-1', 'opacity-0');
        }
      }
    });

    renderIndustry(current);
  }

  tabs.forEach((tab) => {
    const idx = parseInt(tab.getAttribute('data-industry-index'), 10);
    tab.addEventListener('click', () => setActiveIndustry(idx));
  });

  setActiveIndustry(0);
}

/* -------------------------------------------------------------
 * 5. Scroll Reveal Animation using IntersectionObserver
 * ----------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-item');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => {
      el.classList.remove('opacity-0', 'translate-y-6');
      el.classList.add('opacity-100', 'translate-y-0');
    });
  }
}
