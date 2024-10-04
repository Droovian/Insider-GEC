import { getAuthSession } from '@/lib/auth'; // This might not be needed if you're not using users
import { db } from '@/lib/db';
import { pusherServer } from '@/lib/pusher';
import { PostVoteValidator } from '@/lib/validators/vote';
import { number, z } from 'zod';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const existingVote = await db.vote.findFirst({
      where: {
        postId,
        // Assuming you no longer filter by userId
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        votes: true,
      },
    });

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    // If vote type is the same as existing vote, delete the vote
    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            postId: postId!, // Remove userId reference if necessary
          },
        });
      } else {
        // If vote type is different, update the vote
        await db.vote.update({
          where: {
            postId: postId!,
            // You may need to update your query to ensure you find the correct existing vote
          },
          data: {
            type: voteType,
          },
        });
      }
    } else {
      // If no existing vote, create a new vote
      await db.vote.create({
        data: {
          type: voteType,
          postId: postId!, // Ensure you're still tracking postId correctly
          userId: ''
          // You may need to track userId or session ID if you want to prevent multiple votes
        },
      });
    }

    // Recalculate votes
    const updatedPost = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        votes: true,
      },
    });

    if (!updatedPost) {
      return new Response('Post not found', { status: 404 });
    }

    const votesAmt = updatedPost.votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1;
      if (vote.type === 'DOWN') return acc - 1;
      return acc;
    }, 0);

    const channelName = `votes-${postId}`;
    const cc = `votes-updated-${postId}`;
    await pusherServer.trigger(channelName, cc, votesAmt);

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      'Could not process your vote at this time. Please try again later.',
      { status: 500 }
    );
  }
}
