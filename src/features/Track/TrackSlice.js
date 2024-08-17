import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    metadata: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchTrackRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchTrackSuccess: (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.metadata = action.payload;
    },
    fetchTrackFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchTrackRequest, fetchTrackSuccess, fetchTrackFailure } = trackSlice.actions;

export default trackSlice.reducer;
