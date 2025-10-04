import type { GameName } from "./GameNames";

export interface DiscussionPost {
  postID: number;
  userName: string;
  dateCreated: string;
  postMessage: string;
  postTitle: string;
  likes: number;
}

export interface Post {
  gameID: number;
  gameName: GameName;
  discussion: DiscussionPost[];
}