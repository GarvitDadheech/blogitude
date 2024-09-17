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
        return <div>Error loading blogs</div>;
    }

    const { blogs, totalPages } = blogsLoadable.contents;

    return (
        <div>
            <div className="w-screen flex justify-center items-center flex-col">
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
                    <div>{isUserBlogs && <NoBlogShow />}</div>
                )}
            </div>
            {blogs.length > 0 && (
                <div className="flex justify-center mt-4 mb-8">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
