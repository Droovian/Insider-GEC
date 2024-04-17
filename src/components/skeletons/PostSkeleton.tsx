export const PostSkeleton = () => {
    return (
      <div className="grid grid-cols-1 gap-4 mt-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border rounded-md p-4 animate-pulse  w-full sm:w-3/4 mx-auto mt-1">
            <div className="flex items-center justify-between mb-2 ">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="mb-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded mt-2"></div>
              <div className="h-4 bg-gray-200 rounded mt-2"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  