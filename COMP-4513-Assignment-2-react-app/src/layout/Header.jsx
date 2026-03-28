import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePlaylist } from '../context/PlaylistContext';
import AboutDialog from '../components/AboutDialog';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { currentPlaylist, totalSongsInCurrent } = usePlaylist();
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 700 }}
            >
              A2 Music
            </Typography>
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/artists" color="inherit">
              Artists
            </Button>
            <Button component={RouterLink} to="/genres" color="inherit">
              Genres
            </Button>
            <Button component={RouterLink} to="/songs" color="inherit">
              Songs
            </Button>
            {isLoggedIn && (
              <Button component={RouterLink} to="/playlists" color="inherit">
                Playlists
              </Button>
            )}
            <Button color="inherit" onClick={() => setAboutOpen(true)}>
              About
            </Button>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            {isLoggedIn && (
              <Badge
                color="secondary"
                badgeContent={totalSongsInCurrent}
                overlap="rectangular"
              >
                <Typography variant="body2">
                  {currentPlaylist ? currentPlaylist.name : 'No Playlist'}
                </Typography>
              </Badge>
            )}
            {!isLoggedIn ? (
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
            ) : (
              <Button variant="outlined" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}