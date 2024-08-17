import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    metadata: null,
    coverImage: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchTrackRequest: (state) => {
      state.status = 'loading';
    },
    fetchTrackSuccess: (state, action) => {
      state.status = 'succeeded';
      state.metadata = action.payload.metadata;
      state.coverImage = action.payload.coverImage;
    },
    fetchTrackFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchTrackRequest, fetchTrackSuccess, fetchTrackFailure } = trackSlice.actions;

export default trackSlice.reducer;
