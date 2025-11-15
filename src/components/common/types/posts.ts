export interface Post {
  postID?: string;
  gameID: string;
  gameName: string;
  userName: string;
  postTitle: string;
  postMessage: string;
  likes?: number;
  dateCreated?: string;
}

export interface GroupedPosts {
  gameID: string;
  gameName: string;
  posts: Post[];
}