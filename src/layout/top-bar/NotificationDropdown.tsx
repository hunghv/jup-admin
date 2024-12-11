import React, { useState } from 'react';
import {
  Menu,
  IconButton,
  Typography,
  Box,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { ReactComponent as NotificationsIcon } from '../../assets/icon/notify.1de68cd8.svg';
const NotificationDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Example notifications
  const notifications = [
    {
      group: 'Today',
      items: [
        {
          id: 1,
          name: 'Jim Tomson',
          message: 'removed you to the project Flatlogic One',
          avatar: '',
          time: '9:15 AM',
        },
        {
          id: 2,
          name: 'Elena Bureeva',
          message: 'invited you to the project Flatlogic One',
          avatar: '',
          time: '9:15 AM',
        },
      ],
    },
    {
      group: 'Yesterday',
      items: [
        {
          id: 3,
          name: 'Jim Tomson',
          message: 'removed you to the project Flatlogic One',
          avatar: '',
          time: '9:15 AM',
        },
      ],
    },
  ];

  return (
    <Box>
      {/* Notification Bell */}
      <IconButton onClick={handleClick}>
        <NotificationsIcon />
      </IconButton>

      {/* Popup Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 320,
            padding: 2,
            mt: 1.5,
            borderRadius: 2,
          },
        }}
      >
        {/* Header */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Notifications
        </Typography>
        <Divider sx={{ marginBottom: 1 }} />

        {/* Notifications List */}
        {notifications.map((group, index) => (
          <Box key={index}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ paddingLeft: 1, marginBottom: 0.5, display: 'block' }}
            >
              {group.group}
            </Typography>
            <List>
              {group.items.map((notification) => (
                <ListItem
                  key={notification.id}
                  alignItems="flex-start"
                  sx={{ paddingY: 1 }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={notification.name}
                      src={notification.avatar || undefined}
                      sx={{ backgroundColor: '#F9A825' }}
                    >
                      {notification.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {notification.name}{' '}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ fontWeight: 'normal', color: 'text.secondary' }}
                        >
                          {notification.message}
                        </Typography>
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Menu>
    </Box>
  );
};

export default NotificationDropdown;
