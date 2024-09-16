import { Appbar } from "./Appbar";

export const BlogSkeleton = () => {
    return (
        <div>
        <Appbar />
        <div className="flex justify-between w-screen">
            <div className="flex justify-center items-start w-[75%] mt-10">
            <div className="flex flex-col w-2/3 animate-pulse">
                <div className="h-20 bg-gray-300 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
            </div>
            </div>
            <div className="mt-10 flex justify-center mr-20 bg-slate-50 p-6 rounded-xl animate-pulse">
            <div className="flex flex-col">
                <div className="h-8 bg-gray-300 rounded mb-4 w-20"></div>
                <div className="flex justify-between">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col ml-5">
                    <div className="h-6 bg-gray-300 rounded w-36 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};