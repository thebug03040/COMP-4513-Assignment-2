import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const [a, g, s] = await Promise.all([
          api.getArtists(),
          api.getGenres(),
          api.getSongs()
        ]);
        if (!cancelled) {
          setArtists(a);
          setGenres(g);
          setSongs(s);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = { artists, genres, songs, loading, error };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}