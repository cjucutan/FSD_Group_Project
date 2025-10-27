import * as discussionRepo from "../../apis/communityHub/communityHubRepo";
import type { GameName } from "../../components/common/types/GameNames";
import type { Post, DiscussionPost } from "../../components/common/types/posts";

export function fetchAllPosts(): Post[] {
  return discussionRepo.getDiscussions();
}

export async function createNewDiscussion(discussion: DiscussionPost, gameID: number, gameName: GameName) {
  return await discussionRepo.createDiscussion(discussion, gameID, gameName);
}

export function validateDiscussion(discussion: Partial<DiscussionPost>, gameName?: string) {
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
  if (!gameName?.trim()) {
    validationErrors.set("gameName", "Please select a game");
  }
  
  return validationErrors;
}