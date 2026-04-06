import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useData } from '../context/DataContext';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  const { artists, loading } = useData();
  const featured = artists.slice(0, 4);

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 3,
          background:
            'linear-gradient(135deg, rgba(255,111,97,0.4), rgba(77,208,225,0.3))'
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Discover Your Next Favourite Track
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Browse artists, genres, and songs from the COMP 4513 music dataset with rich
          analytics and playlists.
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        Featured Artists
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {featured.map((artist) => (
            <Grid item xs={12} sm={6} md={3} key={artist.id}>
              <Card
                component={RouterLink}
                to={`/artists/${artist.id}`}
                sx={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={artist.image || 'https://picsum.photos/400?blur=2'}
                  alt={artist.name}
                />
                <CardContent>
                  <Typography variant="h6">{artist.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {artist.description || 'Click to view songs and details'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}