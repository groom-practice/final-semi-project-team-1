'use client';

import ButtonPostList from '@/components/ButtonPostList';
import InfinitePostList from '@/components/InfinitePostList';
import Toggle from '@/components/Toggle';
import { useState } from 'react';

export default function PostPage() {
  const [useInfinite, setUseInfinite] = useState(false);

  return (
    <div className='flex flex-col mx-4 h-screen'>
      <div className='flex w-full h-9 justify-between items-center mb-3'>
        <p className='text-2xl font-bold'>Posts List</p>
        <Toggle
          checked={useInfinite}
          onChange={() => setUseInfinite((prev) => !prev)}
        />
      </div>
      <div className='h-full space-y-4 bg-gray-100 p-4 rounded shadow overflow-y-auto'>
        {useInfinite ? <InfinitePostList /> : <ButtonPostList />}
      </div>
    </div>
  );
}
