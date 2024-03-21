import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request){

    try{
     const posts = await db.post.findMany({
        orderBy:{
            createdAt: 'desc',
        },
    });

    return NextResponse.json(posts);
    
    }
    catch(error){
        return NextResponse.json({
            message: "Failed to fetch data"
        })
    }
}