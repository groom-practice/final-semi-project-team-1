'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import PostDetailItem from '@/components/PostDetailItem';
import usePostItem from '@/hooks/usePostItem';

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();

  const { post, user, comments, loading } = usePostItem(id);

  const handleDelete = () => {
    const deleted = JSON.parse(localStorage.getItem('deletedPosts') || '[]');
    const updated = [...deleted, Number(id)];
    localStorage.setItem('deletedPosts', JSON.stringify(updated));
    router.push('/posts');
  };

  const handleBack = () => {
    router.push('/posts');
  };

  if (loading) return <Spinner />;
  if (!post || !user) return <p>데이터를 불러올 수 없음</p>;

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <PostDetailItem post={post} user={user} comments={comments} />
      <div className='flex p-4 justify-between'>
        <button
          onClick={handleBack}
          className='text-blue-600 hover:underline font-medium'
        >
          목록으로 가기
        </button>
        <div className='flex gap-2'>
          <Link
            href={`/posts/${id}/edit`}
            className='bg-blue-600 text-white text-md px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300'
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
    </div>
  );
}
