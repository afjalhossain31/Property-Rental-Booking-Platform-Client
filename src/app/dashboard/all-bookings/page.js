"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; 

export default function AllBookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`);
        
        if (res.ok) setBookings(await res.json());
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    if (user?.role !== "admin") {
      toast.error("Access Denied! Only admins can approve bookings.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved" })
      });

      if (res.ok) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: "Approved" } : b));
        toast.success("Booking Approved Successfully!");
      } else {
        toast.error("Failed to approve booking.");
      }
    } catch (error) {
      console.error("Approve failed:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">All Bookings (Admin)</h2>
        <p className="mt-1 text-sm text-slate-500">Monitor all booking activities across the platform.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Tenant</th>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan="6" className="py-8 text-center text-slate-500">Loading bookings...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan="6" className="py-8 text-center text-slate-500">No bookings found.</td></tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {booking.tenantName}
                      <span className="block text-xs font-normal text-slate-500">{booking.tenantEmail}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-sky-600">{booking.propertyName}</td>
                    <td className="px-6 py-4 text-slate-500">{booking.ownerEmail}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">৳{booking.amount?.toLocaleString()}</td>
                    
                    <td className="px-6 py-4">
                      {/* Pending থাকলে বাটন দেখাবে, অন্যথায় শুধু ব্যাজ দেখাবে */}
                      {booking.status === 'Pending' ? (
                        <button 
                          onClick={() => handleApprove(booking._id)}
                          className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-105 transition-all shadow-sm"
                          title="Click to Approve"
                        >
                          {booking.status}
                        </button>
                      ) : (
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                          booking.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {booking.status}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}