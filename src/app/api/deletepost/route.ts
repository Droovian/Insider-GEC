import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: Request){

   const { searchParams } = new URL(req.url);

   const findId = searchParams.get('id');
   
   const session = await getServerSession(authOptions);

   if(!session?.user || session?.expires){
    return NextResponse.json({
        message: "Not Authenticated!"
    }, {
        status: 404
    });
   }
   
    try{
        const findPost = await db.post.findUnique({
            where: {
                id: Number(findId)
            }
        })

        if (!findPost) {
            return NextResponse.json({
                message: "Post was not found!"
            }, {
                status: 404
            })
        }

        await db.comment.deleteMany({
            where:{
                postId: Number(findId)
            }
        });

        await db.post.delete({
            where:{
                id:Number(findId)
            }
        })

        return NextResponse.json({
            message : "Post deleted successfully"
        }, {
            status: 200
        })
    }
    catch(error){
        console.log(error);
        return NextResponse.json({
            message: "Some error occured"
        },
    {
        status: 500
    });
    }
}
