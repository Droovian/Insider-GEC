export const FooterSkeleton = () => {
    return (
      <footer className="bg-gray-200 py-8 rounded-xl animate-pulse">
        <div className="container mx-auto px-4 flex justify-between">
          <div className="flex flex-col space-y-4">
            <div className="h-4 w-16 bg-gray-300"></div>
            <div className="h-4 w-12 bg-gray-300"></div>
          </div>
          <div className="text-center text-gray-600 text-sm">
            <div className="h-4 w-28 bg-gray-300"></div>
          </div>
        </div>
      </footer>
    );
  };
  