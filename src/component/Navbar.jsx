"use client";

import Link from "next/link";
import Bars from "@gravity-ui/icons/Bars";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "All Properties" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState(null); // null রাখা হয়েছে hydration error এড়ানোর জন্য

  useEffect(() => {
    // থিম চেক করা
    const currentTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    setTheme(currentTheme);
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // অথেন্টিকেশন চেক
    const checkAuthStatus = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data && data.user) {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("staynest-auth", "true");
          }
          setIsLoggedIn(true);
        } else {
          if (typeof window !== "undefined") {
            const authStatus = window.localStorage.getItem("staynest-auth") === "true";
            setIsLoggedIn(authStatus);
          }
        }
      } catch (error) {
        if (typeof window !== "undefined") {
          const authStatus = window.localStorage.getItem("staynest-auth") === "true";
          setIsLoggedIn(authStatus);
        }
      }
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (e) {
      console.log("Signout error", e);
    }
    
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("staynest-auth");
      window.localStorage.removeItem("userEmail");
    }
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false); 
    router.push("/");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu} className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
            P
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300/80">
              Property Rental
            </span>
            <span className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Booking
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/50 p-1 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_40px_rgba(15,23,42,0.22)] lg:flex transition-colors duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/my-bookings"
                  className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-gradient-to-r from-rose-500 to-red-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}

            {/* Theme Toggle Button (Desktop) */}
            {theme && (
              <button
                onClick={toggleTheme}
                className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition-colors hover:bg-slate-300 dark:bg-white/10 dark:text-yellow-400 dark:hover:bg-white/20"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Theme Toggle Button (Mobile) */}
          {theme && (
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors dark:border-white/10 dark:bg-white/5 dark:text-yellow-400"
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 transition-colors duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            <Bars className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`grid transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden bg-white dark:bg-slate-950/95 transition-colors duration-300">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-slate-100 px-4 py-4 dark:border-white/10">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
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
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-rose-500/25"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/25"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;