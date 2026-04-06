import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Link
} from '@mui/material';

export default function AboutDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>About This Site</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="body1">
            This single-page application was built for COMP 4513 Assignment 2 using React,
            Vite, React Router, MUI, react-hot-toast, and Chart.js.
          </Typography>
          <Typography variant="body1">
            It consumes the Assignment 1 music API at{' '}
            <code>/api/artists</code>, <code>/api/genres</code>, <code>/api/songs</code>, and
            playlist endpoints, and adds browsing, analytics, playlists, and a simulated
            login system.
          </Typography>
          <Typography variant="body1">
            GitHub Repo:{' '}
            <Link
              href="https://github.com/thebug03040/COMP-4513-Assignment-2.git"
              target="_blank"
              rel="noopener"
            >
              https://github.com/thebug03040/COMP-4513-Assignment-2.git
            </Link>
          </Typography>
          <Typography variant="body1">
            Credits: any external JavaScript snippets or design patterns are referenced in
            the project documentation and comments.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}