import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Divider,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { resetPassword } from '../../services';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(resetPassword(email));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f9fafc',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 5,
        }}
      >
        <Box textAlign="center" maxWidth="400px">
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Welcome to Duke Team
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            A professional template that comes with ready-to-use MUI components
            developed with one common goal in mind, help you build faster &
            beautiful applications.
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Box>
            <img
              src="https://via.placeholder.com/100x40?text=AWS"
              alt="AWS"
              style={{ maxWidth: '100%' }}
            />
            <img
              src="https://via.placeholder.com/100x40?text=Visma"
              alt="Visma"
              style={{ maxWidth: '100%' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 5,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            textAlign: 'center',
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <ArrowBackIosNewIcon fontSize="small" />
            <Link href="/sign-in" underline="hover" ml={1}>
              Back
            </Link>
          </Box>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Reset Password
          </Typography>
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            size="small"
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: '#fff',
              py: 1.5,
            }}
          >
            Send recovery link
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResetPassword;

