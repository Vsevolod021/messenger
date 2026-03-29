import React from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';

import { useLoginMutation } from '../../api/queries';
import { useAuthStore } from '../../model/auth.store';

const LoginForm = () => {
  const logIn = useAuthStore((state) => state.logIn);

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      logIn(data.accessToken);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ login, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 360,
        mx: 'auto',
        p: 2.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.75,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Login"
        size="small"
        fullWidth
        autoComplete="username"
        required
        value={login}
        onChange={(event) => setLogin(event.target.value)}
      />

      <TextField
        label="Password"
        size="small"
        fullWidth
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {loginMutation.error ? <Alert severity="error">Failed to login</Alert> : null}

      <Button type="submit" variant="contained" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Loading...' : 'Sign in'}
      </Button>
    </Box>
  );
};

export default LoginForm;
