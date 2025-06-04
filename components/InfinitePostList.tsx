import { useState, useEffect, useRef } from 'react';
import { Post } from '@/type/posts';
import PostItem from '@/components/PostItem';
import { getPosts } from '@/api/posts';

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

  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;

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
        {loading && <p>로딩 중...</p>}
        {!hasMore && <p>마지막 페이지다</p>}
      </div>
    </>
  );
}
