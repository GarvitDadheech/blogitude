import { FaBook } from "react-icons/fa";

export const Appbar = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mt-5">
                <div className="flex ml-8">
                    <div className="text-4xl font-extrabold">Blogitude</div>
                </div>
                <div className="flex-1 flex justify-end items-center mr-8">
                    <div className="flex items-center mr-4">
                        <FaBook className="mt-1 text-xl text-slate-600" />
                        <div className="text-xl text-slate-600 ml-2">Write</div>
                    </div>
                    <Avatar username="Garvit" />
                </div>
            </div>
            <div className="h-[1px] w-screen bg-slate-500 mt-2"></div>
        </div>
    );
};

function Avatar({ username }: { username: string }) {
    return (
        <div className="rounded-full h-8 w-8 border-2 border-slate-500 border-solid flex justify-center items-center ml-4">
            {username[0]}
        </div>
    );
}
