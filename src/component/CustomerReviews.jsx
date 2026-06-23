"use client";

import { motion } from "framer-motion";
import StarFill from "@gravity-ui/icons/StarFill";
import Person from "@gravity-ui/icons/Person";

const reviews = [
  {
    name: "Arif Rahman",
    role: "Tenant • Gulshan, Dhaka",
    rating: 5,
    comment: "Finding a verified apartment in Gulshan was incredibly seamless. The host was highly professional, and the booking process via StayNest was secure and fully transparent.",
  },
  {
    name: "Tanjina Sultana",
    role: "Tenant • Banani, Dhaka",
    rating: 5,
    comment: "The dashboard management system is outstanding. Saving properties, messaging hosts directly, and organizing my rental history was smooth and stress-free.",
  },
  {
    name: "Naimur Hasan",
    role: "Tenant • GEC, Chattogram",
    rating: 5,
    comment: "Exceptional 24/7 premium support! I faced a minor payment issue during my late-night verification check, and their team resolved it within 10 minutes.",
  },
  {
    name: "Sadia Afrin",
    role: "Tenant • Sylhet Sadar",
    rating: 5,
    comment: "Highly recommended platform. What you see in the pictures is exactly what you get. No hidden charges and complete peace of mind throughout my stay.",
  },
];

export default function CustomerReviews() {
  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // প্রতিটি কার্ড ০.২ সেকেন্ড পর পর আসবে
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
    <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50 py-24 lg:py-32">
      {/* Decorative Blur Ambient Background Elements */}
      <div className="absolute right-1/4 top-12 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-12 left-1/4 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center lg:mb-24"
        >
          <span className="mb-4 inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
            Testimonials
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            What Our Tenants Say About{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              StayNest
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium text-slate-600">
            Read authentic stories from verified tenants who found their perfect spaces with us.
          </p>
        </motion.div>

        {/* Dynamic Reviews Responsive Grid with Framer Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reviews.map((review, idx) => (
            <motion.div
              variants={cardVariants}
              key={idx}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_12px_30px_rgba(14,165,233,0.08)]"
            >
              <div>
                {/* 5-Star Rating Row */}
                <div className="mb-4 flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarFill key={i} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm font-medium italic leading-relaxed text-slate-600">
                  “{review.comment}”
                </p>
              </div>

              {/* User Avatar & Info Row */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/60 bg-slate-50 text-slate-400 transition-colors duration-300 group-hover:border-sky-100 group-hover:bg-sky-50 group-hover:text-sky-600">
                  <Person className="h-4 w-4" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-sky-600">
                    {review.name}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide text-slate-400">
                    {review.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}