import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Card from "@/components/card/Card";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function Home() {

  const session = await getServerSession(authOptions);

  console.log(session);
  
  return (
    <div className="h-screen w-full text-black bg-white overflow-x-hidden">
        <Navbar/>
        {session?.user ? (
          <div>
            <p className="text-white">Hello {session?.user.username || session.user.name}
            </p>
          </div>
        ) : null}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar/>

          {/* Main content */}
          <div className="w-3/4 p-4">

            {/* Card Component */}
            <div className="flex justify-center items-center mt-4">
              <Card/>
            </div>

            {/* Buttons */}
            {/* <div className="mx-auto bg-gray-300 rounded-2xl text-black w-1/2 h-16 shadow-md flex space-x-10 justify-center items-center mt-4">
                <Button variant='default'>
                  <Link href='/create'>Create Post</Link>
                </Button>
                <Button variant='default'>
                  <Link href='/my-posts'>View My Posts</Link>
                </Button>
            </div> */}
          </div>
        </div>
    </div>
  );
}
