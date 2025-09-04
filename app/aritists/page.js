// app/artists/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchArtists } from "../../services/api"; // make sure this exists

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const res = await fetchArtists();
        setArtists(res.data); // adjust based on API response
      } catch (err) {
        setError("Failed to load artists.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading artists...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Artists</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <Link
            key={artist._id} // assuming MongoDB ID
            href={`/artists/${artist._id}`}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={artist.image || "/placeholder.png"}
              alt={artist.name}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <p className="font-semibold">{artist.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
