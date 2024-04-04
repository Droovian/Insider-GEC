import { getPost } from "@/lib/getPost";

export default async function PostDetails( { params }: { params: {postId: string}}){

    const postId = parseInt(params.postId);
    
    const postData = await getPost(postId);

    return (
        <main className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">{postData?.title}</h2>
                <p className="text-gray-700 mb-4">{postData?.content}</p>
                <p className="text-gray-600">Category: {postData?.category}</p>
            </div>
        </main>
    )
}