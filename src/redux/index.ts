import { combineReducers } from '@reduxjs/toolkit';
import animeSlice from './anime';
import usersSlice from './users';
import filtersSlice from './filters';
import listSlice from './list';

export const rootReducer = combineReducers({
  anime: animeSlice,
  users: usersSlice,
  filters: filtersSlice,
  list: listSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
