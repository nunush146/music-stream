"use client";
import { useState, useEffect } from "react";
import SongCard from "../../components/SongCard";
import Player from "../../components/Player";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [results, setResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/songs"); // replace with your backend URL
        setSongs(res.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Filter songs based on query
  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const filtered = songs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist?.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Search Music
            </h2>
            <p className="text-gray-400 text-lg">Find your favorite songs and artists</p>
          </div>

          {/* Search Bar */}
          <div className="bg-black rounded-lg p-6 mb-8 shadow-lg border border-gray-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by song title or artist..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-4 pl-12 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-all text-base placeholder-gray-400"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>

          {/* Search Results */}
          {query && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-300">
                {results.length > 0 
                  ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                  : query && !isLoading ? `No results found for "${query}"` : ''
                }
              </h3>
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((song) => (
              <div key={song.mid} className="transform hover:scale-105 transition-transform">
                <SongCard
                  song={song}
                  onClick={() => setCurrentSong(song)}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!query && !isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">Start searching</h3>
              <p className="text-gray-500 text-lg">Enter a song title or artist name to find music</p>
            </div>
          )}

          {/* No Results State */}
          {query && results.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.334" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No results found</h3>
              <p className="text-gray-500 text-lg">Try searching with different keywords</p>
            </div>
          )}
        </div>

        {/* Music Player at the bottom */}
        <Player currentSong={currentSong} />
      </div>
    </>
  );
}