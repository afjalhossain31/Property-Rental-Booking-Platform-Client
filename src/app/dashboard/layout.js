"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard/my-bookings", label: "My Bookings" },
  { href: "/dashboard/favorites", label: "Favorites" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking] = useState(() => {
    try {
      return !(typeof window !== "undefined" && window.localStorage.getItem("staynest-auth") === "true");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      const loggedIn = window.localStorage.getItem("staynest-auth") === "true";
      if (!loggedIn) router.replace("/login");
    } catch {
      router.replace("/login");
    }
    // router used intentionally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 text-slate-600">
        Checking access...
      </div>
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
      <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="rounded-2xl bg-slate-900 px-4 py-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Tenant Dashboard</p>
          <h1 className="mt-2 text-2xl font-bold">Manage your stay</h1>
        </div>

        <nav className="mt-4 grid gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${active ? "bg-sky-50 text-sky-700" : "text-slate-700 hover:bg-slate-50"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {children}
      </main>
    </section>
  );
}
