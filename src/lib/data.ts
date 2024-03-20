import { db } from "./db";
import { unstable_noStore as noStore } from "next/cache";

export async function getPosts(){

    // await new Promise((r) => setTimeout(r, 2000)); use this to replicate for loader
    noStore();

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