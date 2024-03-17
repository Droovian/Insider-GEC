import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC } from 'react';
import { getPosts } from '@/lib/data';

interface Post {
  title?: string;
  content?: string;
  category?: string;
}

const Card: FC<Post> = async ({ title, content, category }) => {

  const posts = await getPosts();

  console.log(posts);

  return (
    <div className='w-full flex flex-col items-center'>
      {posts.map(post => (
        <div key={post.id} className='rounded-2xl bg-gray-200 w-3/4 shadow-lg mb-4'>
          <div className='flex items-center justify-between m-5 text-sm underline'>
            <div className='flex items-center gap-2'>
              <div className='h-10 w-10 rounded-full bg-black'></div>
              <p className='text-gray-700'>user 69</p>
            </div>
            <p className='text-gray-700'>Category: {post.category}</p>
          </div>
          <div className='m-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-300 transition duration-300'>
            <div className='p-4'>
              <h1 className='text-2xl mb-2 font-bold'>{post.title || 'Hello'}</h1>
              <div className='overflow-auto'>
                <p>{post.content || 'content'}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-start p-4 gap-4'>
            <ThumbsUp />
            <ThumbsDown />
            <MessageCircle />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
