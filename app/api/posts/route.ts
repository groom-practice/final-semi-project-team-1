import { Post, User, Comment } from '@/type/posts';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts?_page=${pageParam}&_limit=10`);
  if (!res.ok) {
    throw new Error(`getPosts 오류: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const getPostById = async (id: number): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) {
    throw new Error(`getPostById 오류: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const getUserById = async (userId: number): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) {
    throw new Error(`getUserById 오류: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const getCommentsByPostId = async (
  postId: number
): Promise<Comment[]> => {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!res.ok) {
    throw new Error(
      `getCommentsByPostId 오류: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
};

export const createPost = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) {
    throw new Error(`createPost 오류: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  const res = await fetch(`${BASE_URL}/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  if (!res.ok) {
    throw new Error(`updatePost 오류: ${res.status} ${res.statusText}`);
  }
  return res.json();
};

export const deletePost = async (postId: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`deletePost 오류: ${res.status} ${res.statusText}`);
  }
};
