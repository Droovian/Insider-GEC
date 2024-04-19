import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

type MyStringFilter<T> = {
    contains?: string;
    mode?: 'insensitive'; 
} | undefined;


type MyPostWhereInput = {
    title?: MyStringFilter<string>;
};


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

     const lowerCaseQuery = query?.toLowerCase();
     const lowerCaseCategory = category?.toLowerCase();
     if(lowerCaseQuery !== null && lowerCaseCategory !== null){
        const words = lowerCaseQuery?.split(' ');
        const whereClauses: MyPostWhereInput[]= words?.map(word => ({
            title: {
                contains: word,
                mode: 'insensitive'
            } ,
        })) || [];
        const posts = await db.post.findMany({
            where:{
                OR: whereClauses,
                category : {
                    contains: lowerCaseCategory,
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
     else if( lowerCaseQuery !== null && lowerCaseCategory === null){
        const words = lowerCaseQuery?.split(' ');
        const whereClauses : MyPostWhereInput[] = words?.map(word => ({
            title: {
                contains: word,
                mode: 'insensitive'
            } 
        })) || [];
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
     else if( lowerCaseCategory !== null && lowerCaseQuery === null){
       
        const posts = await db.post.findMany({
            where:{
                category: {
                    contains: lowerCaseCategory,
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