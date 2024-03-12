import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { title, content, category } = await req.json();

  if (!title || !content || !category) {
    return NextResponse.json(
      { message: "please don't leave any fields empty" },
      { status: 400 }
    );
  }

  try {
    if (session) {
      console.log(session);

      const userName = session?.user.username;

      const fetchUser = await db.user.findUnique({
        where: {
          username: userName,
        },
      });

      const userId = fetchUser?.id;

      if (userId) {
        const post = await db.post.create({
          data: {
            title,
            content,
            likes: 0,
            authorId: userId,
            published: true,
            category,
          },
        });

        return NextResponse.json({ message: "created post" }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "User not found or has no ID" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: "User session not found, unauthorized" },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
