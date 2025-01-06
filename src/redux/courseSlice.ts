import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../common';
import { createCourse, fetchCourse } from '../services/course.service';

interface UploadState {
  file: File | null;
  loading: boolean;
  error: string | null;
  courses: any[];
  curentCourse: any | null;
  total: number;
}

const initialState: UploadState = {
  file: null,
  loading: false,
  error: null,
  total: 0,
  courses: [],
  curentCourse: {},
};

// Tạo slice
const courseSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action: PayloadAction<any>) => {
        console.log('hello', action);
        state.loading = false;
        if (action.payload) {
          state.courses = action.payload.data;
          state.total = action.payload.total;
        }
      })
      .addCase(fetchCourse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toastError(action.payload);
      })
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.courses = [...state.courses, action.payload];
        toastSuccess('Tạo mới khoá học thành công');
      })
      .addCase(createCourse.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toastError(action.payload);
      });
  },
});

// Export reducer
export default courseSlice.reducer;
