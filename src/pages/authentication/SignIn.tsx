import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  CssBaseline,
  Divider,
  styled,
  Card,
  Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { SitemarkIcon } from './CustomIcons';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { login } from '../../services';
import { setCurrentUser } from '../../redux/userSlice';

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailLogin = async (event: any) => {
    try {
      event.preventDefault();
      const response = await signInWithEmailAndPassword(auth, email, password);

      const accessToken = await response.user.getIdToken();

      localStorage.setItem('accessToken', accessToken);

      const result = await dispatch(login());

      if (login.fulfilled.match(result)) {
        dispatch(setCurrentUser(result.payload));
        navigate('/', { replace: true });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <MuiCard variant="outlined">
          <SitemarkIcon />
          <Typography sx={{ textAlign: 'right' }}>
            <span>
              <Link to="/reset-password">Forgot password?</Link>
            </span>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={(event) => handleEmailLogin(event)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}></Typography>
          </Divider>
        </MuiCard>
      </SignUpContainer>
    </div>
  );
}

export default SignIn;
