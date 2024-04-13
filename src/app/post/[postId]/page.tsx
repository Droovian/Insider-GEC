import { getPost } from "@/lib/getPost";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Textarea } from "@/components/ui/textarea";
import { CloudImage } from "@/components/CloudImage/cloud-image";
import Bar from "./components/bar";
import { AddButton } from "./components/report";

interface Comment{
    content: String,
    id: Number,
    postId?: number
}

export default async function PostDetails( { params }: { params: {postId: string}}){

    const postId = parseInt(params.postId);
    
    const postData = await getPost(postId);

    return (
        <>
<div className="hidden sm:block relative h-screen w-full text-black bg-gray-100 overflow-x-hidden no-scrollbar">
  <div className="fixed top-0 w-screen bg-gray-100 z-50">
    <Navbar/>
  </div>

  <div className="fixed left-0 top-0 h-screen bg-gray-100 z-40 pt-16 border-r border-gray-200">
    <div className="w-64 p-4">
      <Sidebar />
    </div>
  </div>

  <div className="ml-64 mt-16 pt-0">
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex flex-wrap px-4 pt-0 pb-8">
        <div className="w-full">
          <main className="pt-0 mt-20  flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col space-y-4 w-full mx-5 bg-white text-gray-800 shadow-md p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold">{postData?.title}</h2>
                <span className="px-4 py-1 ml-auto text-white bg-black rounded-2xl text-sm">{postData?.category}</span>
                <p className='font-normal text-xs ml-3'>1/1/2011</p>
              </div>
              <p className="mb-4">{postData?.content}</p>
              <div>
                {postData?.imageUrl && (
                  <>
                    <div>
                      <CloudImage
                        src={postData?.imageUrl}
                        alt="Uploaded Image"           
                      />
                    </div>
                  </>
                )}
              </div>
                  <Bar/>
                  <AddButton postId={postId}/>
                  
              <div>
                <section className="rounded-md mt-5">
                  <h1 className="text-center text-xl font-semibold py-2">Comments</h1>
                  <div className="overflow-y-scroll no-scrollbar h-48">
                    
                    {postData?.comments.map((comment: Comment, idx) => (
                      <div key={idx} className="border border-gray-150 p-1 mb-2 flex justify-between">
                        <div>
                          <p className="pl-2">{comment?.content}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-normal text-xs">20/4/2022</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</div>

{/* 
Mobile View
*/}

<div className="relative sm:hidden">
                    <div className="fixed w-full top-0 bg-gray-100 z-50">
                      <Navbar/>
                    </div>

                    <div className="flex w-full">
                      <div className="flex flex-col flex-grow">
                        <div className="flex flex-wrap px-4 pt-16 pb-8">
                          <div className="w-full">
                          <main className="pt-0 flex justify-center items-center h-screen">
            <div className="flex flex-col space-y-4 w-full mx-5 bg-white text-gray-800 shadow-md p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold">{postData?.title}</h2>
                <span className="px-4 py-1 ml-auto text-white bg-black rounded-2xl text-sm">{postData?.category}</span>
                <p className='font-normal text-xs ml-3'>1/1/2011</p>
              </div>
              <p className="mb-4">{postData?.content}</p>
              <div>
                {postData?.imageUrl && (
                  <>
                    <div>
                      <CloudImage
                        src={postData?.imageUrl}
                        alt="Uploaded Image"           
                      />
                    </div>
                  </>
                )}
              </div>
                  <Bar/>
                  <AddButton/>
                  
              <div>
                <section className="rounded-md mt-5">
                  <h1 className="text-center text-xl font-semibold py-2">Comments</h1>
                  <div className="overflow-y-scroll no-scrollbar h-28 ">
                    
                    {postData?.comments.map((comment: Comment, idx) => (
                      <div key={idx} className="border border-gray-150 p-1 mb-2 flex justify-between">
                        <div>
                          <p className="pl-2">{comment?.content}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-normal text-xs">20/4/2022</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </main>
                          </div>

                          <div className="w-full lg:w-1/4 pl-1 ml-0 xl:block">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



        
    </>
    )
}
