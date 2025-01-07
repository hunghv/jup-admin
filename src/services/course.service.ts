import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/axiosConfig';
import { toastError, toastSuccess } from '../common';
import { CourseModel } from '../models/CourseModel';

export const fetchCourse = createAsyncThunk(
  'course/fetchCourses',
  async (params: { page: number; limit: number }) => {
    try {
      const response = await apiClient.get(
        `/api/v1/courses?page=${params.page ? params.page + 1 : 1}&limit=${params.limit ?? 10}`
      );
      if (response.status === 200)
        return {
          data: response.data.data,
          total: response.data.total,
        };
    } catch (error: any) {
      toastError(error.response.data || 'Fetch metada has error');
    }
  }
);

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (params: { data: CourseModel; file: File }) => {
    try {
      const formData = new FormData();
      formData.append('file', params.file);
      formData.append('data', JSON.stringify(params.data));
      const response = await apiClient.post('/api/v1/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200 || response.status === 201) {
        toastSuccess('Tạo mới khoá học thành công');
        return {
          data: response.data,
        };
      } else {
        toastError(
          response.data.message ||
            'Có lỗi trong quá trình tạo khoá học. vui lòng liên hệ addmin'
        );
      }
    } catch (error: any) {
      toastError(
        error.response.data ||
          'Có lỗi trong quá trình tạo khoá học. vui lòng liên hệ addmin'
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async (category: string) => {
    try {
      const response = await apiClient.get(`/api/v1/master-data/${category}`);
      return {
        data: response.data.data,
        category: category,
      };
    } catch (error: any) {
      toastError(error.response.data || 'Fetch metada has error');
    }
  }
);
