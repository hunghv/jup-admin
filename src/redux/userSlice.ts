import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';
import {
  createUser,
  deleteUser,
  fetchUsers,
  logout,
  resetPassword,
  updateUser,
} from '../services';
import { ROWS_PER_PAGE } from '../common/constant';
import { toastError, toastSuccess } from '../common';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  rowsPerPage: number;
  user: any;
  isAuthenticated: boolean;
  loginTrigger: boolean;
}
const initialState: UserState = {
  error: null,
  loading: false,
  total: 0,
  users: [],
  page: 0,
  rowsPerPage: ROWS_PER_PAGE,
  isAuthenticated: false,
  user: {},
  loginTrigger: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.rowsPerPage = action.payload.limit;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = [action.payload, ...state.users];
        state.total += 1;
        if (state.users.length > state.rowsPerPage) {
          state.users = state.users.slice(0, state.rowsPerPage);
        }
        state.loading = false;
        toastSuccess('Tạo tài khoản thành công');
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = {
          ...action.payload,
          id: action.payload.id,
          name: action.payload.fullname,
          email: action.payload.email,
          phone: action.payload.phone,
          country: action.payload.country,
          title: 'NestJs Developer',
          bio: action.payload.bio,
          profilePicture: action.payload.profilePictureUrl,
          loginTrigger: true,
          isAuthenticated: true,
        };
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        localStorage.setItem('UserInformation', JSON.stringify(state.user));
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        toastSuccess('Cập nhật tài khoản thành công');
      })
      .addCase(updateUser.rejected, (state, action) => {
        toastError('Cập nhật tài khoản đã sảy ra lỗi!');
        state.error = action.error.message || 'Login đã sảy ra lỗi!';
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Reset password đã sảy ra lỗi!';
        toastError('Reset password đã sảy ra lỗi!');
      }) // Create user
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.users = [action.payload, ...state.users];
          state.total += 1;
          if (state.users.length > state.rowsPerPage) {
            state.users = state.users.slice(0, state.rowsPerPage);
          }
          toastSuccess('Reset password Thành công! vui lòng check mail.');
        }
      )
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        sessionStorage.clear();
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
        toastError(state.error);
      }) // Create user
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.total -= 1;
        state.users = state.users.filter((user) => user.id !== action.payload);
        toastSuccess('User deleted successfully!');
      });
  },

  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const { updateRowsPerPage, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
