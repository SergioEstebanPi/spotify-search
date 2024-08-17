import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './features/track/trackSlice';

export const store = configureStore({
  reducer: {
    track: trackReducer,
  },
});
