"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/transactions");
        if (res.ok) setTransactions(await res.json());
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
        <p className="mt-1 text-sm text-slate-500">Monitor all payment activities across the platform.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Tenant & Owner</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan="5" className="py-8 text-center text-slate-500">Loading transactions...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="5" className="py-8 text-center text-slate-500">No transactions found.</td></tr>
              ) : (
                transactions.map((trx) => (
                  <tr key={trx._id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{trx.transactionId || trx._id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{trx.propertyName}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm"><span className="text-slate-500">T:</span> <span className="font-medium text-slate-900">{trx.tenantName}</span></p>
                      <p className="text-sm"><span className="text-slate-500">O:</span> <span className="font-medium text-slate-900">{trx.ownerName}</span></p>
                    </td>
                    <td className="px-6 py-4 font-bold text-sky-600">৳{trx.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(trx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}