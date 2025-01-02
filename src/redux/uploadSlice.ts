import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadFile } from '../services';

// Định nghĩa kiểu dữ liệu cho trạng thái
interface UploadState {
  file: File | null;
  loading: boolean;
  error: string | null;
}

// Giá trị mặc định cho trạng thái
const initialState: UploadState = {
  file: null,
  loading: false,
  error: null,
};

// Tạo slice
const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.file = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer
export default uploadSlice.reducer;
