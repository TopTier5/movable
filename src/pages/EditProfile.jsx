import { Link } from "react-router";
import EditProfileNavbar from "../components/EditProfileNavbar";

export default function EditProfile() {

    return (
        <>
            <EditProfileNavbar />


            <section className="bg-[#F9FAFB] py-12">
                <div className="w-[60%] max-w-3xl mx-auto bg-[#FFFFFF]  border border-[#D8E1E9] rounded-2xl shadow-lg p-8">
                    <form className="flex flex-col space-y-6 ">
                        <h1 className="text-black text-2xl text-left font-bold "> Personal Information</h1>

                        <div className="grid grid-cols-2 gap-4 justify-between space-x-4">
                            <div className="w-20%">
                                <label className="block mb-2 font-bold text-black">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="w-full border border-[#D8E1E9] rounded px-4 py-2"
                                >
                                </input>
                            </div>

                            <div className="w-20%">
                                <label className="block mb-2 font-bold text-black">Email Address</label>
                                <input
                                    type="text"
                                    name="emailAddress"
                                    className="w-full border border-[#D8E1E9] rounded px-4 py-2"


                                />
                            </div>

                            <div className="w-20%">
                                <label className="block mb-2 font-bold text-black">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    className="w-full border border-[#D8E1E9] rounded px-4 py-2"

                                />
                            </div>



                            <div className="w-20%">
                                <label className="block mb-2 font-bold text-black">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full border border-[#D8E1E9] rounded px-4 py-2"
                                />
                            </div>

                        </div>
                    </form>
                </div>

            </section>



            <section className="bg-[#F9FAFB] py-12">
                <div className="w-[60%] max-w-3xl mx-auto bg-[#FFFFFF]  border border-[#D8E1E9] rounded-2xl shadow-lg p-8">
                <form className="flex flex-col space-y-6 ">
                    <h1 className="text-black text-2xl text-left font-bold "> Emergency Contact</h1>

                    <div className="grid grid-cols-2 gap-4 justify-between space-x-4">
                        <div className="w-20%">
                            <label className="block mb-2 font-bold text-black">Contact Name</label>
                            <input
                                type="text"
                                name="contactName"
                                className="w-full border border-[#D8E1E9] rounded px-4 py-2"
                            >
                            </input>
                        </div>

                        <div className="w-20%">
                            <label className="block mb-2 font-bold text-black">Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                className="w-full border border-[#D8E1E9] rounded px-4 py-2"
                            />
                        </div>
                    </div>
                </form>
                </div>
            </section>


            
            <div className="flex justify-center ml-148 ">

                
                <button
                    type="submit"
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    💾   Save Changes
                </button>
            </div>

        </>
    )
}