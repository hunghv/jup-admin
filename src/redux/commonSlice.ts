import { createSlice } from '@reduxjs/toolkit';
import { fetchMetadata } from '../services/common.service';

interface ChatState {
  loading: boolean;
  error: string | null;
  countries: any[];
  genders: any[];
}

const initialState: ChatState = {
  error: null,
  loading: false,
  countries: [],
  genders: [],
};

const commonSlice = createSlice({
  name: 'metadata',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadata.pending, (state) => {})
      .addCase(fetchMetadata.fulfilled, (state, action) => {
        if (action.payload?.category === 'gender') {
          state.genders = action.payload?.data.map((m: any) => {
            return {
              key: m.key,
              value: m.value,
            };
          });
        }

        if (action.payload?.category === 'country') {
          state.countries = action.payload?.data.map((m: any) => {
            return {
              key: m.key,
              value: m.value,
            };
          });
        }
      })
      .addCase(fetchMetadata.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to send message';
      });
  },

  reducers: {},
});

export default commonSlice.reducer;
