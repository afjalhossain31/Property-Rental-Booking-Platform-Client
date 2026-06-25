"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // গুগল সাইন-ইন লজিক (ডাটাবেস সিঙ্কসহ)
  const handleGoogleSignIn = async () => {
    try {
      const { data, error: socialError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // হোম পেজে রিডাইরেক্ট করার জন্য
      });

      if (socialError) throw new Error(socialError.message);

      // যদি সফল হয়, তাহলে লোকাল স্টোরেজ আপডেট করা
      if (data?.user) {
        window.localStorage.setItem("staynest-auth", "true");
        window.localStorage.setItem("userEmail", data.user.email);
        
        // Navbar কে সাথে সাথে আপডেট করার জন্য ইভেন্ট ট্রিগার
        window.dispatchEvent(new Event("storage"));
        
        // ডাটাবেসে ইউজার সেভ করা (যদি নতুন হয়)
        await fetch("${process.env.NEXT_PUBLIC_SERVER_URL}/users/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.user.name,
            email: data.user.email,
            photo: data.user.image,
            role: "tenant",
            createdAt: new Date(),
          }),
        });

        toast.success("Google Login Successful!");
        router.push("/"); // হোম পেজে পুশ করা
        router.refresh();
      }
    } catch (err) {
      toast.error("Google sign in failed");
    }
  };

  // ইমেইল লগইন লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/", // হোম পেজে রিডাইরেক্ট করার জন্য
      });

      if (signInError) throw new Error(signInError.message || "Invalid email or password");

      // সাকসেসফুল লগইন
      window.localStorage.setItem("staynest-auth", "true");
      window.localStorage.setItem("userEmail", email);
      
      // Navbar কে সাথে সাথে আপডেট করার জন্য ইভেন্ট ট্রিগার
      window.dispatchEvent(new Event("storage"));

      toast.success("Login Successful! 🎉");
      router.push("/"); // হোম পেজে পুশ করা
      router.refresh();
    } catch (submissionError) {
      const errMsg = submissionError instanceof Error ? submissionError.message : "Something went wrong";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Login to your property rental account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-sky-600 hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-sky-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm font-medium text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-sm font-medium text-slate-600 mt-7 pt-4 border-t">
          Don&apos;t have an account? <Link href="/register" className="text-sky-600 font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}