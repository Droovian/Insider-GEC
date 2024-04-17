import { FooterSkeleton } from "./FooterSkeleton";

export const RecentSkeleton = () => {
    return (
      <section className='w-full h-screen flex-col p-2 border-l border-gray-200'>
        <div className='bg-gray-200 rounded-xl mt-3 w-80 h-fit mb-3 p-3'>
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 p-4 animate-pulse">
            What&apos;s happening?
          </h2>
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className='w-full h-32 hover:bg-gray-300 p-4 animate-pulse'>
              <div className='flex flex-col justify-center'>
                <div className='h-6 bg-gray-300 rounded w-2/3 mb-2'></div>
                <div className='h-4 bg-gray-300 rounded w-1/2 mb-1'></div>
                <div className='h-4 bg-gray-300 rounded w-1/4'></div>
              </div>
            </div>
          ))}
        </div>
        <FooterSkeleton />
      </section>
    );
  };