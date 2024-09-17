import { Link, useNavigate } from "react-router-dom"
import Avatar from "./Avatar"
import DOMPurify from "dompurify"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useState } from "react"
import { Loader } from "./Loader"

interface BlogInput{
    id: string
    title: string,
    content: string,
    authorname: string,
    date: string,
    isUserBlogs: boolean
}

export const BlogCard = ({title,content,authorname,date,id,isUserBlogs}: BlogInput) => {
    const sanitizedFullContent = DOMPurify.sanitize(content);
    const truncatedContent = sanitizedFullContent.split(/\s+/).slice(0, 30).join(' ') + '...';
    const [showModal, setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if(!token) {
            throw new Error("No Authorization token Found!");
        }
        try{
            setLoading(true);
            const response = await axios.delete(`${BACKEND_URL}/blog/${id}`,{
                headers: {
                    Authorization: token
                }
            })
            setLoading(false);
            setShowModal(true);
            console.log(response.data);
            
            setTimeout(() => {
                setShowModal(false);
                navigate("/user-blogs");
                window.location.reload();
            }, 2000);
            console.log(response.data);   
        }
        catch(e) {
            console.log("Not able to delete");
            console.log(e);
            setShowModal(false);
            setLoading(false);
        }
    }
    
    const handleUpdate = () => {
        navigate(`/update-blog/${id}`)
    }

    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const timeToRead = Math.ceil(words / wordsPerMinute);

    return (
        <div className="border-b flex justify-center flex-col w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 px-4 py-4">
            <Link to={`/blog/${id}`} className="flex flex-col items-start mb-4 cursor-pointer">
                <div className="flex flex-wrap items-center mt-2 mb-2">
                    <Avatar 
                        username={authorname} 
                        dimension="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" 
                    />
                    <div className="ml-2 font-semibold text-base sm:text-lg">{authorname}</div>
                    <div className="ml-2 text-slate-700 text-sm">{date}</div>
                </div>
                <div className="font-bold text-xl sm:text-2xl mb-2">{title}</div>
                <div
                    className="text-sm sm:text-base text-slate-600 mb-2"
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                />
                <div className="text-slate-500 text-xs sm:text-sm mb-2">{`${timeToRead} minute(s) read`}</div>
            </Link>
            {isUserBlogs && (
                <div className="flex flex-wrap gap-2 mt-2">
                    <button
                        onClick={handleUpdate}
                        className="bg-slate-700 text-white px-3 py-1 text-sm rounded hover:bg-slate-800"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-slate-700 text-white px-3 py-1 text-sm rounded hover:bg-slate-800"
                    >
                        Delete
                    </button>
                    <div className="flex items-center h-8 ml-2">
                        {loading && <Loader/>}
                    </div>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-base font-semibold mb-3">Blog Deleted Successfully</h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}