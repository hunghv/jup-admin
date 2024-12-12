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
import { ReactComponent as SettingsIcon } from '../../assets/icon/Settings_outlined.afa5d5f8.svg';
import { ReactComponent as AccountCircleIcon } from '../../assets/icon/Profile_outlined.c0a824be.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icon/logout.f0f095ef.svg';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  function handleMenuClose(path: string): void {
    setAnchorEl(null);
    navigate(path);
  }

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
        <MenuItem onClick={() => handleMenuClose('/profile/security')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose('/profile/account')}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1">Account</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose('/logout')}>
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
