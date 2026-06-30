"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client"; 

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();
  const sessionUser = session?.user;

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "Not Provided",
    address: "Not Provided",
    joined: "Recently",
    role: "Tenant"
  });

  useEffect(() => {
    if (sessionUser) {
      setUser({
        name: sessionUser.name || "Unknown",
        email: sessionUser.email || "",
        phone: "Not Provided",
        address: "Not Provided",
        joined: sessionUser.createdAt ? new Date(sessionUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
        role: sessionUser.role || "Tenant"
      });
    }
  }, [sessionUser]);

  const handleEditChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const handleSave = () => {
    if (isEditing) {
      toast.success("Profile changes saved locally!");
    }
    setIsEditing(!isEditing);
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">My Profile</h2>
          <p className="text-slate-500 mt-1">Manage your personal information and account settings.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-800 transition"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-sky-100 flex items-center justify-center text-3xl font-bold text-sky-600 uppercase">
            {user.name ? user.name.charAt(0) : "U"}
          </div>
          <div>
            <h3 className="text-xl font-bold capitalize">{user.name}</h3>
            <p className="text-slate-500 capitalize">{user.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", value: user.name, field: "name", editable: true },
            { label: "Email Address", value: user.email, field: "email", editable: false },
            { label: "Phone Number", value: user.phone, field: "phone", editable: true },
            { label: "Current Address", value: user.address, field: "address", editable: true },
            { label: "Member Since", value: user.joined, field: "joined", editable: false },
          ].map((item, index) => (
            <div key={index} className="border-b border-slate-100 pb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {item.label}
              </p>
              {isEditing && item.editable ? (
                <input 
                  className="w-full bg-slate-50 p-2 rounded-lg border focus:ring-2 focus:ring-sky-500 outline-none"
                  value={item.value}
                  onChange={(e) => handleEditChange(e, item.field)}
                />
              ) : (
                <p className="font-semibold text-slate-900">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-6 bg-rose-50 rounded-2xl border border-rose-100">
        <h4 className="font-bold text-rose-900">Delete Account</h4>
        <p className="text-sm text-rose-700 mt-1">Once you delete your account, there is no going back.</p>
        <button className="mt-4 text-sm font-bold text-rose-600 hover:underline">Permanently delete account</button>
      </div>
    </div>
  );
}