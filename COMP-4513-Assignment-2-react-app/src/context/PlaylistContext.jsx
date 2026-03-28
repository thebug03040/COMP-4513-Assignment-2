import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PlaylistContext = createContext();

const STORAGE_KEY = 'comp4513_playlists';

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

  // Load from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setPlaylists(parsed);

      // Auto-select first playlist if exists
      if (parsed.length > 0) {
        setCurrentPlaylistId(parsed[0].id);
      }
    }
  }, []);

  // Save to localStorage whenever playlists change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  // Helper: get current playlist object
  const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId) || null;

  // Helper: songs inside current playlist
  const currentSongs = currentPlaylist ? currentPlaylist.songs : [];

  // Create a new playlist
  function createPlaylist(name) {
    const newPlaylist = {
      id: Date.now(), // reference number
      name,
      songs: []
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    setCurrentPlaylistId(newPlaylist.id);
    toast.success('Playlist created');
  }

  // Delete a playlist
  function deletePlaylist(id) {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
    if (currentPlaylistId === id) {
      setCurrentPlaylistId(null);
    }
    toast.success('Playlist deleted');
  }

  // Add a song to the current playlist
  function addSongToPlaylist(songId) {
    if (!currentPlaylistId) {
      toast.error('Select or create a playlist first');
      return;
    }

    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === currentPlaylistId
          ? {
              ...p,
              songs: p.songs.includes(songId)
                ? p.songs
                : [...p.songs, songId]
            }
          : p
      )
    );

    toast.success('Song added to playlist');
  }

  // Remove a song from the current playlist
  function removeSongFromPlaylist(songId) {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === currentPlaylistId
          ? {
              ...p,
              songs: p.songs.filter((id) => id !== songId)
            }
          : p
      )
    );

    toast.success('Song removed from playlist');
  }

  const value = {
    playlists,
    currentPlaylist,
    currentPlaylistId,
    setCurrentPlaylistId,
    currentSongs,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    totalSongsInCurrent: currentSongs.length
  };

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}