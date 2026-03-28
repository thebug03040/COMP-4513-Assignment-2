import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useData } from '../context/DataContext';
import { Link as RouterLink } from 'react-router-dom';

export default function Artists() {
  const { artists, loading } = useData();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Artists
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Browse all artists. Click an artist to view their songs and details.
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {artists.map((artist) => (
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}