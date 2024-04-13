"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}from "@/components/ui/sheet"
import SidebarButton from "./NavButton"
import { BookHeart, Calendar, Dumbbell, GraduationCap, Home, School, Users } from 'lucide-react'
import Link from "next/link"

const SHEET_SIDES = ["left"] as const

type SheetDemo = (typeof SHEET_SIDES)[number]

export function SheetDemo() {
  const {data:session} = useSession();
    
    const url = `${session?.user?.image}`;
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <div>

            <Button variant="outline">=</Button>
            </div>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
            <SheetTitle>
            <div className="flex items-center">
                <Link href='/'>
                <Avatar>
                    <AvatarImage src={url} alt='default-user' />
                    <AvatarFallback>{session?.user ? (
          <>
            <p className="text-black">{session?.user.username || session.user.name}
            </p>
          </>
        ) : null}</AvatarFallback>
                </Avatar>
                </Link>
            </div>
            </SheetTitle>
              <SheetDescription>
              <div className=" bg-white p-4 rounded-md">
                  <div >
                      <Button className="w-full border hover:bg-gray-200 p-2 mt-2" variant='secondary'>
                          <Link href='/create'>Create Post</Link>
                      </Button>
                      <Button className="w-full border hover:bg-gray-200 p-2 mt-2" variant='secondary'>
                        <Link href='/my-posts'>View My Posts</Link>
                    </Button>
                  </div>
                    <div className='mt-2 mb-2 w-full h-[1px] bg-gray-400'></div>
                      <SidebarButton text='Home' icon={<Home />}/>
                      <SidebarButton text='Popular' icon={<BookHeart />}/>
                    <div className='mt-2 mb-2 w-full h-[1px] bg-gray-400'></div>
                    <span className='text-gray-400 text-sm mb-2'>TOPICS</span>
                      <SidebarButton text='Events' icon={<Calendar />}/>
                      <SidebarButton text='Academics' icon={<GraduationCap />}/>
                      <SidebarButton text='Sports' icon={<Dumbbell />}/>
                      <SidebarButton text='Campus' icon={<School />} />
                    <div className='mt-2 mb-2 w-full h-[1px] bg-gray-400'></div>
                    <span className='text-gray-400 text-sm mb-2'>Explore</span>
              </div>
              </SheetDescription>
            </SheetHeader>
            

            
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
