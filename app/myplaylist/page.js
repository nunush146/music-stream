"use client";

import { useEffect, useState } from "react";
import { fetchMyPlaylists, createMyPlaylist } from "../../services/api";
import Link from "next/link";

export default function MyPlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const res = await fetchMyPlaylists();
        setPlaylists(res.data.playLists);
      } catch (err) {
        console.error(err);
        setError("Failed to load playlists.");
      } finally {
        setLoading(false);
      }
    };

    getPlaylists();
  }, []);

  const handleCreate = async () => {
    if (!newTitle) return;
    try {
      const res = await createMyPlaylist({ playlistTitle: newTitle, trackIds: [] });
      setPlaylists([...playlists, res.data.playlist]);
      setNewTitle("");
    } catch (err) {
      console.error(err);
      alert("Failed to create playlist.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading playlists...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="New Playlist Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">My Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {playlists.map((pl, index) => (
          <Link
            key={index}
            href={`/my-playlists/${pl._id || index}`}
            className="bg-white shadow-md rounded p-4 hover:shadow-xl transition"
          >
            <p className="font-semibold">{pl.playlistTitle}</p>
            <p className="text-gray-500">{pl.numberOfTracks} tracks</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
