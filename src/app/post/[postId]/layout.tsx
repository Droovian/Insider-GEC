import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ["latin"]});

interface LayoutProps {
  children: React.ReactNode;
}

const CreatePostLayout: React.FC<LayoutProps> = ({ children }) => {
  const session = getServerSession(authOptions);

  return (
    <div className={inter.className}>
      <Navbar />
        <div className=""> 
          <Provider session={session}>
            {children}
          </Provider>
        </div>
    </div>
  );
};

export default CreatePostLayout;
