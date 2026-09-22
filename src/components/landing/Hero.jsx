import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const flow = [
  { label: "BUSINESS", note: "Kebutuhan & tujuan bisnis" },
  { label: "DATA", note: "Informasi yang terhubung" },
  { label: "SYSTEM", note: "Teknologi yang tepat" },
  { label: "PEOPLE", note: "Tim yang berdaya" },
  { label: "GROWTH", note: "Pertumbuhan berkelanjutan" },
];

const bars = [38, 62, 46, 78, 55, 90];

const EcosystemVisual = () => (
  <div className="relative mt-14 lg:mt-0 lg:h-[560px]" aria-hidden="true">
    <div className="relative h-full pl-12">
      <div className="absolute bottom-3 left-[15px] top-3 w-px bg-[#E5E7EB]" />
      <div className="absolute bottom-3 left-[15px] top-3 w-px">
        <span className="eco-dot absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#0057D9]" />
      </div>
      <div className="flex h-full flex-col justify-between gap-10 py-1 lg:gap-0">
        {flow.map((f, i) => (
          <div key={f.label} className="flex items-center gap-5">
            <span
              className="node-pulse relative z-10 -ml-12 block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#0057D9] bg-white"
              style={{ animationDelay: `${i * 500}ms` }}
            />
            <div>
              <p className="mono-accent text-[11px] tracking-[0.3em] text-[#0B1220]">{f.label}</p>
              <p className="mt-1 text-xs text-[#6B7280]">{f.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="float-slow absolute right-0 top-0 hidden w-60 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-[0_10px_40px_rgba(11,18,32,0.07)] md:block lg:right-2 lg:top-6">
      <div className="flex items-center justify-between">
        <span className="mono-accent text-[9.5px] tracking-[0.22em] text-[#6B7280]">EKOSISTEM DIGITAL</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#0057D9]" />
      </div>
      <div className="mt-4 flex h-20 items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={i}
            className="grow-bar w-full rounded-sm bg-[#0B1220]"
            style={{ height: `${h}%`, animationDelay: `${300 + i * 120}ms`, opacity: i === bars.length - 1 ? 1 : 0.14 + i * 0.12, backgroundColor: i === bars.length - 1 ? "#0057D9" : "#0B1220" }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#F1F2F4] pt-3">
        <span className="text-[10.5px] text-[#6B7280]">Aktivitas sistem</span>
        <span className="mono-accent text-[10px] text-[#0057D9]">LIVE</span>
      </div>
    </div>

    <div className="float-slower absolute bottom-4 right-6 hidden w-56 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-[0_10px_40px_rgba(11,18,32,0.07)] md:block lg:bottom-10">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0057D9] opacity-40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0057D9]" />
        </span>
        <span className="text-[11px] font-semibold text-[#0B1220]">Sinkronisasi data</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#F1F2F4]">
        <span className="block h-full w-3/4 rounded-full bg-[#0057D9]" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["RichzPOS", "Custom ERP", "Integrasi API"].map((c) => (
          <span key={c} className="rounded border border-[#E5E7EB] px-2 py-1 text-[9.5px] font-medium text-[#4B5563]">
            {c}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const Hero = () => (
  <section id="top" className="relative overflow-hidden pt-[72px]">
    <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
      <div className="grid items-center gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
              Digital Solution Partner
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1
              data-testid="hero-headline"
              className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-tight text-[#0B1220] sm:text-6xl lg:text-[3.85rem]"
            >
              Bisnis Berbeda.
              <br />
              Solusi Tidak Harus&nbsp;Sama<span className="text-[#0057D9]">.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Kami membantu bisnis menemukan solusi digital yang tepat — dari produk
              siap pakai hingga solusi yang dirancang sesuai kebutuhan.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#kontak"
                data-testid="hero-primary-cta"
                className="group inline-flex items-center gap-2.5 rounded-md bg-[#0057D9] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0046B3]"
              >
                Konsultasi dengan SWA
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#solusi"
                data-testid="hero-secondary-cta"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0B1220]"
              >
                <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-[#0B1220]">
                  Lihat Solusi
                </span>
                <ArrowRight className="h-4 w-4 text-[#0057D9] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={250}>
            <EcosystemVisual />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
