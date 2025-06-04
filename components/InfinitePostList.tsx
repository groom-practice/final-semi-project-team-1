'use client';

import { useState, useEffect, useRef } from 'react';
import { Post } from '@/type/posts';
import PostItem from '@/components/PostItem';
import { getPosts } from '@/app/api/posts/route';
import Spinner from './Spinner';

export default function InfinitePostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (pageParam: number) => {
    try {
      setLoading(true);
      const newPosts = await getPosts({ pageParam });

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
      if (err instanceof Error) console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    if (loading || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPage((prev) => prev + 1);
    });

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 1) return;
    fetchData(page);
  }, [page]);

  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <div ref={loadMoreRef} className='h-6'>
        {loading && <Spinner />}
        {!hasMore && <p>마지막 페이지다</p>}
      </div>
    </>
  );
}
