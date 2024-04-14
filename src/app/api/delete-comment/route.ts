import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get('id'); 

    const session = await getServerSession(authOptions);

    if (!session?.user || session?.expires) {
        return NextResponse.json({
            message: "Not Authenticated!"
        }, {
            status: 404
        });
    }

    try {
        
        await db.comment.delete({
            where: {
                id: Number(commentId)
            }
        });

        return NextResponse.json({
            message: "Comment deleted successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Failed to delete comment:", error);
        return NextResponse.json({
            message: "Failed to delete comment"
        }, {
            status: 500
        });
    }
}
