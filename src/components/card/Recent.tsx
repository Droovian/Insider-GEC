import { FC } from 'react';
import { Button } from '../ui/button';

interface Post {
  title?: string;
  content?: string;
  category?: string;
}

const Recent: FC<Post> = () => {

  return (
    <section className='w-full h-full flex-col items-center p-2 border-l border-gray-200'>
      <div className='bg-gray-200 rounded-xl mt-3 h-fit mb-20 p-2'>
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 p-4">
          What's happening?
        </h2>
        <div className='w-full h-32 hover:bg-gray-300 p-4 flex justify-between'>
          <div className='flex flex-col justify-center'>
            <p className='font-semibold'>Spectrum is Coming</p>
            <p className='text-sm text-gray-500'>Events</p>
            <p className='text-sm text-gray-500'>10 likes</p>
          </div>
            <div className='flex items-center justify-center'>
              <Button variant='link'>Go to Post</Button>
            </div> 
        </div>
        <div className='w-full h-32 hover:bg-gray-300 p-4 flex justify-between'>
          <div className='flex flex-col justify-center'>
            <p className='font-semibold'>ITs are starting soon</p>
            <p className='text-sm text-gray-500'>Academics</p>
            <p className='text-sm text-gray-500'>8 likes</p>
          </div>
            <div className='flex items-center justify-center'>
              <Button variant='link'>Go to Post</Button>
            </div> 
        </div>
        <div className='w-full h-32 hover:bg-gray-300 p-4 flex justify-between'>
          <div className='flex flex-col justify-center'>
            <p className='font-semibold'>75% attendance needed</p>
            <p className='text-sm text-gray-500'>Venting</p>
            <p className='text-sm text-gray-500'>6 likes</p>
          </div>
            <div className='flex items-center justify-center'>
              <Button variant='link'>Go to Post</Button>
            </div> 
        </div>
      </div>
      
    </section>
  );
};

export default Recent;
