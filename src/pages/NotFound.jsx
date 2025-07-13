import { Link } from "react-router";
import NotFoundSVG from "../assets/notFound.svg";

export default function NotFound() {
    return (
       <div>
         <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <NotFoundSVG width={500} height={500} />
            <h1 className="mt-0 text-3xl font-bold text-gray-800">
                Oops! Page not found
            </h1>
            <p className="mt-2 text-lg text-gray-600">
                The page you are looking for might have been removed,
                had its name changed, or is temporarily unavailable.
            </p>
             <Link to="/" className="mt-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-blue-400 transition-colors duration-300">
                Return Home
            </Link>

        </div>
        
       </div>
        
    );
}