import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req:Request){

    const session = await getServerSession(authOptions);

    const { postId, reason } = await req.json();

    if(!postId || !reason){
        return NextResponse.json({
            message: "Please dont leave any fields empty"
        },
        {
            status: 200
        })
    }
    
    try{
        if(session?.user){
            await db.report.create({
                data:{
                    postId,
                    reason,
                },
            });
        }

        return NextResponse.json({
            message: "Report submitted successfully"
        })
    }
    catch(error){
        console.error(error);
        return NextResponse.error();
    }
}