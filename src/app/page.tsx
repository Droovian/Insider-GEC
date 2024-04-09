import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/sidebar/Sidebar";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import doSomething from "./api/testing/route"; // i'm using this for deleting data from prisma
import Recent from "@/components/card/Recent";
export default async function Home() {

  const session = await getServerSession(authOptions);

    // await doSomething();
  console.log('session',session);
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

                    <div className="ml-64 pt-16">
                      <div className="flex flex-col h-screen overflow-y-auto">
                        <div className="flex flex-wrap px-4 pt-2 pb-8">
                          <div className="w-full xl:w-3/4 p-4 md:w-full">
                            <GeneralFeed />
                          </div>
                          <div className="invisible md:visible fixed top-0 right-10 h-screen pt-16">
                              <Recent/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="relative sm:hidden">
                    <div className="fixed w-full top-0 bg-gray-100 z-50">
                      <Navbar/>
                    </div>

                    <div className="flex w-full">
                      <div className="flex flex-col flex-grow">
                        <div className="flex flex-wrap px-4 pt-16 pb-8">
                          <div className="w-full xl:w-3/4 p-4 md:w-full">
                            <GeneralFeed />
                          </div>

                          <div className="w-full lg:w-1/4 pl-1 ml-0 xl:block">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

    </>
  );
}
