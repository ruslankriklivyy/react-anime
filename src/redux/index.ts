import { combineReducers } from '@reduxjs/toolkit';
import animeSlice from './anime';
import usersSlice from './users';
import filtersSlice from './filters';

export const rootReducer = combineReducers({
  anime: animeSlice,
  users: usersSlice,
  filters: filtersSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
