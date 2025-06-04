'use client';

import { useState } from 'react';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <label className='inline-flex items-center cursor-pointer'>
      <span className='mr-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
        {enabled ? '버튼 모드로 돌아가기' : '스크롤 모드 켜기'}
      </span>
      <input
        type='checkbox'
        checked={enabled}
        onChange={toggle}
        className='sr-only peer'
      />
      <div
        className={`
          relative w-14 h-8 rounded-full transition-colors
          shadow-md overflow-hidden
          ${enabled ? 'bg-blue-500' : 'bg-slate-300'}
        `}
      >
        <div
          className={`
            absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out
            ${enabled ? 'bg-white translate-x-6' : 'bg-slate-500 translate-x-0'}
          `}
        />
      </div>
    </label>
  );
}
