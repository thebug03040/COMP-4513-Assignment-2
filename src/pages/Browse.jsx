import { Box, Grid, Typography } from '@mui/material';
import { useData } from '../context/DataContext';
import { useMemo, useState } from 'react';
import FiltersPanel from '../components/FiltersPanel';
import SortControl from '../components/SortControl';
import SongList from '../components/SongList';

export default function Browse() {
  const { songs, artists, genres, loading } = useData();

  const [titleFilter, setTitleFilter] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('title');

  const years = useMemo(
    () => Array.from(new Set(songs.map((s) => s.year))).sort(),
    [songs]
  );

  const toggleYear = (y) =>
    setSelectedYears((prev) =>
      prev.includes(y) ? prev.filter((v) => v !== y) : [...prev, y]
    );

  const toggleArtist = (id) =>
    setSelectedArtists((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );

  const toggleGenre = (id) =>
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );

  const clearAll = () => {
    setTitleFilter('');
    setSelectedYears([]);
    setSelectedArtists([]);
    setSelectedGenres([]);
  };

  const filteredSongs = useMemo(() => {
    let result = [...songs];

    if (titleFilter.trim()) {
      const q = titleFilter.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.artistName.toLowerCase().includes(q)
      );
    }

    if (selectedYears.length > 0) {
      result = result.filter((s) => selectedYears.includes(s.year));
    }

    if (selectedArtists.length > 0) {
      result = result.filter((s) => selectedArtists.includes(s.artistId));
    }

    if (selectedGenres.length > 0) {
      result = result.filter((s) => selectedGenres.includes(s.genreId));
    }

    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return a.year - b.year;
      if (sortBy === 'artist') return a.artistName.localeCompare(b.artistName);
      return 0;
    });

    return result;
  }, [songs, titleFilter, selectedYears, selectedArtists, selectedGenres, sortBy]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Songs
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} lg={3}>
            <FiltersPanel
              titleFilter={titleFilter}
              setTitleFilter={setTitleFilter}
              years={years}
              selectedYears={selectedYears}
              toggleYear={toggleYear}
              artists={artists}
              selectedArtists={selectedArtists}
              toggleArtist={toggleArtist}
              genres={genres}
              selectedGenres={selectedGenres}
              toggleGenre={toggleGenre}
              clearAll={clearAll}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <SortControl sortBy={sortBy} setSortBy={setSortBy} />
            {filteredSongs.length === 0 ? (
              <Typography>No songs match the current filters.</Typography>
            ) : (
              <SongList songs={filteredSongs} showAddToPlaylist />
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
}