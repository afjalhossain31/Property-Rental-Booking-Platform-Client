"use client";

import { motion } from "framer-motion";

export default function RentalStatistics() {
  const stats = [
    {
      id: "s1",
      label: "Total Listings",
      value: "3,450",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "s2",
      label: "Cities Covered",
      value: "48",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "s3",
      label: "Happy Tenants",
      value: "12,300+",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: "s4",
      label: "Avg Response Time",
      value: "18 mins",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Framer Motion Variants for Animation
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    // এখানে pt-8 sm:pt-12 ব্যবহার করে উপরের প্যাডিং কমানো হয়েছে
    <section className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
      {/* Subtle Background Glow Effect (Optional, adds premium feel) */}
      <div className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-sky-50/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Animated Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="mb-4 inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Our Impact
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Rental Statistics
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-slate-600">
            Key platform metrics that show our reach and reliability across the country.
          </p>
        </motion.div>

        {/* Animated Grid Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              variants={cardVariants}
              key={s.id}
              className="group flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_12px_30px_rgba(14,165,233,0.1)]"
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-cyan-400 group-hover:text-white group-hover:shadow-sky-200">
                {s.icon}
              </div>
              
              {/* Number/Value */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                {s.value}
              </div>
              
              {/* Label */}
              <div className="mt-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}