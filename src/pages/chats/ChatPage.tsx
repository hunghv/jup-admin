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
import { io } from 'socket.io-client';
import { getUserInformation } from '../../common/localStorageHelper';
import LoadingSpinner from '../../components/spinner/Sprinner';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  fetchChatMessages,
  fetchChatUsers,
  sendChatMessage,
} from '../../services/chat.service';
import { API_URL } from '../../utils/config';

const socket = io(API_URL);

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [room] = useState('default');
  const user = getUserInformation();
  const currentUserId = user.id;
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, messages } = useSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    dispatch(fetchChatUsers(currentUserId));
  }, [currentUserId, dispatch]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('join', { userId: currentUserId, room });

    socket.on('receiveMessage', async (message) => {
      fetchMessages(message.senderId);
    });

    return () => {
      // Leave room on component unmount
      socket.emit('leaveRoom', { room });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  const userSelected = async (receiver: any) => {
    dispatch(
      fetchChatMessages({ senderId: currentUserId, receiverId: receiver.id })
    );
    setSelectedUser(receiver);
  };

  const fetchMessages = async (receiverId: any) => {
    dispatch(
      fetchChatMessages({ senderId: currentUserId, receiverId: receiverId })
    );
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    dispatch(
      sendChatMessage({
        senderId: currentUserId,
        receiverId: selectedUser.id,
        messageText: newMessage,
      })
    );

    socket.emit('sendMessage', {
      room,
      senderId: currentUserId,
      message: newMessage,
    });

    setNewMessage('');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
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
                  <Avatar src={chat.profilePictureUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${chat.fullname}`}
                  secondary={`${chat.occupation ?? ''} - ${dayjs(chat.createdAt).format('DD/MM/YYYY')}`}
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                position: 'sticky',
                top: 0,
              }}
            >
              {selectedUser && (
                <>
                  <Avatar src={selectedUser.profilePictureUrl} />{' '}
                  <Box>
                    <Typography variant="subtitle1">{`${selectedUser.fullname}`}</Typography>
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
              position: 'sticky',
              bottom: 0,
              alignItems: 'center',
              borderTop: '1px solid #e0e0e0',
              p: 2,
            }}
          >
            <Avatar src={user.profilePictureUrl} />
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
      {loading && <LoadingSpinner />}
    </>
  );
};

export default ChatPage;
