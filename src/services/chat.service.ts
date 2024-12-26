import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/axiosConfig';
import { toastSuccess, toastError } from '../common';

export const fetchChatUsers = createAsyncThunk(
  'chat/fetchUsers',
  async (currentUserId: any) => {
    try {
      const response = await apiClient.get('/api/v1/chat/users');
      return response.data.data.filter(
        (user: any) => user.id !== currentUserId
      );
    } catch (error: any) {
      toastError(error.response.data || 'Fetch users has error');
    }
  }
);
export const fetchChatMessages = createAsyncThunk(
  'chat/messages',
  async (params: { senderId: string; receiverId: string }) => {
    try {
      const response = await apiClient.get('/api/v1/chat/messages', { params });
      return response.data.data;
    } catch (error: any) {
      toastError(error.response.data || 'Fetch messages has error');
    }
  }
);
export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async (params: {
    senderId: string;
    receiverId: string;
    messageText: string;
  }) => {
    const response = await apiClient.post(`/api/v1/chat/send`, {
      params: params,
    });
    return response.data.data;
  }
);

// export const logout = createAsyncThunk('users/logout', async () => {
//   return { message: 'logout' };
// });

// export const login = createAsyncThunk('users/login', async () => {
//   const response = await apiClient.post(`/api/v1/auth/login`, {
//     token: localStorage.getItem('accessToken'),
//   });
//   return response.data.data;
// });

// export const registerUser = createAsyncThunk(
//   'chat/registerUser',
//   async (userData: User, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.post(`/auth`, userData);
//       toastSuccess('Registration successful');
//       return response.data;
//     } catch (error: any) {
//       toastError(error.response.data || 'Registration failed');
//       return rejectWithValue(error.response.data || 'Registration failed');
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   'chat/updateUser',
//   async (user: any) => {
//     const url = `/api/v1/users/update`;
//     delete user['id'];
//     delete user['email'];
//     delete user['accountStatus'];
//     delete user['role'];
//     const response = await apiClient.post(url, user);
//     return response.data;
//   }
// );
