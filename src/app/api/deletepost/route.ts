import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function DELETE(request: Request){

   const { searchParams } = new URL(request.url);

   const find_id = searchParams.get('id');

//    console.log(id);

    try{
    const findPost = await db.post.findUnique({
        where: {
            id: Number(find_id)
        }
    })

    if (!findPost) {
        return NextResponse.json({
            message: "Post was not found!"
        }, {
            status: 404
        })
    }

        await db.post.delete({
            where: {
                id: Number(find_id)
            }
        });

        return NextResponse.json({
            message : "Post deleted successfully"
        }, {
            status: 200
        })
    }
    catch(error){
        return NextResponse.json({
            message: "Some error occured"
        })
    }
}
