import { Platform } from "./platform";
import type { Genre } from "./genre";

export interface Game {
  id: string;
  gameName: string;
  image: string;
  detail: string;
  genre: keyof typeof Genre;
  ratings: string;
  platform: keyof typeof Platform;
  developer: string;
  user: string;
  userId: string;
  price: string;
  saved?: boolean;
}
