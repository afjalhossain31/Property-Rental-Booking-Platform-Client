import PropertyCard from "@/component/PropertyCard";
import Link from "next/link";
const propertyTypes = ["All", "Apartment", "House", "Studio", "Villa"];

async function fetchProperties() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/properties`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

function filterProperties(propertiesData, searchParams) {
  if (!Array.isArray(propertiesData)) return [];

  const locationQuery = (searchParams?.location || "").toLowerCase().trim();
  const typeQuery = searchParams?.type || "All";
  const sortQuery = searchParams?.sort || "";
  const minQuery = Number(searchParams?.min || 0);
  const maxQuery = Number(searchParams?.max || 0);

  let result = propertiesData.filter((property) =>
    property.status?.toLowerCase() === "approved"
  );

  if (locationQuery) {
    result = result.filter((property) =>
      property.location?.toLowerCase().includes(locationQuery)
    );
  }

  if (typeQuery && typeQuery !== "All") {
    result = result.filter((property) =>
      property.type?.toLowerCase() === typeQuery.toLowerCase()
    );
  }

  if (minQuery > 0) {
    result = result.filter((property) => Number(property.price) >= minQuery);
  }

  if (maxQuery > 0) {
    result = result.filter((property) => Number(property.price) <= maxQuery);
  }

  if (sortQuery === "price-asc") {
    result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sortQuery === "price-desc") {
    result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
  }

  return result;
}

export default async function PropertiesPage({ searchParams }) {
  const resolvedParams = await searchParams;

  const allProperties = await fetchProperties();

  const list = filterProperties(allProperties, resolvedParams || {});

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          All Properties
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Browse approved properties in a clean grid
        </h1>
        <p className="mt-3 text-slate-600">
          Search by location, filter by property type, and sort by price.
        </p>
      </div>

      <form className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-6" action="/properties" method="get">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            placeholder="Search city"
            defaultValue={resolvedParams?.location || ""}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            defaultValue={resolvedParams?.type || "All"}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="min">Min Price</label>
          <input
            id="min"
            name="min"
            type="number"
            placeholder="0"
            defaultValue={resolvedParams?.min || ""}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="max">Max Price</label>
          <input
            id="max"
            name="max"
            type="number"
            placeholder="Any"
            defaultValue={resolvedParams?.max || ""}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="sort">Sort By</label>
          <select
            id="sort"
            name="sort"
            defaultValue={resolvedParams?.sort || ""}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white"
          >
            <option value="">Newest first</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
          </select>
        </div>

        <div className="flex items-end gap-3 md:col-span-6 lg:col-span-6">
          <button type="submit" className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            Search
          </button>
          <Link href="/properties" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700">
            Reset
          </Link>
        </div>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
        <p>{list.length} approved properties found</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((property) => (
          <PropertyCard key={property._id || property.id} property={property} />
        ))}
      </div>
    </section>
  );
}