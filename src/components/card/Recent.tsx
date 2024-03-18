import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC } from 'react';
import { getPosts } from '@/lib/data';

interface Post {
  title?: string;
  content?: string;
  category?: string;
}

const Recent: FC<Post> = async ({ title, content, category }) => {

  const posts = await getPosts();

  console.log(posts);

  return (
    <div className='w-full flex pl-0 ml-0 flex-col items-center rounded-2xl'>
      <h1 >Recent Posts</h1>
      {posts.map(post => (
        <div key={post.id} className=' bg-gray-200 w-full shadow-lg  p-0'>
          <div className='mb-2 border-2 border-gray-300 hover:bg-gray-300 transition duration-300'>
            <div className='p-4'>
              <h1 className='text-2xl mb-2 font-bold'>{post.title || 'Hello'}</h1>
              <div className='overflow-auto'>
                <p>{post.content || 'content'}</p>
              </div>
            </div>
            </div>
            <hr className="border-black-400" />          
          
        </div>
      ))}
    </div>
  );
};

export default Recent;
