"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { SheetDemo } from "./sidebar/Drawer";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DropdownMenuDemo } from "./Dropdown";
import { CiSearch } from "react-icons/ci";

export default function Navbar(){

    const {data:session} = useSession();
    
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const currentPath = useSearchParams().get('query');
    
    const categoryValue = useSearchParams().get('category');
      useEffect(() => {
            if (currentPath && searchQuery === '') {
                router.push('/?query=&category=');
            }
    }, [searchQuery]);

    const handleSearch = () => {
        router.push(`/?query=${searchQuery}&category=${categoryValue}`);
    };

    return (
        <header className="w-full h-fit border-b border-gray-200 flex justify-between p-3 mx-3">
             
            <div className="hidden sm:flex items-center">
                <Link href='/'>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Insider
                </h2>
                </Link>
            </div>

            <div className="sm:hidden mr-24">
                <SheetDemo /> 
             </div>  

            <div className="invisible sm:visible flex space-x-4 w-1/3 items-center">
            <Input
                    placeholder="Search for post..."
                    className="text-black p-3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="default" onClick={handleSearch}>
                    Search
                </Button>
            </div>

            <div className="absolute left-32 sm:hidden">
                <div className="flex justify-center items-center">
                    <Input
                        placeholder="Search..."
                        className="text-black p-3 relative"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <CiSearch onClick={handleSearch} size={20} className="absolute right-1 cursor-pointer" />
                </div>
            </div>

            <div className="flex items-center  mr-7">
                    {session?.user ? (
                        <Button onClick={() => signOut()} variant='destructive'>Sign Out</Button>
                    ) : (
                        <>
                        <div className="hidden sm:flex">
                            <Button className="mr-8" variant='default' size='sm'>
                                <Link href='/api/auth/signin'>Log In</Link>
                            </Button>
                            <Button variant='default' size='sm'>
                                <Link href='/signup'>Sign Up</Link>
                            </Button>
                        </div>
                            <div className="sm:hidden">
                                <DropdownMenuDemo/>
                            </div>
                        </>
                    )}
                
            </div>

        </header>
    )
}