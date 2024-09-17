import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { PostBlogBody } from "@garvit_dadheech/blogitude";

const toolbarOptions = [
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],  
    ['link', 'image']               
  ];

export const Publish = () => {
    const [postblogInput,setPostBlogInput] = useState<PostBlogBody>({
        title: "",
        content: ""
    });  
    const naviagte = useNavigate();    
    const [successMessage, setSuccessMessage] = useState('');

    const handleContentChange = (value: string) => {
        setPostBlogInput({
            ...postblogInput,
            content: value
        });
    };

    
    const handlePublish = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BACKEND_URL}/blog`,postblogInput,{
                headers: {
                    Authorization: token
                }
            })
            setSuccessMessage("Your post has been published successfully");
            await new Promise(resolve => setTimeout(resolve, 3000));
            naviagte("/blogs");
        }
        catch(e){
            return <div>Error while Publishing Post!</div>
        }
    };

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
                        onClick={handlePublish}
                        className="bg-slate-800 text-white w-28 font-bold py-2 px-6 mt-4 rounded hover:bg-slate-900"
                    >
                        Publish
                    </button>
                </div>
               
                <input
                    type="text"
                    placeholder="Blog Title"
                    className="w-2/3 p-2 border border-gray-300 rounded mb-6"
                    onChange={(e) => setPostBlogInput({
                        ...postblogInput,
                        title : e.target.value
                    })}
                />
                
                <div className="w-2/3 mb-6">
                    <ReactQuill
                        onChange={handleContentChange}
                        theme="snow"
                        placeholder="Write your blog content here..."
                        className="h-[400px]"
                        modules={{ toolbar: toolbarOptions }}
                    />
                </div>
            </div>
        </div>
    );
};
