import React from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePlaylist } from '../context/PlaylistContext';
import SongList from '../components/SongList';

export default function Playlists() {
  const {
    playlists,
    currentPlaylist,
    currentPlaylistId,
    setCurrentPlaylistId,
    createPlaylist,
    deletePlaylist,
    currentSongs
  } = usePlaylist();

  const [newName, setNewName] = React.useState('');

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createPlaylist(newName.trim());
    setNewName('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Playlists
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h6">Your Playlists</Typography>
            <List dense sx={{ border: '1px solid #444', borderRadius: 2 }}>
              {playlists.map((pl) => (
                <ListItemButton
                  key={pl.id}
                  selected={pl.id === currentPlaylistId}
                  onClick={() => setCurrentPlaylistId(pl.id)}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlaylist(pl.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={pl.name}
                    secondary={`${pl.song_count ?? (pl.songs?.length || 0)} songs`}
                  />
                </ListItemButton>
              ))}
              {playlists.length === 0 && (
                <Typography variant="body2" p={2}>
                  No playlists yet. Create one below.
                </Typography>
              )}
            </List>

            <Stack direction="row" spacing={1}>
              <TextField
                label="New playlist name"
                size="small"
                fullWidth
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button variant="contained" onClick={handleCreate}>
                +
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            {currentPlaylist ? currentPlaylist.name : 'No playlist selected'}
          </Typography>
          <SongList songs={currentSongs} showRemoveFromPlaylist />
        </Grid>
      </Grid>
    </Box>
  );
}