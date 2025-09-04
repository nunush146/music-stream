import axios from "axios";

// Base Axios instance using env variable
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g., https://music-streaming-api-seven.vercel.app/api
});

// ===== Auth =====
export const loginUser = (data) => api.post("/auth/login", data);
export const signupUser = (data) => api.post("/auth/register", data);

// ===== Artists =====
export const fetchArtists = (searchTerm = "") =>
  api.get(`/Artists${searchTerm ? `?artist=${encodeURIComponent(searchTerm)}` : ""}`);

export const fetchArtistById = (artistId) => api.get(`/Artists/${artistId}`);

export const fetchAlbumsByArtist = (artistId) =>
  api.get(`/Artists/${artistId}/albums`);

export const fetchTracksByAlbum = (artistId, albumId, trackSearch = "") =>
  api.get(
    `/Artists/${artistId}/${albumId}${trackSearch ? `?track=${encodeURIComponent(trackSearch)}` : ""}`
  );

// ===== Discover / Genres =====
export const fetchGenres = () => api.get("/Discover");

export const fetchTracksByGenre = (genreId, trackSearch = "") =>
  api.get(`/Discover/${genreId}${trackSearch ? `?track=${encodeURIComponent(trackSearch)}` : ""}`);

// ===== MyPlaylist =====
export const fetchPlaylists = () => api.get("/MyPlaylist");

export const fetchPlaylistById = (playlistId, trackSearch = "") =>
  api.get(`/MyPlaylist/${playlistId}${trackSearch ? `?track=${encodeURIComponent(trackSearch)}` : ""}`);

export const createPlaylist = (data) => api.post("/MyPlaylist", data);

// ===== Profile =====
export const fetchProfile = () => api.get("/Profile");

export const updateProfile = (data) => api.put("/Profile", data);
