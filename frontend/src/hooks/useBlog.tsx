import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
interface Blog {
    title: string;
    publishedAt: string;
    content: string;
    author: Author
}
interface Author{
    name:string
}
export const useBlog = (id: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>({
        title: "",
        publishedAt: "",
        content: "",
        author : {
            name: ""
        }
    });

    const fetchBlog = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response.data.blog);
            setBlog(response.data.blog);
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    return { isLoading, blog };
};
