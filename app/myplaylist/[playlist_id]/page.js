"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPlaylistTracks } from "../../../services/api";
import SongCard from "../../../components/SongCard";

export default function PlaylistTracksPage() {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTracks = async (term = "") => {
    try {
      setLoading(true);
      const res = await fetchPlaylistTracks(playlistId, term);
      setTracks(res.data.trackList);
    } catch (err) {
      console.error(err);
      setError("Failed to load tracks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTracks();
  }, [playlistId]);

  const handleSearch = () => {
    getTracks(search);
  };

  if (loading) return <p className="text-center mt-10">Loading tracks...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search tracks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track, index) => (
          <SongCard key={index} song={track} />
        ))}
      </div>
    </div>
  );
}
