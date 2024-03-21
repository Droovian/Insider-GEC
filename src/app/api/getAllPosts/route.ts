import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

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