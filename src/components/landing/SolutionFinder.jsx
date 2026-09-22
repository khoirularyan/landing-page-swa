import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const problems = [
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

export const SolutionFinder = () => {
  const [active, setActive] = useState(0);
  const current = problems[active];

  return (
    <section id="solusi" className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
            Solution Finder
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
            Apa yang Sedang Ingin Anda Selesaikan?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4B5563]">
            Mulai dari masalah bisnis, bukan dari produk. Pilih tantangan yang paling
            relevan dengan kondisi Anda saat ini.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {problems.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <button
                  type="button"
                  data-testid={`solution-finder-card-prob-${i + 1}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`group flex w-full items-center gap-6 border-t border-[#E5E7EB] py-6 text-left transition-colors duration-300 last:border-b ${
                    active === i ? "text-[#0B1220]" : "text-[#6B7280] hover:text-[#0B1220]"
                  }`}
                >
                  <span
                    className={`mono-accent text-xs tracking-[0.2em] transition-colors duration-300 ${
                      active === i ? "text-[#0057D9]" : "text-[#9CA3AF]"
                    }`}
                  >
                    {p.id}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-semibold tracking-tight sm:text-xl">
                      {p.title}
                    </span>
                    <span
                      className={`mt-1 block text-xs transition-colors duration-300 ${
                        active === i ? "text-[#0057D9]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {p.tag}
                    </span>
                  </span>
                  <ArrowUpRight
                    className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                      active === i ? "translate-x-0 text-[#0057D9] opacity-100" : "-translate-x-1 opacity-0"
                    }`}
                  />
                </button>
                <div className={`lg:hidden ${active === i ? "block" : "hidden"}`}>
                  <div className="mb-6 rounded-lg border border-[#E5E7EB] bg-white p-6">
                    <p className="text-sm leading-relaxed text-[#4B5563]">{p.desc}</p>
                    <ul className="mt-4 space-y-2.5">
                      {p.approach.map((a) => (
                        <li key={a} className="flex items-center gap-3 text-sm text-[#0B1220]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0057D9]" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div
                key={active}
                data-testid="solution-finder-detail"
                className="panel-in rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-[0_10px_40px_rgba(11,18,32,0.05)]"
              >
                <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#0057D9]">
                  {current.id} — {current.tag}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-[#0B1220]">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{current.desc}</p>
                <p className="mt-6 mono-accent text-[10px] uppercase tracking-[0.25em] text-[#6B7280]">
                  Pendekatan yang disarankan
                </p>
                <ul className="mt-4 space-y-3">
                  {current.approach.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-sm font-medium text-[#0B1220]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0057D9]" />
                      {a}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontak"
                  data-testid="solution-finder-cta"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0057D9]"
                >
                  Diskusikan kebutuhan ini
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
