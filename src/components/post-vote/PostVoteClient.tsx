import { FC, useEffect, useState } from 'react'
import { VoteType } from '@prisma/client'
import { usePrevious } from '@mantine/hooks'
import { Button } from '../ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMutation} from '@tanstack/react-query'
import { PostVoteRequest } from '@/lib/validators/vote'
import axios, { AxiosError } from 'axios'
import { pusherClient } from '@/lib/pusher'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface PostVoteClientProps {
    postId?: number;
    initialVotesAmt: number;
    initialVote?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({ postId, initialVotesAmt, initialVote }) => {
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
    const [currentVote, setCurrentVote] = useState(initialVote)
    const prevVote = usePrevious(currentVote)
    const router = useRouter()
    useEffect(() => {
        setCurrentVote(initialVote)
    }, [initialVote])

    useEffect(()=>{
        const channelName = `votes-${postId}`;
        const cc = `votes-updated-${postId}`
        pusherClient.subscribe(channelName);
        pusherClient.bind(cc,(votes: number) => {
            if(votes === undefined){
                setVotesAmt(0)
            }else{
                setVotesAmt(votes)
            }
            
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
            
      
            if (err instanceof AxiosError) {
              if (err.response?.status === 401) {
                if (voteType === 'UP') setVotesAmt((prev) => prev - 1)
                    else setVotesAmt((prev) => prev + 1)
              
                    // reset current vote
                    setCurrentVote(prevVote)
                router.push('/signin')
              }
            }
      
            return "something went wrong"
          },
        onMutate: (type: VoteType) => {

            if (currentVote === type) {
                setCurrentVote(undefined)
                if (type === 'UP') setVotesAmt((prev) => prev - 1)
                else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
            } else {
                setCurrentVote(type)
                if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
                else if (type === 'DOWN') setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
            }

         
        },
    })

    return (
        <>
            <ToastContainer position='top-center' autoClose={3000}/>
             <div className='flex space-x-2'>
                <Button onClick={() => vote('UP')} className="rounded-full" variant='ghost'>
                    <ThumbsUp className={cn({ 'text-emerald-500 fill-emerald-500': currentVote === 'UP' })} />
                </Button>
                <p className='text-center py-2 font-medium text-sm text-zinc-900'>
                    {votesAmt}
                </p>
                <Button onClick={() => vote('DOWN')} className={cn({
                    'text-emerald-500': currentVote === 'DOWN',
                })} variant='ghost' >
                    <ThumbsDown className={cn({ 'text-red-500 fill-red-500': currentVote === 'DOWN' })} />
                </Button>
            </div>
        </>
       
    )
}

export default PostVoteClient
