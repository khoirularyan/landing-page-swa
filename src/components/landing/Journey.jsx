import { Reveal } from "./Reveal";

const steps = [
  { step: "01", name: "Understand", desc: "Memahami bisnis dan permasalahan yang Anda hadapi." },
  { step: "02", name: "Analyze", desc: "Menganalisis proses dan kebutuhan secara mendalam." },
  { step: "03", name: "Recommend", desc: "Menentukan solusi yang paling tepat untuk bisnis Anda." },
  { step: "04", name: "Implement", desc: "Membangun dan menerapkan solusi hingga berjalan." },
  { step: "05", name: "Improve", desc: "Mengembangkan solusi sesuai kebutuhan yang berubah." },
];

export const Journey = () => (
  <section className="bg-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
              Cara Kami Bekerja
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
              Kami Mulai dari Kebutuhan, Bukan Teknologi.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-7 lg:justify-end">
            <p className="max-w-md text-base leading-relaxed text-[#4B5563]">
              Kami memahami bisnis terlebih dahulu, kemudian menentukan teknologi
              yang tepat — bukan sebaliknya.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="relative mt-16">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E5E7EB] lg:hidden" />
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-[#E5E7EB] lg:block" />
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 110}>
              <div data-testid={`journey-step-${s.step}`} className="relative flex gap-6 pl-1 lg:block lg:pl-0">
                <span className="relative z-10 mt-1 block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#0057D9] bg-white lg:mb-8 lg:mt-0" />
                <div>
                  <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
                    Langkah {s.step}
                  </p>
                  <h3 className="mt-2.5 font-display text-lg font-semibold tracking-tight text-[#0B1220]">
                    {s.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
