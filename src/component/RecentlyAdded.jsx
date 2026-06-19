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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Recently Added</h2>
          <p className="mt-1 text-sm text-slate-500">Newest properties added to the platform — updated daily.</p>
        </div>
        <Link href="/properties" className="text-sm text-indigo-600 hover:underline">View all</Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((it) => (
          <article key={it.id} className="rounded-2xl bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden">
            <div className="relative h-56 w-full">
              <Image src={it.img} alt={it.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute left-3 bottom-3 bg-white/90 rounded-md px-3 py-1 text-sm font-semibold">৳{it.price}/mo</div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">{it.title}</h3>
              <p className="text-sm text-slate-500 mt-1">📍 {it.loc}</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href={`/properties/${it.id}`} className="text-sm text-indigo-600 hover:underline">View details</Link>
                <button className="rounded-md bg-indigo-600 text-white px-3 py-1 text-sm hover:bg-indigo-700">Save</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
