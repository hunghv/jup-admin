import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/User';
import {
  fetchChatMessages,
  fetchChatUsers,
  sendChatMessage,
} from '../services/chat.service';

interface ChatState {
  users: User[];
  loading: boolean;
  error: string | null;
  total: number;
  messages: any[];
}

const initialState: ChatState = {
  error: null,
  loading: false,
  total: 0,
  users: [],
  messages: [],
};

const chatSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      // send message
      .addCase(sendChatMessage.pending, (state) => {})
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload];
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to send message';
      })
      // fetch message
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
      })
      .addCase(fetchChatUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchChatUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
      });
  },

  reducers: {
    //   setCurrentUser: (state, action) => {
    //     state.user = action.payload;
    //     state.isAuthenticated = true;
    //   },
    //   updateRowsPerPage: (state, action: PayloadAction<number>) => {
    //     state.rowsPerPage = action.payload;
    //   },
  },
});

//   export const { updateRowsPerPage, setCurrentUser } = chatSlice.actions;
export default chatSlice.reducer;
