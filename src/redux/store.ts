import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
import commonReducer from './commonSlice';
import uploadReducer from './uploadSlice';
import courseReducer from './courseSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    chat: chatReducer,
    common: commonReducer,
    upload: uploadReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
