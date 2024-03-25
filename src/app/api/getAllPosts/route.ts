import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

export async function GET(req:Request){

    const url = new URL(req.url)
    try{

     const { limit, page } = z.object({
        limit: z.string(),
        page: z.string(),
     })
     .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),

     })
     const posts = await db.post.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        orderBy:{
            createdAt: 'desc',
        },
        include:{
            votes: true,
        }
    });

    return NextResponse.json(posts);
    
    }
    catch(error){
        return NextResponse.json({
            message: "Failed to fetch data"
        })
    }
}