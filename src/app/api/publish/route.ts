import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from 'crypto';
import { createRateLimiter, RateLimitConfig} from "@/lib/ratelimiting/rateLimiter";

function generateHash(userId: string): string{
  return crypto.createHash('sha256').update(userId).digest('hex');
}

const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(500),
  category: z.string(),
  imageUrl: z.string().optional()
});

const rateLimitConfig:RateLimitConfig = {
  windowSize: 2,
  windowDuration: 10,
  windowUnit: "m"
}

const rateLimiter = createRateLimiter(rateLimitConfig);

export async function POST(req: Request) {
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
  const session = await getServerSession(authOptions);

  const { success, pending, limit, reset, remaining } = await rateLimiter.limit(ip!)
      if (!success) {
        console.log("Rate limit exceeded");
        return NextResponse.json(
          { message: "rate limit exceeded" },
          { status: 429 }
        );
      }
  const { title, content, category, imageUrl, authorId } = await req.json();

  if (!title || !content || !category) {
    return NextResponse.json(
      { message: "please don't leave any fields empty" },
      { status: 400 }
    );
  }

  if(!authorId){
    return NextResponse.json(
      { message: "You must first create an anonymous session before you proceed..." },
      { status: 401 }
    );
  }

  const isValid = createPostSchema.safeParse({title, content, category, imageUrl});

  if(!isValid?.success){
    return NextResponse.json(
      { message: "Invalid data entered" },
      { status: 400 }
    );
  }

  try {
        await db.post.create({
          data: {
            title,
            content,
            published: true,
            authorId: authorId,
            category,
            imageUrl: imageUrl
          },
        });

        return NextResponse.json({ message: "created post" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
