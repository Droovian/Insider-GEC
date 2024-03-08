import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default async function Home() {

  const session = await getServerSession(authOptions);

  console.log(session);
  
  return (
    <div className="h-screen w-full bg-black text-white">
        <Navbar/>
        {session?.user ? (
          <div>
            <p className="text-white">Hello nigga {session?.user.username}
            </p>
          </div>
        ) : null}
    </div>
  );
}
