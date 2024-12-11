import React, { useState } from 'react';
import {
  Menu,
  IconButton,
  Typography,
  Box,
  Divider,
  ListItemAvatar,
  ListItemText,
  Avatar,
  List,
  ListItem,
  Badge,
  Button,
} from '@mui/material';
import { ReactComponent as EmailIcon } from '../../assets/icon/messages.42686513.svg';

const MessageDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Sample notifications grouped by time
  const notifications = [
    {
      group: 'Today',
      items: [
        {
          id: 1,
          name: 'Elena Bureeva',
          message: 'Good news!',
          avatar: '',
          badge: 2,
        },
      ],
    },
    {
      group: 'Yesterday',
      items: [
        {
          id: 2,
          name: 'Jane Tomson',
          message: 'I want to create new admin template ...',
          avatar: '',
          badge: 1,
        },
        {
          id: 3,
          name: 'Anna Bureeva',
          message: 'Good news!',
          avatar: '',
          badge: 1,
        },
      ],
    },
  ];

  return (
    <Box>
      {/* Notification Bell */}
      <IconButton onClick={handleClick}>
        <Badge badgeContent={5} color="error">
          <EmailIcon />
        </Badge>
      </IconButton>

      {/* Notification Menu */}
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
        <Box sx={{ paddingBottom: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            New Messages
          </Typography>
          <Typography variant="body2" color="text.secondary">
            5 new messages
          </Typography>
        </Box>
        <Divider sx={{ marginY: 1 }} />

        {/* Notifications List */}
        {notifications.map((group, index) => (
          <Box key={index} sx={{ marginBottom: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ marginBottom: 1, paddingLeft: 2 }}
            >
              {group.group}
            </Typography>
            <List>
              {group.items.map((notification) => (
                <ListItem
                  alignItems="flex-start"
                  key={notification.id}
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
                        {notification.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.primary">
                        {notification.message}
                      </Typography>
                    }
                  />
                  <Badge
                    badgeContent={notification.badge}
                    color="warning"
                    sx={{ marginLeft: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
        <Divider sx={{ marginY: 1 }} />

        {/* See More */}
        <Box sx={{ textAlign: 'center', paddingTop: 1 }}>
          <Button
            variant="text"
            onClick={handleClose}
            sx={{ fontWeight: 'bold', color: '#F9A825' }}
          >
            See more
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default MessageDropdown;
