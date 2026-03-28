import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Genres from './pages/Genres';
import Browse from './pages/Browse';
import SongDetails from './pages/SongDetails';
import ArtistDetails from './pages/ArtistDetails';
import GenreDetails from './pages/GenreDetails';
import Playlists from './pages/Playlists';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/songs" element={<Browse />} />
        <Route path="/songs/:id" element={<SongDetails />} />
        <Route path="/artists/:id" element={<ArtistDetails />} />
        <Route path="/genres/:id" element={<GenreDetails />} />
        <Route
          path="/playlists"
          element={isLoggedIn ? <Playlists /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
