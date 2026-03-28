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
    async function load() {
      try {
        setLoading(true);

        const [rawArtists, rawGenres, rawSongs] = await Promise.all([
          api.getArtists(),
          api.getGenres(),
          api.getSongs()
        ]);

        // 🔥 Normalize artists
        const artists = rawArtists.map(a => ({
          id: a.artist_id,
          name: a.artist_name,
          type: a.type_name,
          image: a.artist_image_url,
          url: a.spotify_url,
          description: a.spotify_desc
        }));

        // 🔥 Normalize genres
        const genres = rawGenres.map(g => ({
          id: g.genre_id,
          name: g.genre_name
        }));

        // 🔥 Normalize songs
        const songs = rawSongs.map(s => ({
          id: s.song_id,
          title: s.title,
          artistId: s.artist_id,
          genreId: s.genre_id,
          year: s.year,
          bpm: s.bpm,
          energy: s.energy,
          danceability: s.danceability,
          loudness: s.loudness,
          liveness: s.liveness,
          valence: s.valence,
          duration: s.duration,
          acousticness: s.acousticness,
          speechiness: s.speechiness,
          popularity: s.popularity,
          artistName: s.artist_name,
          genreName: s.genre_name
        }));

        setArtists(artists);
        setGenres(genres);
        setSongs(songs);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <DataContext.Provider value={{ artists, genres, songs, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}