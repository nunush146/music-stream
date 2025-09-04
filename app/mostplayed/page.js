"use client";
import React, { useEffect, useState } from "react";
import { FaMusic, FaPlay, FaHeart } from "react-icons/fa";

export default function MostPlayedPage() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/songs/most-played"); // uses next.config.js rewrite
        const data = await res.json();

        if (!res.ok) {
          // show error modal
          const errModal = document.createElement('div');
          errModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
          errModal.innerHTML = `
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-600">
              <div class="text-center">
                <h3 class="text-white text-lg font-bold mb-2">Failed to load songs</h3>
                <p class="text-gray-400 mb-4">${data.message || 'Unable to fetch most played songs.'}</p>
                <button class="px-6 py-2 bg-red-500 text-white rounded-lg" onclick="this.closest('.fixed').remove()">OK</button>
              </div>
            </div>
          `;
          document.body.appendChild(errModal);
          return;
        }

        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: #121212;
          color: #ffffff;
        }
      `}</style>

      <div className="min-h-screen bg-gray-900 text-white p-6 mb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <FaMusic className="text-white text-lg" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Most Played Songs
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Your most listened to tracks
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your most played songs...</p>
            </div>
          )}

          {/* Songs List */}
          {!isLoading && songs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMusic className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No songs found</h3>
              <p className="text-gray-500 text-lg">Start listening to music to see your most played tracks here</p>
            </div>
          ) : (
            !isLoading && (
              <div className="bg-black rounded-lg border border-gray-800 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-800 text-gray-400 text-sm font-medium border-b border-gray-700">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6">Song</div>
                  <div className="col-span-3">Artist</div>
                  <div className="col-span-2 text-right">Plays</div>
                </div>

                {/* Songs */}
                <div className="space-y-0">
                  {songs.map((song, index) => (
                    <div
                      key={song.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-800 transition-colors group cursor-pointer border-b border-gray-800 last:border-b-0"
                    >
                      <div className="col-span-1 flex items-center">
                        <span className="text-gray-400 group-hover:text-white font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="col-span-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                          <FaMusic className="text-gray-400 group-hover:text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold truncate">
                            {song.title}
                          </p>
                          <p className="text-gray-400 text-sm truncate">
                            {song.artist}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <span className="text-gray-400 truncate">{song.artist}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-end space-x-3">
                        <span className="text-blue-400 font-bold">
                          {song.plays?.toLocaleString() || '0'} plays
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                          <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                            <FaPlay className="text-white text-xs ml-0.5" />
                          </button>
                          <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition">
                            <FaHeart className="text-gray-400 text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Stats Summary */}
          {!isLoading && songs.length > 0 && (
            <div className="mt-8 bg-black rounded-lg border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Listening Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{songs.length}</div>
                  <div className="text-gray-400 text-sm">Total Songs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{songs.reduce((total, song) => total + (song.plays || 0), 0).toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Total Plays</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{songs.length > 0 ? Math.round(songs.reduce((total, song) => total + (song.plays || 0), 0) / songs.length) : 0}</div>
                  <div className="text-gray-400 text-sm">Avg Plays</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
