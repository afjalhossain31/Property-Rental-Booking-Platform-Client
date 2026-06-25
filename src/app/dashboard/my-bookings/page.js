"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const email = window.localStorage.getItem("userEmail");
        if (!email) {
          setLoading(false);
          return;
        }

        const res = await fetch(`http://localhost:5000/bookings/user/${email}`);
        const data = await res.json();
        
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-slate-500 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">My Bookings</h2>
      <p className="mt-2 text-sm text-slate-600">Upcoming and active reservations.</p>

      {/* যদি কোনো বুকিং না থাকে */}
      {bookings.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-slate-500">You have not made any bookings yet.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex sm:items-center sm:justify-between transition hover:shadow-sm">
              <div>
                <h3 className="font-semibold text-slate-900">{booking.propertyName || "Property Name"}</h3>
                <p className="text-sm text-slate-600">Check-in date: {booking.checkInDate || booking.date}</p>
              </div>
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold sm:mt-0 ${
                booking.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" :
                booking.status === "Pending" ? "bg-amber-50 text-amber-700" :
                "bg-sky-50 text-sky-700"
              }`}>
                {booking.status || "Pending"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}