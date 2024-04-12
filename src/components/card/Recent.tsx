"use server";

import { Button } from '../ui/button';
import RecentPosts from '@/lib/recent-posts';
interface Post {
  title?: string;
  content?: string;
  category?: string;
  likes?:number;
}

export default async function Recent(){

  const likedPosts = await RecentPosts();

  const data = likedPosts?.recentPosts;
  
  return (
    <section className='invisible md:visible w-full h-full flex-col p-2 border-l border-gray-200'>
      <div className='bg-gray-200 rounded-xl mt-3 h-fit mb-20 p-3'>
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 p-4">
          What's happening?
        </h2>
        {data?.map((post:Post) => (
          <div className='w-full h-32 hover:bg-gray-300 p-4 flex justify-between'>
            <div className='flex flex-col justify-center'>
              <p className='font-semibold'>{post?.title}</p>
              <p className='text-sm text-gray-500'>{post?.category}</p>
              <p className='text-sm text-gray-500'>{post?.likes} likes</p>
            </div>
            <div className='flex items-center justify-center'>
              <Button variant='link'>Go to Post</Button>
            </div> 
          </div>
        ))}
        
        
      </div>
      
    </section>
  );
};

