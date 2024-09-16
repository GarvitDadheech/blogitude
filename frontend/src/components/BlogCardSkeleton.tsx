export const BlogCardSkeleton = () => {
  return (
    <div className="w-full p-4 rounded-lg overflow-hidden">
      <div className="animate-pulse flex flex-col justify-center items-center">
        <div className="w-2/5 h-40 bg-gray-200 rounded mb-4"></div>
        <div className="w-2/5 h-40 bg-gray-200 rounded mb-4"></div>
        <div className="w-2/5 h-40 bg-gray-200 rounded mb-4"></div>
        <div className="w-2/5 h-40 bg-gray-200 rounded mb-4"></div>
        <div className="w-2/5 h-40 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  );
};
