"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Textarea } from "./textarea";
import axios from "axios";
import { FC, useState } from "react";
import { z } from "zod";

interface CommentProps {
  postId?: number;
}

const CommentSchema = z.string().min(10).max(100);

export const DialogDemo: FC<CommentProps> = ({ postId }) => {
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
      } else {
        setError('Failed to add comment');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" variant="ghost">
          <MessageCircle />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
          <DialogDescription>
            Add your comment here          
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-2">
            <Textarea
              value={comment}
              onChange={(e) => {setComment(e.target.value)}}
              placeholder="Type your message here."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {loading && <Loader2 className="mx-auto mt-2" size={24} />}
          {success && <p className="text-green-500 text-sm">Comment added successfully!</p>}

          <div className="mx-auto mt-2">
            <Button onClick={addComment}>Add comment</Button>
          </div>
        </div>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
