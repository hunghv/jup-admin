import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, User as UserFirebase } from 'firebase/auth';
import apiClient from '../utils/axiosConfig';
import { toastSuccess, toastError } from '../common';
import { CreateUserModel } from '../models/CreateUserModel';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: {
    page: number;
    limit: number;
    sort?: string;
    filter?: string;
  }) => {
    let url = `/api/v1/users?page=${params.page ? params.page + 1 : 1}&limit=${params.limit ?? 10}`;
    if (params.filter) {
      url += `&filter=${params.filter}`;
    }

    if (params.sort) {
      url += `&sort=${params.sort}`;
    }

    const response = await apiClient.get(url);
    return response.data.data;
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: UserFirebase) => {
    const response = await apiClient.post(
      `/api/v1/users/create-firebase`,
      user
    );
    return response.data;
  }
);

export const createUserWithoutFirebase = createAsyncThunk(
  'users/createUserWithoutFirebase',
  async (user: CreateUserModel) => {
    const response = await apiClient.post(`/api/v1/users/create`, user);
    return response.data;
  }
);

export const logout = createAsyncThunk('users/logout', async () => {
  return { message: 'logout' };
});

export const login = createAsyncThunk('users/login', async () => {
  const response = await apiClient.post(`/api/v1/auth/login`, {
    token: localStorage.getItem('accessToken'),
  });
  return response.data.data;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/auth`, userData);
      toastSuccess('Registration successful');
      return response.data;
    } catch (error: any) {
      toastError(error.response.data || 'Registration failed');
      return rejectWithValue(error.response.data || 'Registration failed');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: any) => {
    const url = `/api/v1/users/update`;
    delete user['id'];
    const response = await apiClient.post(url, user);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    await apiClient.delete(`/users/${id}`);
    return id;
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (email: string) => {
    const response = await apiClient.post(`/api/v1/auth/reset-password`, {
      email: email,
    });
    return response.data;
  }
);

// Tạo action bất đồng bộ (async) để tải lên tệp
export const uploadFile = createAsyncThunk(
  'upload/file',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // API giả định của bạn để tải lên tệp
      const response = await apiClient.post('/api/v1/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.statusCode !== 200) {
        throw new Error('Tải lên tệp không thành công');
      }
      const data = response.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
