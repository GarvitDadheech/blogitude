import Avatar from "./Avatar"
interface BlogInput{
    title: string,
    content: string,
    authorname: string,
    date: string
}
export const BlogCard = ({title,content,authorname,date}: BlogInput) => {
    return (
        <div className="flex flex-col w-2/5 items-start border-b mb-4">
            <div className="flex justify-center items-center mt-4">
                <Avatar username={authorname} dimension="8" />
                <div className="mx-4 font-semibold text-xl">{authorname}</div>
                <div className="text-slate-700 font-bold">{date}</div>
            </div>
            <div className="font-extrabold text-3xl">{title}</div>
            <div className="text-md text-slate-600 font-bold mb-2">{content.slice(0,200)}...</div>
        </div>
    )
}