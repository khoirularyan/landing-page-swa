import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const stories = [
  {
    client: "Kopi Karsa Nusantara",
    industry: "F&B Multi-Outlet",
    challenge:
      "Belasan outlet berjalan dengan sistem kasir lama yang sering bermasalah, dan laporan stok baru tersedia berhari-hari kemudian.",
    solution:
      "SWA menerapkan RichzFNB dan RichzSPOT secara terpusat, sehingga setiap outlet terhubung dalam satu sistem.",
    result:
      "Laporan penjualan kini tersedia real-time, pemakaian bahan baku lebih terkendali, dan transaksi di kasir berjalan lebih cepat.",
  },
  {
    client: "PT Medika Jaya Distribusi",
    industry: "Distribusi & Logistik",
    challenge:
      "Pemesanan oleh tim penjualan lapangan masih berjalan lewat pesan singkat tanpa validasi stok gudang secara langsung.",
    solution:
      "SWA membangun aplikasi penjualan mobile kustom yang terintegrasi langsung dengan sistem pergudangan pusat.",
    result:
      "Proses pemesanan yang sebelumnya memakan waktu berjam-jam kini selesai dalam hitungan menit, dengan kesalahan pengiriman yang jauh berkurang.",
  },
  {
    client: "Aruna Living",
    industry: "Retail & E-Commerce",
    challenge:
      "Stok toko fisik dan toko online tercatat terpisah, sehingga produk sering terjual ganda dan mengecewakan pelanggan.",
    solution:
      "SWA mengintegrasikan RichzPOS dan RichzStore dalam satu alur omnichannel dengan satu sumber data stok.",
    result:
      "Persediaan tersinkron di semua kanal dan pelanggan dapat berbelanja lintas kanal tanpa kendala.",
  },
];

export const Stories = () => (
  <section id="customer" className="bg-white">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
              Customer Stories
            </p>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
              Solusi yang Digunakan di Dunia Nyata.
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-[#9CA3AF]">
            Nama dan detail berikut adalah data ilustratif untuk menggambarkan cara
            kerja kami.
          </p>
        </div>
      </Reveal>

      <div className="mt-14">
        {stories.map((s, i) => (
          <Reveal key={s.client} delay={i * 80}>
            <article
              data-testid={`customer-story-card-${i}`}
              className="grid gap-8 border-t border-[#E5E7EB] py-12 last:border-b lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#9CA3AF]">
                  {String(i + 1).padStart(2, "0")} — {s.industry}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0B1220]">
                  {s.client}
                </h3>
                <span className="mt-4 inline-block rounded-full border border-[#E5E7EB] px-3 py-1 text-[10.5px] font-medium text-[#6B7280]">
                  Studi kasus ilustratif
                </span>
              </div>
              <div className="grid gap-8 md:grid-cols-3 lg:col-span-8">
                {[
                  { label: "Tantangan", text: s.challenge },
                  { label: "Solusi", text: s.solution },
                  { label: "Hasil", text: s.result },
                ].map((b, bi) => (
                  <div key={b.label} className="relative">
                    <p
                      className={`mono-accent text-[10px] uppercase tracking-[0.25em] ${
                        bi === 2 ? "text-[#0057D9]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {b.label}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{b.text}</p>
                    {bi < 2 && (
                      <ArrowRight className="absolute -right-5 top-0 hidden h-4 w-4 text-[#E5E7EB] md:block" />
                    )}
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
