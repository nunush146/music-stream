"use client";

import { useState, useEffect } from "react";
import Player from "../../components/Player";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig.API_URL;

export default function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
  }, []);

  const fetchPlaylists = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/playlists`);
      setPlaylists(res.data);
      if (res.data.length > 0) setSelectedPlaylist(res.data[0]);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${API_URL}/songs`);
      setSongs(res.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const createNewPlaylist = async () => {
    const name = prompt("Enter playlist name:");
    if (!name) return;

    try {
      const res = await axios.post(`${API_URL}/playlists`, { name });
      setPlaylists([...playlists, res.data]);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (!confirm("Are you sure you want to delete this playlist?")) return;

    try {
      await axios.delete(`${API_URL}/playlists/${playlistId}`);
      setPlaylists(playlists.filter((pl) => pl.id !== playlistId));
      if (selectedPlaylist?.id === playlistId) setSelectedPlaylist(null);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const openAddModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setShowAddModal(true);
    setSelectedSongs([]);
  };

  const toggleSong = (songId) => {
    setSelectedSongs((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const addSongsToPlaylist = async () => {
    try {
      await axios.post(`${API_URL}/playlists/${selectedPlaylist.id}/songs`, {
        songIds: selectedSongs,
      });
      await fetchPlaylists();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding songs:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Playlists
              </h2>
              <p className="text-gray-400">Manage and enjoy your music collections</p>
            </div>
            <button
              onClick={createNewPlaylist}
              className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
            >
              <FaPlus />
              <span>Create Playlist</span>
            </button>
          </div>

          {isLoading && <p className="text-gray-400">Loading playlists...</p>}

          {!isLoading && playlists.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {playlists.map((pl) => (
                <div
                  key={pl.id}
                  className={`p-6 bg-black border rounded-lg cursor-pointer transition ${
                    selectedPlaylist?.id === pl.id ? "border-blue-500" : "border-gray-800"
                  }`}
                  onClick={() => setSelectedPlaylist(pl)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold truncate">{pl.name}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlaylist(pl.id);
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">{pl.songs?.length || 0} songs</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAddModal(pl);
                    }}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm"
                  >
                    + Add Songs
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedPlaylist && selectedPlaylist.songs?.length > 0 && (
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4">{selectedPlaylist.name}</h3>
              <div>
                {selectedPlaylist.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="grid grid-cols-12 gap-4 py-2 border-b border-gray-800 cursor-pointer hover:bg-gray-800"
                    onClick={() => setCurrentSong(song)}
                  >
                    <span className="col-span-1 text-gray-400">{index + 1}</span>
                    <span className="col-span-6">{song.title}</span>
                    <span className="col-span-3 text-gray-400">{song.artist}</span>
                    <span className="col-span-2 text-right text-gray-400">3:45</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && playlists.length === 0 && (
            <p className="text-gray-500 text-center mt-16">No playlists yet. Create one!</p>
          )}
        </div>

        <Player currentSong={currentSong} />
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Add Songs to {selectedPlaylist?.name}</h3>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {songs.map((song) => (
                <label
                  key={song.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedSongs.includes(song.id)}
                    onChange={() => toggleSong(song.id)}
                  />
                  <span>{song.title} — {song.artist}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addSongsToPlaylist}
                className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600"
              >
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
