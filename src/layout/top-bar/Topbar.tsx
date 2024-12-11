import React from 'react';
import { AppBar, Toolbar, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageDropdown from './MessageDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './Profile';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky"  elevation={1} sx={{ padding: 1, background: 'linear-gradient(90deg, rgba(180,58,77,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)' }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <NotificationDropdown />
          <MessageDropdown />
          <ProfileDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
