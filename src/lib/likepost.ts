"use server";

import { db } from "./db";

export default async function likePost(postId: number) {
    try {

        const find = await db.post.findUnique({
            where:{
                id: postId
            },
        });
        
    } catch (error) {
        console.error('Error liking post:', error);
    }
}