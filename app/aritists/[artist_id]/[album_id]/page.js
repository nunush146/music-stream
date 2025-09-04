// app/albums/[albumId]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAlbumById } from "../../../services/api";
import SongCard from "../../../components/SongCard";

export default function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const res = await fetchAlbumById(albumId);
        setAlbum(res.data); // adjust according to your API response
      } catch (err) {
        console.error(err);
        setError("Failed to load album.");
      } finally {
        setLoading(false);
      }
    };

    getAlbum();
  }, [albumId]);

  if (loading) return <p className="text-center mt-10">Loading album...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src={album.cover || "/placeholder.png"}
          alt={album.title}
          className="w-48 h-48 rounded mb-4 object-cover"
        />
        <h1 className="text-4xl font-bold">{album.title}</h1>
        <p className="mt-2 text-gray-500">
          by {album.artist?.name || "Unknown Artist"}
        </p>
        {album.description && <p className="mt-2 max-w-xl text-center">{album.description}</p>}
      </div>

      {album.songs && album.songs.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {album.songs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
