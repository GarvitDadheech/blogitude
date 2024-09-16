import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const toolbarOptions = [
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline'],  
    ['link', 'image']               
  ];

export const Publish = () => {
    const [content, setContent] = useState(""); 
    const [title, setTitle] = useState("");  
    const naviagte = useNavigate();    

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    
    const handlePublish = () => {
        try{
            const postBody = {
                title,
                content
            }
            const token = localStorage.getItem("token");
            const response = axios.post(`${BACKEND_URL}/blog`,postBody,{
                headers: {
                    Authorization: token
                }
            })
            console.log(response);
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
                <div className="flex justify-center w-screen mb-8">
                    <button
                        onClick={handlePublish}
                        className="bg-slate-800 text-white font-bold py-2 px-6 mt-4 rounded hover:bg-slate-900"
                    >
                        Publish
                    </button>
                </div>
               
                <input
                    type="text"
                    placeholder="Blog Title"
                    className="w-2/3 p-2 border border-gray-300 rounded mb-6"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <div className="w-2/3 mb-6">
                    <ReactQuill
                        value={content}
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
