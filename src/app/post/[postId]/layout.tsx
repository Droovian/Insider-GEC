import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const CreatePostLayout: React.FC<LayoutProps> = ({ children }) => {
  const session = getServerSession(authOptions);

  return (
    <div>
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
