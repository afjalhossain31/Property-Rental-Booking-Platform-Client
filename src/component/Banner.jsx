"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Magnifier from "@gravity-ui/icons/Magnifier";

const Banner = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type && type !== "Any") params.set("type", type);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-900/70 backdrop-blur-xl">
      {/* Background Image Container with Cinematic Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/Banner.jpeg"
          alt="Premium Property Banner"
          fill
          className="object-cover opacity-20 scale-105 transition-transform duration-10000"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-36 flex items-center min-h-[80vh]">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center relative z-20">
            
            {/* Top Minimal Badge */}
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300 mb-6 backdrop-blur-md">
              Discover Premium Living
            </span>

            {/* Typography with Gradient Accents */}
            <h1 className="text-4xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-slate-100 to-slate-300 sm:text-5xl md:text-6xl lg:text-7xl">
              Find your dream stay <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500">
                in minutes.
              </span>
            </h1>

            {/* Structured Subtitle */}
            <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium tracking-wide leading-relaxed">
              Book verified rentals with trusted hosts — apartments, villas, and
              houses across Bangladesh. Fast search, secure booking.
            </p>

            {/* Advanced Glassmorphic Search Container */}
            <form onSubmit={onSearch} className="mt-12 px-2 sm:px-0">
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:p-2 ring-1 ring-white/5">
                
                {/* 1. Location Input Field */}
                <div className="flex flex-1 flex-col items-start px-5 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/80 mb-0.5 hidden sm:block">Where</span>
                  <input
                    aria-label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="w-full bg-transparent text-sm font-medium text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="hidden h-8 w-px bg-white/10 sm:block" />

                {/* 2. Property Type Select Dropdown */}
                <div className="flex flex-col items-start px-5 py-1 sm:w-44">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/80 mb-0.5 hidden sm:block">Type</span>
                  <select
                    aria-label="Property type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-sm font-medium text-slate-300 focus:outline-none [&>option]:bg-slate-900 [&>option]:text-white"
                  >
                    <option value="Any">Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>

                <div className="hidden h-8 w-px bg-white/10 sm:block" />

                {/* 3. Budget Min/Max Fields */}
                <div className="flex items-center gap-2 px-5 py-1 sm:w-56">
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/80 mb-0.5 hidden sm:block">Max Price</span>
                    <input
                      aria-label="Price min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      type="number"
                      placeholder="Max"
                      className="w-full bg-transparent text-sm font-medium text-white placeholder-slate-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <span className="text-slate-500 text-xs mt-3 hidden sm:block">-</span>
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/80 mb-0.5 hidden sm:block">Min Price</span>
                    <input
                      aria-label="Price max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      type="number"
                      placeholder="Min"
                      className="w-full bg-transparent text-sm font-medium text-white placeholder-slate-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sky-500/35 active:translate-y-0 sm:rounded-full sm:py-3.5"
                >
                  <Magnifier className="h-4 w-4 stroke-[2.5]" />
                  <span> Search</span>
                </button>
              </div>
            </form>

            {/* Quick Suggestions / Badges */}
            <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mr-1">
                Trending Cities:
              </span>
              {["Dhaka", "Chattogram", "Cox's Bazar", "Sylhet"].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setLocation(city)}
                  className="rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300"
                >
                  {city}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Curved Section Transition Spacer */}
      <div className="relative z-10 -mt-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-t-[2.5rem] bg-white shadow-[0_-15px_40px_rgba(2,6,23,0.15)] h-12 sm:h-16" />
        </div>
      </div>
    </section>
  );
};

export default Banner;