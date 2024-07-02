import { Link } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import axios from "axios";

const SideBar = () => {
    const user = useUser();
    
    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post('http://localhost:8000/auth/logout');
            console.log("logged out");
            window.location.href = "/v1/signin"
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <span className="flex justify-center font-bold items-center p-2 text-gray-900 rounded-lg dark:text-white">{user ? `Hi ${user.username}` : "Hi Guest"} </span>
            <aside id="default-sidebar" className="top-0 w-64 h-screen" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="ms-3">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/myBooks" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="flex-1 ms-3 whitespace-nowrap">My Books</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addBook" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="flex-1 ms-3 whitespace-nowrap">Add Book</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="flex-1 ms-3 whitespace-nowrap">Cart</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span className="flex-1 ms-3 whitespace-nowrap">Playlists</span>
                        </a>
                    </li>
                    {
                        !user ? 
                        <>
                        <li>
                            <Link to="/signin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                            </Link>
                        </li>
                        </>:
                        <li>
                            <div onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </div>
                        </li>
                    }
                </ul>
                    
                    
            </div>
            </aside>

        </div>
    )
}

export default SideBar