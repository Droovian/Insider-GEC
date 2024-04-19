"use client"
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import SidebarButton from "./NavButton"
import { BookHeart, Calendar, Dumbbell, GraduationCap, Home, School, Users, Hotel, Heart, MousePointer2, Drum, Bolt, Mail, Angry, ChefHat } from 'lucide-react'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SHEET_SIDES = ["left"] as const

type SheetDemo = (typeof SHEET_SIDES)[number]

export function SheetDemo() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchQuery = useSearchParams().get('query') || "";
  const handleClick = (value: string) => {
    router.push(`/?query=${searchQuery}&category=${value}`);
  }
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
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                      Insider
                    </h2>
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
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar">
                    <div className='mt-2 mb-2 w-full h-[1px] bg-gray-400'></div>
                    <SidebarButton text='Home' icon={<Home />} onClick={() => handleClick("")} />
                    <div className='mt-2 mb-2 w-full h-[1px] bg-gray-400'></div>
                    <span className='text-gray-400 text-sm mb-2'>TOPICS</span>
                    <SidebarButton text='Events' icon={<Calendar />} onClick={() => handleClick("Events")} />
                    <SidebarButton text='Academics' icon={<GraduationCap />} onClick={() => handleClick("Academics")} />
                    <SidebarButton text='Sports' icon={<Dumbbell />} onClick={() => handleClick("Sports")} />
                    <SidebarButton text='Campus' icon={<School />} onClick={() => handleClick("Campus")} />
                    <SidebarButton text='Hostel' icon={<Hotel />} onClick={() => handleClick("Hostel")} />
                    <SidebarButton text='Relationships' icon={<Heart />} onClick={() => handleClick("Relationships")} />
                    <SidebarButton text='Council' icon={<MousePointer2 />} onClick={() => handleClick("Council")} />
                    <SidebarButton text='Creative-corner' icon={<Drum />} onClick={() => handleClick("Creative-Corner")} />
                    <SidebarButton text='Venting' icon={<Angry />} onClick={() => handleClick("Venting")} />
                    <SidebarButton text='Jobs' icon={<Mail />} onClick={() => handleClick("Jobs")} />
                    <SidebarButton text='Food' icon={<ChefHat />} onClick={() => handleClick("Food")} />
                    <SidebarButton text='Others' icon={<Bolt />} onClick={() => handleClick("Others")} />
                  </div>
                </div>
              </SheetDescription>

            </SheetHeader>



          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
