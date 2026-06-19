'use client';

import { Radio, RadioGroup } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';

const RegistrationPage = () => {
  const [role, setRole] = useState("user");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-8 relative z-10 backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Create Account
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-2">
            Join StayNest to find or host your next property
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
            />
          </div>

          {/* Role Selection (HeroUI) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              I want to join as a
            </label>
            <RadioGroup
              value={role}
              onValueChange={setRole}
              orientation="horizontal"
              classNames={{
                wrapper: "gap-6",
              }}
            >
              <Radio 
                value="user"
                classNames={{
                  label: "text-sm font-semibold text-slate-700",
                  control: "bg-sky-500",
                }}
              >
                Tenant (User)
              </Radio>
              <Radio 
                value="vendor"
                classNames={{
                  label: "text-sm font-semibold text-slate-700",
                  control: "bg-sky-500",
                }}
              >
                Property Owner (Vendor)
              </Radio>
            </RadioGroup>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              required
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200/80 rounded-xl text-sm text-slate-900 font-medium placeholder-slate-400 outline-none transition-all duration-200 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-500/10"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-sky-500 to-cyan-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sky-500/35 active:translate-y-0 text-sm mt-2"
          >
            Get Started
          </button>
        </form>

        {/* Existing User Redirection */}
        <p className="text-center text-sm font-medium text-slate-600 mt-8 pt-4 border-t border-slate-50">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-sky-600 font-bold hover:text-sky-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;