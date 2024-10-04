import { getPost } from "@/lib/getPost";
import { CloudImage } from "@/components/CloudImage/cloud-image";
import { PostComments } from "@/components/ui/post-comments";
import Comment from "@/components/Comment";

interface Comment {
    content: string;
    id: number;
    postId: number;
    createdAt: Date;
    userId: string;
}

export default async function PostDetails({ params }: { params: { postId: string } }) {
    const postId = parseInt(params?.postId);
    const postData = await getPost(postId);

    return (
        <div className="h-screen w-full text-gray-900">
            <main className="flex justify-center items-center py-6">
                <div className="w-full max-w-4xl bg-white text-gray-800 shadow-lg p-8 rounded-lg">
                    <div className="flex items-center mb-6">
                        <h2 className="text-xl font-semibold mr-4">{postData?.title}</h2>
                        <span className="px-3 py-1 ml-auto text-xs text-white bg-black rounded-full">{postData?.category}</span>
                        <p className="font-normal text-xs ml-3">{postData?.createdAt ? new Date(postData?.createdAt).toDateString() : 'Invalid Date'}</p>
                    </div>
                    <p className="text-md mb-6">{postData?.content}</p>
                    {postData?.imageUrl && (
                        <div className="flex justify-center mb-6">
                            <CloudImage src={postData?.imageUrl} alt="Post image" />
                        </div>
                    )}
                    <PostComments postId={postId} />
                    <section className="mt-8">
                        <h3 className="text-center text-xl font-semibold py-3">Comments</h3>
                        <div className="overflow-y-auto h-72">
                            {postData?.comments.map((comment: Comment) => (
                                <Comment
                                    key={comment.id}
                                    content={comment.content}
                                    createdAt={comment.createdAt}
                                    id={comment.id}
                                    postId={comment.postId}
                                    userId={comment.userId}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
