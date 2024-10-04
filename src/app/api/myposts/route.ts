import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from 'crypto';

function generateHash(userId: string): string {
  return crypto.createHash('sha256').update(userId).digest('hex');
}

export async function GET(req: Request) {
  
  const url = new URL(req.url);

  const userName  = url.searchParams.get('id');

  if(!userName){
    return NextResponse.json({ message: 'Cannot find user' }, { status: 400 });
  }

      const data = await db.post.findMany({
        where: {
          authorId: userName
        }
      });

      return NextResponse.json(data);
    
    return NextResponse.json({
      message: "User session not found, unauthorized"
    }, { status: 401 });
  
}
