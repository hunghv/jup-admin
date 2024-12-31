import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
import commonReducer from './commonSlice';
const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    chat: chatReducer,
    common: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
