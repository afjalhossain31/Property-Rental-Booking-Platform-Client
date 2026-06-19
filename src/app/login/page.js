"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // accept any credentials in demo mode
    try {
      window.localStorage.setItem("staynest-auth", "true");
    } catch {}
    router.push("/dashboard/my-bookings");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-8 relative z-10 backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Login to your StayNest account (demo)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-sky-600 hover:text-sky-500 hover:underline tracking-wide">Forgot Password?</Link>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white"
            />
          </div>

          <button type="submit" className="w-full bg-linear-to-r from-sky-500 to-cyan-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sky-500/35 active:translate-y-0 text-sm">Sign In</button>
        </form>

        <p className="text-center text-sm font-medium text-slate-600 mt-8 pt-4 border-t border-slate-50">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-sky-600 font-bold hover:text-sky-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}