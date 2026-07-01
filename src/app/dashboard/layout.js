"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "My Properties", href: "/dashboard/my-properties" },
    { name: "Booking Requests", href: "/dashboard/booking-requests" },
    { name: "Add Property", href: "/dashboard/add-property" },
  ];

  const adminLinks = [
    { name: "All Properties", href: "/dashboard/all-properties" },
    { name: "All Bookings", href: "/dashboard/all-bookings" },
    { name: "Transactions", href: "/dashboard/transactions" },
  ];

  const isActive = (href) => pathname === href ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-sky-50 hover:text-sky-600";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden mb-6 flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
      >
        {isOpen ? "Close Menu" : "Open Dashboard Menu"}
      </button>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        
        {/* Sidebar Navigation */}
        <aside className={`${isOpen ? "block" : "hidden"} lg:block space-y-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 h-fit`}>
          
          {/* Account Section (Profile & Bookings) */}
          <div>
            <h2 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Account</h2>
            <nav className="space-y-1">
              <Link href="/dashboard/profile" className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isActive("/dashboard/profile")}`}>
                <span>👤</span> Profile
              </Link>
              <Link href="/dashboard/my-bookings" className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isActive("/dashboard/my-bookings")}`}>
                <span>📅</span> My Bookings
              </Link>
            </nav>
          </div>

          {/* Owner Section */}
          <div>
            <h2 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Owner Panel</h2>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`block px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isActive(link.href)}`}>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          {user?.role === "admin" && (
            <div>
              <h2 className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Admin Panel</h2>
              <nav className="space-y-1">
                {adminLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={`block px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isActive(link.href)}`}>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </aside>

        {/* Main Dashboard Content */}
        <main className="w-full min-h-[60vh] rounded-3xl bg-white p-6 border border-slate-200 shadow-sm md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}