import { useEffect, useState } from 'react';
import { Comment, Post, User } from '@/type/posts';

const getPostById = async (id: number): Promise<Post> => {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok)
    throw new Error(`getPostById 오류: ${res.status} ${res.statusText}`);

  return res.json();
};

const getUserById = async (userId: number): Promise<User> => {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok)
    throw new Error(`getUserById 오류: ${res.status} ${res.statusText}`);

  return res.json();
};

const getCommentsByPostId = async (id: number): Promise<Comment[]> => {
  const res = await fetch(`/api/posts/${id}/comments`);
  if (!res.ok)
    throw new Error(
      `getCommentsByPostId 오류: ${res.status} ${res.statusText}`
    );

  return res.json();
};

function usePostItem(id: string | string[] | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const savedPost = localStorage.getItem(`post_${id}`);
        let getPostIdData: Post;

        if (savedPost) getPostIdData = JSON.parse(savedPost);
        else getPostIdData = await getPostById(Number(id));

        setPost(getPostIdData);

        const [getUserData, getCommentsData] = await Promise.all([
          getUserById(getPostIdData.userId),
          getCommentsByPostId(Number(id)),
        ]);

        setUser(getUserData);
        setComments(getCommentsData);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { post, user, comments, loading };
}

export default usePostItem;
