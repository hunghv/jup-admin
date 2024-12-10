import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  InputBase,
  IconButton,
  Badge,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

const Topbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#333',
        color: 'white',
        boxShadow: 'none',
        padding: '0 20px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Search Box */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#444',
            borderRadius: 2,
            px: 2,
            color: '#ccc',
          }}
        >
          <SearchIcon sx={{ width: '24px', height: '24px' }} />
          <InputBase
            placeholder="Search"
            sx={{
              ml: 1,
              flex: 1,
              color: 'white',
              fontSize: '0.875rem',
            }}
          />
        </Box>

        {/* Icons Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon
                sx={{ color: '#fff', width: '24px', height: '24px' }}
              />
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={1} color="success">
              <MailIcon sx={{ color: '#fff' }} />
            </Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: '#f39c12', color: 'white' }}>A</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
