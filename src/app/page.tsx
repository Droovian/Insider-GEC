import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(authOptions);

  console.log(session);
  
  return (
    <div className="h-screen w-full bg-black text-white">
        <Navbar/>
        {session?.user ? (
          <div>
            <p className="text-white">Hello {session?.user.username}
            </p>
          </div>
        ) : null}

        <div className="mx-auto bg-gray-300 text-black w-1/2 h-16 shadow-md flex justify-center items-center">
            <Button variant='default'>
              <Link href='/create'>Create Post</Link>
            </Button>
        </div>
    </div>
  );
}
