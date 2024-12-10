import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Box,
} from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactComponent as DashboardIcon } from "../../assets/icon/Dashboard_outlined.d5948258.svg";
const drawerWidth = 240;

const LeftMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');
  const [openSubmenu, setOpenSubmenu] = useState<boolean>(true);

  const handleSubmenuToggle = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <DashboardIcon/> },
    { id: 'E-commerce', label: 'E-commerce', icon: <ShoppingCartIcon /> },
    { id: 'Package', label: 'Package', icon: <FolderIcon /> },
    { id: 'Profile', label: 'Profile', icon: <PersonIcon /> },
    { id: 'Email', label: 'Email', icon: <EmailIcon /> },
    { id: 'Documentation', label: 'Documentation', icon: <DescriptionIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#f39c12',
          textAlign: 'center',
          padding: '16px 0',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Flatlogic One
        </Typography>
      </Box>
      <Divider />

      {/* Main Menu */}
      <List>
        <Typography
          variant="body2"
          sx={{ px: 2, mt: 2, color: '#6c757d', fontWeight: 'bold' }}
        >
          APP
        </Typography>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => setActiveItem(item.id)}
          >
            <ListItemButton
              sx={{
                backgroundColor: activeItem === item.id ? '#ffe0b2' : 'inherit',
                color: activeItem === item.id ? 'white' : '#6c757d',
                '&:hover': {
                  backgroundColor: '#ffe0b2',
                  color: '#f39c12',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeItem === item.id ? 'white' : '#f39c12',
                  minWidth: '40px',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Submenu Example */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleSubmenuToggle}>
            <ListItemIcon>
              <FolderIcon sx={{ color: '#f39c12' }} />
            </ListItemIcon>
            <ListItemText primary="UI Elements" />
            {openSubmenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Notifications" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Charts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Icons" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />

      {/* Footer Menu */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#f39c12' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#f39c12' }} />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon sx={{ color: '#f39c12' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftMenu;
