import PropertyCard from "@/component/PropertyCard";
import { properties } from "@/data/properties";

const propertyTypes = ["All", "Apartment", "House", "Studio", "Villa"];

function filterProperties(searchParams) {
  const locationQuery = (searchParams.location || "").toLowerCase().trim();
  const typeQuery = searchParams.type || "All";
  const sortQuery = searchParams.sort || "";
  const minQuery = Number(searchParams.min || 0);
  const maxQuery = Number(searchParams.max || 0);

  let result = properties.filter((property) => property.status === "approved");

  if (locationQuery) {
    result = result.filter((property) => property.location.toLowerCase().includes(locationQuery));
  }

  if (typeQuery && typeQuery !== "All") {
    result = result.filter((property) => property.type === typeQuery);
  }

  if (minQuery) {
    result = result.filter((property) => property.price >= minQuery);
  }

  if (maxQuery) {
    result = result.filter((property) => property.price <= maxQuery);
  }

  if (sortQuery === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  if (sortQuery === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}

export default function PropertiesPage({ searchParams }) {
  const list = filterProperties(searchParams || {});

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          All Properties
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Browse approved properties in a clean 3-column grid
        </h1>
        <p className="mt-3 text-slate-600">
          Search by location, filter by property type, and sort by price from low to high or high to low.
        </p>
      </div>

      <form className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4" action="/properties" method="get">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="Search city"
            defaultValue={searchParams?.location || ""}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            defaultValue={searchParams?.type || "All"}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="sort">Sort By</label>
          <select
            id="sort"
            name="sort"
            defaultValue={searchParams?.sort || ""}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          >
            <option value="">Newest first</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
          </select>
        </div>

        <div className="flex items-end gap-3">
          <button type="submit" className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            Search
          </button>
          <a href="/properties" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-700">
            Reset
          </a>
        </div>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
        <p>{list.length} approved properties found</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
