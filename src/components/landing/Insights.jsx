import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

const articles = [
  {
    title: "Kapan Bisnis Membutuhkan Solusi Kustom, Bukan Produk Siap Pakai?",
    category: "Digital Transformation",
    date: "12 Jun 2026",
    read: "5 menit baca",
  },
  {
    title: "Merapikan Proses Bisnis Sebelum Memilih Teknologi",
    category: "Business Process",
    date: "28 Mei 2026",
    read: "4 menit baca",
  },
  {
    title: "System Integration: Menghubungkan Data yang Terpisah",
    category: "Technology",
    date: "09 Apr 2026",
    read: "6 menit baca",
  },
];

export const Insights = () => (
  <section id="insight" className="bg-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
              Insight
            </p>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
              Berpikir Lebih Digital. Bergerak Lebih Strategis.
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="mt-14">
        {articles.map((a, i) => (
          <Reveal key={a.title} delay={i * 80}>
            <a
              href="#insight"
              data-testid={`insight-article-card-${i}`}
              className="group grid items-center gap-4 border-t border-[#E5E7EB] py-8 last:border-b sm:grid-cols-12"
            >
              <span className="mono-accent text-xs tracking-[0.2em] text-[#9CA3AF] sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="sm:col-span-2">
                <span className="inline-block rounded-full border border-[#E5E7EB] px-3 py-1 text-[10.5px] font-medium text-[#4B5563]">
                  {a.category}
                </span>
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-[#0B1220] transition-colors duration-300 group-hover:text-[#0057D9] sm:col-span-7 sm:text-xl">
                {a.title}
              </span>
              <span className="flex items-center justify-between gap-4 sm:col-span-2 sm:justify-end">
                <span className="text-xs text-[#9CA3AF]">
                  {a.date} · {a.read}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#9CA3AF] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0057D9]" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
