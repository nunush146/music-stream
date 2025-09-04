"use client";

import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../services/api";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUserProfile();
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col items-center">
        <img
          src={user?.avatar || "/placeholder.png"}
          alt={user?.name || "User Avatar"}
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h1 className="text-3xl font-bold">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* User Playlists */}
      {user?.playlists && user.playlists.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.playlists.map((pl, index) => (
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
      )}

      {/* Favorites (optional) */}
      {user?.favorites && user.favorites.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.favorites.map((song, index) => (
              <div key={index} className="bg-white shadow-md rounded p-4">
                <p className="font-medium">{song.title}</p>
                <p className="text-gray-500">{song.artist}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
