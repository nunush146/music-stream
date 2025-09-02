import axios from "axios";

// Base Axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Existing helpers
export const fetchSongs = () => api.get("/songs");
export const fetchPlaylists = () => api.get("/playlists");
export const loginUser = (data) => api.post("/login", data);
export const registerUser = (data) => api.post("/register", data);

// 🔹 New helpers you can add:

// Favorites
export const fetchFavorites = () => api.get("/favorites");
export const addFavorite = (songId) => api.post(`/favorites/${songId}`);
export const removeFavorite = (songId) => api.delete(`/favorites/${songId}`);

// Play count
export const updatePlayCount = (songId) => api.post(`/songs/${songId}/play`);

// Artists
export const fetchArtists = () => api.get("/artists");
export const fetchArtistByName = (name) => api.get(`/artist/${encodeURIComponent(name)}`);

// Albums
export const fetchAlbums = () => api.get("/albums");
export const fetchAlbumById = (id) => api.get(`/albums/${id}`);
