import { Reveal } from "./Reveal";

const points = [
  {
    id: "01",
    title: "Understand the Business",
    desc: "Kami memahami kebutuhan terlebih dahulu, sebelum memilih teknologi.",
  },
  {
    id: "02",
    title: "Product + Custom",
    desc: "Tidak semua masalah bisnis perlu dibangun dari nol.",
  },
  {
    id: "03",
    title: "End-to-End",
    desc: "Dari konsultasi, implementasi, hingga pendampingan berkelanjutan.",
  },
  {
    id: "04",
    title: "Built for Growth",
    desc: "Solusi dirancang untuk berkembang bersama bisnis Anda.",
  },
];

export const WhySwa = () => (
  <section id="tentang" className="border-t border-[#E5E7EB] bg-[#0B1220] text-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#6EA8FF]">
              Mengapa SWA
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[3.4rem] lg:leading-[1.1]">
              Teknologi Dimulai dari Memahami Bisnis<span className="text-[#6EA8FF]">.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#9CA3AF]">
              Kami bukan penjual produk. Kami adalah partner yang memastikan setiap
              investasi teknologi Anda berdampak nyata pada bisnis.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <div className="border-t border-white/10 py-8 sm:pr-10">
                  <p className="mono-accent text-xs tracking-[0.25em] text-[#6EA8FF]">{p.id}</p>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
