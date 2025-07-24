import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { ChevronLeft, Eye } from "lucide-react";
import { Link } from "react-router";
import { loginUser } from "../api/client.js";
import { toast, Toaster } from 'sonner';

export default function () {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUser(phoneNumber, password);
            
            if (response.success) {
                
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));

                toast.success('Login successful!');
                
                
                navigate('/userpage'); 
            }
        } catch (err) {
           const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
         <Toaster position="top-right" />
            <Navbar />

            <div className="bg-[#EFF7FF] flex items-center justify-center">
                <div className="min-h-screen py-10 mt-8">
                    

                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">MoVable</h1>
                        <p className="text-xl font-bold mb-2">Welcome Back</p>
                        <span className="text-sm text-gray-800">
                            Sign in to your MovAble account
                        </span>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-800">Sign In</h2>
                        <p className="text-sm mb-6 text-gray-600">Enter your phone number and password to access your account</p>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+233 XX XXX XXXX"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="text-left">
                                <button type="button" className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer">
                                    Forgot your password?
                                </button>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 px-4 cursor-pointer rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                                {loading ? "Signing In..." : "Sign In"}
                            </button>

                            <div className="text-center">
                                <span className="text-gray-600 text-sm">Don't have an account? </span>
                                <Link to="/register">
                                    <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                                        Register here
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-[#EFF7FF] items-center justify-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center flex-col space-x-3">
                        <div className="text-blue-600 font-medium text-sm">
                            Account Verification
                        </div>
                        <div className="text-blue-800">
                            <p className="text-sm leading-relaxed">If you recently registered, please wait for your documents to be verified. <br />
                                You'll receive a notification once your account is approved and ready to use.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}