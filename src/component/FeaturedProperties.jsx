"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/properties");
        const data = await res.json();

        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Featured Properties
        </h2>

        <Link href="/properties" className="text-sm text-sky-600 hover:underline">
          View all
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="mt-6 text-slate-500">Loading properties...</p>
      )}

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 12).map((p) => (
          <article
            key={p._id}
            className="overflow-hidden rounded-xl bg-white shadow-md"
          >
            <div className="relative h-44">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {p.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                📍 {p.location}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900">
                  ৳{p.price}/month
                </div>

                <Link
                  href={`/property/${p._id}`}
                  className="text-sm text-sky-600 hover:underline"
                >
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