import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import UserMenuDropdown from "./UserDropDownMenu";

export const Appbar = () => {
    const userContext = useContext(UserContext);
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mt-4">
                <div className="flex ml-8">
                    <Link to={"/blogs"} className="text-4xl font-extrabold">Blogitude</Link>
                </div>
                <div className="flex-1 flex justify-end items-center mr-8">
                    <Link to={"/publish"}>
                        <div className="flex items-center mr-10">
                            <FaBook className="mt-1 text-xl text-slate-600" />
                            <div className="text-xl text-slate-600 ml-2">Write</div>
                        </div>
                    </Link>
                    <div className="relative group">
                        <UserMenuDropdown
                            userInitial={userContext?.user ? userContext.user[0].toUpperCase() : '?'}
                        />
                    </div>
                </div>
            </div>
            <div className="h-[1px] w-screen bg-slate-200 mt-4"></div>
        </div>
    );
};

