"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import PaginationControls from "./PaginationControls";
import { IoTrashBinOutline } from "react-icons/io5";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function Posts() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchUserPosts = async () => {

      const userName = sessionStorage?.getItem('username') || null;
      if(!userName) { return }
      try {
          const res = await axios.get(`/api/myposts?id=${userName}`);
          setUserPosts(res.data || []);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [userPosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleDelete = async (postId: number) => {
    try {
      const res = await axios.delete(`/api/deletepost?id=${postId}`);
      if (res?.data) {
        const updatedUserPosts = userPosts.filter(post => post.id !== postId);
        setUserPosts(updatedUserPosts);
      } else {
        console.log('Error occurred');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  const paginate = (pageNumber: number) => {
    // Ensure pageNumber is within valid range
    if (pageNumber > 0 && pageNumber <= Math.ceil(userPosts.length / 5)) { 
      // Assuming 5 posts per page
      setCurrentPage(pageNumber);
    }
  }
  return (
    <div>

    <div className="">
      <h1 className="text-black underline inline text-xl sm:text-2xl font-extrabold tracking-tight lg:text-5xl  ">
        Your Posts
      </h1>
      {currentPosts && currentPosts.length > 0 ? (
        <ul className="flex flex-col space-y-5 mt-10 overflow-y-hidden">
          {currentPosts.map((post: Post) => (
            <div className="border rounded-lg  p-3" key={post.id}>
              <div className="flex justify-between">
                <div className="flex justify-between w-full mr-32">
                  <div>
                    <li className="text-xl sm:text-xl font-bold">{post.title}</li>
                    <p className="text-sm sm:text-md">{post.content}</p>
                  </div>
                </div>
                <div className="my-auto flex space-x-5 ">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <IoTrashBinOutline size={20} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your post from our database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(post.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
        </div>
        <div className="mt-3 bottom-0 h-1/6">
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(userPosts.length / 5)}
            paginate={paginate}
            />
        </div>
            </div>
  );
}
