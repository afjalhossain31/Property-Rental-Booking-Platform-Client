"use client";

import Image from "next/image";
import Link from "next/link";

const recent = [
  { id: "r1", title: "Green Villa", loc: "Khulna", price: "15,000", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80" },
  { id: "r2", title: "Royal Residence", loc: "Chattogram", price: "18,500", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80" },
  { id: "r3", title: "Modern Family Home", loc: "Rajshahi", price: "22,000", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80" },
];

export default function RecentlyAdded() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-2xl font-bold text-slate-900">Recently Added</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {recent.map((it) => (
          <div key={it.id} className="rounded-xl bg-white/60 p-0 shadow-sm overflow-hidden">
            <div className="relative h-40 w-full">
              <Image src={it.img} alt={it.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-slate-900">{it.title}</h3>
              <p className="text-sm text-slate-500">📍 {it.loc}</p>
              <div className="mt-2 text-sm font-bold">৳{it.price}/month</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
