import * as discussionRepo from "../../apis/communityHub/communityHubRepo";
import type { Post, DiscussionPost } from "../../components/common/types/posts";

export function fetchAllPosts(): Post[] {
  return discussionRepo.getDiscussions();
}

export function createNewDiscussion(
  gameName: string,
  userName: string,
  postTitle: string,
  postMessage: string
): DiscussionPost {
  
  const errors = validateDiscussion({ userName, postTitle, postMessage });
  if (errors.size > 0) {
    throw new Error(`Validation failed`);
  }
  
  const newDiscussion: DiscussionPost = {
    postID: Date.now(),
    userName,
    postTitle,
    postMessage,
    dateCreated: new Date().toLocaleDateString(),
    likes: 0,
  };
  
  const posts = discussionRepo.getDiscussions();
  const game = posts.find(p => p.gameName === gameName);
  if (game) {
    game.discussion.push(newDiscussion);
  }
  
  return newDiscussion;
}

export function validateDiscussion(discussion: Partial<DiscussionPost>) {
  const validationErrors = new Map<string, string>();
  
  if (!discussion.userName?.trim()) {
    validationErrors.set("userName", "Username is required");
  }
  if (!discussion.postTitle?.trim()) {
    validationErrors.set("postTitle", "Title is required");
  }
  if (!discussion.postMessage?.trim()) {
    validationErrors.set("postMessage", "Message is required");
  }
  
  return validationErrors;
}