import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filtersApi } from '../api/api';
import { GenresResponse } from '../types/types';

const initialState = {
  animeSearchValue: '' as string,
  animeGenres: null as GenresResponse | null,
  currentGenre: null as string | null,
  currentPageNumber: 0 as number,
};

export const getGenres = createAsyncThunk('filters/getGenres', async (props, thunkApi) => {
  const data = await filtersApi.fetchGenres();
  thunkApi.dispatch(setGenres(data));
});

const filters = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAnimeSearchValue: (state, action: PayloadAction<string>) => {
      state.animeSearchValue = action.payload;
    },
    setGenres: (state, action: PayloadAction<GenresResponse>) => {
      state.animeGenres = action.payload;
    },
    setCurrentGenre: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
    },
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      state.currentPageNumber = action.payload;
    },
  },
});

export default filters.reducer;
export const {
  setAnimeSearchValue,
  setGenres,
  setCurrentGenre,
  setCurrentPageNumber,
} = filters.actions;
