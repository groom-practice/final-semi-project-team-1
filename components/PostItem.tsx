import { Post } from '@/type/posts';

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className='p-4 bg-white rounded shadow-sm'>
      <h1 className='font-semibold text-lg text-left cursor-pointer text-gray-900 hover:text-blue-600 transition-all duration-200'>
        {post.title}
      </h1>
      <p className='text-sm text-gray-600'>{post.body}</p>
    </div>
  );
}
