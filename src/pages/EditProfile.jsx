import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import EditProfileNavbar from "../components/EditProfileNavbar";
import { editProfile, getUserFromStorage, isAuthenticated } from "../api/client.js";

export default function EditProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    
    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: ''
    });

    // Load user data when component mounts
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const user = getUserFromStorage();
        if (user) {
            setUserData(user);
            // Pre-fill form with existing user data
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                emergencyContactName: user.emergencyContactName || '',
                emergencyContactPhone: user.emergencyContactPhone || ''
            });
        }
    }, [navigate]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userData?._id) {
            alert('❌ User data not found. Please log in again.');
            return;
        }

        setLoading(true);

        try {
            const profileData = {
                userId: userData._id,
                fullName: formData.fullName,
                email: formData.email,
                address: formData.address,
                phoneNumber: formData.phoneNumber,
                emergencyContactName: formData.emergencyContactName,
                emergencyContactPhone: formData.emergencyContactPhone
            };

            const response = await editProfile(profileData);

            if (response.success) {
                // Update localStorage with new user data
                localStorage.setItem('user', JSON.stringify(response.user));
                setUserData(response.user);
                
                alert('✅ Profile updated successfully!');
                navigate('/dashboard');
            } else {
                alert('❌ Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('❌ Error updating profile. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <EditProfileNavbar />

            <form onSubmit={handleSubmit}>
                <section className="bg-[#F9FAFB] py-12">
                    <div className="w-[60%] max-w-3xl mx-auto bg-[#FFFFFF] border border-[#D8E1E9] rounded-2xl shadow-lg p-8">
                        <div className="flex flex-col space-y-6">
                            <h1 className="text-black text-2xl text-left font-bold">Personal Information</h1>

                            <div className="grid grid-cols-2 gap-4 justify-between space-x-4">
                                <div className="w-20%">
                                    <label className="block mb-2 font-bold text-black">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#D8E1E9] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="w-20%">
                                    <label className="block mb-2 font-bold text-black">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#D8E1E9] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="w-20%">
                                    <label className="block mb-2 font-bold text-black">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#D8E1E9] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="w-20%">
                                    <label className="block mb-2 font-bold text-black">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#D8E1E9] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#F9FAFB] py-12">
                    <div className="w-[60%] max-w-3xl mx-auto bg-[#FFFFFF] border border-[#D8E1E9] rounded-2xl shadow-lg p-8">
                        <div className="flex flex-col space-y-6">
                            <h1 className="text-black text-2xl text-left font-bold">Emergency Contact</h1>

                            <div className="grid grid-cols-2 gap-4 justify-between space-x-4">
                                <div className="w-20%">
                                    <label className="block mb-2 font-bold text-black">Contact Name</label>
                                    <input
                                        type="text"
                                        name="emergencyContactName"
                                        value={formData.emergencyContactName}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#D8E1E9] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="w-20%">
                                    <label className="block mb-2 font-bold text-black">Contact Number</label>
                                    <input
                                        type="tel"
                                        name="emergencyContactPhone"
                                        value={formData.emergencyContactPhone}
                                        onChange={handleInputChange}
                                        className="w-full border border-[#D8E1E9] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-center pb-12">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            '💾 Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}