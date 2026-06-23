import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100/50">
      <div className="relative h-56 w-full overflow-hidden">
        
        {/* Image with smooth zoom effect */}
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
        />
        
        {/* Base Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        
        {/* Premium Dark Tint that appears on Hover */}
        <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/20" />

        {/* Status Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
          {property.status}
        </div>

        {/* Price Badge with slight hover pop */}
        <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-white">
          ৳{property.price?.toLocaleString()}/month
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            {/* Title changes color on hover */}
            <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
              {property.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{property.location}</p>
          </div>
          <span className="whitespace-nowrap rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            {property.type}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
          </div>
          
          <Link
            href={`/property/${property._id}`}
            className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}