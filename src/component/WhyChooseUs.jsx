import ShieldCheck from "@gravity-ui/icons/ShieldCheck";
import Lock from "@gravity-ui/icons/Lock";
import LayoutCellsLarge from "@gravity-ui/icons/LayoutCellsLarge";
import PersonWorker from "@gravity-ui/icons/PersonWorker";

const features = [
  {
    title: "Verified Listings",
    description: "Handpicked properties with thoroughly checked and verified details.",
    icon: <ShieldCheck className="h-6 w-6 text-sky-600 group-hover:text-sky-500" />,
  },
  {
    title: "Secure Booking",
    description: "Safe multi-tier payments backed by transparent escrow booking policies.",
    icon: <Lock className="h-6 w-6 text-cyan-600 group-hover:text-cyan-500" />,
  },
  {
    title: "Easy Management",
    description: "Instantly organize your favorites, rentals, and messages in one dashboard.",
    icon: <LayoutCellsLarge className="h-6 w-6 text-blue-600 group-hover:text-blue-500" />,
  },
  {
    title: "24/7 Premium Support",
    description: "A professional support crew available around the clock for any inquiry.",
    icon: <PersonWorker className="h-6 w-6 text-indigo-600 group-hover:text-indigo-500" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-22">
          <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-4">
            Our Guarantee
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-600 via-sky-500 to-blue-800">
              Our Property Rental Platform?
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-medium">
            Trusted listings, secure bookings, and dedicated support — built to
            make finding your next home simple and delightful.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            
            <div
              key={idx}
              className="group relative flex flex-col items-start rounded-2xl border border-slate-100 bg-slate-50/50 p-6 shadow-xs backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-[0_12px_30px_rgba(14,165,233,0.08)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/60 bg-white shadow-xs transition-all duration-300 group-hover:border-sky-100 group-hover:bg-sky-50 group-hover:scale-105">
                {feature.icon}
              </div>

              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-base font-bold text-slate-900 tracking-wide transition-colors duration-200 group-hover:text-sky-600">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}