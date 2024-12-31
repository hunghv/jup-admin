import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/axiosConfig';
import { toastError } from '../common';

export const fetchMetadata = createAsyncThunk(
  'common/fetchMetadata',
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
