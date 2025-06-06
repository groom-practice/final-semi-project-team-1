'use client';

import PostItem from '@/components/PostItem';
import { Post } from '@/type/posts';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';

const getPosts = async (pageParam: number = 1): Promise<Post[]> => {
  const res = await fetch(`/api/posts?_page=${pageParam}&_limit=10`);
  if (!res.ok)
    throw new Error(`getPosts 오류: ${res.status} ${res.statusText}`);

  return res.json();
};

export default function ButtonPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (pageParam: number) => {
    try {
      setLoading(true);
      const newPosts = await getPosts(pageParam);

      const deletedIds = JSON.parse(
        localStorage.getItem('deletedPosts') || '[]'
      );
      const filteredPosts = newPosts.filter(
        (post) => !deletedIds.includes(post.id)
      );

      if (pageParam === 1) setPosts(filteredPosts);
      else setPosts((prev) => [...prev, ...filteredPosts]);

      if (newPosts.length < 10) setHasMore(false);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  return (
    <>
      {error && <p className='text-red-500'>{error}</p>}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {loading && <Spinner />}
      {!loading && hasMore && (
        <button
          onClick={handleLoadMore}
          className='w-20 mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
        >
          더보기
        </button>
      )}
      {!loading && !hasMore && (
        <p className='mt-4 text-center text-gray-500'>마지막 페이지다</p>
      )}
    </>
  );
}
