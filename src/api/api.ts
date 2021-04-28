import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://kitsu.io/api/edge/',
});

export const animeApi = {
  fetchAnime() {
    return instance.get(`anime`).then(({ data }) => data);
  },
  fetchOneAnime(animeId: number) {
    return instance.get(`anime/${animeId}`).then(({ data }) => data);
  },
  fetchGenresAnime(animeId: number) {
    return instance.get(`anime/${animeId}/genres`).then(({ data }) => data.data);
  },
};
