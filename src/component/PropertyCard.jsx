import Image from "next/image";

export default function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 w-full">
        <Image src={property.image} alt={property.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {property.status}
        </div>
        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 backdrop-blur">
          ৳{property.price.toLocaleString()}/month
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{property.location}</p>
          </div>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            {property.type}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
        </div>
      </div>
    </article>
  );
}
