import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import UserMenuDropdown from "./UserDropDownMenu";

export const Appbar = () => {
    const userContext = useContext(UserContext);
    return (
        <div className="flex flex-col border-b-2 border-slate-300">
            <div className="flex md:flex-row justify-between items-center px-4 py-2 md:py-4">
                <div className="flex items-center">
                    <Link to={"/blogs"} className="text-3xl md:text-4xl font-extrabold">
                        Blogitude
                    </Link>
                </div>
                <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-10 mt-2 md:mt-0">
                    <Link to={"/publish"} className="flex items-center text-lg md:text-xl text-slate-600">
                        <FaBook className="text-lg md:text-xl" />
                        <span className="ml-1 md:ml-2">Write</span>
                    </Link>
                    <div className="relative group">
                        <UserMenuDropdown
                            userInitial={userContext?.user ? userContext.user[0].toUpperCase() : '?'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
