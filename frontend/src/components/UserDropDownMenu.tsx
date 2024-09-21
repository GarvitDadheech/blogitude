import { Link, useNavigate } from 'react-router-dom';
interface UserMenuDropdownProps {
    userInitial: string;
}

const UserMenuDropdown = ({ userInitial} : UserMenuDropdownProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative inline-block text-left">
            <div className="flex justify-center items-center">
                <div className="rounded-full h-8 w-8 border-2 border-slate-500 border-solid flex justify-center items-center cursor-pointer">
                    {userInitial}
                </div>
            </div>

            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="py-1">
                    <Link
                        to="/user-blogs"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        My Blogs
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate('/signin');
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserMenuDropdown;
