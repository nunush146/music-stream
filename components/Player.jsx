"use client";
import React, { useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";

export default function Player({ currentSong }) {
  // 🔹 Update play count on backend whenever a song plays
  useEffect(() => {
    if (currentSong) {
      axios
        .post(`http://localhost:5000/api/songs/${currentSong.mid}/play`)
        .catch((err) => console.error("Error updating play count:", err));
    }
  }, [currentSong]);

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 w-full bg-gray-200 p-2 transition-colors">
        <p className="text-gray-900 text-center">No song playing</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 w-full bg-gray-100 text-gray-900 p-2 flex items-center shadow-lg">
      {currentSong.albumCover && (
        <img
          src={currentSong.albumCover || "/default-cover.jpg"}
          alt={currentSong.title}
          className="w-16 h-16 rounded mr-4 object-cover"
        />
      )}
      <AudioPlayer
        autoPlay={false}
        src={currentSong.hosted_directory} // backend audio file
        header={`${currentSong.title} - ${
          currentSong.artist?.name || "Unknown Artist"
        }`}
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[]}
        className="flex-1 text-gray-900"
      />
    </div>
  );
}