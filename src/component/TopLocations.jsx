"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TopLocations() {
  const locations = [
    { id: 'l1', name: 'Dhaka', count: 1240, color: 'from-blue-500 to-sky-400' },
    { id: 'l2', name: 'Chattogram', count: 520, color: 'from-emerald-500 to-teal-400' },
    { id: 'l3', name: 'Cox\'s Bazar', count: 210, color: 'from-orange-500 to-amber-400' },
    { id: 'l4', name: 'Sylhet', count: 180, color: 'from-purple-500 to-indigo-400' },
  ];

  // পুরো গ্রিডটির জন্য অ্যানিমেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // একটির পর একটি কার্ড আসবে
    },
  };

  // প্রতিটি কার্ড বাম থেকে ডানে আসবে
  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-5 sm:pt-8 sm:pb-24">
        
        {/* Header Section */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Top Locations
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Explore properties in our most popular cities.
            </p>
          </div>
          
          <Link 
            href="/properties" 
            className="hidden text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline sm:block"
          >
            Browse all &rarr;
          </Link>
        </div>

        {/* Animated Grid Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
        >
          {locations.map((loc) => (
            <motion.div key={loc.id} variants={cardVariants}>
              <Link 
                href={`/properties?location=${loc.name}`} 
                className="group relative flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-100/50 block"
              >
                {/* Premium Gradient Letter Icon */}
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${loc.color} text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  {loc.name.charAt(0)}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-600">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {loc.count} properties
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View 'Browse all' Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link 
            href="/properties" 
            className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
          >
            Browse all locations &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}