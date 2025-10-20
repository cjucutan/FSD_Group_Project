import { Platform } from "./platform";
import { genre } from "./genre";

export interface Game {
  id: string;
  gameName: string;
  image: string;
  detail: string;
  genre: genre;
  ratings: string;
  platform: Platform;
  developer: string;
  user: string;
  saved?: boolean;
}
