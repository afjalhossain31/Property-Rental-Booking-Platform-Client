"use client";

import Image from "next/image";
import Link from "next/link";

const sampleProperties = [
  {
    id: "p1",
    title: "Luxury Apartment",
    location: "Dhaka, Bangladesh",
    price: "15,000",
    image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80",
  },
  {
    id: "p2",
    title: "Lake View Apartment",
    location: "Dhaka",
    price: "18,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  },
  {
    id: "p3",
    title: "Elite Villa",
    location: "Cox's Bazar",
    price: "35,000",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
  },
  {
    id: "p4",
    title: "Classic House",
    location: "Cumilla",
    price: "17,000",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
  },
  {
    id: "p5",
    title: "Corporate Office Space",
    location: "Dhaka",
    price: "50,000",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
  },
  {
    id: "p6",
    title: "Sunrise Apartment",
    location: "Chattogram",
    price: "16,000",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Featured Properties</h2>
        <Link href="/properties" className="text-sm text-sky-600 hover:underline">
          View all
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProperties.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-xl bg-white shadow-md">
            <div className="relative h-44">
              <Image src={p.image} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-500">📍 {p.location}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900">৳{p.price}/month</div>
                <Link href={`/property/${p.id}`} className="text-sm text-sky-600 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
