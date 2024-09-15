import { FaBook } from "react-icons/fa";
import Avatar from "./Avatar";

export const Appbar = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mt-5">
                <div className="flex ml-8">
                    <div className="text-4xl font-extrabold">Blogitude</div>
                </div>
                <div className="flex-1 flex justify-end items-center mr-8">
                    <div className="flex items-center mr-2">
                        <FaBook className="mt-1 text-xl text-slate-600" />
                        <div className="text-xl text-slate-600 ml-2">Write</div>
                    </div>
                    <Avatar username="Garvit" dimension="8"/>
                </div>
            </div>
            <div className="h-[1px] w-screen bg-slate-500 mt-2"></div>
        </div>
    );
};

