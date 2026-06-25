"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AllPropertiesAdmin() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Rejection Modal States
  const [rejectionModal, setRejectionModal] = useState(false);
  const [selectedPropId, setSelectedPropId] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("${process.env.NEXT_PUBLIC_SERVER_URL}/properties");
        if (res.ok) setProperties(await res.json());
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved", feedback: "" })
      });
      if (res.ok) {
        setProperties(properties.map(p => p._id === id ? { ...p, status: "Approved", feedback: "" } : p));
      }
    } catch (error) {
      console.error("Approve failed:", error);
    }
  };

  const handleRejectSubmit = async () => {
    if (!feedback.trim()) return alert("Feedback is required for rejection.");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/${selectedPropId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rejected", feedback })
      });
      if (res.ok) {
        setProperties(properties.map(p => p._id === selectedPropId ? { ...p, status: "Rejected", feedback } : p));
        setRejectionModal(false);
        setFeedback("");
      }
    } catch (error) {
      console.error("Reject failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property permanently?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/${id}`, { method: "DELETE" });
      if (res.ok) setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">All Properties (Admin)</h2>
        <p className="mt-1 text-sm text-slate-500">Monitor and manage all property listings on the platform.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Owner</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan="4" className="py-8 text-center text-slate-500">Loading...</td></tr>
              ) : properties.map((property) => (
                <tr key={property._id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{property.title}</p>
                    <p className="text-xs text-slate-500">৳{property.price?.toLocaleString()} • {property.location}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{property.ownerEmail}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                      property.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                      property.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {property.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {property.status !== 'Approved' && (
                        <button onClick={() => handleApprove(property._id)} className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-100">Approve</button>
                      )}
                      {property.status !== 'Rejected' && (
                        <button onClick={() => { setSelectedPropId(property._id); setRejectionModal(true); }} className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-100">Reject</button>
                      )}
                      <button onClick={() => handleDelete(property._id)} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Reject Property</h3>
            <p className="mt-1 text-sm text-slate-500">Please provide a reason for rejection.</p>
            
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" 
              rows="4" 
              placeholder="e.g. Images are blurry, price is unrealistic..." 
            />
            
            <div className="mt-6 flex gap-3">
              <button onClick={() => setRejectionModal(false)} className="flex-1 rounded-xl border border-slate-200 py-2.5 font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={handleRejectSubmit} className="flex-1 rounded-xl bg-rose-600 py-2.5 font-semibold text-white hover:bg-rose-700">Submit Rejection</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}