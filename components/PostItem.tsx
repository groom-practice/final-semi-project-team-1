import { Post } from '@/type/posts';
import Link from 'next/link';

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className='p-4 bg-white rounded shadow-sm'>
      <Link
        href={`/posts/${post.id}`}
        className='font-semibold text-lg text-left cursor-pointer text-gray-900 hover:text-blue-600 transition-all duration-200'
      >
        {post.title}
      </Link>
      <p className='text-sm text-gray-600'>{post.body}</p>
    </div>
  );
}
