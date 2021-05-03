import axios from 'axios';
import {
  Anime,
  AnimeOneResponse,
  AnimeReviewsResponse,
  Genres,
  GenresResponse,
  Token,
  UsersRespones,
} from '../types/types';

const token = JSON.parse(localStorage.getItem('token') || 'null');

const instance = axios.create({
  baseURL: 'https://kitsu.io/api/edge/',
  headers: {
    Authorization: `Bearer ${token?.access_token}`,
    'Content-Type': 'application/vnd.api+json',
  },
});

const $auth = axios.create({
  baseURL: 'https://kitsu.io/api/',
  headers: {
    CLIENT_ID: '',
    CLIENT_SECRET: '',
  },
});

export const animeApi = {
  fetchAnime(): Promise<Array<Anime>> {
    return instance.get(`anime?sort=-averageRating`).then(({ data }) => data.data);
  },
  fetchFavoritesAnime(
    animeSeacrhValue: string,
    animeCurrentGenre: string | null,
  ): Promise<Array<Anime>> {
    return instance
      .get(
        `anime?sort=-favoritesCount&page[limit]=12${
          animeSeacrhValue !== '' ? `&filter[text]=${animeSeacrhValue}` : ''
        }${animeCurrentGenre !== null ? `&filter[genres]=${animeCurrentGenre}` : ''}`,
      )
      .then(({ data }) => data.data);
  },
  fetchOneAnime(animeId: number | null): Promise<AnimeOneResponse> {
    return instance.get(`anime/${animeId}`).then(({ data }) => data);
  },
  fetchGenresAnime(animeId: number | null): Promise<Array<Genres>> {
    return instance.get(`anime/${animeId}/genres`).then(({ data }) => data.data);
  },
  fetchEpisodesAnime(animeId: number | null) {
    return instance.get(`anime/${animeId}/episodes`).then(({ data }) => data);
  },
  fetchReviewsAnime(animeId: number | null): Promise<AnimeReviewsResponse> {
    return instance.get(`anime/${animeId}/reviews`).then(({ data }) => data);
  },
};

export const usersApi = {
  fetchUsers(): Promise<UsersRespones> {
    return instance.get(`users?page[limit]=20`).then(({ data }) => data);
  },
};

export const authApi = {
  login(email: string, password: string): Promise<Token> {
    return $auth
      .post('oauth/token', {
        grant_type: 'password',
        username: email,
        password,
      })
      .then(({ data }) => {
        return data;
      });
  },
};

export const filtersApi = {
  fetchGenres(): Promise<GenresResponse> {
    return instance.get(`genres?page[limit]=20`).then(({ data }) => data);
  },
};
