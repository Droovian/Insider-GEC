"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Suspense } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

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
  }, [session, status, userPosts]);

  const handleDelete = async (postId: Number) => {
    try{
      const res = await axios.delete(`/api/deletepost?id=${postId}`);
      
      if(res?.data){
        const updatedUserPosts = userPosts.filter(post => post.id !== postId);

        setUserPosts(updatedUserPosts);
      }
      else{
        console.log('Error occured');
        
      }
      // console.log(res.data);
      
    }
    catch(error){
      console.error('Error deleting post:', error);
    }
  }

  return (
    <div className="h-full">
      <h1 className="text-black inline border-b scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
      Your Posts...
      </h1>
      {userPosts && userPosts.length > 0 ? (
        <ul className="flex flex-col space-y-5 mt-10">
          {userPosts.map((post: Post) => (
            <div className="border shadow-lg transition-transform transform hover:scale-105 p-3"
            style={{ transitionDuration: '0.3s' }}>
                <div className="flex justify-between">
                    <div className="flex justify-between w-full mr-32">
                      <div>
                        <li className="text-xl font-bold" key={post.id}>{post.title}</li>
                        <p key={post.id}>{post.content}</p>
                      </div>
                   
                    <div className="flex justify-center items-center">
                      <li className="text-sm font-light px-3 py-2 bg-black text-white rounded-full rounded-tl-none">{post.category}</li>
                    </div>
                    
                    </div>
                    <div className="my-auto flex space-x-5">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <IoTrashBinOutline size={20}/>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              post from our database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                              handleDelete(post.id)
                            }}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      {/* <button onClick={() => {handleDelete(post.id)}}></button> */}
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
