import { getPost } from "@/lib/getPost";
import { CldImage } from "next-cloudinary";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Comment{
    content: String,
    id: Number,
    postId: Number
}

export default async function PostDetails( { params }: { params: {postId: string}}){

    const postId = parseInt(params.postId);
    
    const postData = await getPost(postId);

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col space-y-4 w-full sm:w-1/3 mx-5 bg-white text-gray-800 shadow-md p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{postData?.title}</h2>
                <span className="w-20 px-4 py-1 text-white bg-black rounded-2xl text-sm">{postData?.category}</span>
                <p className="mb-4">{postData?.content}</p>
                {
                    postData?.imageUrl ? (
                        <CldImage
                        src={postData?.imageUrl}
                        alt="image"
                        className="size-50"
                        />
                    ) : (
                        null
                    )
                }
                <div className="flex justify-between">
                <input type="text" placeholder="Add a comment" className="border border-gray-800 text-sm p-3 w-3/4 mt-3 mb-3 rounded-lg h-1/2 outline-none text-gray-800" />
                <Button variant='default' className="mt-4 w-20" size='default'>Add</Button>
                </div>
                <section className="border border-gray-800 rounded-md mt-5">

                    <ScrollArea className="w-full h-1/2 rounded-md border p-4">
                        {postData?.comments.map((comment: Comment, idx) => (
                            <div key={idx}>
                                <p>{comment?.content}</p>
                            </div>
                        ))}
                    </ScrollArea>
                </section>
            </div>

            
        </main>
    )
}