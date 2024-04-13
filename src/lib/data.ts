import { db } from "./db";

export async function getPosts(){

    try {
        console.log("Trying to fetch data:");
    
        const res = await db.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res;

    }
    catch(error){
        console.error("Database error", error);
        throw new Error('Failed to fetch posts');

    }
}