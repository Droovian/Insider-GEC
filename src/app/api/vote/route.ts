import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { PostVoteValidator } from '@/lib/validators/vote'
import { number, z } from 'zod'

export async function PATCH(req: Request) {
    try {
      const body = await req.json()
  
      const { postId, voteType } = PostVoteValidator.parse(body)
  
      const session = await getAuthSession()
  
      if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
      }
  
      // check if user has already voted on this post
      const existingVote = await db.vote.findFirst({
        where: {
          userId: session.user.id,
          postId,
        },
      })
  
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          votes: true,
        },
      })
  
      if (!post) {
        return new Response('Post not found', { status: 404 })
      }
  
      if (existingVote) {
        // if vote type is the same as existing vote, delete the vote
        if (existingVote.type === voteType) {
          await db.vote.delete({
            where: {
              userId_postId: {
                postId: postId!,
                userId: session.user.id,
              },
            },
          })

          const npost = await db.post.findUnique({
            where: {
              id: postId,
            },
            include: {
              votes: true,
            },
          })
         
          
          if(!npost) {
            return new Response('Post not found', { status: 404 })
          }
          const votesAmt = npost?.votes.reduce((acc, vote) => {
            if (vote.type === 'UP') return acc + 1
            if (vote.type === 'DOWN') return acc - 1
            return acc
          }, 0)
          const channelName = `votes-${postId}`;
          const cc = `votes-updated-${postId}`
            pusherServer.trigger(channelName, cc, votesAmt)
    
          return new Response('OK')
        }
  
        // if vote type is different, update the vote
        await db.vote.update({
          where: {
            userId_postId: {
              postId: postId!,
              userId: session.user.id,
            },
          },
          data: {
            type: voteType,
          },
        })
  
        const npost = await db.post.findUnique({
          where: {
            id: postId,
          },
          include: {
            votes: true,
          },
        })
       
        
        if(!npost) {
          return new Response('Post not found', { status: 404 })
        }
        const votesAmt = npost?.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)
        const channelName = `votes-${postId}`;
        const cc = `votes-updated-${postId}` 
        await pusherServer.trigger(channelName, cc, votesAmt)
        
  
        return new Response('OK')
      }
  
      // if no existing vote, create a new vote
      await db.vote.create({
        data: {
          type: voteType,
          userId: session.user.id,
          postId:postId!,
        },
      })
  
      const npost = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          votes: true,
        },
      })
     
      
      if(!npost) {
        return new Response('Post not found', { status: 404 })
      }
      
      if(session){
        const votesAmt = npost.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)
        const channelName = `votes-${postId}`;
        const cc = `votes-updated-${postId}`
        await pusherServer.trigger(channelName, cc, votesAmt)
          
      }
      else{
        return new Response('Unauthorized', { status: 401 })
      }
      
  
  
      return new Response('OK')
    } catch (error) {
      (error)
      if (error instanceof z.ZodError) {
        return new Response(error.message, { status: 400 })
      }
  
      return new Response(
        'Could not post to subreddit at this time. Please try later',
        { status: 500 }
      )
    }
  }