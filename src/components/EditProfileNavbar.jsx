import { Link } from "react-router"
import { ChevronLeft } from "lucide-react"




export default function EditProfileNavbar() {
    return(
        <div>
           <nav className='flex w-full border border-white shadow-md'>
            <div className='ml-50 flex mt-7'>
        <Link to={"/userpage"} className='flex mr-7 mb-6 mt-2 cursor-pointer hover:text-blue-500'><ChevronLeft className="w-6 h-6 text-gray-700 mr-3 hover:text-blue-500" />
        <span className='mr-2'>Back to Dashboard</span> 
        </Link> 
      <h1 className="text-2xl font-bold mb-7">Edit Profile</h1>
      </div>
        </nav>
    
        </div>
    )
}