'use client';

import Spinner from '@/components/Spinner';
import { Post } from '@/type/posts';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

const getPostById = async (id: number): Promise<Post> => {
  const res = await fetch(`/api/posts/${id}`);
  if (!res.ok)
    throw new Error(`getPostById 오류: ${res.status} ${res.statusText}`);

  return res.json();
};

const updatePost = async (updatedPost: Post): Promise<Post> => {
  const res = await fetch(`/api/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  if (!res.ok)
    throw new Error(`updatePost 오류: ${res.status} ${res.statusText}`);

  return res.json();
};

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!post) return;
    setSubmitting(true);

    try {
      const updatedPost = { ...post, title, body };
      await updatePost(updatedPost);
      alert('수정 성공');

      localStorage.setItem(`post_${post.id}`, JSON.stringify(updatedPost));
      router.push(`/posts/${post.id}`);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const savedPost = localStorage.getItem(`post_${id}`);
        let postData: Post;

        if (savedPost) postData = JSON.parse(savedPost);
        else postData = await getPostById(Number(id));

        setPost(postData);
        setTitle(postData.title);
        setBody(postData.body);
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className='max-w-2xl mx-auto mt-8 p-4'>
      <button
        onClick={() => router.back()}
        className='underline text-slate-500 text-sm mb-4'
      >
        이전 페이지 돌아가기
      </button>
      <h1 className='text-2xl font-bold mb-4'>게시글 수정</h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <input
          className='border p-3 w-full text-lg rounded-md shadow-sm'
          placeholder='제목'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <textarea
          className='border p-3 w-full h-52 text-lg rounded-md shadow-sm resize-none'
          placeholder='내용'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={submitting}
        />
        <button
          type='submit'
          disabled={submitting}
          className='bg-blue-500 text-white px-6 py-3 rounded-md'
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
