import Navbar from "@/components/Navbar";

import TeamsData from "./teamdata";








export default async function Team(){


    return (
        <>
<div className="relative h-screen w-full text-black bg-gray-100 overflow-x-hidden no-scrollbar">
  <div className=" fixed top-0 w-screen bg-gray-100 z-50">
    <Navbar/>
  </div>
  <div className="mt-16 pt-0">
    <div className=" h-full overflow-y-auto">
      <div className="flex flex-wrap px-4 pt-0 pb-8">
        <div className="w-full">
                    <div>
                        <TeamsData /> 
                    </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
    )
}
