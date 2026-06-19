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
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32 border-t border-slate-100">
      {/* Decorative Blur Ambient Background Elements */}
      <div className="absolute top-12 right-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-12 left-1/4 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            What Our Tenants Say About{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-600 via-sky-500 to-blue-600">
              StayNest
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-medium">
            Read authentic stories from verified tenants who found their perfect spaces with us.
          </p>
        </div>

        {/* Dynamic Reviews Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_12px_30px_rgba(14,165,233,0.08)]"
            >
              <div>
                {/* 5-Star Rating Row */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarFill key={i} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed text-slate-600 font-medium italic">
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}