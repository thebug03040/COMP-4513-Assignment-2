import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Box, Typography } from '@mui/material';
import SongList from '../components/SongList';

export default function GenreDetails() {
  const { id } = useParams();
  const { genres, songs } = useData();

  const genre = genres.find((g) => String(g.id) === id);
  const genreSongs = songs.filter((s) => s.genre_id === (genre?.id ?? -1));

  if (!genre) return <Typography>Genre not found.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {genre.name}
      </Typography>
      {genre.description && (
        <Typography variant="body1" mb={2}>
          {genre.description}
        </Typography>
      )}
      {genre.url && (
        <Typography variant="body2" mb={2}>
          More info:{' '}
          <a href={genre.url} target="_blank" rel="noopener noreferrer">
            {genre.url}
          </a>
        </Typography>
      )}

      <Typography variant="h5" mt={4} gutterBottom>
        Songs
      </Typography>
      <SongList songs={genreSongs} showAddToPlaylist />
    </Box>
  );
}