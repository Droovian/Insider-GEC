"use client";

import type { Vote } from '@prisma/client';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import React from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from 'react-query';
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FC, useEffect, useRef } from 'react';
import { CldImage } from 'next-cloudinary';
import { Button } from "./ui/button";
import PostVoteClient from './post-vote/PostVoteClient';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

interface Post {
    id?: number;
    title?: string;
    content?: string;
    category?: string;
    imageUrl?: string | null;
    createdAt?: Date;
    votes: Vote[];
}

interface PostFeedProps {
    initialPosts: Post[];
}

const PostFeed: FC<PostFeedProps> = React.memo(({ initialPosts }) => {
    const searchQuery = useSearchParams().get('query') || "";
    const categoryValue = useSearchParams().get('category') || "";

    const lastPostRef = useRef<HTMLElement>(null);

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
        ['posts', searchQuery, categoryValue],
        async ({ pageParam = 1 }) => {
            const query = `/api/getAllPosts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}&query=${searchQuery}&category=${categoryValue}`;
            const { data } = await axios.get<Post[]>(query);
            return data;
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1;
            },
            initialData: { pages: [initialPosts], pageParams: [1] },
        }
    );

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage(); // Load more posts when the last post comes into view
        }
    }, [entry, fetchNextPage]);

    const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

    return (
        <div className="grid grid-cols-1 w-full">
            {posts.map((post) => {
                const votesAmt = post.votes
                    ? post.votes.reduce((acc, vote) => {
                        if (vote.type === 'UP') return acc + 1;
                        if (vote.type === 'DOWN') return acc - 1;
                        return acc;
                    }, 0)
                    : 0;

                let currentVote = post.votes.find(
                    (vote) => vote.postId === post.id
                );

                return (
                    <div
                        key={post?.id}
                        className="w-full sm:w-full mx-auto mt-1 border shadow-md bg-gray-100"
                    >
                        <div className="flex items-center justify-between text-sm mx-4">
                            <p className='font-light text-xs py-3'>{post?.createdAt ? new Date(post.createdAt).toDateString() : 'Invalid Date'}</p>
                        </div>

                        <Link href={`/post/${post?.id}`} className="mx-4 rounded-md cursor-pointer">
                            <div className="p-4">
                                <h1 className={`text-xl mb-2 font-semibold text-gray-900`}>{post.title || "Hello"}</h1>
                                {post.imageUrl && (
                                    <CldImage
                                        className='rounded-xl mb-2 object-cover'
                                        crop="fill"
                                        width={400}
                                        height={300}
                                        src={post.imageUrl}
                                        alt='random-image'
                                    />
                                )}
                                <div className="overflow-auto">
                                    <p className='font-normal text-sm text-gray-800'>{post.content || "content"}</p>
                                </div>
                            </div>
                        </Link>

                        <div className="flex items-center justify-center pb-3">
                            <PostVoteClient postId={post.id} initialVotesAmt={votesAmt} initialVote={currentVote?.type} />
                            <Button className='rounded-full' variant='ghost'>
                                <Link href={`/post/${post?.id}`}>
                                    <MessageSquare />
                                </Link>
                            </Button>
                        </div>
                        <hr />
                    </div>
                );
            })}

            <Button 
                variant='link' 
                onClick={() => fetchNextPage()} 
                disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
            </Button>

            {isFetching && !isFetchingNextPage ? (
                <div className="loading-message mx-auto">
                    <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                </div>
            ) : null}
        </div>
    );
});

PostFeed.displayName = 'PostFeed';

export default PostFeed;
