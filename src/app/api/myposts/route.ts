import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request){

    // await new Promise((r) => setTimeout(r, 5000));
    const session = await getServerSession(authOptions);

    if(session?.user){

        const userName = session?.user.username;

        const fetchUser = await db.user.findUnique({
            where: {
            username: userName,
            },
        });

      const userId = fetchUser?.id;

      if(userId){

        const data = await db.post.findMany({
            where: {
                authorId: userId
            }
        });

        return NextResponse.json(data);
      }
      else{
        return NextResponse.json({
            message: "User was not found"
        })
      }
    }
}