import { FC } from 'react'
import SidebarButton from './NavButton'
import { BookHeart, Calendar, Dumbbell, GraduationCap, Home, School, Users } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = ({ }) => {
    return (  
    <div className="w-[230px] h-full overflow-y-auto bg-gray-100 p-4 rounded-md">
            <div>
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
            <SidebarButton text='Relationships' icon={<Users />} />
            <SidebarButton text='Relationships' icon={<Users />} />
            <SidebarButton text='Relationships' icon={<Users />} />
            <div className='mt-2 mb-2 w-full h-[1px] bg-gray-400'></div>
            <span className='text-gray-400 text-sm mb-2'>Explore</span>
    </div>
    )
}

export default Sidebar