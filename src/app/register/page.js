"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Building2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const RegistrationPage = () => {
  const router = useRouter();
  const [role, setRole] = useState("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignUp = async () => {
    try {
      const { data, error: socialError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/my-bookings",
      });

      if (socialError) throw new Error(socialError.message);

      if (data?.user) {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/google`, {
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
        window.localStorage.setItem("staynest-auth", "true");
        window.localStorage.setItem("userEmail", data.user.email);
        toast.success("Successfully registered with Google!");
        router.push("/dashboard/my-bookings");
      }
    } catch (err) {
      toast.error("Google sign up failed");
    }
  };

  // Email Registration লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setIsSubmitting(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw new Error(signUpError.message || "Registration failed");

      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          photo: formData.photo,
          role,
          createdAt: new Date(),
        }),
      });

      await authClient.signOut();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("staynest-auth");
        window.localStorage.removeItem("userEmail");
        window.dispatchEvent(new Event("storage"));
      }

      toast.success("Account created successfully. Please login.");
      router.push("/login");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl border border-white shadow-[0_25px_80px_rgba(15,23,42,0.10)] p-8 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
            <Building2 size={28} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join property rental platform and discover your perfect property</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase text-slate-700 mb-2 block">Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-sky-500" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-700 mb-2 block">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email address" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-sky-500" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-700 mb-2 block">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleChange} placeholder="Create password" className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-sky-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-700 mb-2 block">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-sky-500" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}

          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold hover:scale-[1.01] transition-all">
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <button type="button" onClick={handleGoogleSignUp} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all">
            <FcGoogle size={22} /> Continue with Google
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-600">
          Already have an account? <Link href="/login" className="text-sky-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;