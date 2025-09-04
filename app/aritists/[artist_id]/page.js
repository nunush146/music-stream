// app/artists/[artistId]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArtistById } from "../../../services/api";
import SongCard from "../../../components/SongCard"; // optional component for songs

export default function ArtistPage() {
  const params = useParams();
  const { artistId } = params;

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const res = await fetchArtistById(artistId);
        setArtist(res.data); // adjust based on API response
      } catch (err) {
        console.error(err);
        setError("Failed to load artist.");
      } finally {
        setLoading(false);
      }
    };

    getArtist();
  }, [artistId]);

  if (loading) return <p className="text-center mt-10">Loading artist...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src={artist.image || "/placeholder.png"}
          alt={artist.name}
          className="w-40 h-40 rounded-full mb-4 object-cover"
        />
        <h1 className="text-4xl font-bold">{artist.name}</h1>
        {artist.bio && <p className="text-center mt-2 max-w-xl">{artist.bio}</p>}
      </div>

      {artist.albums && artist.albums.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artist.albums.map((album) => (
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
        </div>
      )}

      {artist.songs && artist.songs.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artist.songs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
