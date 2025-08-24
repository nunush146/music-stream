"use client";
import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import Player from "../components/Player";
import axios from "axios";
import { FaMusic, FaFire } from "react-icons/fa";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/songs"); // backend URL
        setSongs(res.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const featuredSongs = songs.slice(0, 6);
  const trendingSongs = songs.slice(6, 12);

  return (
    <>
      {/* Custom CSS for dark theme */}
      <style jsx global>{`
        body {
          background-color: #121212;
          color: #ffffff;
        }
      `}</style>

      <div className="min-h-screen bg-gray-900 text-white p-6 mb-24">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Welcome to MusicStream
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                Discover millions of songs, create playlists, and enjoy your favorite music anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading amazing music for you...</p>
            </div>
          )}

          {/* Featured Songs */}
          {!isLoading && featuredSongs.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaMusic className="text-white text-sm" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Featured Music
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {featuredSongs.map((song) => (
                  <div key={song.mid} className="transform hover:scale-105 transition-transform">
                    <SongCard
                      song={song}
                      onClick={() => setCurrentSong(song)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Songs */}
          {!isLoading && trendingSongs.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <FaFire className="text-white text-sm" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Trending Now
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {trendingSongs.map((song) => (
                  <div key={song.mid} className="transform hover:scale-105 transition-transform">
                    <SongCard
                      song={song}
                      onClick={() => setCurrentSong(song)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Songs */}
          {!isLoading && songs.length > 12 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Discover More
                </h2>
                <button className="text-blue-400 hover:text-blue-300 font-medium transition">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {songs.slice(12, 20).map((song) => (
                  <div key={song.mid} className="transform hover:scale-105 transition-transform">
                    <SongCard
                      song={song}
                      onClick={() => setCurrentSong(song)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Music Grid */}
          {!isLoading && songs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Trending Music
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {songs.slice(0, 4).map((song, index) => (
                  <div
                    key={song.mid}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 cursor-pointer hover:scale-105 transition-all"
                    onClick={() => setCurrentSong(song)}
                  >
                    <div className="text-3xl mb-2">🎵</div>
                    <h3 className="text-white font-semibold text-lg truncate">{song.title || `Track ${index + 1}`}</h3>
                    <p className="text-gray-400 text-sm truncate">{song.artist || 'Unknown Artist'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && songs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMusic className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No music available</h3>
              <p className="text-gray-500 text-lg mb-6">Check back later for the latest tracks</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* Music Player */}
        <Player currentSong={currentSong} />
      </div>
    </>
  );
}