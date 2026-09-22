import { ArrowRight, ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";

const richz = ["RichzPOS", "RichzStore", "RichzFNB", "RichzSPOT"];
const customFlow = ["Business Process", "System", "Integration", "Dashboard"];

export const TwoWays = () => (
  <section className="border-t border-[#E5E7EB] bg-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
          Dua Pendekatan
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
          Satu Partner. Dua Cara Menyelesaikan Kebutuhan Digital.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div
            data-testid="two-ways-richz-tab"
            className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-8 lg:p-12"
          >
            <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#0057D9]">
              01 — Ready Solution
            </p>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#0B1220] sm:text-3xl">
              Solusi Siap Digunakan
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#4B5563]">
              Pilih solusi digital yang sudah siap membantu kebutuhan bisnis Anda —
              teruji, cepat diterapkan, dan langsung bekerja.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {richz.map((r) => (
                <a
                  key={r}
                  href="#produk"
                  data-testid={`two-ways-chip-${r.toLowerCase()}`}
                  className="group flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 py-3.5 transition-colors duration-300 hover:border-[#0057D9]"
                >
                  <span className="font-display text-sm font-semibold text-[#0B1220]">{r}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#9CA3AF] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0057D9]" />
                </a>
              ))}
            </div>
            <a
              href="#produk"
              data-testid="two-ways-richz-cta"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1220]"
            >
              <span className="border-b border-[#0B1220] pb-0.5">Explore Richz</span>
              <ArrowRight className="h-4 w-4 text-[#0057D9] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            data-testid="two-ways-custom-tab"
            className="flex h-full flex-col rounded-2xl bg-[#0B1220] p-8 text-white lg:p-12"
          >
            <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6EA8FF]">
              02 — Custom Solution
            </p>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Solusi yang Disesuaikan
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#9CA3AF]">
              Ketika kebutuhan bisnis Anda lebih spesifik, kami membantu merancang
              solusi yang sesuai — dari proses hingga integrasi.
            </p>
            <div className="mt-10 space-y-0">
              {customFlow.map((f, i) => (
                <div key={f}>
                  <div className="flex items-center gap-4">
                    <span className="h-2 w-2 rounded-full border border-[#6EA8FF] bg-transparent" />
                    <span className="text-sm font-medium text-white/90">{f}</span>
                  </div>
                  {i < customFlow.length - 1 && (
                    <div className="flex h-6 items-center pl-[3.5px]">
                      <span className="h-full w-px bg-white/15" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <a
              href="#kontak"
              data-testid="two-ways-custom-cta"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              <span className="border-b border-white/40 pb-0.5 transition-colors duration-300 group-hover:border-white">
                Konsultasikan Kebutuhan
              </span>
              <ArrowRight className="h-4 w-4 text-[#6EA8FF] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
