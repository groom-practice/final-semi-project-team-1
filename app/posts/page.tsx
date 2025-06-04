'use client';

import PostItem from '@/components/PostItem';
import Toggle from '@/components/Toggle';
import { useEffect, useState } from 'react';
import { Post } from '@/type/posts';
import { getPosts } from '@/api/posts';

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageParam: number) => {
    try {
      setLoading(true);
      const newPosts = await getPosts({ pageParam });
      setPosts((prev) => [...prev, ...newPosts]);
      if (newPosts.length < 10) setHasMore(false);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return (
    <div className='flex flex-col mx-4 h-screen'>
      <div className='flex w-full h-9 justify-between items-center mb-3'>
        <p className='text-2xl font-bold'>Posts List</p>
        <Toggle />
      </div>
      <div className='h-full space-y-4 bg-gray-100 p-4 rounded shadow overflow-y-auto'>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
        {loading && <p>로딩 중...</p>}
        {!loading && hasMore && (
          <button
            onClick={handleLoadMore}
            className='w-20 mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
          >
            더보기
          </button>
        )}
      </div>
    </div>
  );
}
