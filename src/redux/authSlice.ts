import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import apiClient from '../utils/axiosConfig';
import { toastError, toastSuccess } from '../common';
import { login } from '../services';

interface RegisterState {
  loading: boolean;
  success: boolean;
  error: string | null;
  user: any;
  isAuthenticated: boolean;
  loginTrigger: boolean;
}

const initialState: RegisterState = {
  loading: false,
  success: false,
  error: null,
  isAuthenticated: false,
  user: {},
  loginTrigger: false,
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
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = {
          ...action.payload,
          id: action.payload.id,
          name: action.payload.fullname,
          email: action.payload.email,
          phone: action.payload.phone,
          country: action.payload.country,
          title: 'Golang Developer',
          bio: action.payload.bio,
          profilePicture: action.payload.profilePictureUrl,
          isAuthenticated: true,
        };
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        sessionStorage.setItem('UserInformation', JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        toastError('Login đã sảy ra lỗi!');
        state.error = action.error.message || 'Login đã sảy ra lỗi!';
        state.loading = false;
      })
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
