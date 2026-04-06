import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function SortControl({ sortBy, setSortBy }) {
  return (
    <Box mb={2} maxWidth={200}>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="artist">Artist</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}