"use client";

import ShieldCheck from "@gravity-ui/icons/ShieldCheck";
import Lock from "@gravity-ui/icons/Lock";
import LayoutCellsLarge from "@gravity-ui/icons/LayoutCellsLarge";
import PersonWorker from "@gravity-ui/icons/PersonWorker";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Listings",
    description: "Handpicked properties with thoroughly checked and verified details.",
    icon: <ShieldCheck className="h-6 w-6 text-sky-600 transition-colors group-hover:text-sky-500" />,
  },
  {
    title: "Secure Booking",
    description: "Safe multi-tier payments backed by transparent escrow booking policies.",
    icon: <Lock className="h-6 w-6 text-cyan-600 transition-colors group-hover:text-cyan-500" />,
  },
  {
    title: "Easy Management",
    description: "Instantly organize your favorites, rentals, and messages in one dashboard.",
    icon: <LayoutCellsLarge className="h-6 w-6 text-blue-600 transition-colors group-hover:text-blue-500" />,
  },
  {
    title: "24/7 Premium Support",
    description: "A professional support crew available around the clock for any inquiry.",
    icon: <PersonWorker className="h-6 w-6 text-indigo-600 transition-colors group-hover:text-indigo-500" />,
  },
];

export default function WhyChooseUs() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    // উপরের প্যাডিং কমানো হয়েছে (pt-5 lg:pt-16)
    <section className="relative overflow-hidden bg-white pt-5 pb-20 lg:pt-16 lg:pb-32">
      {/* Background Decorative Blurs */}
      <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
        >
          <span className="mb-4 inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Our Guarantee
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-800 bg-clip-text text-transparent">
              Our Property Rental Platform?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-slate-600">
            Trusted listings, secure bookings, and dedicated support — built to
            make finding your next home simple and delightful.
          </p>
        </motion.div>

        {/* Animated Grid Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, idx) => (
            <motion.div
              variants={cardVariants}
              key={idx}
              className="group relative flex flex-col items-start rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(14,165,233,0.08)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-sky-100 group-hover:bg-sky-50">
                {feature.icon}
              </div>

              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className="text-base font-bold tracking-wide text-slate-900 transition-colors duration-200 group-hover:text-sky-600">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}