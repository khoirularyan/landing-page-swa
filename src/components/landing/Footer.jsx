import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const nav = [
  { label: "Produk", href: "#produk" },
  { label: "Solusi", href: "#solusi" },
  { label: "Industri", href: "#industri" },
  { label: "Customer", href: "#customer" },
  { label: "Insight", href: "#insight" },
  { label: "Tentang SWA", href: "#tentang" },
];

const solutions = ["RichzPOS", "RichzStore", "RichzFNB", "RichzSPOT", "Custom Solution"];

export const Footer = () => (
  <footer className="bg-[#0B1220] text-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0057D9] font-display text-sm font-bold text-white">
              S
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-bold tracking-tight">SWA</span>
              <span className="mt-1 block mono-accent text-[8.5px] tracking-[0.3em] text-[#9CA3AF]">
                DIGITAL SOLUSINDO
              </span>
            </span>
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#9CA3AF]">
            Digital Solution Partner yang membantu bisnis menemukan dan membangun
            solusi digital yang tepat — dari solusi siap pakai hingga custom
            development.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#top"
              aria-label="LinkedIn SWA"
              data-testid="footer-social-linkedin"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-[#9CA3AF] transition-colors duration-300 hover:border-[#0057D9] hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#top"
              aria-label="Instagram SWA"
              data-testid="footer-social-instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-[#9CA3AF] transition-colors duration-300 hover:border-[#0057D9] hover:text-white"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">Navigasi</p>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">Solusi</p>
          <ul className="mt-5 space-y-3">
            {solutions.map((s) => (
              <li key={s}>
                <a
                  href={s === "Custom Solution" ? "#solusi" : "#produk"}
                  className="text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-white"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">Kontak</p>
          <ul className="mt-5 space-y-4 text-sm text-[#9CA3AF]">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#6EA8FF]" />
              <a href="mailto:hello@swadigital.id" className="transition-colors duration-300 hover:text-white">
                hello@swadigital.id
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#6EA8FF]" />
              <span>+62 21 0000 0000</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6EA8FF]" />
              <span>Jakarta, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
        <p data-testid="footer-copyright-text" className="text-xs text-[#6B7280]">
          © 2026 PT SWA Digital Solusindo. Seluruh hak cipta dilindungi.
        </p>
        <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
          Business First, Technology Second
        </p>
      </div>
    </div>
  </footer>
);
