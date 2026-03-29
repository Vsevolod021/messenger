import React from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';

import { useRegisterMutation } from '../../api/queries';
import { useAuthStore } from '../../model/auth.store';

const RegisterForm = () => {
  const logIn = useAuthStore((state) => state.logIn);

  const [login, setLogin] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const registerMutation = useRegisterMutation({
    onSuccess: (data) => {
      logIn(data.accessToken);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate({ login, displayName, password });
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
      <Typography variant="h5">Register</Typography>

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
        label="Display name"
        size="small"
        fullWidth
        autoComplete="name"
        required
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />

      <TextField
        label="Password"
        size="small"
        fullWidth
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {registerMutation.error ? <Alert severity="error">Failed to register</Alert> : null}

      <Button type="submit" variant="contained" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Loading...' : 'Sign up'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
