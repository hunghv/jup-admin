import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
  Divider,
  ListItemIcon,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* Avatar Button */}
      <IconButton onClick={handleClick}>
        <Avatar sx={{ backgroundColor: '#F9A825' }}>A</Avatar>
      </IconButton>

      {/* Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 240,
            padding: 1,
            mt: 1.5,
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            admin@flatlogic.com
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Log out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;
