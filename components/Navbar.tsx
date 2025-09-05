"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaList, FaUser, FaMusic } from "react-icons/fa";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState('home');

  const navItems = [
    { id: 'home', href: '/', icon: FaHome, label: 'Home' },
    { id: 'playlist', href: '/playlist', icon: FaList, label: 'Playlists' },
    { id: 'profile', href: '/login', icon: FaUser, label: 'Profile' },
  ];

  const handleNavClick = (navId) => {
    setActiveNav(navId);
  };

  return (
    <>
      {/* Global CSS for gradient logo, colors, hover effects */}
      <style jsx global>{`
        :root {
          --app-dark: #121212;
          --app-blue: #3b82f6;
          --app-text: #ffffff;
          --app-text-muted: #b3b3b3;
        }

        .nav-link {
          transition: all 0.2s ease;
        }
        
        .nav-link:hover {
          color: var(--app-text) !important;
        }
        
        .nav-link.active {
          color: var(--app-text) !important;
        }
        
        .logo-text {
          background: linear-gradient(45deg, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        body {
          background-color: var(--app-dark);
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>

      <nav className="bg-black text-white px-4 md:px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FaMusic className="text-black text-xs md:text-sm" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold logo-text">MusicStream</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2 md:space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`nav-link flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 font-medium transition-colors px-2 md:px-0 ${
                    activeNav === item.id 
                      ? 'text-white active' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <IconComponent className="text-base md:text-lg" />
                  <span className="text-xs md:text-base">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
