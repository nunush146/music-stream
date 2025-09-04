"use client";
import React, { useState, useEffect } from "react";
import SongCard from "../components/SongCard";
import Player from "../components/Player";
import { FaMusic, FaFire } from "react-icons/fa";
import { fetchSongs } from "../services/api";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getSongs = async () => {
    setIsLoading(true);
    try {
      const res = await fetchSongs();
      setSongs(res.data); // adjust if API response is nested
      setError(null);
    } catch (err) {
      console.error("Error fetching songs:", err);
      setError("Failed to load songs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  const featuredSongs = songs.slice(0, 6);
  const trendingSongs = songs.slice(6, 12);
  const discoverSongs = songs.slice(12, 20);

  return (
    <>
      {/* Global Dark Theme */}
      <style jsx global>{`
        body {
          background-color: #121212;
          color: #ffffff;
        }
      `}</style>

      <div className="min-h-screen bg-gray-900 text-white p-6 mb-24">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Welcome to MusicStream
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Discover millions of songs, create playlists, and enjoy your favorite music anytime, anywhere.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading amazing music for you...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-16 text-red-500">{error}</div>
          )}

          {/* Featured Songs */}
          {!isLoading && featuredSongs.length > 0 && (
            <section className="mb-12">
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
                    <SongCard song={song} onClick={() => setCurrentSong(song)} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trending Songs */}
          {!isLoading && trendingSongs.length > 0 && (
            <section className="mb-12">
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
                    <SongCard song={song} onClick={() => setCurrentSong(song)} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Discover More */}
          {!isLoading && discoverSongs.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Discover More
                </h2>
                <button
                  onClick={getSongs}
                  className="text-blue-400 hover:text-blue-300 font-medium transition"
                >
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {discoverSongs.map((song) => (
                  <div key={song.mid} className="transform hover:scale-105 transition-transform">
                    <SongCard song={song} onClick={() => setCurrentSong(song)} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {!isLoading && songs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMusic className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No music available</h3>
              <p className="text-gray-500 text-lg mb-6">Check back later for the latest tracks</p>
              <button
                onClick={getSongs}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
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
