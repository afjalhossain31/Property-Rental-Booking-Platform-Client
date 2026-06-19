"use client";

import Link from "next/link";
import Bars from "@gravity-ui/icons/Bars";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "All Properties" },
//   { href: "/blog", label: "Blog" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = (typeof window !== "undefined") && window.localStorage.getItem("staynest-auth") === "true";

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("staynest-auth");
    } catch {}
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 via-sky-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
            P
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-sky-300/80">
              Property Rental
            </span>
            <span className="text-lg font-semibold text-white sm:text-xl">
              Booking
            </span>
          </span>
        </Link>


        {/* Desktop Navigation Links & Auth Buttons */}
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 shadow-[0_12px_40px_rgba(15,23,42,0.22)] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/my-bookings"
                  className="rounded-full px-5 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-linear-to-r from-rose-500 to-red-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop Platform Name */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200 xl:inline-flex">
            Property Rental Booking Platform
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Bars className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu Dropdown (By default opened for preview/styling) */}
      <div className="overflow-hidden border-t border-white/10 bg-slate-950/95 px-4 transition-all duration-300 ease-out lg:hidden max-h-128 py-4 opacity-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/my-bookings"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-white/10"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-linear-to-r from-rose-500 to-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-rose-500/25"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/25"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;