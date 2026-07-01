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

  useEffect(() => {
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
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };

  }, [pathname]); 



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

    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}

        <Link href="/" onClick={closeMobileMenu} className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
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

        {/* Desktop Navigation */}
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
                  className="rounded-full bg-gradient-to-r from-rose-500 to-red-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-transform duration-200 hover:-translate-y-0.5"
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
                  className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Register

                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}

        <button

          type="button"

          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"

        >

          <Bars className="h-5 w-5" />

        </button>

      </div>



      {/* Mobile Menu Dropdown */}

      <div

        className={`grid transition-all duration-300 ease-in-out lg:hidden ${

          isMobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"

        }`}

      >

        <div className="overflow-hidden bg-slate-950/95">

          <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 py-4">

            <div className="grid gap-2">

              {navLinks.map((link) => (

                <Link

                  key={link.href}

                  href={link.href}

                  onClick={closeMobileMenu}

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

                    onClick={closeMobileMenu}

                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-white/10"

                  >

                    Dashboard

                  </Link>

                  <button

                    type="button"

                    onClick={handleLogout}

                    className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-rose-500/25"

                  >

                    Logout

                  </button>

                </>

              ) : (

                <>

                  <Link

                    href="/login"

                    onClick={closeMobileMenu}

                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-white/10"

                  >

                    Login

                  </Link>

                  <Link

                    href="/register"

                    onClick={closeMobileMenu}

                    className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-sky-500/25"

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