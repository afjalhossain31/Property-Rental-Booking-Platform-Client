export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
      <p className="mt-2 text-sm text-slate-600">Your tenant profile and account details.</p>

      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Name</p>
          <p className="mt-1 font-semibold text-slate-900">Demo Tenant</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
          <p className="mt-1 font-semibold text-slate-900">tenant@example.com</p>
        </div>
      </div>
    </div>
  );
}
