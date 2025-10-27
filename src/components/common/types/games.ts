import { Platform } from "./platform";
import type { Genre } from "./genre";

export interface Game {
  id: string;
  gameName: string;
  image: string;
  detail: string;
  genre: Genre;
  ratings: string;
  platform: Platform;
  developer: string;
  user: string;
  saved?: boolean;
}
