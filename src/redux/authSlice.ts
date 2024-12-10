import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastError } from '../common';
import { login, registerUser } from '../services';

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
        localStorage.setItem('UserInformation', JSON.stringify(state.user));
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
