import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';

export async function getPost(postId: number){

    noStore();
    try {

        const data = await db.post.findUnique({
            where:{
                id: postId
            },
            include:{
                comments: true
            }
        })

        return data;
    }

    catch(error){
        console.error('Database error', error);
    }

}