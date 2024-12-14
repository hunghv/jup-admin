import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, User as UserFirebase } from 'firebase/auth';
import apiClient from '../utils/axiosConfig';
import { toastSuccess, toastError } from '../common';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: {
    page: number;
    limit: number;
    sort?: string;
    filter?: string;
  }) => {
    let url = `/api/v1/user?page=${params.page ? params.page + 1 : 1}&limit=${params.limit ?? 10}`;
    if (params.filter) {
      url += `&filter=${params.filter}`;
    }

    if (params.sort) {
      url += `&sort=${params.sort}`;
    }

    const response = await apiClient.get(url);
    return response.data;
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
    console.log(user);
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
    const response = await apiClient.post(`/users/reset-password`, {
      email: email,
    });
    return response.data;
  }
);
