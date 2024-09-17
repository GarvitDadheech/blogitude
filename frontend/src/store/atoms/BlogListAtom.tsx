import { atomFamily, selectorFamily } from 'recoil';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

interface Blog {
  id: string;
  author: { name: string };
  title: string;
  content: string;
  publishedAt: string;
}

interface ApiResponse {
  blogs: Blog[];
  totalBlogs: number;
  totalPages: number;
}

export const BlogListAtom = atomFamily({
  key: 'BlogListAtom',
  default: selectorFamily({
    key: 'BlogListAtomSelector',
    get: ({ page, isUserBlogs, reloadKey }: { page: number; isUserBlogs: boolean; reloadKey: number }) => async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const url = isUserBlogs
          ? `${BACKEND_URL}/blog/user-blogs?limit=6&offset=${(page - 1) * 6}`
          : `${BACKEND_URL}/blog/bulk?limit=6&offset=${(page - 1) * 6}`;

        const response = await axios.get<ApiResponse>(url, {
          headers: {
            Authorization: token,
          },
        });

        return {
          blogs: response.data.blogs,
          totalPages: response.data.totalPages
        };
      } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
    },
  }),
});
