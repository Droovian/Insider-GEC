import { db } from "@/lib/db";

export async function getPost(postId: number){

    try {

        const data = await db.post.findUnique({
            where:{
                id: postId
            }
        })

        return data;
    }

    catch(error){
        console.error('Database error', error);
        throw new Error('Failed to fetch post.');
    }

}