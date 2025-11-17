import { useEffect, useState } from "react";
import * as postService from "../services/communityHub/discussionService";
import type { Post, GroupedPosts } from "../components/common/types/posts";
import { toast } from "react-toastify";

export function usePosts(dependencies: unknown[]) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>();

    const fetchPosts = async () => {
        try {
            const data = await postService.fetchAllPosts();
            setPosts(data);
        } catch (err) {
            console.error("Failed to load posts:", err);
            setError(`${err}`);
        }
    };

    const deletePost = async (postID: string) => {
        try {
            await postService.deletePost(postID);
            toast("Post has been deleted", {
                position: "bottom-center",
                theme: "light",
                hideProgressBar: true,
                closeButton: false,
                autoClose: 2500,
            });
            await fetchPosts();
        } catch (errorObject) {
            console.error("Failed to delete post:", errorObject);
            setError(`${errorObject}`);
        }
    };

    const groupPostsByGame = (): GroupedPosts[] => {
        const grouped: GroupedPosts[] = [];
        posts.forEach((post) => {
            const existingGroup = grouped.find((g) => g.gameID === post.gameID);

            if (existingGroup) {
            existingGroup.posts.push(post);
            } else {
            grouped.push({
                gameID: post.gameID,
                gameName: post.gameName,
                posts: [post],
            });
            }
        });

        return grouped;
    };

    useEffect(() => {
        fetchPosts();
    }, [...dependencies]);

    return {
        posts,
        error,
        deletePost,
        fetchPosts,
        groupedPosts: groupPostsByGame(),
    };
}