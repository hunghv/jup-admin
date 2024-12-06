import { createAsyncThunk } from '@reduxjs/toolkit';
import { User as UserFirebase } from 'firebase/auth';
import apiClient from '../utils/axiosConfig';

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
    const response = await apiClient.post(`/api/v1/user`, user);
    return response.data;
  }
);

export const logout = createAsyncThunk('users/logout', async () => {
  return { message: 'logout' };
});

export const login = createAsyncThunk('users/login', async () => {
  const response = await apiClient.post(`/api/auth/login`, {
    token: localStorage.getItem('accessToken'),
  });
  return response.data.data;
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: any) => {
    const url = `/api/v1/user/${user.id}`;
    delete user['id'];
    const response = await apiClient.patch(url, user);
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
