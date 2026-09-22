import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const capabilities = [
  {
    id: "01",
    title: "Business Process Analysis",
    desc: "Memetakan alur kerja dan menemukan titik yang perlu diperbaiki.",
  },
  {
    id: "02",
    title: "Custom Development",
    desc: "Membangun sistem yang dirancang khusus untuk kebutuhan Anda.",
  },
  {
    id: "03",
    title: "System Integration",
    desc: "Menghubungkan sistem yang terpisah menjadi satu alur data.",
  },
  {
    id: "04",
    title: "Digital Transformation",
    desc: "Mendampingi transisi bisnis ke operasional yang digital.",
  },
];

const flow = ["Business", "Process", "Technology", "Integration", "Outcome"];

export const CustomSolution = () => (
  <section className="bg-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
              Custom Digital Solution
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
              Butuh Lebih dari Solusi Siap Pakai?
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#4B5563]">
              Setiap bisnis memiliki proses dan kebutuhan yang berbeda. Kami membantu
              menerjemahkan kebutuhan tersebut menjadi solusi digital — dirancang,
              dibangun, dan diterapkan sesuai konteks bisnis Anda.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {flow.map((f, i) => (
                <span key={f} className="flex items-center gap-2">
                  <span className="rounded border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#4B5563]">
                    {f}
                  </span>
                  {i < flow.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-[#0057D9]" />}
                </span>
              ))}
            </div>
            <a
              href="#kontak"
              data-testid="custom-solution-cta"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-md border border-[#0B1220] px-7 py-3.5 text-sm font-semibold text-[#0B1220] transition-colors duration-300 hover:bg-[#0B1220] hover:text-white"
            >
              Diskusikan Kebutuhan Anda
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          {capabilities.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <div className="flex gap-6 border-t border-[#E5E7EB] py-7 last:border-b">
                <span className="mono-accent pt-1 text-xs tracking-[0.2em] text-[#0057D9]">{c.id}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-[#0B1220] sm:text-xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
