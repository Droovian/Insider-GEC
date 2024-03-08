"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

export default function Navbar(){
    return (
        <header className="w-full h-20 border-b border-gray-400 flex justify-between p-3 mx-3">
            <div className="flex items-center">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Insider</AvatarFallback>
            </Avatar>
            </div>
            <div className="invisible sm:visible flex space-x-3 items-center w-1/4">
                <Input placeholder="Search..." className="text-black p-3"/>
                <Button variant='ghost'>Search</Button>
            </div>
            <div className="flex items-center space-x-10 mr-4">
                <Button variant='secondary' size='default'>Log In</Button>
                <Button variant='secondary'>Sign Up</Button>
                <Button onClick={() => signOut()} variant='destructive'>SignOut</Button>
            </div>
        </header>
    )
}