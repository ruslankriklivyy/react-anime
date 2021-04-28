import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { animeApi } from '../api/api';

const initialState = {
  animeItems: [] as any,
  chosenAnime: {} as any,
  genresAnime: [] as any,
  animeId: null as number | null,
};

export const getAnime = createAsyncThunk('anime/getAnimeStatus', async (props, thunkAPI) => {
  const data = await animeApi.fetchAnime();
  thunkAPI.dispatch(setAnimeItems(data));
});

export const getOneAnime = createAsyncThunk(
  'anime/getOneAnimeStatus',
  async (props: any, thunkAPI) => {
    const data = await animeApi.fetchOneAnime(props.animeId);
    thunkAPI.dispatch(setChosenAnime(data));
  },
);

export const getGenresAnime = createAsyncThunk(
  'anime/getGenresAnimeStatus',
  async (props: any, thunkApi) => {
    const data = await animeApi.fetchGenresAnime(props.animeId);
    thunkApi.dispatch(setGenresAnime(data));
  },
);

const anime = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnimeItems: (state, action) => {
      state.animeItems = action.payload;
    },
    setChosenAnime: (state, action) => {
      state.chosenAnime = action.payload;
    },
    setGenresAnime: (state, action) => {
      state.genresAnime = action.payload;
    },
    setAnimeId: (state, action) => {
      state.animeId = action.payload;
    },
  },
});

export default anime.reducer;
export const { setAnimeItems, setChosenAnime, setGenresAnime, setAnimeId } = anime.actions;
