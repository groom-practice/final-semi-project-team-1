import {
  getCommentsByPostId,
  getPostById,
  getUserById,
} from "@/app/api/posts/route";
import { Comment, Post, User } from "@/type/posts";
import { useEffect, useState } from "react";

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
