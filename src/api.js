// src/api.js

const BASE_URL = 'https://comp-4513-assignment-1-lwc5.onrender.com';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });


  if (!res.ok) {

    let message = `API error: ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.error) message = data.error;
    } catch {

    }
    throw new Error(message);
  }

  if (res.status === 204) return null;

  return res.json();
}

export const api = {
  // ---------- Artists ----------
  getArtists: () => request('/api/artists'),
  getArtist: (id) => request(`/api/artists/${id}`),
  getArtistAverages: (id) => request(`/api/artists/averages/${id}`),

  // ---------- Genres ----------
  getGenres: () => request('/api/genres'),

  // ---------- Songs (base + single) ----------
  getSongs: () => request('/api/songs'),
  getSong: (id) => request(`/api/songs/${id}`),

  // ---------- Songs: sorting ----------
  // sortBy: 'artist' | 'year' | 'duration'
  getSongsSorted: (sortBy) => {
    if (!['artist', 'year', 'duration'].includes(sortBy)) {
      throw new Error('Invalid sort key');
    }
    return request(`/api/songs/sort/${sortBy}`);
  },

  // ---------- Songs: search ----------
  searchSongsTitleBegin: (term) =>
    request(`/api/songs/search/begin/${encodeURIComponent(term)}`),

  searchSongsTitleAny: (term) =>
    request(`/api/songs/search/any/${encodeURIComponent(term)}`),

  searchSongsByYear: (year) => request(`/api/songs/search/year/${year}`),

  // ---------- Songs: by artist / genre ----------
  getSongsByArtist: (artistId) => request(`/api/songs/artist/${artistId}`),
  getSongsByGenre: (genreId) => request(`/api/songs/genre/${genreId}`),

  // ---------- Playlists ----------
  getPlaylists: () => request('/api/playlists'),
  getPlaylist: (id) => request(`/api/playlists/${id}`),

  createPlaylist: (data) =>
    request('/api/playlists', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deletePlaylist: (id) =>
    request(`/api/playlists/${id}`, {
      method: 'DELETE',
    }),

  getPlaylistSongs: (id) => request(`/api/playlists/${id}`),

  // Example shape: POST body { songId }
  addSongToPlaylist: (playlistId, songId) =>
    request(`/api/playlists/${playlistId}`, {
      method: 'POST',
      body: JSON.stringify({ songId }),
    }),

  removeSongFromPlaylist: (playlistId, songId) =>
    request(`/api/playlists/${playlistId}/${songId}`, {
      method: 'DELETE',
    }),

  getMoodSongs: (mood, count) =>
    request(`/api/mood/${encodeURIComponent(mood)}/${count}`),
};
