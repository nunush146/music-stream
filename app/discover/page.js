// app/discovery/page.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSongs, fetchAlbums, fetchArtists } from "../../services/api";
import SongCard from "../../components/SongCard";

export default function DiscoveryPage() {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, albumsRes, artistsRes] = await Promise.all([
          fetchSongs(),
          fetchAlbums(),
          fetchArtists(),
        ]);

        setSongs(songsRes.data);
        setAlbums(albumsRes.data);
        setArtists(artistsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load discovery data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading discovery...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Trending Songs */}
      {songs.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Trending Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.slice(0, 6).map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Albums */}
      {albums.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Popular Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {albums.slice(0, 6).map((album) => (
              <Link key={album._id} href={`/albums/${album._id}`}>
                <img
                  src={album.cover || "/placeholder.png"}
                  alt={album.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-center font-medium">{album.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Artists */}
      {artists.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {artists.slice(0, 6).map((artist) => (
              <Link key={artist._id} href={`/artists/${artist._id}`} className="flex flex-col items-center">
                <img
                  src={artist.image || "/placeholder.png"}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <p className="font-medium">{artist.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
