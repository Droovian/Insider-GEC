"use client";


import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSession } from 'next-auth/react';
import { MdDeleteOutline } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface CommentProps{
    content: string,
    id: Number,
    postId: Number
    createdAt : Date
    userId: string
}

const Comment: React.FC<CommentProps> = ({ content, createdAt, userId, id }) => {

    const {data: session} = useSession();
    const router = useRouter();
    const sessionUserId = session?.user?.id;
    
    const handleCommentDeletion = async(commentId: Number) => {
        try{
            const res = await axios.delete(`/api/delete-comment?id=${commentId}`);

            router.refresh();   
        }
        catch(error){
            console.error("Failed to delete comment");
        }
    }
    return (
        <div className="border border-gray-300 rounded-lg bg-gray-100 p-4 mb-4 flex items-start">
            <div className="flex items-center mr-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Insider</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex-1">
                <p className="text-gray-800">{content}</p>
                <p className="text-xs text-gray-600 mt-1">{createdAt ? new Date(createdAt).toDateString() : 'Invalid Date'}</p>
            </div>
            {
                sessionUserId === userId ?
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <MdDeleteOutline />
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
                    <AlertDialogAction onClick={() => {handleCommentDeletion(id)}}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> : null
            }
            
        </div>
    );
}

export default Comment;
