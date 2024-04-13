import Navbar from "@/components/Navbar";

import TeamsData from "./team";
import TeamsDataMobile from "./teammobile";







export default async function Team(){


    return (
        <>
<div className="hidden sm:block relative h-screen w-full text-black bg-gray-100 overflow-x-hidden no-scrollbar">
  <div className="fixed top-0 w-screen bg-gray-100 z-50">
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
                          <TeamsDataMobile /> 
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
