"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Suspense } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function Posts() {
  const { data: session, status } = useSession();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (status === "authenticated" && session?.user) {
          const res = await axios.get(`http://localhost:3000/api/myposts`);
          setUserPosts(res.data || []); 
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [session, status]);

  return (
    <div className="h-full">
      <h1 className="text-white inline border-b scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
      Your Posts...
      </h1>
      {userPosts && userPosts.length > 0 ? (
        <ul className="flex flex-col space-y-5 mt-10">
          {userPosts.map((post: Post) => (
            <div className="text-white border shadow-lg transition-transform transform hover:scale-105 p-3"
            style={{ transitionDuration: '0.3s' }}>
                <div className="flex justify-between">
                    <div className="flex justify-between w-full mr-32">
                      <div>
                        <li className="text-xl font-bold" key={post.id}>{post.title}</li>
                        <p key={post.id}>{post.content}</p>
                      </div>
                   
                    <div className="flex justify-center items-center">
                      <li className="text-sm font-light px-3 py-2 bg-amber-600 rounded-full rounded-tl-none">{post.category}</li>
                    </div>
                    
                    </div>
                    <div className="my-auto flex space-x-5">
                      <button><IoTrashBinOutline size={20}/></button>
                      <button><CiEdit size={20}/></button>
                    </div>
                    
                </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
