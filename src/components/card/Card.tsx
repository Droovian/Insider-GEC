"use client";
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { FC, useState, useEffect } from 'react';
import { getPosts } from '@/lib/data'; // Assuming this fetches posts
import { Button } from '../ui/button';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Post {
  id?:number;
  title?: string;
  content?: string;
  category?: string;
  createdAt?:Date;
}

const Card: FC<Post> = ({ title, content, category }) => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await axios.get<Post[]>("http://localhost:3000/api/getAllPosts");
    
       const receivedData = fetchedPosts?.data;
       console.log(typeof(receivedData));
       
      setPosts(receivedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  console.log(posts);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg bg-white border shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center justify-between m-5 text-sm">
            <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </div>
            <Button className="rounded-full bg-white hover:bg-gray-200 text-black">
              <DropdownMenu>
              <DropdownMenuTrigger>
                <HiOutlineDotsHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </Button>
          </div>
          <div className="m-4 border-2 border-gray-150 rounded-md hover:bg-gray-300 transition duration-300">
            <div className="p-4">
              <h1 className="text-xl mb-2 font-semibold">{post.title || "Hello"}</h1>
              <div className="overflow-auto">
                <p className='font-light text-sm'>{post.content || "content"}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between p-2">
            <div className='flex gap-4 p-2'>
              <ThumbsUp />
              <ThumbsDown />
              <MessageCircle />
            </div>
           <p className='p-2 font-light text-sm'>{post?.createdAt?.toLocaleString()}</p> 
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default Card;