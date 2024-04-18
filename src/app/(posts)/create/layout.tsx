import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const CreatePostLayout: React.FC<LayoutProps> = async({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <div >
        <Provider session={session}>
          <Navbar/>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </Provider>
    </div>
  );
};

export default CreatePostLayout;