import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Loading from '@/app/(posts)/my-posts/loading';

const inter = Inter({subsets: ["latin"]});

interface LayoutProps {
  children: React.ReactNode;
}

const CreatePostLayout: React.FC<LayoutProps> = async({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <div className={inter.className}>
      
        <div className=""> 
          <Provider session={session}>
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </Provider>
        </div>
    </div>
  );
};

export default CreatePostLayout;
