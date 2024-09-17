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
    const sanitizedContent = DOMPurify.sanitize(content.slice(0, 200));
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

    return (
        <div className="border-b flex justify-center flex-col w-2/5">
                <Link to={`/blog/${id}`} className="flex flex-col items-start mb-4 cursor-pointer">
                    <div className="flex justify-center items-center mt-4">
                        <Avatar username={authorname} dimension="8" />
                        <div className="mx-4 font-semibold text-xl">{authorname}</div>
                        <div className="text-slate-700 font-bold">{date}</div>
                    </div>
                    <div className="font-extrabold text-3xl">{title}</div>
                    <div
                        className="text-md text-slate-600 font-bold mb-2"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent + '...' }}
                    />
                    <div className="text-slate-500 text-sm mb-2">{`${Math.ceil(content.length/100)} minute(s) read`}</div>
                </Link>
                {isUserBlogs && (
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 mb-4"
                        >
                            Update Blog
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 mb-4"
                        >
                            Delete Blog
                        </button>
                        <div className="flex justify-center items-center w-28 h-2">
                            {loading && <Loader/>}
                        </div>
                    </div>
                )}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg text-center">
                            <h2 className="text-lg font-semibold mb-4">Blog Deleted Successfully</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
}