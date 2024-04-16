import { getPost } from "@/lib/getPost";
import { CloudImage } from "@/components/CloudImage/cloud-image";
import { PostComments } from "@/components/ui/post-comments";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Comment from "@/components/Comment";

interface Comment{
    content: string,
    id: Number,
    postId: Number
    createdAt : Date
    userId: string
}

export default async function PostDetails( { params }: { params: {postId: string}}){

    const postId = parseInt(params?.postId);
    
    const postData = await getPost(postId);

    return (
        <>
        <div className="relative overflow-y-auto h-screen w-full text-black bg-gray-100  no-scrollbar">
                <div className="fixed top-0 w-screen bg-gray-100 z-50">
                    <Navbar/>
                </div>

                <div className="hidden lg:block fixed left-0 top-0 h-screen bg-gray-100 z-40 pt-16 border-r border-gray-200">
                    <div className="w-64 p-4">
                    <Sidebar />
                    </div>
                </div>

                    <div className="h-full overflow-y-auto no-scrollbar mt-16">
                    <div className="flex flex-wrap px-4 pt-0 pb-8">
                        
                        <main className="m-3 p-3 w-full flex justify-center items-center  bg-gray-100">
                            <div className="flex flex-col space-y-4 sm:w-1/2 mx-5 bg-white text-gray-800 shadow-md p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <h2 className="text-md sm:text-xl mr-4 font-semibold">{postData?.title}</h2>
                                <span className="px-2 py-1 ml-auto text-white bg-black rounded-2xl text-xs">{postData?.category}</span>
                                <p className='font-normal text-xs ml-3'>{postData && postData?.createdAt ? new Date(postData?.createdAt).toDateString() : 'Invalid Date'}</p> {/*date from db */}
                            </div>
                                <p className="text-sm mb-4 sm:text-md">{postData?.content}</p>
                                {
                                    postData?.imageUrl ? (
                                        <div className="flex justify-center">
                                                <CloudImage
                                            src={postData?.imageUrl}
                                            alt="image"
                                            />
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                <PostComments postId={postId} />
                                <section className="rounded-md mt-5">
                                <h1 className="text-center text-xl font-semibold py-2">Comments</h1>
                                <div className="overflow-y-scroll h-72">
                                    {postData?.comments.map((comment: Comment, idx) => (
                                        <Comment key={idx} content={comment?.content} createdAt={comment?.createdAt} id={comment?.id} postId={comment?.postId} userId={comment?.userId} />
                                    ))}
                                </div>
                                </section>
                            </div>       
                        </main>
                        
                    </div>
                    </div>
                </div>

        
        </>
    )
}