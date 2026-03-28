import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import toast from 'react-hot-toast';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [currentSongs, setCurrentSongs] = useState([]);

  useEffect(() => {
    loadPlaylists();
  }, []);

  useEffect(() => {
    if (currentPlaylistId) {
      loadPlaylistSongs(currentPlaylistId);
    } else {
      setCurrentSongs([]);
    }
  }, [currentPlaylistId]);

  async function loadPlaylists() {
    try {
      const data = await api.getPlaylists();
      setPlaylists(data);
      if (!currentPlaylistId && data.length > 0) {
        setCurrentPlaylistId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadPlaylistSongs(id) {
    try {
      const pl = await api.getPlaylist(id);
      setCurrentSongs(pl.songs || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function createPlaylist(name) {
    const newPl = await api.createPlaylist({ name });
    toast.success('Playlist created');
    await loadPlaylists();
    setCurrentPlaylistId(newPl.id);
  }

  async function deletePlaylist(id) {
    await api.deletePlaylist(id);
    toast.success('Playlist deleted');
    await loadPlaylists();
    if (currentPlaylistId === id) {
      setCurrentPlaylistId(null);
    }
  }

  async function addSong(songId) {
    if (!currentPlaylistId) {
      toast.error('Select or create a playlist first');
      return;
    }
    await api.addSongToPlaylist(currentPlaylistId, songId);
    toast.success('Song added to playlist');
    await loadPlaylistSongs(currentPlaylistId);
  }

  async function removeSong(songId) {
    if (!currentPlaylistId) return;
    await api.removeSongFromPlaylist(currentPlaylistId, songId);
    toast.success('Song removed from playlist');
    await loadPlaylistSongs(currentPlaylistId);
  }

  const currentPlaylist =
    playlists.find((p) => p.id === currentPlaylistId) || null;

  const value = {
    playlists,
    currentPlaylist,
    currentPlaylistId,
    setCurrentPlaylistId,
    currentSongs,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist: addSong,
    removeSongFromPlaylist: removeSong,
    totalSongsInCurrent: currentSongs.length
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}