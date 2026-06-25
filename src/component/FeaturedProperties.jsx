"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const authStatus = window.localStorage.getItem("staynest-auth") === "true";
        if (authStatus) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Local storage error:", error);
      }
    }

    // 2. API Fetching
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/properties");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        if (Array.isArray(data)) {
          const approvedProperties = data
            .filter((p) => p.status?.toLowerCase() === "approved")
            .slice(0, 6);
          setProperties(approvedProperties);
        }
      } catch (error) {
        console.error("Error loading featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 pt-7 pb-16 sm:pt-12 sm:pb-24">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between"
        >
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
        </motion.div>

        {/* Loading state with animation */}
        {loading && (
          <div className="flex h-40 items-center justify-center">
            <p className="animate-pulse text-lg font-medium text-slate-500">
              Loading properties...
            </p>
          </div>
        )}

        {/* Grid Container with Framer Motion */}
        {!loading && properties.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {properties.map((p) => (
              <motion.article
                variants={cardVariants}
                key={p._id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/50"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/20" />

                  {p.status && (
                    <div className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
                      {p.status}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-white">
                    ৳{p.price?.toLocaleString()}/month
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{p.location}</p>
                    </div>

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
                      href={isLoggedIn ? `/properties/${p._id}` : "/login"}
                      className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Empty State / Fallback */}
        {!loading && properties.length === 0 && (
          <div className="flex h-40 items-center justify-center">
            <p className="text-slate-500">No featured properties available right now.</p>
          </div>
        )}

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