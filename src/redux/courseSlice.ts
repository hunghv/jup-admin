import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../common';
import {
  createCourse,
  fetchCourse,
  findCourseById,
} from '../services/course.service';

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
      .addCase(findCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        findCourseById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          if (action.payload) {
            state.curentCourse = action.payload.data;
            console.log(state.curentCourse)
          }
        }
      )
      .addCase(findCourseById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toastError(action.payload);
      })
      .addCase(fetchCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action: PayloadAction<any>) => {
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
        if (action?.payload?.data) {
          state.courses = [...state.courses, action?.payload?.data];
          toastSuccess('Tạo khoá học thành công');
        }
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
