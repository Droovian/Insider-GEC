"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "./textarea";
import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface CommentProps {
  postId?: number;
}

const CommentSchema = z.string().min(10).max(100);

export const PostComments: FC<CommentProps> = ({ postId }) => {

  const router = useRouter();

  const [comment, setComment] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const addComment = async () => {
    try {
      setLoading(true);
      setError('');
      CommentSchema.parse(comment);
      await axios.post('/api/addComment', {
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
      router.refresh();
    }
  }

  return (
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-2">
            <Textarea
              value={comment}
              onChange={(e) => {setComment(e.target.value)}}
              placeholder="Type your message here."
            />
          <div className="mx-auto mt-2">
            <Button onClick={addComment}>Add comment</Button>
          </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {loading && <Loader2 className="mx-auto mt-2" size={24} />}
          {success && <p className="text-green-500 text-sm">Comment added successfully!</p>}

        </div>
  );
}
