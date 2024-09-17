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
                <div className="flex flex-col lg:flex-row justify-between w-full">
                    <div className="flex justify-center items-start w-full lg:w-[75%] mt-10">
                        <div className="flex flex-col w-full px-4 lg:w-2/3">
                            <div className="text-3xl lg:text-4xl font-extrabold mb-2">{blog.contents.title}</div>
                            <div className="text-sm lg:text-md text-slate-500 font-bold mb-2">{new Date(blog.contents.publishedAt).toLocaleDateString()}</div>
                            <div className="mb-14"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog.contents.content),
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center lg:mr-20 bg-slate-50 p-4 lg:p-6 rounded-xl mx-4 lg:mx-0">
                        <div className="flex flex-col">
                        <div className="font-semibold text-lg lg:text-xl mb-4">Author</div> 
                        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
                            <Avatar 
                                username={blog.contents.author.name} 
                                dimension="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" 
                            />
                            <div className="flex flex-col mt-4 lg:mt-0 lg:ml-5 text-center lg:text-left">
                                <div className="text-xl lg:text-2xl font-bold">{blog.contents.author.name}</div>
                                <div className="text-slate-500 font-bold w-full lg:w-[300px] mt-4 lg:mt-6">"Write what should not be forgotten." — Isabel Allende</div>
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
                <div className="flex flex-col items-center justify-center mt-20 lg:mt-72 px-4 text-center">
                    <FaExclamationTriangle className="text-red-500 text-4xl lg:text-6xl mb-4" />
                    <div className="text-xl lg:text-2xl font-bold mb-2">Oops! Unable to fetch the blog.</div>
                    <div className="text-base lg:text-lg text-gray-500">Something went wrong while retrieving the blog. Please try again later.</div>
                </div>
            </div>
        )
    }
}