import type { Post } from "../../components/common/types/posts";
import type { BaseResponse } from "../../components/common/types/BaseResponse";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;



export async function getPosts() {
  const response: Response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to Fetch Posts");
  }

  const json: BaseResponse<Post[]> = await response.json();
  return json.data;
}

export async function getPostById(postID: string) {
  const response: Response = await fetch(`${BASE_URL}/posts/${postID}`);

  if (!response.ok) {
    throw new Error(`Failed to get post with id ${postID}`);
  }

  const json: BaseResponse<Post> = await response.json();
  return json.data;
}

export async function createPost(post: Post) {
  const response: Response = await fetch(`${BASE_URL}/posts/create`, {
    method: "POST",
    body: JSON.stringify({...post}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if(!response.ok) {
    throw new Error('Failed to create a Discussion');
  }

  const json: BaseResponse<Post> = await response.json();
  return json.data;
}

export async function updatePost(post: Post) {
  const response: Response = await fetch(`${BASE_URL}/posts/update/${post.postID}`, {
    method: "PUT",
    body: JSON.stringify({ ...post }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to update post with id ${post.postID}`);
  }

  const json: BaseResponse<Post> = await response.json();
  return json.data;
}

export async function deletePost(postID: string): Promise<void> {
  const response: Response = await fetch(`${BASE_URL}/posts/delete/${postID}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`Failed to delete post with id: ${postID}`);
  }
}