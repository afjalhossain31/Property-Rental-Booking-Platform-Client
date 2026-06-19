const bookings = [
  { id: "b1", name: "Lake View Apartment", date: "2026-07-02", status: "Confirmed" },
  { id: "b2", name: "Elite Villa", date: "2026-07-08", status: "Pending" },
];

export default function MyBookingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">My Bookings</h2>
      <p className="mt-2 text-sm text-slate-600">Upcoming and active reservations.</p>

      <div className="mt-6 grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">{booking.name}</h3>
              <p className="text-sm text-slate-600">Check-in date: {booking.date}</p>
            </div>
            <span className="mt-3 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 sm:mt-0">
              {booking.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
