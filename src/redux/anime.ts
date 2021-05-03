import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { animeApi } from '../api/api';
import {
  Anime,
  AnimeEpisodesResponse,
  AnimeOneResponse,
  AnimeReviewsResponse,
  Genres,
} from '../types/types';

const initialState = {
  animeItems: [] as Array<Anime>,
  animeFavoritesItems: [] as Array<Anime>,
  chosenAnime: {} as AnimeOneResponse,
  genresAnime: [] as Array<Genres>,
  episodesAnime: {} as AnimeEpisodesResponse,
  animeReviews: null as AnimeReviewsResponse | null,
  animeId: null as number | null,
  isLoading: false as boolean,
  isLoadingInfo: false as boolean,
};

interface IGetFavoritesAnime {
  animeSearchValue: string;
  currentGenre: string | null;
}
interface IAnimeId {
  animeId: number | null;
}

export const getAnime = createAsyncThunk('anime/getAnime', async (props, thunkAPI) => {
  thunkAPI.dispatch(setIsLoading(false));
  const data = await animeApi.fetchAnime();
  thunkAPI.dispatch(setAnimeItems(data));
  thunkAPI.dispatch(setIsLoading(true));
});

export const getFavoritesAnime = createAsyncThunk(
  'anime/getFavoritesAnime',
  async (props: IGetFavoritesAnime, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(false));
    const data = await animeApi.fetchFavoritesAnime(props.animeSearchValue, props.currentGenre);
    thunkAPI.dispatch(setFavoritesAnimeItems(data));
    thunkAPI.dispatch(setIsLoading(true));
  },
);

export const getOneAnime = createAsyncThunk(
  'anime/getOneAnime',
  async (props: IAnimeId, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingInfo(false));
    const data = await animeApi.fetchOneAnime(props.animeId);
    thunkAPI.dispatch(setChosenAnime(data));
    thunkAPI.dispatch(setIsLoadingInfo(true));
  },
);

export const getGenresAnime = createAsyncThunk(
  'anime/getGenresAnime',
  async (props: IAnimeId, thunkApi) => {
    const data = await animeApi.fetchGenresAnime(props.animeId);
    thunkApi.dispatch(setGenresAnime(data));
  },
);

export const getEpisodesAnime = createAsyncThunk(
  'anime/getEpisodesAnime',
  async (props: IAnimeId, thunkApi) => {
    const data = await animeApi.fetchEpisodesAnime(props.animeId);
    thunkApi.dispatch(setEpisodesAnime(data));
  },
);

export const getReviewsAnime = createAsyncThunk(
  'anime/getReviewsAnime',
  async (props: IAnimeId, thunkApi) => {
    const data = await animeApi.fetchReviewsAnime(props.animeId);
    thunkApi.dispatch(setReviewsAnime(data));
  },
);

const anime = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnimeItems: (state, action: PayloadAction<Array<Anime>>) => {
      state.animeItems = action.payload;
    },
    setFavoritesAnimeItems: (state, action: PayloadAction<Array<Anime>>) => {
      state.animeFavoritesItems = action.payload;
    },
    setChosenAnime: (state, action: PayloadAction<AnimeOneResponse>) => {
      state.chosenAnime = action.payload;
    },
    setGenresAnime: (state, action: PayloadAction<Array<Genres>>) => {
      state.genresAnime = action.payload;
    },
    setEpisodesAnime: (state, action: PayloadAction<AnimeEpisodesResponse>) => {
      state.episodesAnime = action.payload;
    },
    setReviewsAnime: (state, action: PayloadAction<AnimeReviewsResponse>) => {
      state.animeReviews = action.payload;
    },
    setAnimeId: (state, action: PayloadAction<number>) => {
      state.animeId = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLoadingInfo: (state, action: PayloadAction<boolean>) => {
      state.isLoadingInfo = action.payload;
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
  setIsLoading,
  setIsLoadingInfo,
} = anime.actions;
