import { Appbar } from "../components/Appbar"
import Avatar from "../components/Avatar"

interface Blog{
    title: string,
    content: string,
    date: string    
}
export const Blog = ({title,content,date} : Blog) => {
    return (
        <div>
            <Appbar/>
            <div className="flex justify-between w-screen">
                <div className="flex justify-center items-start w-[75%] mt-10">
                    <div className="flex flex-col w-2/3">
                        <div className="text-4xl font-extrabold mb-2">{title}</div>
                        <div className="text-md text-slate-500 font-bold mb-2">{date}</div>
                        <div>{content}</div>
                    </div>
                </div>
                <div className=" mt-10 flex justify-center mr-20 bg-slate-50 p-6 rounded-xl">
                    <div className="flex flex-col">
                    <div className="font-semibold text-xl mb-4">Author</div> 
                    <div className="flex justify-between">
                        <Avatar username="Garvit" dimension="8"/>
                        <div className="flex flex-col ml-5">
                            <div className="text-2xl font-bold">Garvit</div>
                            <div className="text-slate-500 font-bold w-[300px]">He is a guy whom no one knows, he used to live in the woods, but i know him.</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}