import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(Request: Request, context: any) {
    const { params } = context;
    const id = params.id
    try {
        const postId = parseInt(id)

        const post = await db.post.findUnique({
            where: {
              id: postId,
            },
            include: {
              votes: true,
            },
          })
          if(!post) {
            return new Response('Post not found', { status: 404 })
          }
          const voteCount = post.votes.reduce((acc, vote) => {
            if (vote.type === 'UP') return acc + 1
            if (vote.type === 'DOWN') return acc - 1
            return acc
          }, 0)
        
        return NextResponse.json({ voteCount: voteCount },{status:200});
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({message: "something went wrong"},{status:401})
    }
}
