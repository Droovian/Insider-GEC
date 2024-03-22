"use client";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from 'react-query';
import axios from "axios";
import { Loader2 } from "lucide-react";
import { SlOptions } from "react-icons/sl";
import { FC, useEffect, useRef, useState } from 'react'
import { useSession } from "next-auth/react";
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Textarea } from "./ui/textarea";

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
    const [reportReason, setReportReason] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

    const reportPost = async (postId?: number) => {
        try {
            setIsSubmitting(true); 
            await axios.post('http://localhost:3000/api/reportPost', {
                postId: postId,
                reason: reportReason
            });
            setReportReason('');
            setIsSubmitting(false); 
            setReportSubmitted(true);
        
            setTimeout(() => {
                setReportSubmitted(false);
            }, 2000);
        }
        catch(error){
            console.error('Failed to report post. Try again later');
            setIsSubmitting(false);
        }
    }

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
                        <div className="flex items-center justify-between gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <Drawer>
                        <DrawerTrigger>
                            <SlOptions/>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                            <DrawerTitle className="text-center">Why do you want to report this?</DrawerTitle>
                            </DrawerHeader>
                            <Textarea
                            value={reportReason}
                            onChange={(e) => {setReportReason(e.target.value)}}
                            className="w-1/2 mx-auto"/>
                            <DrawerFooter>
                            <Button variant='default' className="mx-auto" size='sm'
                            onClick={() => {reportPost(post.id)}}>Submit</Button>
                            <DrawerClose>
                                <Button variant="outline" size='sm'
                                onClick={() => { setReportReason(''); }}>Cancel</Button>
                            </DrawerClose>
                            {isSubmitting && (
                                    <Loader2 className='mx-auto w-6 h-6 text-zinc-500 animate-spin' />
                            )}
                            {reportSubmitted && (
                                <p className="text-black text-lg text-center">
                                    Report submitted successfully!
                                </p>     
                            )}
                            </DrawerFooter>
                        </DrawerContent>
                        </Drawer>
                    </div>
                    <div className="m-4 border-2 border-gray-150 rounded-md hover:bg-gray-300 transition duration-300">
                        <div className="p-4">
                            <h1 className={`text-xl mb-2 font-semibold`}>{post.title || "Hello"}</h1>
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