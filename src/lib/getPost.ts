import { db } from "@/lib/db";

export async function getPost(postId: number){

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