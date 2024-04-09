import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from 'crypto';

function generateHash(userId: string): string {
  return crypto.createHash('sha256').update(userId).digest('hex');
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const userId = session.user.id;
    const hashedUserId = generateHash(userId);

    if (hashedUserId) {
      const data = await db.post.findMany({
        where: {
          authorId: hashedUserId
        }
      });

      return NextResponse.json(data);
    } else {
      return NextResponse.json({
        message: "Failed to generate hashed user ID"
      }, { status: 500 });
    }
  } else {
    return NextResponse.json({
      message: "User session not found, unauthorized"
    }, { status: 401 });
  }
}
