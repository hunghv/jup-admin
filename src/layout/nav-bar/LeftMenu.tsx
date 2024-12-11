import React from 'react';
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useTheme,
  Toolbar,
} from '@mui/material';
import { ReactComponent as DashboardIcon } from '../../assets/icon/Dashboard_outlined.d5948258.svg';
import { ReactComponent as ShoppingCartIcon } from '../../assets/icon/Profile_outlined.c0a824be.svg';
import { ReactComponent as LocalMallIcon } from '../../assets/icon/Documentation_outlined.a4d63b9b.svg';
import { ReactComponent as PersonIcon } from '../../assets/icon/Email_outlined.c345fb38.svg';
import { ReactComponent as EmailIcon } from '../../assets/icon/Core_outlined.43f7583b.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const LeftMenu: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { name: 'User', icon: <ShoppingCartIcon />, path: '/user' },
    { name: 'Course', icon: <LocalMallIcon />, path: '/course' },
    { name: 'Chat', icon: <PersonIcon />, path: '/chat' },
    { name: 'News', icon: <EmailIcon />, path: '/news' },
  ];

  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  function handleNavigation(path: string): void {
    navigate(path);
  }

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: '#ffffff',
      }}
      aria-label="mailbox folders"
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor:
                location.pathname === item.path ? '#e3c48b' : 'inherit',
              color: location.pathname === item.path ? 'white' : 'black',
              borderRadius: 1,
              '&:hover': {
                backgroundColor:
                  location.pathname === item.path
                    ? theme.palette.warning.light
                    : '#424242',
              },
              padding: 2,
              marginBottom: 1,
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default LeftMenu;
