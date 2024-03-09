import { NextResponse,NextRequest } from "next/server";
import { db } from '@/lib/db';

export async function POST(req: Request) {

 
  const { title, content, category } = await req.json();

  if(!title || !content || !category){
    return NextResponse.json({message:"please dont leave any fields empty"},{status: 400})
  }

  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        likes: 0,
        authorId: 1,
        published: false,
        category,
      
      },
    });


    return NextResponse.json({message:"created post "},{status:200})
  } catch (error) {
    console.error(error);
    return NextResponse.json({message:"internal server error"},{status:500})
  }
}
