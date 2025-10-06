export interface Game {
  id: string;
  gameName: string;
  image: string;
  detail: string;
  genre: string;
  ratings: string;
  platform: string;
  developer: string;
  user: string;
  saved?: boolean;
}