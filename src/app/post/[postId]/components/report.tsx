"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { z } from "zod";

interface CommentProps {
  postId?: number;
}
const CommentSchema = z.string().min(10).max(100);


export const AddButton: FC<CommentProps> = ({postId}) => {
  const [comment, setComment] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const addComment = async () => {
    try {
      setLoading(true);
      setError('');
      CommentSchema.parse(comment);
      await axios.post("http://localhost:3000/api/addComment", {
        postId,
        comment
      });
      setSuccess(true);
      setComment('');
    } catch(error) {
      if (error instanceof z.ZodError) {
        setError('Comment must be between 10 and 100 characters long');
      }
      else if( error instanceof AxiosError && error.response?.status === 429){
        setSuccess(false);
        setError(error.response?.data.message);
      } 
      else {
        setSuccess(false);
        setError('Failed to add comment');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
              <div className="grid relative w-full gap-2">
                <Textarea placeholder="Type your message here." className="h-6 border border-gray-300 rounded p-2" />
                <div className="flex justify-end absolute bottom-0 right-0 mb-2 mr-2">
                  <Button variant='default' className="w-20" size='default' onClick={addComment} >Add</Button>
                </div>
              </div>
    </>
  )
}

