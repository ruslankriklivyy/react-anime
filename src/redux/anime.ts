import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { animeApi } from '../api/api';
import { Anime, AnimeRespone, AnimeReviewsResponse, Genres } from '../types/types';

const initialState = {
  animeItems: [] as Array<Anime>,
  animeFavoritesItems: [] as Array<Anime>,
  chosenAnime: {} as AnimeRespone,
  genresAnime: [] as Array<Genres>,
  episodesAnime: {} as any,
  animeReviews: null as AnimeReviewsResponse | null,
  animeId: null as number | null,
};

export const getAnime = createAsyncThunk('anime/getAnime', async (props, thunkAPI) => {
  const data = await animeApi.fetchAnime();
  thunkAPI.dispatch(setAnimeItems(data));
});

export const getFavoritesAnime = createAsyncThunk(
  'anime/getFavoritesAnime',
  async (props: any, thunkApi) => {
    const data = await animeApi.fetchFavoritesAnime(
      props.animeSeacrhValue,
      props.animeCurrentGenre,
    );
    thunkApi.dispatch(setFavoritesAnimeItems(data));
  },
);

export const getOneAnime = createAsyncThunk('anime/getOneAnime', async (props: any, thunkAPI) => {
  const data = await animeApi.fetchOneAnime(props.animeId);
  thunkAPI.dispatch(setChosenAnime(data));
});

export const getGenresAnime = createAsyncThunk(
  'anime/getGenresAnime',
  async (props: any, thunkApi) => {
    const data = await animeApi.fetchGenresAnime(props.animeId);
    thunkApi.dispatch(setGenresAnime(data));
  },
);

export const getEpisodesAnime = createAsyncThunk(
  'anime/getEpisodesAnime',
  async (props: any, thunkApi) => {
    const data = await animeApi.fetchEpisodesAnime(props.animeId);
    thunkApi.dispatch(setEpisodesAnime(data));
  },
);

export const getReviewsAnime = createAsyncThunk(
  'anime/getReviewsAnime',
  async (props: any, thunkApi) => {
    const data = await animeApi.fetchReviewsAnime(props.animeId);
    thunkApi.dispatch(setReviewsAnime(data));
  },
);

const anime = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnimeItems: (state, action) => {
      state.animeItems = action.payload;
    },
    setFavoritesAnimeItems: (state, action) => {
      state.animeFavoritesItems = action.payload;
    },
    setChosenAnime: (state, action) => {
      state.chosenAnime = action.payload;
    },
    setGenresAnime: (state, action) => {
      state.genresAnime = action.payload;
    },
    setEpisodesAnime: (state, action) => {
      state.episodesAnime = action.payload;
    },
    setReviewsAnime: (state, action) => {
      state.animeReviews = action.payload;
    },
    setAnimeId: (state, action) => {
      state.animeId = action.payload;
    },
  },
});

export default anime.reducer;
export const {
  setAnimeItems,
  setChosenAnime,
  setGenresAnime,
  setAnimeId,
  setEpisodesAnime,
  setFavoritesAnimeItems,
  setReviewsAnime,
} = anime.actions;
