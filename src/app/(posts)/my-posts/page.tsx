"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Suspense } from "react";

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
    <div>
      <h1 className="text-4xl font-bold">Your Posts</h1>
      {userPosts && userPosts.length > 0 ? (
        <ul className="flex flex-col space-y-5 mt-5">
          {userPosts.map((post: Post) => (
            <div className="text-black border shadow-lg transition-transform transform hover:scale-105 p-3"
            style={{ transitionDuration: '0.3s' }}>
                <div className="flex justify-between">
                    <div>
                    <li key={post.id}>{post.title}</li>
                    <p key={post.id}>{post.content}</p>
                    </div>
                    <li className="mr-5 text-sm font-light">{post.category}</li>
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
