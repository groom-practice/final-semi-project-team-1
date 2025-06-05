'use client';

import ButtonPostList from '@/components/ButtonPostList';
import InfinitePostList from '@/components/InfinitePostList';
import Toggle from '@/components/Toggle';
import { useState } from 'react';

export default function PostPage() {
  const [useInfinite, setUseInfinite] = useState(false);

  return (
    <div className='fixed inset-0 flex flex-col p-6 bg-white mt-12'>
      <div className='flex justify-between items-center mb-4 shrink-0'>
        <h2 className='text-2xl font-bold'>Posts List</h2>
        <div className='flex items-center'>
          <Toggle
            checked={useInfinite}
            onChange={() => setUseInfinite((prev) => !prev)}
          />
        </div>
      </div>
      <div className='flex-1 h-5/6 space-y-4 overflow-y-auto bg-gray-100 p-4 rounded shadow'>
        {useInfinite ? <InfinitePostList /> : <ButtonPostList />}
      </div>
    </div>
  );
}
