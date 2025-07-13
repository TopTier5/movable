import image2 from "../assets/images/image2.jpg";
import { UserPlus } from "lucide-react";
import { Link } from "react-router";






export default function JoinUs() {
    return (
        <div className="relative min-h-screen flex items-center justify-center py-16 px-4">
            <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image2})`}}></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-white mb-6">Join MoVable Community</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">Be part of making transportation accessible for people with disabilities in Ghana.</p>
                <p className="text-xl text-blue-100 mb-8">
                    Start your journey with us today.
                </p>

                <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl hover:scale-105">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                            <UserPlus className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to join MoVable</h2>

                    <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                        Safe, accessible transportation with trained assistance for people with disabilities in Ghana.
                    </p>
                        <Link to="/register">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white  cursor-pointer font-semibold py-2 px-4 rounded-xl transition-colors duration-200 text-lg">
                        Sign Up Now
                    </button></Link>
                </div>
            </div>
        </div>
    )
}