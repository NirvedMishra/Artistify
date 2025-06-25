'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import artistsData from "@/data/artists";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Content() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("All");
  const [maxPrice, setMaxPrice] = useState(25000);

  const categories = ["All", ...new Set(artistsData.map((a) => a.category))];
  const locations = ["All", ...new Set(artistsData.map((a) => a.location))];

  const filtered = artistsData.filter((artist) => {
    return (
      (category === "All" || artist.category === category) &&
      (location === "All" || artist.location === location) &&
      artist.price <= maxPrice
    );
  });

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Browse Artists</h1>

      <div className="flex flex-col md:flex-row gap-8 ">

        <aside className="w-full md:w-1/4 border p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border px-3 py-2 rounded-md w-full"
            >
              {locations.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm mb-1">
              Max Price: ₹{maxPrice.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </aside>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && (
            <p className="col-span-full text-gray-500">No artists match your filters.</p>
          )}

          {filtered.map((artist) => (
            <div
              key={artist.id}
              className="border rounded-xl p-4 shadow hover:shadow-md transition max-h-46"
            >
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p className="text-sm text-gray-500">{artist.category}</p>
              <p className="text-sm text-gray-500">📍 {artist.location}</p>
              <p className="text-sm text-gray-500">💰 ₹{artist.price.toLocaleString()}</p>
              <Button className="mt-4 w-full">Ask for Quote</Button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
export default function ArtistsPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Content />
      </Suspense>
    );
  }
