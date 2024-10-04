"use client"
import { FC } from 'react'
import SidebarButton from './NavButton'
import { Angry, Bolt, BookHeart, Calendar, ChefHat, Drum, Dumbbell, GraduationCap, Heart, Home, Hotel, Mail, MousePointer2, School } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = ({ }) => {
    const router = useRouter();
    const searchQuery = useSearchParams().get('query') || "";
    const handleClick = (value: string) => {
        router.push(`/?query=${searchQuery}&category=${value}`);
    }
    return (
        <div className="w-[230px] p-4 rounded-md">
            <div className='mb-3'>
            <Link href='/create'>
                <Button className="w-full border hover:bg-gray-200 p-2 mt-2 font-normal" variant='ghost'>
                    Create Post
                </Button>
            </Link>
            <Link href='/my-posts'>
                <Button className="w-full border hover:bg-gray-200 p-2 mt-2 font-normal" variant='ghost'>
                    View My Posts
                </Button>
            </Link>
            </div>
            <div className="overflow-y-auto no-scrollbar">
                <div className='mt-2 mb-2 w-full h-[1px] bg-gray-200'></div>
                <SidebarButton text='Home' icon={<Home />} onClick={() => handleClick("")} />
                <div className='mt-2 mb-2 w-full h-[1px] bg-gray-200'></div>
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
                <div className='mt-2 w-full h-[1px] bg-gray-200'></div>
            </div>
        </div>
    )
}

export default Sidebar