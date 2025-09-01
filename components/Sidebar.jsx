"use client";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (always visible) */}
      <button
        className="fixed top-4 left-4 z-50 text-white p-2 bg-[#0B1C2C] rounded-md hover:bg-[#162A44] transition shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Overlay for mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#0B1C2C] text-white p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-40 shadow-lg`}
      >
        {/* Close button inside sidebar */}
        <button
          className="absolute top-4 right-4 text-white p-1 hover:text-gray-300"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-10 mt-4">
          <h1 className="text-2xl font-bold text-white">MusicStream</h1>
          <button
            className="flex items-center gap-1 px-3 py-1 bg-[#162A44] rounded-lg hover:bg-[#1E3B5C] transition"
            onClick={() => {
              const modal = document.createElement("div");
              modal.className =
                "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
              modal.innerHTML = `
                <div class="bg-[#0B1C2C] p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 border border-[#162A44]">
                  <h3 class="text-white text-lg font-bold mb-4">Create New Playlist</h3>
                  <input type="text" placeholder="Playlist name..." class="w-full p-2 rounded bg-[#162A44] text-white border border-[#1E3B5C] focus:border-[#4DA6FF] outline-none mb-4">
                  <div class="flex justify-end space-x-3">
                    <button class="px-4 py-2 text-gray-400 hover:text-white transition" onclick="this.closest('.fixed').remove()">Cancel</button>
                    <button class="px-4 py-2 bg-[#4DA6FF] text-white hover:bg-[#3A95FF] rounded transition" onclick="this.closest('.fixed').remove()">Create</button>
                  </div>
                </div>
              `;
              document.body.appendChild(modal);
            }}
          >
            <span className="text-lg font-bold text-white">+</span>
            <span className="text-sm text-white">New</span>
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-5">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              <span className="hover:text-[#4DA6FF] cursor-pointer transition-colors flex items-center">
                <span className="mr-3">🏠</span>Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/search" onClick={() => setIsOpen(false)}>
              <span className="hover:text-[#4DA6FF] cursor-pointer transition-colors flex items-center">
                <span className="mr-3">🔍</span>Search
              </span>
            </Link>
          </li>
          <li>
            <Link href="/playlist" onClick={() => setIsOpen(false)}>
              <span className="hover:text-[#4DA6FF] cursor-pointer transition-colors flex items-center">
                <span className="mr-3">📋</span>Playlist
              </span>
            </Link>
          </li>
          <li>
            <Link href="/favorites" onClick={() => setIsOpen(false)}>
              <span className="hover:text-[#4DA6FF] cursor-pointer transition-colors flex items-center">
                <span className="mr-3">❤️</span>Favorites
              </span>
            </Link>
          </li>
          <li>
            <Link href="/mostplayed" onClick={() => setIsOpen(false)}>
              <span className="hover:text-[#4DA6FF] cursor-pointer transition-colors flex items-center">
                <span className="mr-3">🎵</span>Most Played
              </span>
            </Link>
          </li>
        </ul>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-[#162A44] pt-4">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <span className="hover:text-[#4DA6FF] cursor-pointer transition-colors flex items-center">
                <span className="mr-3">👤</span>Profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
