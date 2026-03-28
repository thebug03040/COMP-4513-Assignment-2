import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Box, Typography } from '@mui/material';
import SongList from '../components/SongList';

export default function ArtistDetails() {
  const { id } = useParams();
  const { artists, songs } = useData();

  const artist = artists.find(a => a.id === Number(id));
  const artistSongs = songs.filter(s => s.artistId === artist.id);

  if (!artist) return <Typography>Artist not found.</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {artist.name}
      </Typography>
      {artist.image_url && (
        <Box mb={2}>
          <img
            src={artist.image_url}
            alt={artist.name}
            style={{ maxWidth: '100%', borderRadius: 12 }}
          />
        </Box>
      )}
      {artist.description && (
        <Typography variant="body1" mb={2}>
          {artist.description}
        </Typography>
      )}
      {artist.url && (
        <Typography variant="body2" mb={2}>
          Website:{' '}
          <a href={artist.url} target="_blank" rel="noopener noreferrer">
            {artist.url}
          </a>
        </Typography>
      )}

      <Typography variant="h5" mt={4} gutterBottom>
        Songs
      </Typography>
      <SongList songs={artistSongs} showAddToPlaylist />
    </Box>
  );
}
