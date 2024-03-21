"use server";

import { db } from "./db";

export default async function likePost(postId: number) {
    try {
        // Here you would typically update the post in the database to reflect the user's like
        console.log(`Post ${postId} liked`);

        const find = await db.post.findUnique({
            where:{
                id: postId
            },
        });

        console.log(find);
        
    } catch (error) {
        console.error('Error liking post:', error);
    }
}