import { db } from "@/lib/db";
import PostFeed from "../PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";




const GeneralFeed = async() => {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
        include: {
            votes: true
        }
    });

    return <PostFeed initialPosts={posts} />
}

export default GeneralFeed