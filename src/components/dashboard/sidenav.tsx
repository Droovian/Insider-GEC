"use client";
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import GecImage from '../../../public/Images/GEC_LOGO.png';
import { useSession } from 'next-auth/react';
import { Space_Grotesk } from 'next/font/google';

const space = Space_Grotesk({
  weight: ['700','500'],
  subsets: ['latin'],
  display: 'swap',
})

export default function SideNav() {
  const { data: session } = useSession();

  // console.log(session);
  
  return (
    <div className="bg-gray-800 flex h-full flex-col px-3 py-4 md:px-2">
      
        <div className='bg-white rounded-md'>
          <Image src={GecImage}
          alt='college-image'
          className='rounded-md size-full'
          />
        </div>
    
      <div className="h-full flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        
        <div className="hidden h-auto w-full grow rounded-md bg-gray-800 md:block">
          <div>
            <p className={`text-white font-light text-xl flex justify-center mt-3`}>Hello {session?.user?.username}</p>
          </div>
        </div>
        <div className='flex justify-between w-full items-center mt-3'>
          <Link href='/' className='flex justify-center'>
              <Button>Home</Button>
          </Link>
          <Button variant='destructive'>Sign Out</Button>
        </div>
          
      
      </div>
    </div>
  );
}