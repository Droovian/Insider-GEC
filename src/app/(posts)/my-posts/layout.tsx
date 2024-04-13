import React from 'react';
import Provider from '@/app/context/client-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SideNav from '@/components/dashboard/sidenav';
interface LayoutProps {
  children: React.ReactNode;
}

const UserPostView: React.FC<LayoutProps> = ({ children }) => {
  const session = getServerSession(authOptions);

  return (
      <Provider session={session}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
              <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </Provider>
 
  );
};

export default UserPostView;