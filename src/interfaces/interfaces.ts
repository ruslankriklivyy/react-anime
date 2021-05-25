export interface AttributesGenres {
  name: string;
  slug: string;
}

export interface ListTypeById {
  [id: string]: {
    type: string;
  };
}

export interface ListItem extends AttributesAnime {
  type: string;
  id: number;
}

export interface ListItems {
  [type: string]: {
    items: ListItem[];
  };
}

export interface Genres {
  attributes: AttributesGenres;
  id: string;
  type: string;
}

export interface GenresResponse {
  data: Array<Genres>;
}

export interface Image {
  large: string;
  original: string;
  small: string;
  tiny: string;
  medium?: string;
}

export interface AnimeTitles {
  en: string;
  en_jp: string;
}

export interface AttributesAnime {
  averageRating: string;
  coverImage?: Image;
  description?: string;
  episodeCount?: number;
  posterImage: Image;
  ratingRank?: number;
  slug?: string;
  synopsis: string;
  titles: AnimeTitles;
  youtubeVideoId?: string;
  startDate: string;
}

export interface Anime {
  attributes: AttributesAnime | any;
  id: string;
  type: string;
}

export interface AnimeResponse {
  data: Array<Anime>;
}

export interface AnimeOneResponse {
  data: Anime;
}

export interface ThumbnailEpisodes {
  original: string;
}

export interface AttributesAnimeEpisodes {
  id: string;
  airdate: string;
  canonicalTitle: string;
  description: string;
  length: number;
  number: number;
  seasonNumber: number;
  synopsis: string;
  thumbnail: ThumbnailEpisodes;
}

export interface AnimeEpisodes {
  attributes: AttributesAnimeEpisodes | any;
  id: string;
  type: string;
}

export interface AnimeEpisodesResponse {
  data: Array<AnimeEpisodes>;
}

export interface UsersAttributes {
  avatar: Image;
  coverImage: Image;
  name: string;
  slug: string;
  waifuOrHusbando: string;
  lifeSpentOnAnime: number;
  favoritesCount: number;
  followersCount: number;
  gender: string;
}

export interface UsersData {
  attributes: UsersAttributes;
  id: string;
  type: string;
}

export interface UsersRespones {
  data: Array<UsersData>;
}

export interface AnimeReviewsAttributes {
  content: string;
  likesCount: number;
  rating: number;
  spoiler: boolean;
}

export interface AnimeReviewsData {
  attributes: AnimeReviewsAttributes;
  id: string;
  type: string;
}

export interface AnimeReviewsResponse {
  data: Array<AnimeReviewsData>;
}

export interface Token {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  error?: string;
}
