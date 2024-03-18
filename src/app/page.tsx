import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Card from "@/components/card/Card";
import Sidebar from "@/components/sidebar/Sidebar";
import { getPosts } from "@/lib/data";
import { Suspense } from "react";
import Loader from "@/components/card/loader";
import Recent from "@/components/card/Recent";
import { Drawer } from "vaul";
import DrawerDemo from "@/components/sidebar/Drawer";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const posts = await getPosts();

  console.log('posts are', posts);
  
  console.log(session);
  
  return (
    <div className="h-screen w-full text-black bg-gray-100 overflow-x-hidden">
        <Navbar/>
        {session?.user ? (
          <>
          {/* // <div>
          //   <p className="text-white">Hello {session?.user.username || session.user.name}
          //   </p>
          // </div> */}
          </>
        ) : null}
          {/* Sidebar */}
          <div className="flex w-full">
      {/* Responsive container for sidebar and main content */}
      <div className="hidden sm:flex flex-shrink-0 w-64 bg-gray-100 p-4 rounded-md">
        <Sidebar />
      </div>
      <div className="hidden sm:block w-0.5 h-auto bg-gray-300 py-0 mx-2"></div>

      <div className="flex flex-col flex-grow">
        {/* Mobile-only drawer */}
        <div className="sm:hidden">
          {/* <DrawerDemo /> */}
        </div>
        {/* Main content area with responsive grid */}
        <div className="flex flex-wrap px-4 py-8">
          <Suspense fallback={<Loader />}>
            {/* Left card (full width on mobile, 3/5 on larger screens) */}
            <div className="w-full  lg:w-3/4 p-4 md:w-full">
              <Card />
            </div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            {/* Right card (always 2/5 width) */}
            <div className="w-full  lg:w-1/4 pl-1 ml-0 hidden lg:block">
              <Recent />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
    </div>
  );
}
