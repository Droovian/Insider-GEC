export const SidebarSkeleton = () => {
    return (
        <div className="grid grid-cols-1">

       
      <div className="w-[230px] bg-gray-100 p-4 rounded-md">
        <div className='animate-pulse mb-3'>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded mt-2"></div>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar">
          <div className='animate-pulse mt-2 mb-2 w-full h-[1px] bg-gray-200'></div>
          <div className='animate-pulse text-gray-400 text-sm mb-2'>TOPICS</div>
         
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2 animate-pulse">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
          <div className='animate-pulse mt-2 w-full h-[1px] bg-gray-200'></div>
        </div>
      </div>
      </div>
    );
  };
  