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
    <section className="bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        
        {/* Header Section */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Handpicked premium stays for your next move.
            </p>
          </div>

          <Link 
            href="/properties" 
            className="hidden text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        {/* Loading state with animation */}
        {loading && (
          <div className="flex h-40 items-center justify-center">
            <p className="animate-pulse text-lg font-medium text-slate-500">
              Loading properties...
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 12).map((p) => (
            <article
              key={p._id}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/50"
            >
              <div className="relative h-56 w-full overflow-hidden">
                {/* Image with smooth zoom effect */}
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                
                {/* Base Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                
                {/* Premium Dark Tint that appears on Hover */}
                <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/20" />

                {/* Status Badge */}
                {p.status && (
                  <div className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
                    {p.status}
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-white">
                  ৳{p.price?.toLocaleString()}/month
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {/* Title changes color on hover */}
                    <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{p.location}</p>
                  </div>
                  
                  {/* Property Type Badge */}
                  {p.type && (
                    <span className="whitespace-nowrap rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                      {p.type}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                    <span>{p.beds || 0} beds</span>
                    <span>{p.baths || 0} baths</span>
                  </div>

                  <Link
                    href={`/property/${p._id}`}
                    className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View 'View all' Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link 
            href="/properties" 
            className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
          >
            View all properties &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}