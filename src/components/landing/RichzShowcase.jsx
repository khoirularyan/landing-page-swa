import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const products = [
  {
    id: "richzpos",
    name: "RichzPOS",
    badge: "Retail & Point of Sale",
    desc: "Kasir pintar dengan kontrol inventaris terpadu dan pencatatan transaksi yang presisi.",
    features: ["Transaksi cepat & akurat", "Manajemen stok terpadu", "Laporan penjualan real-time"],
    variant: "pos",
  },
  {
    id: "richzstore",
    name: "RichzStore",
    badge: "E-Commerce",
    desc: "Toko digital yang terintegrasi langsung dengan stok gudang dan sistem pembayaran.",
    features: ["Toko online siap pakai", "Sinkron dengan stok offline", "Pembayaran digital terintegrasi"],
    variant: "store",
  },
  {
    id: "richzfnb",
    name: "RichzFNB",
    badge: "Food & Beverage",
    desc: "Manajemen restoran modern: pemesanan digital, kitchen display, dan kontrol bahan baku.",
    features: ["Pemesanan digital di meja", "Kitchen display system", "Manajemen bahan & resep"],
    variant: "fnb",
  },
  {
    id: "richzspot",
    name: "RichzSPOT",
    badge: "Attendance & Workforce",
    desc: "Pemantauan presensi dan performa tim lintas cabang secara real-time.",
    features: ["Presensi digital", "Pantauan multi-cabang", "Analisis performa tim"],
    variant: "spot",
  },
];

const MockScreen = ({ variant, name }) => (
  <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_16px_50px_rgba(11,18,32,0.08)]">
    <div className="flex items-center gap-2 border-b border-[#F1F2F4] px-4 py-2.5">
      <span className="h-2 w-2 rounded-full bg-[#E5E7EB]" />
      <span className="h-2 w-2 rounded-full bg-[#E5E7EB]" />
      <span className="h-2 w-2 rounded-full bg-[#0057D9]" />
      <span className="ml-2 mono-accent text-[9px] uppercase tracking-[0.2em] text-[#9CA3AF]">{name}</span>
    </div>
    <div className="p-4">
      {variant === "pos" && (
        <div className="space-y-2.5">
          {[["Kopi Susu Gula Aren", "22.000"], ["Croissant Butter", "18.000"], ["Es Teh Melati", "12.000"]].map(([n, p]) => (
            <div key={n} className="flex items-center justify-between rounded border border-[#F1F2F4] px-3 py-2">
              <span className="text-[11px] text-[#4B5563]">{n}</span>
              <span className="mono-accent text-[10px] text-[#0B1220]">{p}</span>
            </div>
          ))}
          <div className="flex items-center justify-between rounded bg-[#0057D9] px-3 py-2.5">
            <span className="text-[11px] font-semibold text-white">Total Transaksi</span>
            <span className="mono-accent text-[11px] font-bold text-white">52.000</span>
          </div>
        </div>
      )}
      {variant === "store" && (
        <div className="grid grid-cols-3 gap-2.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded border border-[#F1F2F4] p-2">
              <div className={`h-10 rounded-sm ${i === 0 ? "bg-[#0057D9]/15" : "bg-[#F1F2F4]"}`} />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-[#E5E7EB]" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#F1F2F4]" />
            </div>
          ))}
        </div>
      )}
      {variant === "fnb" && (
        <div className="grid grid-cols-3 gap-2.5">
          {["Baru", "Dimasak", "Siap"].map((col, ci) => (
            <div key={col}>
              <p className="mono-accent mb-2 text-[8.5px] uppercase tracking-[0.15em] text-[#9CA3AF]">{col}</p>
              <div className="space-y-2">
                {[0, 1].slice(0, ci === 2 ? 1 : 2).map((i) => (
                  <div key={i} className={`rounded border p-2 ${ci === 2 ? "border-[#0057D9]/40 bg-[#0057D9]/5" : "border-[#F1F2F4]"}`}>
                    <div className="h-1.5 w-2/3 rounded-full bg-[#E5E7EB]" />
                    <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-[#F1F2F4]" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {variant === "spot" && (
        <div>
          <div className="flex h-20 items-end gap-2">
            {[42, 66, 50, 84, 58, 74, 92].map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
                style={{ height: `${h}%`, backgroundColor: i === 6 ? "#0057D9" : "#E5E7EB" }}
              />
            ))}
          </div>
          <div className="mt-3 space-y-2">
            {["Cabang Jakarta", "Cabang Surabaya"].map((b) => (
              <div key={b} className="flex items-center justify-between">
                <span className="text-[10.5px] text-[#4B5563]">{b}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#0B1220]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0057D9]" />
                  Online
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const RichzShowcase = () => {
  const [active, setActive] = useState(0);
  const current = products[active];

  return (
    <section id="produk" className="border-t border-[#E5E7EB] bg-[#F7F8FA]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mono-accent text-xs font-medium uppercase tracking-[0.3em] text-[#0057D9]">
                Richz Ecosystem
              </p>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl lg:text-5xl">
                Untuk Kebutuhan yang Sudah Siap, Ada Richz.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#4B5563]">
                Ekosistem solusi digital siap digunakan untuk membantu berbagai
                kebutuhan bisnis.
              </p>
            </Reveal>
            <div className="mt-10">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  data-testid={`richz-tab-${p.id}`}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`group flex w-full items-center justify-between border-t border-[#E5E7EB] py-5 text-left transition-colors duration-300 last:border-b ${
                    active === i ? "text-[#0057D9]" : "text-[#9CA3AF] hover:text-[#0B1220]"
                  }`}
                >
                  <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">{p.name}</span>
                  <span className="flex items-center gap-3">
                    <span
                      className={`text-xs transition-colors duration-300 ${
                        active === i ? "text-[#4B5563]" : "text-[#9CA3AF]"
                      }`}
                    >
                      {p.badge}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition-all duration-300 ${
                        active === i ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div key={current.id} data-testid="richz-showcase-panel" className="panel-in lg:sticky lg:top-28">
                <MockScreen variant={current.variant} name={current.name} />
                <div className="mt-8">
                  <p className="mono-accent text-[10px] uppercase tracking-[0.25em] text-[#0057D9]">
                    {current.badge}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0B1220]">
                    {current.name}
                  </h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#4B5563]">{current.desc}</p>
                  <ul className="mt-6 space-y-3">
                    {current.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-medium text-[#0B1220]">
                        <Check className="h-4 w-4 text-[#0057D9]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
