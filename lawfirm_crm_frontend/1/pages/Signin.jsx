import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

const validationSchema = Yup.object({
  emailOrUsername: Yup.string().matches(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$|^[a-zA-Z0-9_-]+$/,
    'Invalid email or username'
  ).required('Required'),
  password: Yup.string().min(8, 'Password should be minimum 8 characters').required('Required'),
});

export default function SignIn({ onLogin, onRedirect }) {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [redirect, setRedirect] = useState(false); // State for redirection

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let loginData;
        if (/^\S+@\S+\.\S+$/.test(values.emailOrUsername)) {
          loginData = {
            email: values.emailOrUsername,
            password: values.password,
          };
        } else {
          loginData = {
            username: values.emailOrUsername,
            password: values.password,
          };
        }

        const response = await axios.post('http://localhost:8000/api/token/', loginData);

        if (response.status === 200) {
          // Set state to trigger redirection
          setRedirect(true);
          setMessage('Sign in successful!');
          setSeverity('success');
          setOpen(true);
          // Call onLogin and onRedirect functions upon successful login
          onLogin(response.data);
          onRedirect();
        } else {
          setMessage('Sign in failed!');
          setSeverity('error');
          setOpen(true);
        }
      } catch (error) {
        console.error('An error occurred while logging in:', error);
        if (error.response && error.response.status === 401) {
          setMessage('Invalid email or username or password!');
        } else {
          setMessage('Sign in failed!');
        }
        setSeverity('error');
        setOpen(true);
      }
    },
  });

  if (redirect) {
    // Redirect after successful login
    window.location.href = '/dashboard'; // Change '/dashboard' to your desired redirection URL
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'primary.main',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailOrUsername"
            label="Email or Username"
            name="emailOrUsername"
            autoComplete="email" // You can use "email" for email inputs
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.emailOrUsername}
            error={formik.touched.emailOrUsername && Boolean(formik.errors.emailOrUsername)}
            helperText={formik.touched.emailOrUsername && formik.errors.emailOrUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Alert severity={severity} sx={{ width: '100%', display: open ? 'flex' : 'none' }}>
            {message}
          </Alert>
          <Grid container>
              <Link align='center' href="/api/user/credentials/v1/reset" variant="body2">
                Forgot password?
              </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
