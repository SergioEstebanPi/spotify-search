import { configureStore } from '@reduxjs/toolkit';
import trackReducer from '../features/Track/TrackSlice';

export const store = configureStore({
  reducer: {
    track: trackReducer,
  },
});
