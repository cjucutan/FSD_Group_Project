import { discussions } from "../../components/data/MockCommunityPost";
import type { Post, DiscussionPost } from "../../components/common/types/posts";
import type { GameName } from "../../components/common/types/GameNames";


export function getDiscussions(): Post[] {
    return discussions;
}

export function createDiscussion(discussion: DiscussionPost, gameID: number, gameName: GameName): Post {
  const newPost: Post = {
    gameID,
    gameName,
    discussion: [discussion],
  };

  discussions.push(newPost);

  return newPost;
}
