import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { signup } from '../services/auth';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const storeToken = useAuthStore((s) => s.signin);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await signup({ name, email, password });
      storeToken(token, user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 480, mx: 'auto', p: 4 }} elevation={3}>
      <Typography variant="h5" gutterBottom>Create Account</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth />
        <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
        <Typography variant="body2">Already have an account? <Link to="/signin">Sign In</Link></Typography>
      </Box>
    </Paper>
  );
};

export default SignUp;
