import { db } from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function RecentPosts(){

    const session = await getServerSession(authOptions);

    if(!session?.user || session?.expires){
        return { error: "Please login to view!" };
    }
    
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