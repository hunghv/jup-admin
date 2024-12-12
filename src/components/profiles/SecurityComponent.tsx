import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const loginHistory = [
  {
    type: 'Credential login',
    time: '12:16 PM Nov 25, 2024',
    ip: '95.130.17.84',
    userAgent: 'Chrome, Mac OS 10.15.7',
  },
  {
    type: 'Credential login',
    time: '11:56 AM Nov 25, 2024',
    ip: '95.130.17.84',
    userAgent: 'Chrome, Mac OS 10.15.7',
  },
];

const Security: React.FC = () => {
  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formValues.newPassword !== formValues.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password updated successfully!');
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#f9fafc',
        minHeight: '100vh',
        width: { xs: '100%', md: '75%' },
      }}
    >
      <Typography variant="h4" mb={3}>
        Security
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton disabled>
            <LockIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Change password
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Old password"
            type="password"
            name="oldPassword"
            value={formValues.oldPassword}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="New password"
            type="password"
            name="newPassword"
            value={formValues.newPassword}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Re-type new password"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ mb: 3 }}
          />
          <Box textAlign="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Paper>
      <br />
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <IconButton disabled>
            <AccessTimeIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Login history
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                  Login type
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                  IP address
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                  User agent
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loginHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold">
                      {item.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      on {item.time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.ip}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.userAgent}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Security;
