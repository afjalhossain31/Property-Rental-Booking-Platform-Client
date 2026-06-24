"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // ডেটা দুবার সেভ হওয়া আটকাতে

  useEffect(() => {
    // URL থেকে সব ডেটা বের করে আনা হচ্ছে (যা আমরা Checkout Session থেকে পাঠিয়েছিলাম)
    const sessionId = searchParams.get("session_id");
    const propertyId = searchParams.get("propertyId");
    const propertyName = searchParams.get("propertyName");
    const amount = searchParams.get("amount");
    const ownerEmail = searchParams.get("ownerEmail");
    const tenantEmail = searchParams.get("tenantEmail");

    // যদি ডেটা থাকে এবং আগে সেভ না হয়ে থাকে, তবেই ডাটাবেসে পাঠাবো
    if (sessionId && propertyId && !isSaved) {
      const saveBookingData = async () => {
        try {
          // ১. Booking ডেটা তৈরি (Booking Requests ও My Bookings এর জন্য)
          const bookingData = {
            propertyId,
            propertyName,
            ownerEmail,
            userEmail: tenantEmail,
            tenantName: "Tenant User", // আপনি চাইলে লগইন করা ইউজারের আসল নামও পাস করতে পারেন
            tenantEmail,
            amount: parseInt(amount),
            status: "Pending", // Owner এটি Approve করবে
            transactionId: sessionId,
            date: new Date().toISOString(),
          };

          // ২. Transaction ডেটা তৈরি (Admin Dashboard এর জন্য)
          const transactionData = {
            transactionId: sessionId,
            propertyName,
            tenantEmail,
            ownerEmail,
            amount: parseInt(amount),
            date: new Date().toISOString(),
          };

          // ৩. ব্যাকএন্ডে Booking সেভ করা
          await fetch("http://localhost:5000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          });

          // ৪. ব্যাকএন্ডে Transaction সেভ করা
          await fetch("http://localhost:5000/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transactionData),
          });

          setIsSaved(true);
          toast.success("Payment successful and booking recorded!");
        } catch (error) {
          console.error("Error saving data:", error);
          toast.error("Payment successful but failed to save record.");
        } finally {
          setLoading(false);
        }
      };

      saveBookingData();
    } else if (!sessionId) {
      setLoading(false);
    }
  }, [searchParams, isSaved]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"></div>
          <p className="animate-pulse text-lg font-medium text-slate-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="mb-2 text-center text-3xl font-black text-slate-900 sm:text-4xl">
        Payment Successful!
      </h1>
      
      <p className="mb-8 max-w-md text-center text-slate-500">
        Your reservation fee has been paid successfully. The property owner will review your request shortly.
      </p>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link 
          href="/dashboard/my-bookings" 
          className="rounded-xl bg-slate-900 px-8 py-3.5 text-center font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
        >
          View My Bookings
        </Link>
        <Link 
          href="/" 
          className="rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-center font-bold text-slate-700 transition-all hover:bg-slate-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// Next.js App Router-এ useSearchParams ব্যবহার করলে পুরো কম্পোনেন্টকে Suspense দিয়ে র‍্যাপ করতে হয়
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}