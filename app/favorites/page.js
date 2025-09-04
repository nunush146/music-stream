"use client";
import { useState, useEffect } from "react";
import SongCard from "../../components/SongCard";
import Player from "../../components/Player";
import axios from "axios";
import { FaHeart, FaPlay } from "react-icons/fa";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        // ✅ Use relative URL instead of localhost
        const res = await axios.get("/api/favorites");
        setFavorites(res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, []);

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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <FaHeart className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Your Favorite Songs
                </h2>
                <p className="text-gray-400 text-lg">
                  {favorites.length}{" "}
                  {favorites.length === 1 ? "song" : "songs"} you love
                </p>
              </div>
            </div>

            {/* Play All Button */}
            {!isLoading && favorites.length > 0 && (
              <div className="flex items-center space-x-4 mt-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2">
                  <FaPlay className="text-sm" />
                  <span>Play All</span>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all border border-gray-700">
                  Shuffle
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your favorite songs...</p>
            </div>
          )}

          {/* Favorites Grid */}
          {!isLoading && favorites.length > 0 && (
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-6">
                All Favorites
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((song) => (
                  <div
                    key={song.mid}
                    className="transform hover:scale-105 transition-transform"
                  >
                    <SongCard song={song} onClick={() => setCurrentSong(song)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && favorites.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">
                No favorites yet
              </h3>
              <p className="text-gray-500 text-lg">
                Start liking songs to build your collection
              </p>
            </div>
          )}

          {/* Recently Added Favorites */}
          {!isLoading && favorites.length > 6 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-6">
                Recently Added
              </h3>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.slice(0, 6).map((song) => (
                    <div
                      key={song.mid}
                      className="transform hover:scale-105 transition-transform"
                    >
                      <SongCard
                        song={song}
                        onClick={() => setCurrentSong(song)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          {!isLoading && favorites.length > 0 && (
            <div className="mt-8 bg-black rounded-lg border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Your Music Taste
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {favorites.length}
                  </div>
                  <div className="text-gray-400 text-sm">Favorite Songs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {[...new Set(favorites.map((song) => song.artist))].length}
                  </div>
                  <div className="text-gray-400 text-sm">Artists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round(favorites.length * 3.5)}
                  </div>
                  <div className="text-gray-400 text-sm">Minutes</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Music Player */}
        <Player currentSong={currentSong} />
      </div>
    </>
  );
}
