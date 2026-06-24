"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecentlyAdded() {
  const [properties, setProperties] = useState([]);
  const userEmail = "tenant@example.com"; // এটি ডাইনামিক Auth থেকে আসা উচিত

  useEffect(() => {
    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data.slice(0, 3)));
  }, []);

  // Save ফাংশন - যা ডাটাবেসের favorites কালেকশনে পাঠাবে
  const handleSave = async (property) => {
    const favoriteData = {
      propertyId: property._id,
      title: property.title,
      image: property.image,
      price: property.price,
      userEmail: userEmail,
    };

    try {
      const res = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteData),
      });
      const data = await res.json();
      if (data.insertedId) {
        alert("Property saved successfully!");
      } else {
        alert("Property already in favorites.");
      }
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // প্রতিটি কার্ড ০.১৫ সেকেন্ড পর পর আসবে
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-slate-50/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-5 pb-16 sm:pt-12 sm:pb-24">
        
        {/* Animated Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Recently Added
            </h2>
            <p className="mt-2 text-sm text-slate-500">Newest properties added to the platform.</p>
          </div>
          <Link href="/properties" className="hidden text-sm font-semibold text-sky-600 hover:underline sm:block">
            View all &rarr;
          </Link>
        </motion.div>

        {/* Animated Grid for Properties */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {properties.map((it) => (
            <motion.article 
              variants={cardVariants}
              key={it._id} 
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sky-200"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={it.image} 
                  alt={it.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow-md">
                  ৳{it.price?.toLocaleString()}/month
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-600">{it.title}</h3>
                <p className="mt-1 text-sm text-slate-500">📍 {it.location}</p>
                
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <Link 
                    href={`/properties/${it._id}`} 
                    className="text-sm font-semibold text-sky-600 hover:underline hover:text-sky-700"
                  >
                    View details
                  </Link>
                  <button 
                    onClick={() => handleSave(it)}
                    className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}