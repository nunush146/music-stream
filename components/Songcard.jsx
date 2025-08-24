"use client";
import React, { useState } from "react";

export default function SongCard({ song, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent playing the song when clicking heart
    setIsFavorite(!isFavorite);

    // 🔹 This is where backend integration goes
    // Example: call backend API to save/remove favorite
  };

  return (
    <div
      className="bg-white rounded-lg p-3 hover:bg-gray-100 cursor-pointer transition-colors shadow-sm"
      onClick={() => onClick && onClick(song)}
    >
      <img
        src={song.albumCover || "/default-cover.jpg"} // fallback image
        alt={song.title}
        className="rounded w-full h-40 object-cover transition-transform duration-200 hover:scale-105"
      />

      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className="text-gray-900 font-semibold">{song.title}</h3>
          <p className="text-gray-500">{song.artist?.name || "Unknown Artist"}</p>
          <p className="text-gray-500 text-sm">{song.album || "Unknown Album"}</p>
          <p className="text-gray-500 text-sm">{song.genre || "Unknown Genre"}</p>
        </div>
        <button
          onClick={toggleFavorite}
          className={`text-xl transition-colors duration-200 ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
