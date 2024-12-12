import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const AccountComponent: React.FC = () => {
  const user = useSelector((state: RootState) => state.users.user);
  //   const dispatch: AppDispatch = useDispatch();
  const [formValues, setFormValues] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // dispatch(updateUser(formValues));
    alert('Profile updated successfully!');
  };
  return (
    <Box sx={{ width: { xs: '100%', md: '75%' } }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Account
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            alt={user.name}
            src={user.profilePicture}
            sx={{ width: 80, height: 80, border: '3px solid #e0e0e0' }}
          />
          <Button variant="text" color="error" sx={{ fontWeight: 'bold' }}>
            Remove
          </Button>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="Full name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Email address"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            size="small"
            disabled
          />
          <TextField
            label="Dial code"
            name="country"
            value={formValues.country}
            onChange={handleChange}
            select
            fullWidth
            size="small"
          >
            <MenuItem value="Spain">Spain</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </TextField>
          <TextField
            label="Phone number"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Biography (optional)"
            name="bio"
            value={formValues.bio}
            onChange={handleChange}
            fullWidth
            size="small"
            multiline
            rows={3}
            inputProps={{ maxLength: 200 }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button
            variant="text"
            color="inherit"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: 'none',
            }}
          >
            Save changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountComponent;
