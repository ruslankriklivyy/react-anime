import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filtersApi } from '../api/api';
import { GenresResponse } from '../types/types';

const initialState = {
  animeSearchValue: '' as string,
  animeGenres: null as GenresResponse | null,
  currentGenre: null as string | null,
};

export const getGenres = createAsyncThunk('filters/getGenres', async (props, thunkApi) => {
  const data = await filtersApi.fetchGenres();
  thunkApi.dispatch(setGenres(data));
});

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAnimeSearchValue: (state, action) => {
      state.animeSearchValue = action.payload;
    },
    setGenres: (state, action) => {
      state.animeGenres = action.payload;
    },
    setCurrentGenre: (state, action) => {
      state.currentGenre = action.payload;
    },
  },
});

export default filters.reducer;
export const { setAnimeSearchValue, setGenres, setCurrentGenre } = filters.actions;
