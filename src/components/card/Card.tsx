import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC } from 'react';

interface CardProps {
  title?: string;
  content?: string;
  category?: string;
}

const Card: FC<CardProps> = ({ title, content, category }) => {
  return (
    <div className='rounded-2xl bg-gray-200 w-3/4 md:w-1/2 shadow-lg'>
        <div className='flex items-center justify-between m-5 text-sm underline'>
            
            <div className='flex items-center gap-2'>
                <div className='h-10 w-10 rounded-full bg-black'></div>
                <p className='text-gray-700'>user 69</p>
            </div>
            <p className='text-gray-700'>Category:{category}</p>
        </div>
      <div className='m-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-300 transition duration-300'>
        <div className='p-4'>
          <h1 className='text-2xl mb-2 font-bold'>{title || 'Hello'}</h1>
          <div className='overflow-auto'>
              <p>{content || 'content'}</p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-start p-4 gap-4'>
        <ThumbsUp />
        <ThumbsDown />
        <MessageCircle />
      </div>
    </div>
  );
};

export default Card;
