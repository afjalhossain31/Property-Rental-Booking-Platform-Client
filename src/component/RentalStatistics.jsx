export default function RentalStatistics() {
  const stats = [
    { id: 's1', label: 'Total Listings', value: '3,450' },
    { id: 's2', label: 'Cities Covered', value: '48' },
    { id: 's3', label: 'Happy Tenants', value: '12,300+' },
    { id: 's4', label: 'Avg Response Time', value: '18 mins' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Rental Statistics</h2>
        <p className="mt-2 text-sm text-slate-600">Key platform metrics that show our reach and reliability.</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm">
            <div className="text-lg font-extrabold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
