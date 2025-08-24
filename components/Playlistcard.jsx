"use client";
import React from "react";

export default function PlaylistCard({ playlist, onClick }) {
  return (
    <div
      className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 cursor-pointer"
      onClick={() => onClick && onClick(playlist)}
    >
      <img
        src={playlist.cover || "/default-cover.jpg"} // fallback cover
        alt={playlist.name}
        className="rounded w-full h-40 object-cover"
      />
      <h3 className="mt-2 text-white font-semibold">{playlist.name || "Untitled Playlist"}</h3>
      <p className="text-gray-400">{playlist.songs?.length || 0} songs</p>
    </div>
  );
}
