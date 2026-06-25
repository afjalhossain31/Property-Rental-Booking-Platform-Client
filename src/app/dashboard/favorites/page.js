"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = "tenant@example.com"; // এটি ডাইনামিক Auth থেকে আসা উচিত

  // ডাটাবেস থেকে ফেভারিট প্রপার্টিগুলো ফেচ করা
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setLoading(false);
      });
  }, []);

  // ডাটাবেস থেকে রিমুভ করার ফাংশন
  const removeFavorite = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/favorites/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFavorites(favorites.filter((fav) => fav._id !== id));
        alert("Removed from favorites!");
      }
    } catch (error) {
      console.error("Failed to remove:", error);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center font-bold text-slate-500 animate-pulse">Loading your favorites...</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">My Favorites</h2>
        <p className="text-slate-500">Saved properties you want to revisit later.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl">
          <p className="text-slate-500 mb-4">No favorites yet.</p>
          <Link href="/properties" className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold">
            Explore Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <motion.div 
              key={fav._id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4">
                <Image src={fav.image} alt={fav.title} fill className="object-cover" />
                <button 
                  onClick={() => removeFavorite(fav._id)}
                  className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:text-rose-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
              <h3 className="font-bold text-lg">{fav.title}</h3>
              <p className="text-sky-600 font-semibold">৳{fav.price?.toLocaleString()}/mo</p>
              <div className="mt-4">
                <Link 
                  href={`/properties/${fav.propertyId}`} 
                  className="block text-center w-full bg-sky-50 text-sky-700 py-2 rounded-xl font-semibold hover:bg-sky-100"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}