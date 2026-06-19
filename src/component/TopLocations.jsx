export default function TopLocations() {
  const locations = [
    { id: 'l1', name: 'Dhaka', count: 1240 },
    { id: 'l2', name: 'Chattogram', count: 520 },
    { id: 'l3', name: 'Cox\'s Bazar', count: 210 },
    { id: 'l4', name: 'Sylhet', count: 180 },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Top Locations</h2>
        <a href="/properties" className="text-sm text-sky-600 hover:underline">Browse all</a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {locations.map((loc) => (
          <div key={loc.id} className="flex flex-col items-center gap-3 rounded-lg border border-slate-100 bg-white p-4 text-center shadow-sm hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600 font-bold">{loc.name.charAt(0)}</div>
            <div className="text-sm font-semibold text-slate-900">{loc.name}</div>
            <div className="text-xs text-slate-500">{loc.count} listings</div>
          </div>
        ))}
      </div>
    </section>
  );
}
