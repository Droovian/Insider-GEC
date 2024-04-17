import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const CreatePostLayout: React.FC<LayoutProps> = ({ children }) => {
  const session = getServerSession(authOptions);

  return (
    <div >
      <Navbar/>
        <Provider session={session}>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </Provider>
    </div>
  );
};

export default CreatePostLayout;