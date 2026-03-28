import { Box, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" py={3} textAlign="center" borderTop="1px solid #444">
      <Typography variant="body2" color="text.secondary">
        COMP 4513 Assignment 2 &mdash; Single Page React App
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Source on{' '}
        <Link
          href="https://github.com/thebug03040/COMP-4513-Assignment-2.git"
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
}