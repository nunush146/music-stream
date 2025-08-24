"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ArtistProfile() {
  const params = useParams();
  const { name } = params;

  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/artist/${encodeURIComponent(name)}`
        );
        const data = await res.json();
        setArtist(data.artist);
        setAlbums(data.albums);
      } catch (err) {
        console.error("Error fetching artist:", err);
      }
    };
    fetchArtist();
  }, [name]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <img
          src={artist.profilePic}
          alt={artist.name}
          className="w-48 h-48 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <p className="mt-2 text-gray-700">{artist.bio}</p>
        </div>
      </div>

      {/* Albums */}
      <h2 className="text-2xl font-bold mb-4">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <div key={album.title} className="flex flex-col items-center text-center">
            <img
              src={album.coverImg}
              alt={album.title}
              className="w-32 h-32 object-cover rounded"
            />
            <span className="mt-2 font-semibold">{album.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
