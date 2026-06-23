"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ডেমো ইউজার (বাস্তবে লগইন করা ইউজারের Auth Data থেকে আসবে)
  const user = { name: "Current User", email: "tenant@example.com" };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/properties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch property details");
        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    const bookingData = {
      propertyId: property._id,
      propertyName: property.title,
      propertyImage: property.image,
      ownerEmail: property.ownerEmail,
      tenantName: user.name,
      tenantEmail: user.email,
      amount: property.price,
      status: "Pending", // Default status, owner will approve/reject
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        alert("Booking request sent successfully to the owner!");
        setBookingModal(false);
        // বুকিং কমপ্লিট হলে ইউজারের নিজের বুকিং ড্যাশবোর্ডে নিয়ে যাবে
        router.push("/dashboard/my-bookings"); 
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-xl font-bold text-slate-500">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-bold text-rose-500">Property not found!</p>
      </div>
    );
  }

  // Amenities Array (যদি স্ট্রিং আকারে থাকে, তাহলে কমা দিয়ে ভাগ করে নিচ্ছি)
  const amenitiesList = typeof property.amenities === 'string' 
    ? property.amenities.split(',').map(item => item.trim()) 
    : property.amenities || [];

  return (
    <section className="bg-slate-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Image Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="relative h-[40vh] w-full overflow-hidden rounded-3xl md:h-[60vh]"
        >
          <Image 
            src={property.image} 
            alt={property.title} 
            fill 
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
            <div className="text-white">
              <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
                {property.status || "Verified"}
              </span>
              <h1 className="text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl text-white shadow-black/50 drop-shadow-md">
                {property.title}
              </h1>
              <p className="mt-2 text-lg font-medium text-slate-200 drop-shadow-sm md:text-xl">
                📍 {property.location}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          
          {/* Left Column: Property Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Property Type</p>
                <p className="mt-1 text-lg font-bold text-sky-600">{property.type}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Bedrooms</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{property.beds} Beds</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Bathrooms</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{property.baths} Baths</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Size</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{property.size || "N/A"} sqft</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-900">About this property</h3>
              <p className="mt-4 leading-relaxed text-slate-600 whitespace-pre-line text-lg">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-slate-900">Amenities</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {amenitiesList.map((amenity, idx) => (
                    <span key={idx} className="inline-flex rounded-xl bg-slate-200/50 px-4 py-2 font-medium text-slate-700">
                      ✨ {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Booking Card (Sticky) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Rent Price</p>
                <div className="mt-1 flex items-end gap-2">
                  <span className="text-4xl font-black text-slate-900">৳{property.price?.toLocaleString()}</span>
                  <span className="mb-1 font-medium text-slate-500">/ {property.rentType || "month"}</span>
                </div>
              </div>

              <div className="mb-6 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex justify-between border-b border-slate-200 pb-3 text-sm">
                  <span className="text-slate-500">Owner</span>
                  <span className="font-semibold text-slate-900">{property.ownerName || "Property Owner"}</span>
                </div>
                <div className="flex justify-between pt-3 text-sm">
                  <span className="text-slate-500">Contact</span>
                  <span className="font-semibold text-sky-600">{property.ownerEmail || "Hidden"}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setBookingModal(true)}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-1 hover:shadow-sky-500/50 active:translate-y-0"
              >
                Request to Book
              </button>
              
              <p className="mt-4 text-center text-xs font-medium text-slate-400">
                You will not be charged until the owner approves.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900">Confirm Booking Request</h3>
            <p className="mt-2 text-slate-500">
              You are sending a request to book <strong className="text-slate-900">{property.title}</strong>. 
              The owner will review your request.
            </p>
            
            <div className="my-6 space-y-3 rounded-2xl bg-slate-50 p-5 border border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tenant Name:</span>
                <span className="font-semibold text-slate-900">{user.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tenant Email:</span>
                <span className="font-semibold text-slate-900">{user.email}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-medium">
                <span className="text-slate-700">Total Rent:</span>
                <span className="text-lg font-bold text-sky-600">৳{property.price?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button 
                onClick={() => setBookingModal(false)} 
                disabled={bookingLoading}
                className="flex-1 rounded-xl border border-slate-200 py-3.5 font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleBooking} 
                disabled={bookingLoading}
                className="flex-1 flex justify-center items-center rounded-xl bg-slate-900 py-3.5 font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
              >
                {bookingLoading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  "Confirm Request"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}