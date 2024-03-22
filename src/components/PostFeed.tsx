"use client";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from 'react-query';
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from 'react'
import { useSession } from "next-auth/react";
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";

interface Post {
    id?:number;
    title?: string;
    content?: string;
    category?: string;
    createdAt?:Date;
}

interface PostFeedProps {
    initialPosts: Post[];
}

const PostFeed:FC<PostFeedProps> = ({ initialPosts }) => {
    const lastPostRef = useRef<HTMLElement>(null)

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
        ['posts'],
        async ({ pageParam = 1 }) => {
            const query = `http://localhost:3000/api/getAllPosts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`
            const { data } = await axios.get<Post[]>(query)
            return data;
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },
            initialData: { pages: [initialPosts], pageParams: [1] }
        }
    );

    const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

    return (
        <div className="grid grid-cols-1 gap-4">
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    className="rounded-lg bg-white border shadow-md hover:shadow-lg transition duration-300"
                >
                    <div className="flex items-center justify-between m-5 text-sm">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="m-4 border-2 border-gray-150 rounded-md hover:bg-gray-300 transition duration-300">
                        <div className="p-4">
                            <h1 className="text-xl mb-2 font-semibold">{post.title || "Hello"}</h1>
                            <div className="overflow-auto">
                                <p className='font-light text-sm'>{post.content || "content"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between p-2">
                        <div className='flex gap-4 p-2'>
                            <ThumbsUp />
                            <ThumbsDown />
                            <MessageCircle />
                        </div>
                    </div>
                </div>
            ))}

            <Button variant='link' onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}>
                {
                    isFetchingNextPage ? 'Loading more...'
                    : hasNextPage ? 'Load More'
                    : 'Nothing more to load'
                }
            </Button>
            {isFetching && !isFetchingNextPage ?  (
                <div className="loading-message mx-auto">
                    <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                </div>
            ): null
            }

            
        </div>
    );
};


export default PostFeed;