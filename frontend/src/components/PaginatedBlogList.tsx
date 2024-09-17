import  { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { BlogListAtom } from '../store/atoms/BlogListAtom';
import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeleton } from './BlogCardSkeleton';
import { NoBlogShow } from './NoBlogShow';
import { ReloadBlogsAtom } from '../store/atoms/ReloadBlogAtom';

export const PaginatedBlogList = ({ isUserBlogs }: { isUserBlogs: boolean }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [reloadKey, setReloadKey] = useState<number>(0);

    const reloadBlogs = useRecoilValue(ReloadBlogsAtom);
    const blogsLoadable = useRecoilValueLoadable(BlogListAtom({ page: currentPage, isUserBlogs, reloadKey }));

    useEffect(() => {
        if (reloadBlogs) {
            setReloadKey(prev => prev + 1);
        }
    }, [reloadBlogs]);

    const handlePageChange = (newPage: number): void => {
        setCurrentPage(newPage);
    };

    if (blogsLoadable.state === 'loading') {
        return <BlogCardSkeleton />;
    }

    if (blogsLoadable.state === 'hasError') {
        return <div className="text-center text-red-500 p-4">Error loading blogs</div>;
    }

    const { blogs, totalPages } = blogsLoadable.contents;

    return (
        <div className="w-full max-w-full px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorname={blog.author.name}
                            date={new Date(blog.publishedAt).toLocaleDateString()}
                            content={blog.content}
                            title={blog.title}
                            isUserBlogs={isUserBlogs}
                        />
                    ))
                ) : (
                    <div className="w-full">{isUserBlogs && <NoBlogShow />}</div>
                )}
            </div>
            {blogs.length > 0 && (
                <div className="flex gap-5 items-center justify-center mt-6 mb-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-slate-700 text-white rounded hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed md:p-1 md:w-12 lg:p-3 lg:w-20 md:text-md"
                    >
                        Prev
                    </button>
                    <span className="text-xs sm:text-sm md:text-lg">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm bg-slate-700 text-white rounded hover:bg-slate-800 disabled:bg-gray-300 disabled:cursor-not-allowed md:p-1 md:w-12 lg:p-3 lg:w-20 md:text-md"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};