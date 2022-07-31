import { CircleNotch } from 'phosphor-react';

export function Loading() {
  return (
    <div className='flex justify-center items-center w-6 h-6 overflow-hidden'>
      <CircleNotch className='w-4 h-4 animate-spin' weight='bold' />
    </div>
  );
}
