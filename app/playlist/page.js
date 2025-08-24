"use client";
import { useState, useEffect } from "react";
import PlaylistCard from "../../components/PlaylistCard";
import SongCard from "../../components/SongCard";
import Player from "../../components/Player";
import axios from "axios";
import { FaPlus, FaMusic, FaPlay, FaHeart, FaClock } from "react-icons/fa";

export default function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch playlists from backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/playlists"); // replace with your backend URL
        setPlaylists(res.data); // res.data = array of playlists with songs
        if (res.data.length > 0) {
          setSelectedPlaylist(res.data[0]);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const createNewPlaylist = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-gray-600">
        <h3 class="text-white text-lg font-bold mb-4">Create New Playlist</h3>
        <input type="text" placeholder="Playlist name..." class="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none mb-4 text-base">
        <textarea placeholder="Description (optional)..." class="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none mb-4 h-20 resize-none text-base"></textarea>
        <div class="flex justify-end space-x-3">
          <button class="px-4 py-2 text-gray-400 hover:text-white transition" onclick="this.closest('.fixed').remove()">Cancel</button>
          <button class="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition" onclick="this.closest('.fixed').remove()">Create</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  return (
    <>
      {/* Custom CSS for dark theme with blue accents */}
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Your Playlists
                </h2>
                <p className="text-gray-400 text-lg">Manage and enjoy your music collections</p>
              </div>
              
              {/* Create Playlist Button */}
              <button
                onClick={createNewPlaylist}
                className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center space-x-2"
              >
                <FaPlus className="text-sm" />
                <span>Create Playlist</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading your playlists...</p>
            </div>
          )}

          {/* Playlists Grid */}
          {!isLoading && playlists.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-300">All Playlists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {playlists.map((pl) => (
                  <div 
                    key={pl.id} 
                    className="transform hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setSelectedPlaylist(pl)}
                  >
                    <div className={`bg-black rounded-lg p-6 border transition-all ${
                      selectedPlaylist?.id === pl.id 
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                        : 'border-gray-800 hover:border-gray-700'
                    }`}>
                      <div className="w-full aspect-square bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                        <FaMusic className="text-4xl text-gray-600" />
                      </div>
                      <h4 className="font-semibold text-white mb-2 truncate">{pl.name}</h4>
                      <p className="text-gray-400 text-sm">{pl.songs?.length || 0} songs</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <button className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center transition">
                          <FaPlay className="text-xs text-white ml-0.5" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition">
                          <FaHeart className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Playlist Songs */}
          {!isLoading && selectedPlaylist && selectedPlaylist.songs && selectedPlaylist.songs.length > 0 && (
            <div className="bg-black rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                    <FaMusic className="text-2xl text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPlaylist.name}</h3>
                    <p className="text-gray-400">{selectedPlaylist.songs.length} songs</p>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2">
                  <FaPlay className="text-sm" />
                  <span>Play All</span>
                </button>
              </div>

              {/* Songs List */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-gray-400 text-sm border-b border-gray-800">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6">Title</div>
                  <div className="col-span-3">Artist</div>
                  <div className="col-span-2 flex justify-end">
                    <FaClock className="text-sm" />
                  </div>
                </div>
                {selectedPlaylist.songs.map((song, index) => (
                  <div 
                    key={song.mid}
                    className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer group"
                    onClick={() => setCurrentSong(song)}
                  >
                    <div className="col-span-1 text-gray-400 group-hover:text-white">
                      {index + 1}
                    </div>
                    <div className="col-span-6">
                      <div className="text-white font-medium truncate">{song.title}</div>
                      <div className="text-gray-400 text-sm truncate">{song.artist}</div>
                    </div>
                    <div className="col-span-3 text-gray-400 truncate">{song.artist}</div>
                    <div className="col-span-2 text-gray-400 text-right">3:45</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && playlists.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMusic className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">No playlists yet</h3>
              <p className="text-gray-500 text-lg mb-6">Create your first playlist to get started</p>
              <button
                onClick={createNewPlaylist}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <FaPlus className="text-sm" />
                <span>Create Your First Playlist</span>
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