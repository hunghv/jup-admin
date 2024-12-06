import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import apiClient from '../utils/axiosConfig';
import { toastError, toastSuccess } from '../common';

interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
};

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
