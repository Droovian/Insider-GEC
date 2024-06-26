import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import Recent from "@/components/card/Recent";
import { Suspense } from "react";
import { NavbarSkeleton } from "@/components/skeletons/NavbarSkeleton";
import { SidebarSkeleton } from "@/components/skeletons/SidebarSkeleton";
import { PostSkeleton } from "@/components/skeletons/PostSkeleton";
import { RecentSkeleton } from "@/components/skeletons/RecentSkeleton";
import { getAuthSession } from "@/lib/auth";
import Provider from "./context/client-provider";

export default async function Home() {

  const session = await getAuthSession();
  
  return (

    <div className="sm:block relative h-screen w-full text-black bg-gray-100 overflow-x-hidden no-scrollbar">
      <div className="fixed top-0 w-screen bg-gray-100 z-50">
        <Suspense fallback={<NavbarSkeleton />}>
          <Provider session={session}>
            <Navbar />
          </Provider>
        </Suspense>
      </div>

      <div className="invisible sm:visible fixed left-0 top-0 h-screen bg-gray-100 z-40 pt-16 border-r border-gray-200">
        <div className="w-64 p-4">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
        </div>
      </div>

      <div className="sm:ml-52 pt-16">
        <div className="flex h-screen overflow-y-auto">

          <div className="w-full sm:w-full xl:w-3/4 p-3">
            <Suspense fallback={<PostSkeleton />}>
            <Provider session={session}>
              <GeneralFeed />
            </Provider>
            </Suspense>
          </div>
          <div className="invisible xl:visible fixed right-5 lg:right-10">
            <Suspense fallback={<RecentSkeleton />}>
              <Recent />
            </Suspense>
          </div>

        </div>
      </div>
    </div>

  );
}
