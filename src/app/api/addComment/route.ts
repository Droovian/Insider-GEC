import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { RateLimitConfig, createRateLimiter } from "@/lib/ratelimiting/rateLimiter";

const CommentSchema = z.object({
    postId: z.number(),
    comment: z.string().min(10).max(100),
    userId: z.string()
});

const rateLimitConfig:RateLimitConfig = {
    windowSize: 10,
    windowDuration: 60,
    windowUnit: "m"
  }
  
  const rateLimiter = createRateLimiter(rateLimitConfig);


export async function POST(req: Request){
    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");

    const { success, pending, limit, reset, remaining } = await rateLimiter.limit(ip!)

    if (!success) {
        return NextResponse.json(
          { message: "Oops, too many comments posted take some rest and come after an hour" },
          { status: 429 }
        );
      }

    const session = await getServerSession(authOptions);

    const { postId, comment, userId } = await req.json();

    if(!comment || !postId){
        return NextResponse.json({
            message: "Please dont leave comment blank/post Id missing"
        }, { status: 200 })
    }

    CommentSchema.parse({postId, comment, userId});

    try{
        if(session?.user && session){
            
            await db.comment.create({
                data: {
                    postId:postId,
                    content:comment,
                    userId: userId
                }
            });

            return NextResponse.json({
                message: "Comment added successfuly"
            },
            {
                status: 200
            });
        }
        else{
            return NextResponse.json({
                message: "User not authenticated!"
            },
            {
                status: 401
            });
        }
    }

    catch(error){
        return NextResponse.json({
            message: "Something unexpected occured, likely a server error!"
        },
        {
            status: 404
        });
    }   
}