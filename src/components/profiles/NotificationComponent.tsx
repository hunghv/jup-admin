import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Notifications: React.FC = () => {
  const [emailSettings, setEmailSettings] = useState({
    productUpdates: true,
    securityUpdates: false,
  });

  const [phoneSettings, setPhoneSettings] = useState({
    securityUpdates: false,
  });

  const handleEmailToggle = (field: string) => {
    setEmailSettings((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePhoneToggle = (field: string) => {
    setPhoneSettings((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
        Notifications
      </Typography>
      {/* Email Notifications */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton disabled>
            <EmailIcon color="warning" />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Email
          </Typography>
        </Box>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Product updates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                News, announcements, and product updates.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  color="warning"
                  checked={emailSettings.productUpdates}
                  onChange={() => handleEmailToggle('productUpdates')}
                />
              }
              label=""
            />
          </Box>
          <Divider />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Security updates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Important notifications about your account security.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  color="warning"
                  checked={emailSettings.securityUpdates}
                  onChange={() => handleEmailToggle('securityUpdates')}
                />
              }
              label=""
            />
          </Box>
        </Box>
      </Paper>

      {/* Phone Notifications */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton disabled>
            <PhoneIcon color="warning" />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" ml={1}>
            Phone
          </Typography>
        </Box>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            py={1}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Security updates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Important notifications about your account security.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  color="warning"
                  checked={phoneSettings.securityUpdates}
                  onChange={() => handlePhoneToggle('securityUpdates')}
                />
              }
              label=""
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Notifications;
