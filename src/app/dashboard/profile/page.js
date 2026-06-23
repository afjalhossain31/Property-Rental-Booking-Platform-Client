"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  // ডামি ডেটা - ভবিষ্যতে এটি ডাটাবেস থেকে আসবে
  const [user, setUser] = useState({
    name: "Aroya Akter",
    email: "aroya.akter@example.com",
    phone: "+880 17XXXXXXXX",
    address: "Dhaka, Bangladesh",
    joined: "June 2026",
    role: "Tenant"
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">My Profile</h2>
          <p className="text-slate-500 mt-1">Manage your personal information and account settings.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-800 transition"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Main Profile Info */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-sky-100 flex items-center justify-center text-2xl font-bold text-sky-600">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-slate-500">{user.role}</p>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email Address", value: user.email },
            { label: "Phone Number", value: user.phone },
            { label: "Current Address", value: user.address },
            { label: "Member Since", value: user.joined },
          ].map((item, index) => (
            <div key={index} className="border-b border-slate-100 pb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {item.label}
              </p>
              {isEditing ? (
                <input 
                  className="w-full bg-slate-50 p-2 rounded-lg border focus:ring-2 focus:ring-sky-500 outline-none"
                  defaultValue={item.value} 
                />
              ) : (
                <p className="font-semibold text-slate-900">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Account Danger Zone (Optional) */}
      <div className="mt-8 p-6 bg-rose-50 rounded-2xl border border-rose-100">
        <h4 className="font-bold text-rose-900">Delete Account</h4>
        <p className="text-sm text-rose-700 mt-1">Once you delete your account, there is no going back.</p>
        <button className="mt-4 text-sm font-bold text-rose-600 hover:underline">Permanently delete account</button>
      </div>
    </div>
  );
}