import axios from 'axios';
import { AnimeReviewsResponse, Genres, GenresResponse, UsersRespones } from '../types/types';

const instance = axios.create({
  baseURL: 'https://kitsu.io/api/edge/',
});

export const animeApi = {
  fetchAnime() {
    return instance.get(`anime?sort=-averageRating`).then(({ data }) => data.data);
  },
  fetchFavoritesAnime(animeSeacrhValue: string, animeCurrentGenre: string | null) {
    return instance
      .get(
        `anime?sort=-favoritesCount&page[limit]=12${
          animeSeacrhValue !== '' ? `&filter[text]=${animeSeacrhValue}` : ''
        }${animeCurrentGenre !== null ? `&filter[genres]=${animeCurrentGenre}` : ''}`,
      )
      .then(({ data }) => data.data);
  },
  fetchOneAnime(animeId: number) {
    return instance.get(`anime/${animeId}`).then(({ data }) => data);
  },
  fetchGenresAnime(animeId: number): Promise<Array<Genres>> {
    return instance.get(`anime/${animeId}/genres`).then(({ data }) => data.data);
  },
  fetchEpisodesAnime(animeId: number) {
    return instance.get(`anime/${animeId}/episodes`).then(({ data }) => data);
  },
  fetchReviewsAnime(animeId: number): Promise<AnimeReviewsResponse> {
    return instance.get(`anime/${animeId}/reviews`).then(({ data }) => data);
  },
};

export const usersApi = {
  fetchUsers(): Promise<UsersRespones> {
    return instance.get(`users?page[limit]=20`).then(({ data }) => data);
  },
};

export const filtersApi = {
  fetchGenres(): Promise<GenresResponse> {
    return instance.get(`genres?page[limit]=20`).then(({ data }) => data);
  },
};
