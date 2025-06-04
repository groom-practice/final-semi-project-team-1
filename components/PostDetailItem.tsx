import { Post, User, Comment } from '@/type/posts';

interface PostContentProps {
  post: Post;
  user: User;
  comments: Comment[];
}

export default function PostDetailItem({
  post,
  user,
  comments,
}: PostContentProps) {
  return (
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
  );
}
