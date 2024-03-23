import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const CommentSchema = z.object({
    postId: z.number(),
    comment: z.string().min(10).max(100),
});

export async function POST(req: Request){

    const session = await getServerSession(authOptions);

    const { postId, comment } = await req.json();

    if(!comment || !postId){
        return NextResponse.json({
            message: "Please dont leave comment blank/post Id missing"
        }, { status: 200 })
    }

    CommentSchema.parse({postId, comment});

    try{
        if(session?.user && session){
            
            await db.comment.create({
                data: {
                    postId:postId,
                    content:comment,
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