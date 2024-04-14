import { getPost } from "@/lib/getPost";
import { CloudImage } from "@/components/CloudImage/cloud-image";
import { PostComments } from "@/components/ui/post-comments";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface Comment{
    content: String,
    id: Number,
    postId: Number
    createdAt : Date
}

export default async function PostDetails( { params }: { params: {postId: string}}){

    const postId = parseInt(params?.postId);
    
    const postData = await getPost(postId);
    console.log(postData)

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

                    <div className=" h-full overflow-y-auto no-scrollbar mt-16">
                    <div className="flex flex-wrap px-4 pt-0 pb-8">
                        
                        <main className="w-full flex justify-center items-center  bg-gray-100">
                            <div className="flex flex-col space-y-4 sm:w-1/2 mx-5 bg-white text-gray-800 shadow-md p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <h2 className="text-xl font-semibold">{postData?.title}</h2>
                                <span className="px-4 py-1 ml-auto text-white bg-black rounded-2xl text-sm">{postData?.category}</span>
                                <p className='font-normal text-xs ml-3'>20/20/2020</p>
                            </div>
                                <p className="mb-4">{postData?.content}</p>
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
                                <div className="overflow-y-scroll h-40 ">
                                    
                                    {postData?.comments.map((comment: Comment, idx) => (
                                    <div key={idx} className="border border-gray-300 rounded-lg bg-gray-100 p-4 mb-4 flex items-start">
                                    <div className="flex items-center mr-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800">{comment?.content}</p>
                                        <p className="text-xs text-gray-600 mt-1">{comment && comment.createdAt ? new Date(comment.createdAt).toDateString() : 'Invalid Date'}</p>
                                    </div>
                                </div>
                                
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