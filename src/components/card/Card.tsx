import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC } from 'react';
import { getPosts } from '@/lib/data'; // Assuming this fetches posts
import { Button } from '../ui/button';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface Post {
  title?: string;
  content?: string;
  category?: string;
}

const Card: FC<Post> = async ({ title, content, category }) => {
  // Fetch posts if children are not provided (optional)
  const posts = await getPosts();

  console.log(posts);

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg bg-white border shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center justify-between m-5 text-sm">
            <div className="flex items-center gap-2">
              {/* Profile image placeholder (replace with actual image logic) */}
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              {/* Username or other details (replace with actual data) */}
              <div>User</div>
            </div>
            <Button className="rounded-full bg-white hover:bg-gray-200 text-black">
              <HiOutlineDotsHorizontal />
            </Button>
          </div>
          <div className="m-4 border-2 border-gray-150 rounded-md hover:bg-gray-300 transition duration-300">
            <div className="p-4">
              <h1 className="text-2xl mb-2 font-bold">{post.title || "Hello"}</h1>
              <div className="overflow-auto">
                <p>{post.content || "content"}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start p-4 gap-4">
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
