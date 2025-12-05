import * as serviceRepo from "../../apis/communityHub/communityHubRepo";
import type { Post } from "../../components/common/types/posts";

export async function fetchAllPosts() {
  const posts = await serviceRepo.getPosts();
  return posts;
}

export async function createNewPost(posts: Post, sessionToken: string) {
  return await serviceRepo.createPost(posts, sessionToken);
}

export async function updatePost(post: Post, sessionToken: string) {
  return await serviceRepo.updatePost(post, sessionToken);
}

export async function deletePost(postID: string, sessionToken: string) {
  return await serviceRepo.deletePost(postID, sessionToken);
}

export function validatePost(discussion: Partial<Post>, gameName?: string) {
  const validationErrors = new Map<string, string>();
  
  if (!discussion.postTitle?.trim()) {
    validationErrors.set("postTitle", "Title is required");
  }
  if (!discussion.postMessage?.trim()) {
    validationErrors.set("postMessage", "Message is required");
  }
  if (!gameName?.trim()) {
    validationErrors.set("gameName", "Please select a game");
  }
  
  return validationErrors;
}