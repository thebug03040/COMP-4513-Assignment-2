import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import { usePlaylist } from '../context/PlaylistContext';

export default function SongList({
  songs,
  showAddToPlaylist = false,
  showRemoveFromPlaylist = false
}) {
  const { addSongToPlaylist, removeSongFromPlaylist } = usePlaylist();

  if (!songs || songs.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No songs to display.
      </Typography>
    );
  }

  return (
    <Box mt={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Year</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id}>
              <TableCell>
                <Typography
                  component={RouterLink}
                  to={`/songs/${song.id}`}
                  sx={{ textDecoration: 'none', color: 'primary.main' }}
                >
                  {song.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  component={RouterLink}
                  to={`/artists/${song.artist_id}`}
                  sx={{ textDecoration: 'none', color: 'secondary.main' }}
                >
                  {song.artistName}
                </Typography>
              </TableCell>
              <TableCell>{song.year}</TableCell>
              <TableCell align="right">
                {showAddToPlaylist && (
                  <IconButton
                    color="primary"
                    onClick={() => addSongToPlaylist(song.id)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                )}
                {showRemoveFromPlaylist && (
                  <IconButton
                    color="error"
                    onClick={() => removeSongFromPlaylist(song.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}