import React from 'react';
import { AppBar, Toolbar, Box, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageDropdown from './MessageDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './Profile';
const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(to right, #212121, #FF8C00)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Duke Team
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search"
            sx={{ background: 'white' }}
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
