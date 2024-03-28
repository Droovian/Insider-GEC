import { FC, useEffect, useState } from 'react'
import { VoteType } from '@prisma/client'
import { usePrevious } from '@mantine/hooks'
import { Button } from '../ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostVoteRequest } from '@/lib/validators/vote'
import axios, { AxiosError } from 'axios'
import { pusherClient } from '@/lib/pusher'
import { set } from 'zod'

interface PostVoteClientProps {
    postId?: number;
    initialVotesAmt: number;
    initialVote?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({ postId, initialVotesAmt, initialVote }) => {
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
    const [currentVote, setCurrentVote] = useState(initialVote)
    const prevVote = usePrevious(currentVote)
    const queryClient = useQueryClient()

    useEffect(() => {
        setCurrentVote(initialVote)
    }, [initialVote])

    // useEffect(() => {
    //     const fetchAmt = async () => {
    //         try {
    //             const res = await axios.get(`/api/fetchVotes/${postId}`);
    //             setVotesAmt(res?.data.voteCount);
    //             console.log(res);
    //         } catch (error) {
    //             console.log("cannot do it");
    //         }
    //     };
    
    //     const intervalId = setInterval(fetchAmt, 500);
    
    //     return () => clearInterval(intervalId); // Cleanup function to clear interval
    
    // }, []); // Make sure to include postId in the dependency array
    useEffect(()=>{
        const channelName = `votes-${postId}`;
        const cc = `votes-updated-${postId}`
        pusherClient.subscribe(channelName);
        pusherClient.bind(cc,(votes: number) => {
            console.log("hello" + votes)
            setVotesAmt(votes)
        })
        return () => {
            pusherClient.unsubscribe(String(postId))
          }
    },[postId])
    const { mutate: vote } = useMutation({
        mutationFn: async (type: VoteType) => {
            const payload: PostVoteRequest = {
                voteType: type,
                postId: postId,
            }

            await axios.patch('/api/vote', payload)
        },
        onError: (err, voteType) => {
            if (voteType === 'UP') setVotesAmt((prev) => prev - 1)
            else setVotesAmt((prev) => prev + 1)
      
            // reset current vote
            setCurrentVote(prevVote)
      
            if (err instanceof AxiosError) {
              if (err.response?.status === 401) {
                return "please log in"
              }
            }
      
            return "something went wrong"
          },
        onMutate: async (type: VoteType) => {
            // Optimistically update UI
            if (currentVote === type) {
                setCurrentVote(undefined)
                // if (type === 'UP') setVotesAmt((prev) => prev - 1)
                // else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
            } else {
                setCurrentVote(type)
                // if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
                // else if (type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
            }

         
        },
    })

    return (
        <div className='flex'>
            <Button onClick={() => vote('UP')} className="rounded-full" variant='ghost'>
                <ThumbsUp className={cn({ 'text-gray-500 fill-black': currentVote === 'UP' })} />
            </Button>
            <p className='text-center py-2 font-medium text-sm text-zinc-900'>
                {votesAmt}
            </p>
            <Button onClick={() => vote('DOWN')} className={cn({
                'text-emerald-500': currentVote === 'DOWN',
            })} variant='ghost' >
                <ThumbsDown className={cn({ 'text-gray-500 fill-black': currentVote === 'DOWN' })} />
            </Button>
        </div>
    )
}

export default PostVoteClient