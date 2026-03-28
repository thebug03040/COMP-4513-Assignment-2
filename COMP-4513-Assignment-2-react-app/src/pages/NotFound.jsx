import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
}