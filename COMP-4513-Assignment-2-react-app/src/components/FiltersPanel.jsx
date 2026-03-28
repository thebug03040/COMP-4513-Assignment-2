import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Chip,
  Stack
} from '@mui/material';

export default function FiltersPanel({
  titleFilter,
  setTitleFilter,
  years,
  selectedYears,
  toggleYear,
  artists,
  selectedArtists,
  toggleArtist,
  genres,
  selectedGenres,
  toggleGenre,
  clearAll
}) {
  const activeFilters = [
    ...selectedYears.map((y) => ({ type: 'year', value: y })),
    ...selectedArtists.map((id) => ({
      type: 'artist',
      value: id,
      label: artists.find((a) => a.id === id)?.name || id
    })),
    ...selectedGenres.map((id) => ({
      type: 'genre',
      value: id,
      label: genres.find((g) => g.id === id)?.name || id
    })),
    ...(titleFilter ? [{ type: 'title', value: titleFilter, label: `"${titleFilter}"` }] : [])
  ];

  const removeFilter = (f) => {
    if (f.type === 'year') toggleYear(f.value);
    if (f.type === 'artist') toggleArtist(f.value);
    if (f.type === 'genre') toggleGenre(f.value);
    if (f.type === 'title') setTitleFilter('');
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        {activeFilters.length > 0 && (
          <Button size="small" onClick={clearAll}>
            Clear All
          </Button>
        )}
      </Stack>

      <TextField
        label="Title contains"
        variant="outlined"
        size="small"
        fullWidth
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography variant="subtitle2" gutterBottom>
        Years
      </Typography>
      <FormGroup row sx={{ mb: 2 }}>
        {years.map((y) => (
          <FormControlLabel
            key={y}
            control={
              <Checkbox
                checked={selectedYears.includes(y)}
                onChange={() => toggleYear(y)}
                size="small"
              />
            }
            label={y}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" gutterBottom>
        Artists
      </Typography>
      <FormGroup sx={{ mb: 2, maxHeight: 200, overflowY: 'auto' }}>
        {artists.map((a) => (
          <FormControlLabel
            key={a.id}
            control={
              <Checkbox
                checked={selectedArtists.includes(a.id)}
                onChange={() => toggleArtist(a.id)}
                size="small"
              />
            }
            label={a.name}
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" gutterBottom>
        Genres
      </Typography>
      <FormGroup sx={{ mb: 2, maxHeight: 200, overflowY: 'auto' }}>
        {genres.map((g) => (
          <FormControlLabel
            key={g.id}
            control={
              <Checkbox
                checked={selectedGenres.includes(g.id)}
                onChange={() => toggleGenre(g.id)}
                size="small"
              />
            }
            label={g.name}
          />
        ))}
      </FormGroup>

      {activeFilters.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Active Filters
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {activeFilters.map((f, idx) => (
              <Chip
                key={`${f.type}-${f.value}-${idx}`}
                label={f.label || f.value}
                onDelete={() => removeFilter(f)}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}