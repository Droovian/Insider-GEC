"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { SheetDemo } from "./sidebar/Drawer";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function Navbar(){

    const {data:session} = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const currentPath = usePathname();
    
    const categoryValue = useSearchParams().get('category') || "";
    const handleSearch = () => {
        router.push(`/?query=${searchQuery}&category=${categoryValue}`);
    };

    const timerRef = useRef<number | NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            if (currentPath.includes('query') && searchQuery === '') {
                router.push('/?query=');
            }
        }, 500); // 500ms delay
    }, [searchQuery]);
    
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
             <div className="sm:hidden flex items-center pb-0">
                  <Link href='/'>
                  <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
                    Insider
                  </h2>
                  </Link>
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