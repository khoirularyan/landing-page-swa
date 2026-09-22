import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const industries = [
  {
    id: "retail",
    name: "Retail",
    challenge: "Variasi produk yang tinggi dan persediaan yang tidak sinkron antara toko fisik dan gudang.",
    solution: "Manajemen stok terpusat dengan pencatatan transaksi otomatis dan visibilitas persediaan real-time.",
    tech: ["RichzPOS", "Cloud Inventory", "Laporan Real-time"],
  },
  {
    id: "fnb",
    name: "F&B",
    challenge: "Penyajian pesanan lambat di jam sibuk dan pemakaian bahan baku yang sulit dilacak.",
    solution: "Alur pesanan digital dari meja ke dapur, lengkap dengan kontrol bahan dan resep.",
    tech: ["RichzFNB", "Kitchen Display", "Kontrol Bahan Baku"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    challenge: "Data pasien tersebar dan alur pendaftaran hingga layanan belum terorganisir.",
    solution: "Sistem manajemen klinik terpadu — dari pendaftaran, rekam data, hingga inventaris.",
    tech: ["Sistem Kustom", "Manajemen Antrean", "Integrasi Data"],
  },
  {
    id: "education",
    name: "Education",
    challenge: "Administrasi pembayaran dan rekapitulasi akademik masih dikerjakan manual.",
    solution: "Portal akademik terintegrasi dengan pembayaran digital dan laporan otomatis.",
    tech: ["Portal Kustom", "Payment Gateway", "Laporan Otomatis"],
  },
  {
    id: "distribution",
    name: "Distribution",
    challenge: "Pesanan tim lapangan dan pencatatan piutang berjalan tanpa validasi stok pusat.",
    solution: "Aplikasi penjualan lapangan yang terhubung langsung ke sistem gudang pusat.",
    tech: ["Aplikasi Mobile Kustom", "Integrasi ERP", "Validasi Real-time"],
  },
  {
    id: "corporate",
    name: "Corporate",
    challenge: "Proses persetujuan internal lambat dan data antar departemen tidak terhubung.",
    solution: "Otomasi alur kerja digital dengan hak akses berjenjang dan jejak audit yang jelas.",
    tech: ["Workflow Kustom", "System Integration", "Dashboard Manajemen"],
  },
];

export const Industries = () => {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section id="industri" className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
            Industri
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
            Setiap Industri Punya Tantangan Berbeda.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {industries.map((ind, i) => (
                <button
                  key={ind.id}
                  type="button"
                  data-testid={`industry-selector-tab-${ind.id}`}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-t lg:border-[#E5E7EB] lg:px-0 lg:py-5 lg:text-left lg:last:border-b ${
                    active === i
                      ? "border-[#0057D9] bg-white text-[#0B1220] lg:border-[#E5E7EB] lg:bg-transparent"
                      : "border-[#E5E7EB] text-[#6B7280] hover:text-[#0B1220] lg:border-[#E5E7EB]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-sm font-semibold tracking-tight lg:text-2xl">
                      {ind.name}
                    </span>
                    <ArrowRight
                      className={`hidden h-4 w-4 transition-all duration-300 lg:block ${
                        active === i ? "translate-x-0 text-[#0057D9] opacity-100" : "-translate-x-1 opacity-0"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div
              key={current.id}
              data-testid="industry-detail-panel"
              className="panel-in rounded-xl border border-[#E5E7EB] bg-white p-8 lg:p-10"
            >
              <div>
                <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
                  Tantangan
                </p>
                <p className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-[#0B1220] sm:text-xl">
                  {current.challenge}
                </p>
              </div>
              <div className="my-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#E5E7EB]" />
                <ArrowRight className="h-4 w-4 text-[#0057D9]" />
                <span className="h-px flex-1 bg-[#E5E7EB]" />
              </div>
              <div>
                <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
                  Solusi
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">{current.solution}</p>
              </div>
              <div className="mt-8 border-t border-[#F1F2F4] pt-6">
                <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
                  Teknologi
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-[#E5E7EB] px-3 py-1.5 text-xs font-medium text-[#0B1220]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
