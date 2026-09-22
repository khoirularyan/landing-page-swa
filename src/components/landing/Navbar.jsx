import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Produk", href: "#produk", testid: "navbar-link-produk" },
  { label: "Solusi", href: "#solusi", testid: "navbar-link-solusi" },
  { label: "Industri", href: "#industri", testid: "navbar-link-industri" },
  { label: "Customer", href: "#customer", testid: "navbar-link-customer" },
  { label: "Insight", href: "#insight", testid: "navbar-link-insight" },
  { label: "Tentang SWA", href: "#tentang", testid: "navbar-link-tentang" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <a href="#top" data-testid="navbar-brand-logo" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0057D9] font-display text-sm font-bold text-white">
            S
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] font-bold tracking-tight text-[#0B1220]">SWA</span>
            <span className="mt-1 block mono-accent text-[8.5px] tracking-[0.3em] text-[#6B7280]">
              DIGITAL SOLUSINDO
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={l.testid}
              className="text-[13.5px] font-medium text-[#4B5563] transition-colors duration-300 hover:text-[#0B1220]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#kontak"
            data-testid="navbar-cta-konsultasi"
            className="group hidden items-center gap-2 rounded-md bg-[#0057D9] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#0046B3] sm:inline-flex"
          >
            Konsultasi
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            data-testid="navbar-mobile-toggle"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5E7EB] text-[#0B1220] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#E5E7EB] bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4" aria-label="Navigasi mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`${l.testid}-mobile`}
                onClick={() => setOpen(false)}
                className="border-b border-[#F1F2F4] py-3.5 text-[15px] font-medium text-[#0B1220] last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#kontak"
              data-testid="navbar-cta-konsultasi-mobile"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#0057D9] px-5 py-3 text-sm font-semibold text-white"
            >
              Konsultasi
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
