"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", location: "", type: "Apartment",
    price: "", rentType: "Monthly", beds: "", baths: "",
    size: "", amenities: "", image: "",
    ownerName: "Current User", 
    ownerEmail: "owner@example.com", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Amenities কে স্ট্রিং থেকে অ্যারেতে রূপান্তর
    const amenityArray = formData.amenities.split(",").map(item => item.trim());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amenities: amenityArray, // এখানে অ্যারে যাচ্ছে
          price: Number(formData.price),
          beds: Number(formData.beds),
          baths: Number(formData.baths),
          status: "Pending"
        }),
      });

      if (res.ok) {
        alert("Property Added Successfully! Waiting for Admin Approval.");
        router.push("/dashboard/my-properties");
      } else {
        alert("Failed to add property.");
      }
    } catch (error) {
      console.error("Failed to add property:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Add New Property</h2>
        <p className="mt-1 text-sm text-slate-500">Fill in the details below to list your property.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Title & Description */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Property Title</label>
            <input required name="title" onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea required name="description" onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
          </div>

          {/* Location & Type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Location</label>
            <input required name="location" onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Property Type</label>
            <select name="type" onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          {/* Price, Beds, Baths, Size */}
          <input required type="number" name="price" onChange={handleChange} placeholder="Rent Price (৳)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
          
          <select name="rentType" onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm">
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>

          <input required type="number" name="beds" onChange={handleChange} placeholder="Bedrooms" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
          <input required type="number" name="baths" onChange={handleChange} placeholder="Bathrooms" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />
          <input required name="size" onChange={handleChange} placeholder="Size (sqft)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" />

          {/* Image */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Image URL</label>
            <input required name="image" onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Amenities (Comma separated)</label>
            <input name="amenities" onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" placeholder="e.g. WiFi, Parking, Gym" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="mt-8 w-full rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800">
          {loading ? "Submitting..." : "Submit Property"}
        </button>
      </form>
    </motion.div>
  );
}