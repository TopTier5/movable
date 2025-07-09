import logo from "../assets/images/logo.png";




export default function Navbar() {
    return(
        <nav className="bg-white px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 ml-20">
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="logo" className="w-8 h-8 object-contain cursor-pointer" />
                    </div>
                    <span className="text-black text-xl cursor-pointer font-bold">MoVable</span>
                </div>

                <div className="flex items-center space-x-6">
                    <span className="font-sm font-semibold cursor-pointer hover:text-blue-400 transition colors">Home</span>
                    <span className="font-sm font-semibold cursor-pointer hover:text-blue-400 transition colors">Register as Rider</span>
                </div>

                <div className="flex items-center space-x-4">
                    <button className=" text-blue-400 font-semibold border hover:bg-gray-50 border-blue/50 px-5 py-1 rounded-md hover:bg-blue/10 cursor-pointer transition-colors">
                    Sign In</button>

                    <button className="bg-blue-600 font-semibold text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                        Get Started</button>
                </div>
            </div>
        </nav>
    )
}