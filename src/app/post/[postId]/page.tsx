import { getPost } from "@/lib/getPost";
import { CldImage } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";


import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SlOptions } from "react-icons/sl";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { CloudImage } from "@/components/CloudImage/cloud-image";






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
          <main className="pt-0 mt-32 flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col space-y-4 w-full mx-5 bg-white text-gray-800 shadow-md p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold">{postData?.title}</h2>
                <span className="px-4 py-1 ml-auto text-white bg-black rounded-2xl text-sm">{postData?.category}</span>
                <p className='font-normal text-xs ml-3'>3/2/2021</p>
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
              <div className='flex space-x-2'>
                <Button className="bg-gray-300 border border-gray-200 rounded-full" variant='ghost'>
                  <ThumbsUp className='w-4 h-4 text-gray-500 fill-black' />
                </Button>
                <p className='text-center py-2 font-medium text-sm text-zinc-900'>100</p>
                <Button className='border border-gray-200 rounded-full text-emerald-500' variant='ghost'>
                  <ThumbsDown className='w-4 h-4 text-gray-500 fill-black' />
                </Button>
                <p className='text-center py-2 font-medium text-sm text-zinc-900'>100</p>
                <div className="flex right-0">
                  <Drawer>
                    <DrawerTrigger>
                      <SlOptions />
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle className="text-center">Why do you want to report this?</DrawerTitle>
                      </DrawerHeader>
                      <Textarea className="w-1/2 mx-auto" />
                      <DrawerFooter>
                        <Button variant='default' className="mx-auto" size='sm'>Submit</Button>
                        <DrawerClose>
                          <Button variant="outline" size='sm'>Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
              <div className="grid relative w-full gap-2">
                <Textarea placeholder="Type your message here." className="h-6 border border-gray-300 rounded p-2" />
                <div className="flex justify-end absolute bottom-0 right-0 mb-2 mr-2">
                  <Button variant='default' className="w-20" size='default' >Add</Button>
                </div>
              </div>
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



        
    </>
    )
}
