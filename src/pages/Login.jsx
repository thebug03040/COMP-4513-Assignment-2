import { Box, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      navigate('/');
    }
  };

  return (
    <Box maxWidth={400} mx="auto">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        This login is a simulated authentication system for the assignment. Use the pre-filled
        credentials or change them to see the validation.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <Button variant="text" disabled>
            Register (future feature)
          </Button>
        </Stack>
      </form>
    </Box>
  );
}