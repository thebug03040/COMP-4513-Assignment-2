import { useParams, Link as RouterLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import RadarAnalyticsChart from '../components/RadarAnalyticsChart';
import { usePlaylist } from '../context/PlaylistContext';

export default function SongDetails() {
  const { id } = useParams();
  const { songs, artists, genres } = useData();
  const { addSongToPlaylist } = usePlaylist();

const song = songs.find(s => s.id === Number(id));
const artist = artists.find(a => a.id === song.artistId);
const genre = genres.find(g => g.id === song.genreId);


  const relatedSongs = useMemo(() => {
    if (!song) return [];
    const keys = [
      'danceability',
      'energy',
      'valence',
      'liveness',
      'speechiness',
      'acousticness'
    ];

    const values = keys.map((k) => song[k] ?? 0);
    const topIndices = values
      .map((v, i) => ({ v, i }))
      .sort((a, b) => b.v - a.v)
      .slice(0, 3)
      .map((x) => x.i);

    const targetSum = topIndices.reduce((sum, idx) => sum + values[idx], 0);

    const scored = songs
      .filter((s) => s.id !== song.id)
      .map((s) => {
        const vals = keys.map((k) => s[k] ?? 0);
        const sum = topIndices.reduce((acc, idx) => acc + vals[idx], 0);
        return { song: s, diff: Math.abs(sum - targetSum) };
      })
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 4)
      .map((x) => x.song);

    return scored;
  }, [song, songs]);

  if (!song) {
    return <Typography>Song not found.</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {song.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <Typography
              component={RouterLink}
              to={`/artists/${song.artist_id}`}
              sx={{ textDecoration: 'none', color: 'secondary.main' }}
            >
              {song.artist_name}
            </Typography>
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip label={`Year: ${song.year}`} />
            {genre && <Chip label={genre.name} />}
          </Stack>

          {artist && (
            <Box mb={2}>
              <img
                src={artist.image_url || 'https://picsum.photos/400?blur=2'}
                alt={artist.name}
                style={{ maxWidth: '100%', borderRadius: 12 }}
              />
            </Box>
          )}

          <Typography variant="body1" gutterBottom>
            BPM: {song.tempo} &nbsp; | &nbsp; Popularity: {song.popularity} &nbsp; | &nbsp;
            Loudness: {song.loudness}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => addSongToPlaylist(song.id)}
            sx={{ mt: 2 }}
          >
            Add to Playlist
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Analytics
          </Typography>
          <RadarAnalyticsChart song={song} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Related Songs
      </Typography>
      {relatedSongs.length === 0 ? (
        <Typography>No related songs found.</Typography>
      ) : (
        <Stack spacing={1}>
          {relatedSongs.map((s) => (
            <Typography
              key={s.id}
              component={RouterLink}
              to={`/songs/${s.id}`}
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              {s.title} — {s.artist_name}
            </Typography>
          ))}
        </Stack>
      )}
    </Box>
  );
}