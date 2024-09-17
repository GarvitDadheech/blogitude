import { useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import Avatar from "../components/Avatar"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useRecoilValueLoadable } from "recoil";
import { BlogAtom } from "../store/atoms/BlogAtom";
import { FaExclamationTriangle } from "react-icons/fa";
import DOMPurify from "dompurify";
interface Blog {
    title: string;
    publishedAt: string;
    content: string;
    author: Author
}
interface Author{
    name:string
}

export const Blog = () => {
    
    const id = useParams<{id : string}>();
    const blog = useRecoilValueLoadable(BlogAtom(id))
    if(blog.state==='loading') {
        return <BlogSkeleton/>
    }
    else if(blog.state=='hasValue') {
        return (
            <div>
                <Appbar/>
                <div className="flex justify-between w-screen">
                    <div className="flex justify-center items-start w-[75%] mt-10">
                        <div className="flex flex-col w-2/3">
                            <div className="text-4xl font-extrabold mb-2">{blog.contents.title}</div>
                            <div className="text-md text-slate-500 font-bold mb-2">{new Date(blog.contents.publishedAt).toLocaleDateString()}</div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog.contents.content),
                                }}
                            />
                        </div>
                    </div>
                    <div className=" mt-10 flex justify-center mr-20 bg-slate-50 p-6 rounded-xl">
                        <div className="flex flex-col">
                        <div className="font-semibold text-xl mb-4">Author</div> 
                        <div className="flex justify-between">
                            <Avatar username={blog.contents.author.name} dimension="8"/>
                            <div className="flex flex-col ml-5">
                                <div className="text-2xl font-bold">{blog.contents.author.name}</div>
                                <div className="text-slate-500 font-bold w-[300px] mt-6">"Write what should not be forgotten." — Isabel Allende</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <Appbar/>
                <div className="flex flex-col items-center justify-center mt-72">
                    <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
                    <div className="text-2xl font-bold mb-2">Oops! Unable to fetch the blog.</div>
                    <div className="text-lg text-gray-500">Something went wrong while retrieving the blog. Please try again later.</div>
                </div>
            </div>
        )
    }
}