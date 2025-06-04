'use client';

import {
  getCommentsByPostId,
  getPostById,
  getUserById,
} from '@/app/api/posts/route';
import { useEffect, useState } from 'react';
import { Post, User, Comment } from '@/type/posts';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const handleDelete = () => {
    const deleted = JSON.parse(localStorage.getItem('deletedPosts') || '[]');
    const updated = [...deleted, Number(id)];
    localStorage.setItem('deletedPosts', JSON.stringify(updated));
    router.push('/posts');
  };

  useEffect(() => {
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

  if (loading) return <Spinner />;
  if (!post || !user) return <p>데이터를 불러올 수 없음</p>;

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <div className='p-4 space-y-4 bg-white rounded shadow'>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
        <p className='text-gray-700 whitespace-pre-wrap'>{post.body}</p>
        <div>
          <h2 className='font-semibold mt-4 text-blue-700'>작성자</h2>
          <p>
            {user.name} ({user.email})
          </p>
        </div>
        <div>
          <h2 className='font-semibold mt-4 text-blue-700'>
            댓글 ({comments.length})
          </h2>
          <ul className='list-disc ml-4 space-y-2'>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p className='font-medium'>
                  {comment.name} ({comment.email})
                </p>
                <p className='text-sm whitespace-pre-wrap'>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex p-4 justify-end'>
        <Link
          href={`/posts/${id}/edit`}
          className='bg-blue-600 text-white text-md px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300 mr-4'
        >
          수정
        </Link>
        <button
          onClick={handleDelete}
          className='bg-slate-400 text-white text-md px-4 py-2 rounded cursor-pointer hover:bg-slate-500 transition-all duration-300'
        >
          삭제
        </button>
      </div>
    </div>
  );
}
