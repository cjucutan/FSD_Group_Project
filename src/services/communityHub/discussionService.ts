import * as serviceRepo from "../../apis/communityHub/communityHubRepo";
import type { Post } from "../../components/common/types/posts";

export async function fetchAllPosts() {
  const posts = await serviceRepo.getPosts();
  return posts;
}

export async function createNewPost(posts: Post) {
  return await serviceRepo.createPost(posts);
}

export async function updatePost(post: Post) {
  return await serviceRepo.updatePost(post);
}

export async function deletePost(postID: string) {
  return await serviceRepo.deletePost(postID);
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