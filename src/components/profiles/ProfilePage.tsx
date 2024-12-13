import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GroupIcon from '@mui/icons-material/Group';
import ExtensionIcon from '@mui/icons-material/Extension';
import { Outlet, useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('profile');
  const navigate = useNavigate();

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    navigate(menu);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        p: 3,
        backgroundColor: '#f9fafc',
        minHeight: '100vh',
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: { xs: '100%', md: '25%' },
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Personal
        </Typography>
        <List>
          <ListItemButton
            selected={selectedMenu === 'account'}
            onClick={() => handleMenuSelect('account')}
          >
            <ListItemIcon>
              <AccountCircleIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
          <ListItemButton
            selected={selectedMenu === 'notifications'}
            onClick={() => handleMenuSelect('notifications')}
          >
            <ListItemIcon>
              <NotificationsIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
          <ListItemButton
            selected={selectedMenu === 'Security'}
            onClick={() => handleMenuSelect('Security')}
          >
            <ListItemIcon>
              <SecurityIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Security" />
          </ListItemButton>
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Organization
        </Typography>
        <List>
          <ListItemButton
            selected={selectedMenu === 'Billing & Plans'}
            onClick={() => handleMenuSelect('Billing & Plans')}
          >
            <ListItemIcon>
              <CreditCardIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Billing & Plans" />
          </ListItemButton>
          <ListItemButton
            selected={selectedMenu === 'Team'}
            onClick={() => handleMenuSelect('Team')}
          >
            <ListItemIcon>
              <GroupIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItemButton>
          <ListItemButton
            selected={selectedMenu === 'Integrations'}
            onClick={() => handleMenuSelect('Integrations')}
          >
            <ListItemIcon>
              <ExtensionIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItemButton>
        </List>
      </Paper>
      <Outlet></Outlet>
    </Box>
  );
};

export default AccountPage;
