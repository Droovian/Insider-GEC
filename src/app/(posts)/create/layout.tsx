import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface LayoutProps {
  children: React.ReactNode;
}

const CreatePostLayout: React.FC<LayoutProps> = ({ children }) => {
  const session = getServerSession(authOptions);

  return (
    <div >
    
      <Provider session={session}>
        {children}
      </Provider>
 
    </div>
  );
};

export default CreatePostLayout;