import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  IconButton,
  InputBase,
  TextField,
  Button,
  ListItemButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const socket = io('http://localhost:8080');

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState('default');
  const { user } = useSelector((state: RootState) => state.users);
  const currentUserId = user.id;
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Join default room when component mounts
    socket.emit('join', { userId: currentUserId, room });

    // Listen for incoming messages
    socket.on('receiveMessage', async (message) => {
      fetchMessages(message.senderId);
    });

    return () => {
      // Leave room on component unmount
      socket.emit('leaveRoom', { room });
    };
  }, [room]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8080/chat/users');
    setUsers(response.data.filter((user: any) => user.id !== currentUserId));
  };

  const userSelected = async (receiver: any) => {
    const response = await axios.get('http://localhost:8080/chat/messages', {
      params: { senderId: currentUserId, receiverId: receiver.id },
    });
    setSelectedUser(receiver);
    setMessages(response.data);
  };

  const fetchMessages = async (receiverId: any) => {
    const response = await axios.get('http://localhost:8080/chat/messages', {
      params: { senderId: currentUserId, receiverId: receiverId },
    });

    setMessages(response.data);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await axios.post('http://localhost:8080/chat/send', {
      senderId: currentUserId,
      receiverId: selectedUser.id,
      messageText: newMessage,
    });

    socket.emit('sendMessage', {
      room,
      senderId: currentUserId,
      message: newMessage,
    });

    setNewMessage('');
    fetchMessages(selectedUser.id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '93vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: '300px',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography variant="h6">Chats</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="small"
          >
            Group
          </Button>
        </Box>
        <Box sx={{ px: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search contacts"
            variant="outlined"
          />
        </Box>
        <List sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
          {users.map((chat: any) => (
            <ListItemButton
              key={chat.id}
              selected={selectedUser === chat.id}
              onClick={() => userSelected(chat)}
            >
              <ListItemAvatar>
                <Avatar src={chat.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={`${chat.firstName} ${chat.lastName}`}
                secondary={`${chat.email} · ${chat.createdAt}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main Chat */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {selectedUser && (
              <>
                <Avatar src={selectedUser.avatar_url} />{' '}
                <Box>
                  <Typography variant="subtitle1">{`${selectedUser.firstName} ${selectedUser.lastName}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recently active
                  </Typography>
                </Box>{' '}
              </>
            )}
          </Box>
          <Box>
            <IconButton>
              <PhotoCameraIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: 2,
            }}
          >
            <Box flex="1" overflow="auto" mb={2}>
              {messages.map((message: any) => (
                <Box
                  key={message.id}
                  display="flex"
                  justifyContent={
                    message?.sender?.id === currentUserId
                      ? 'flex-end'
                      : 'flex-start'
                  }
                  mb={1}
                >
                  <Box
                    bgcolor={
                      message?.sender?.id === currentUserId
                        ? '#e0f7fa'
                        : '#f1f1f1'
                    }
                    p={2}
                    borderRadius={4}
                  >
                    <Typography>{message.message_text}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={endOfMessagesRef}></div>
            </Box>
          </Box>
        </Box>

        {/* Message Input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #e0e0e0',
            p: 2,
          }}
        >
          <Avatar src="/assets/images/avatar/avatar-1.webp" />
          <InputBase
            sx={{
              flexGrow: 1,
              mx: 2,
              p: 1,
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
            }}
            placeholder="Leave a message"
            value={newMessage}
            disabled={!selectedUser}
            onKeyDown={handleKeyPress}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <IconButton
            color="primary"
            onClick={sendMessage}
            disabled={!selectedUser}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
