import { db } from "./db";
import { unstable_noStore as noStore } from "next/cache";

export async function getPosts(){

    noStore();

    try {
        console.log("Trying to fetch data:");
    
        const res = await db.post.findMany();

        return res;

    }
    catch(error){
        console.error("Database error", error);
        throw new Error('Failed to fetch posts');

    }
}