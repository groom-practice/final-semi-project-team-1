import Toggle from '@/components/Toggle';

export default function Post() {
  return (
    <div className='flex mx-4'>
      <div className='flex w-full h-9 justify-between items-center'>
        <p className='text-2xl font-bold'>Posts List</p>
        <Toggle />
      </div>
    </div>
  );
}
