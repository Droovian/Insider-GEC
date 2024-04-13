import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

export async function GET(req:Request){

    const url = new URL(req.url)
    try{

     const { limit, page, query, category } = z.object({
        limit: z.string(),
        page: z.string(),
        query: z.string().optional(),
        category: z.string().optional(),
     })
     .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
        query: url.searchParams.get('query'),
        category: url.searchParams.get('category'),
     })

     if(query !== null && category !== null){
        const words = query?.split(' ');
        const whereClauses = words?.map(word => ({
            title: {
                contains: word,
            } ,
        }));
        const posts = await db.post.findMany({
            where:{
                OR: whereClauses,
                category : {
                    contains: category,
                }
            },
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
     else if( query !== null && category === null){
        const words = query?.split(' ');
        const whereClauses = words?.map(word => ({
            title: {
                contains: word,
            } 
        }));
        const posts = await db.post.findMany({
            where:{
                OR: whereClauses,
            },
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
     else if( category !== null && query === null){
       
        const posts = await db.post.findMany({
            where:{
                category: {
                    contains: category,
                    mode: 'insensitive'
                }
            },
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
     else{
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
    
    
    }
    catch(error){
        return NextResponse.json({
            message: "Failed to fetch data"
        })
    }
}