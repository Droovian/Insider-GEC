import React from 'react'
interface CommentProps{
    content: String,
    id: Number,
    postId?: number
}



export function Comments({id} : CommentProps){
  return (
      <>
      
    <div idx = {id} >
                <section className="rounded-md mt-5">
                  <h1 className="text-center text-xl font-semibold py-2">Comments</h1>
                  <div className="overflow-y-scroll no-scrollbar h-48">

                    {postData?.comments.map((comment: Comment, idx) => (
                      <div key={idx} className="border border-gray-150 p-1 mb-2 flex justify-between">
                        
                        <div>
                          <p className="pl-2">{comment?.content}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-normal text-xs">{comment?.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              </>
    
  )
}

