import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const FinalCta = () => (
  <section id="kontak" className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
    <div className="mx-auto w-full max-w-7xl px-6 py-24 text-center sm:px-8 lg:px-12 lg:py-40">
      <Reveal>
        <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
          Mulai Percakapan
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-[#0B1220] sm:text-4xl lg:text-6xl">
          Belum Tahu Solusi yang Tepat untuk Bisnis Anda?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#4B5563]">
          Ceritakan kebutuhan Anda. Kami bantu menemukan solusinya.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <a
            href="mailto:hello@swadigital.id"
            data-testid="final-cta-button"
            className="group inline-flex items-center gap-2.5 rounded-md bg-[#0057D9] px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0046B3]"
          >
            Konsultasi dengan SWA
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#produk"
            data-testid="final-cta-secondary"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0B1220]"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-[#0B1220]">
              Lihat Produk Richz
            </span>
            <ArrowRight className="h-4 w-4 text-[#0057D9] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);
