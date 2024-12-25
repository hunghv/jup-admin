import React, { useEffect, useState } from 'react';
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
import { getUserInformation } from '../../common/localStorageHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProfileDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const userData = getUserInformation();
  const [currentUser, setCurrentUser] = useState(userData);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isAuthenticated } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const user = getUserInformation();
    setCurrentUser(user);
  }, [isAuthenticated]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  function handleMenuClose(path: string): void {
    if (path === '/logout') {
      localStorage.clear();
    }
    setAnchorEl(null);
    navigate(path);
  }

  return (
    <Box>
      {/* Avatar Button */}
      <IconButton onClick={handleClick}>
        <Avatar
          alt="Admin"
          src={currentUser?.profilePicture}
          sx={{ backgroundColor: 'white', color: '#1976d2' }}
        ></Avatar>
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
            Hi {currentUser.fullname}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.role}
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
