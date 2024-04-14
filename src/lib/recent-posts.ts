import { db } from "./db";

export default async function RecentPosts(){

    try{
        const recentPosts = await db.post.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            take: 3
        });

        return { recentPosts };
    }
    catch(error){
        return { error: "An error occured while fetching! " };
    }
}