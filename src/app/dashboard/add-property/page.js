"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { data: session } = authClient.useSession();
  const ownerEmail = session?.user?.email;

  useEffect(() => {
    if (!ownerEmail) {
      setLoading(false);
      return;
    }

    const fetchMyProperties = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/owner/${ownerEmail}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProperties();
  }, [ownerEmail]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties(properties.filter(p => p._id !== id));
        toast.success("Property deleted!");
      }
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Properties</h2>
          <p className="mt-1 text-sm text-slate-500">Manage all your listed properties.</p>
        </div>
        <Link href="/dashboard/add-property" className="inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500">
          + Add New Property
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan="5" className="py-8 text-center text-slate-500">Loading...</td></tr>
              ) : properties.length === 0 ? (
                <tr><td colSpan="5" className="py-8 text-center text-slate-500">No properties found.</td></tr>
              ) : (
                properties.map((property) => (
                  <tr key={property._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{property.title}</td>
                    <td className="px-6 py-4 text-slate-500">{property.location}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">৳{property.price?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        property.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                        property.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(property._id)} className="text-rose-600 font-bold text-xs">Delete</button>
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