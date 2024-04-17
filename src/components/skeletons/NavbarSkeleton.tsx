export const NavbarSkeleton = () => {
    return (
      <header className="w-full h-fit border-b border-gray-300 flex justify-between p-3 mx-3">
        <div className="hidden sm:flex items-center">
          <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
        </div>
  
        <div className="sm:hidden mr-24">
          <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
        </div>
        
        <div className="sm:hidden flex items-center pb-0">
          <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
        </div>
        
        <div className="invisible sm:visible flex space-x-4 w-1/3 items-center">
          <div className="animate-pulse bg-gray-300 h-8 w-1/2 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
        </div>
  
        <div className="flex items-center space-x-10 mr-4">
          <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
          <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
        </div>
      </header>
    );
  };