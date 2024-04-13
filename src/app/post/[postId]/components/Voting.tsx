import React from 'react'
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import PostVoteClient from '@/components/post-vote/PostVoteClient';
import { useSession } from 'next-auth/react';
interface Votes{
  postID : number 
}
const Voting = () => {
              //   const { data: session } = useSession();
              //   const votesAmt = post.votes ? post.votes.reduce((acc, vote) => {
              //     if (vote.type === 'UP') return acc + 1;
              //     if (vote.type === 'DOWN') return acc - 1;
              //     return acc;
              // }, 0) : 0;
              // let currentVote

              // currentVote = post.votes.find(
              //     (vote) => vote.userId === session?.user.id
// )
  return (
    <>
    <Button className="bg-gray-300 border border-gray-200 rounded-full" variant='ghost'>
                  <ThumbsUp className='w-4 h-4 text-gray-500 fill-black' />
                </Button>
                <p className='text-center py-2 font-medium text-sm text-zinc-900'>100</p>
                <Button className='border border-gray-200 rounded-full text-emerald-500' variant='ghost'>
                  <ThumbsDown className='w-4 h-4 text-gray-500 fill-black' />
                </Button>
                <p className='text-center py-2 font-medium text-sm text-zinc-900'>100</p>

          {/* <PostVoteClient postId={post.id} initialVotesAmt={votesAmt} initialVote={currentVote?.type} /> */}

    </>
  )
}

export default Voting