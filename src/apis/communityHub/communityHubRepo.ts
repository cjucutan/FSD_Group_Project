import { discussions } from "../../components/data/MockCommunityPost";
import type { Post } from "../../components/common/types/posts";


export function getDiscussions(): Post[] {
    return discussions;
}

export function createDiscussion(discussion: Post): Post {
    discussions.push(discussion);

    return discussion;
}
