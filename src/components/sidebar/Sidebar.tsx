import { FC } from 'react'
import SidebarButton from './NavButton'
import { BookHeart, Calendar, Dumbbell, GraduationCap, Home, School, Users } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = ({ }) => {
    return (  
    <div className="w-[230px] bg-gray-100 p-4 rounded-md">
            <div className='mb-3'>
                <Button className="w-full border hover:bg-gray-200 p-2 mt-2 font-normal" variant='ghost'>
                    <Link href='/create'>Create Post</Link>
                </Button>
                <Button className="w-full border hover:bg-gray-200 p-2 mt-2 font-normal" variant='ghost'>
                    <Link href='/my-posts'>View My Posts</Link>
                </Button>
            </div>
            <div className='mt-2 mb-2 w-full h-[1px] bg-gray-200'></div>
                <SidebarButton text='Home' icon={<Home />}/>
                <SidebarButton text='Popular' icon={<BookHeart />}/>
            <div className='mt-2 mb-2 w-full h-[1px] bg-gray-200'></div>
            <span className='text-gray-400 text-sm mb-2'>TOPICS</span>
                <SidebarButton text='Events' icon={<Calendar />}/>
                <SidebarButton text='Academics' icon={<GraduationCap />}/>
                <SidebarButton text='Sports' icon={<Dumbbell />}/>
                <SidebarButton text='Campus' icon={<School />} />
            <div className='mt-2 w-full h-[1px] bg-gray-200'></div>
            
    </div>
    )
}

export default Sidebar