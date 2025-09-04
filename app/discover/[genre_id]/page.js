// app/discovery/[genre_id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchGenreById } from "../../services/api";
import SongCard from "../../components/SongCard";

export default function DiscoveryGenrePage() {
  const { genre_id } = useParams();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const res = await fetchGenreById(genre_id);
        setGenre(res.data); // adjust based on API response
      } catch (err) {
        console.error(err);
        setError("Failed to load genre.");
      } finally {
        setLoading(false);
      }
    };

    getGenre();
  }, [genre_id]);

  if (loading) return <p className="text-center mt-10">Loading genre...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">{genre.name}</h1>

      {/* Albums in this genre */}
      {genre.albums && genre.albums.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genre.albums.map((album) => (
              <div key={album._id} className="bg-white shadow-md rounded p-2">
                <img
                  src={album.cover || "/placeholder.png"}
                  alt={album.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="font-medium">{album.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Songs in this genre */}
      {genre.songs && genre.songs.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {genre.songs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
