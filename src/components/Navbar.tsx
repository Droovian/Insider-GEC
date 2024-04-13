"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { SheetDemo } from "./sidebar/Drawer";
export default function Navbar(){

    const {data:session} = useSession();
    
    return (
        <header className="w-full h-fit border-b border-gray-200 flex justify-between p-3 mx-3">
             
            <div className="hidden sm:flex items-center">
                <Link href='/'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>DN</AvatarFallback>
                </Avatar>
                </Link>
            </div>

            <div className="sm:hidden">
                <SheetDemo />
             </div>    
         
            <div className="invisible sm:visible flex space-x-4 w-1/3 items-center">
                <Input placeholder="Search for post..." className="text-black p-3"/>
                <Button variant='default'>Search</Button>
            </div>

            <div className="flex items-center space-x-10 mr-4">
                {session?.user ? (
                    <Button onClick={() => signOut()} variant='destructive'>Sign Out</Button>
                ) : (
                    <>
                        
                        <Button variant='default' size='sm'>
                            <Link href='/api/auth/signin'>Log In</Link>
                        </Button>
                        <Button variant='default' size='sm'>
                            <Link href='/signup'>Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
        </header>
    )
}