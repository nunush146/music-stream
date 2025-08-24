"use client";
import React, { useState, useEffect } from "react";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artists"); // backend URL
        const data = await res.json();
        setArtists(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching artists:", err);
      }
    };
    fetchArtists();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    setFiltered(artists.filter((a) => a.name.toLowerCase().includes(q)));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>

      <input
        type="text"
        placeholder="Search artists..."
        value={query}
        onChange={handleSearch}
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((artist) => (
          <a
            key={artist.name}
            href={`/home/artist/${encodeURIComponent(artist.name)}`}
            className="flex flex-col items-center gap-2 text-center hover:scale-105 transition"
          >
            <img
              src={artist.profilePic}
              alt={artist.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <span className="font-semibold">{artist.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
