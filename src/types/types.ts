export type AttributesGenres = {
  name: string;
  slug: string;
};

export type Genres = {
  attributes: AttributesGenres;
  id: string;
  type: string;
};

export type GenresResponse = {
  data: Array<Genres>;
};

export type Image = {
  large: string;
  original: string;
  small: string;
  tiny: string;
  medium?: string;
};

export type AnimeTitles = {
  en: string;
  en_jp: string;
};

export type AttributesAnime = {
  averageRating: string;
  coverImage: Image;
  description: string;
  episodeCount: number;
  posterImage: Image;
  ratingRank: number;
  slug: string;
  synopsis: string;
  titles: AnimeTitles;
  youtubeVideoId: string;
  startDate: string;
};

export type Anime = {
  attributes: AttributesAnime | any;
  id: string;
  type: string;
};

export type AnimeResponse = {
  data: Array<Anime>;
};

export type AnimeOneResponse = {
  data: Anime;
};

export type ThumbnailEpisodes = {
  original: string;
};

export type AttributesAnimeEpisodes = {
  id: string;
  airdate: string;
  canonicalTitle: string;
  description: string;
  length: number;
  number: number;
  seasonNumber: number;
  synopsis: string;
  thumbnail: ThumbnailEpisodes;
};

export type AnimeEpisodes = {
  attributes: AttributesAnimeEpisodes | any;
  id: string;
  type: string;
};

export type AnimeEpisodesResponse = {
  data: Array<AnimeEpisodes>;
};

export type UsersAttributes = {
  avatar: Image;
  coverImage: Image;
  name: string;
  slug: string;
  waifuOrHusbando: string;
  lifeSpentOnAnime: number;
  favoritesCount: number;
  followersCount: number;
  gender: string;
};

export type UsersData = {
  attributes: UsersAttributes;
  id: string;
  type: string;
};

export type UsersRespones = {
  data: Array<UsersData>;
};

export type AnimeReviewsAttributes = {
  content: string;
  likesCount: number;
  rating: number;
  spoiler: boolean;
};

export type AnimeReviewsData = {
  attributes: AnimeReviewsAttributes;
  id: string;
  type: string;
};

export type AnimeReviewsResponse = {
  data: Array<AnimeReviewsData>;
};

export type Token = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  error?: string;
};
