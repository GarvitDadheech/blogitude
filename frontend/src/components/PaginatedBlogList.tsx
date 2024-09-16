import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BACKEND_URL } from '../../config';
import { BlogCardSkeleton } from './BlogCardSkeleton';

interface Blog {
  id: string;
  author: Author;
  title: string;
  content: string;
  publishedAt: string;
}
interface Author {
    name: string;
}

interface ApiResponse {
  blogs: Blog[];
  totalBlogs: number;
  currentPage: number;
  totalPages: number;
}

export const PaginatedBlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const blogsPerPage: number = 6;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get<ApiResponse>(
        `${BACKEND_URL}/blog/bulk?limit=${blogsPerPage}&offset=${(currentPage - 1) * blogsPerPage}`,
        {
          headers: {
            'Authorization': `${token}`
          }
        }
      );
      
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else {
        setError('Error fetching blogs. Please try again later.');
      }
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <BlogCardSkeleton/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="w-screen flex justify-center items-center flex-col">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              authorname={blog.author.name}
              date={new Date(blog.publishedAt).toLocaleDateString()}
              content={blog.content}
              title={blog.title}
            />
          ))
        ) : (
          <div>No blogs found.</div>
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
