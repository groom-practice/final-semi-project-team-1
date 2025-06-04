import PostItem from '@/components/PostItem';
import Toggle from '@/components/Toggle';

export default function Post() {
  return (
    <div className='flex flex-col mx-4 h-screen'>
      <div className='flex w-full h-9 justify-between items-center mb-3'>
        <p className='text-2xl font-bold'>Posts List</p>
        <Toggle />
      </div>
      <div className='h-full space-y-4 bg-gray-100 p-4 rounded shadow overflow-y-auto'>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </div>
  );
}
