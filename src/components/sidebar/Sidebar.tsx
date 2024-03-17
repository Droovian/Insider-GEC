import { FC } from 'react'
import SidebarButton from './NavButton'
import { BookHeart, Calendar, Dumbbell, GraduationCap, Home, School, Users } from 'lucide-react'

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = ({ }) => {
    return (  
    <div className="invisible sm:visible w-[230px] bg-gray-200 p-4 rounded-md">
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