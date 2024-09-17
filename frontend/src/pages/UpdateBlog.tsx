import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateBlogBody } from "@garvit_dadheech/blogitude";
import { Loader } from "../components/Loader";

const toolbarOptions = [
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],  
    ['link', 'image']               
];

export const UpdateBlog = () => {
    const { id } = useParams();
    if(!id){
        return
    }
    const navigate = useNavigate();
    const [postBlogInput, setPostBlogInput] = useState<UpdateBlogBody>({
        id: "",
        title: "",
        content: ""
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BACKEND_URL}/blog/${id}`,{
                    headers: {
                        Authorization: token
                    }
                });
                console.log(response.data)
                setPostBlogInput({
                    id: id,
                    title: response.data.blog.title,
                    content: response.data.blog.content
                });
                console.log(postBlogInput);
                
            } catch (error) {
                console.error("Error fetching blog data", error);
            } finally {
                setFetching(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleContentChange = (value: string) => {
        setPostBlogInput({
            ...postBlogInput,
            content: value
        });
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.put(`${BACKEND_URL}/blog`, postBlogInput, {
                headers: {
                    Authorization: token
                }
            });
            setSuccessMessage("Your post has been updated successfully");
            setLoading(false);
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate("/user-blogs");
        } catch (error) {
            console.error("Error updating blog", error);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <Loader />;


    return (
        <div>
            <Appbar />
            <div className="flex flex-col items-center mt-5">
                <div className="flex justify-center w-screen items-center flex-col mb-4">
                    {successMessage && (
                        <div className="p-2.5 bg-green-100 text-green-800 border border-green-300 rounded-md my-2.5">
                            {successMessage}
                        </div>
                    )}
                    <button
                        onClick={handleUpdate}
                        className="bg-slate-800 text-white w-28 font-bold py-2 px-6 mt-4 rounded hover:bg-slate-900"
                    >
                        Update
                    </button>
                    {loading && <Loader />}
                </div>

                <input
                    type="text"
                    placeholder="Blog Title"
                    value={postBlogInput.title}
                    className="w-2/3 p-2 border border-gray-300 rounded mb-6"
                    onChange={(e) => setPostBlogInput({
                        ...postBlogInput,
                        title: e.target.value
                    })}
                />

                <div className="w-2/3 mb-6">
                    <ReactQuill
                        value={postBlogInput.content}
                        onChange={handleContentChange}
                        theme="snow"
                        placeholder="Update your blog content here..."
                        className="h-[400px]"
                        modules={{ toolbar: toolbarOptions }}
                    />
                </div>
            </div>
        </div>
    );
};
