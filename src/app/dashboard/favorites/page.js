const favorites = [
  { id: "f1", name: "Luxury Apartment", location: "Dhaka" },
  { id: "f2", name: "Peaceful Studio", location: "Sylhet" },
];

export default function FavoritesPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">Favorites</h2>
      <p className="mt-2 text-sm text-slate-600">Saved properties you want to revisit later.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">{favorite.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{favorite.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
