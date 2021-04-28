import { combineReducers } from '@reduxjs/toolkit';
import animeSlice from './anime';

export const rootReducer = combineReducers({
  anime: animeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
