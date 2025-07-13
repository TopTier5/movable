import React from 'react';

export default function Testimonials() {
    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mb-8">
            {/* Testimonials Header */}
            <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    Real People, <span className="text-blue-500">Real Solutions</span>
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                    Understanding our community's unique needs drives everything we build.
                </p>
            </div>

            {/* Testimonial Cards Container */}
            <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1: Aminah */}
                <div className="group bg-white rounded-lg p-6 hover:shadow-blue-500 shadow-sm cursor-pointer border-t-4 border-b-4 border-blue-500">
                    <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 text-white text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                            A
                        </div>
                        <div className="text-center mt-4">
                            <h4 className="text-lg font-semibold text-gray-900">Aminah</h4>
                            <p className="text-sm text-gray-500">Bank Employee, 32</p>
                        </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-700">
                        <div>
                            <p className="font-semibold text-blue-500">Need:</p>
                            <p>Wheelchair accessible rides</p>
                        </div>
                        <div>
                            <p className="font-semibold text-red-500">Challenge:</p>
                            <p>Taxis often refuse; standard transport doesn’t accommodate wheelchair</p>
                        </div>
                        <div>
                            <p className="font-semibold text-green-500">Solution:</p>
                            <p>Ramp-equipped vehicles with trained drivers</p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Kwesi */}
                <div className="group bg-white rounded-lg p-6 hover:shadow-blue-500 shadow-sm cursor-pointer border-t-4 border-b-4 border-blue-500">
                    <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                            K
                        </div>
                        <div className="text-center mt-4">
                            <h4 className="text-lg font-semibold text-gray-900">Kwesi</h4>
                            <p className="text-sm text-gray-500">University Student, 27</p>
                        </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-700">
                        <div>
                            <p className="font-semibold text-blue-500">Need:</p>
                            <p>Voice-guided booking system</p>
                        </div>
                        <div>
                            <p className="font-semibold text-red-500">Challenge:</p>
                            <p>Complex apps are hard to navigate; drivers need guidance on assistance</p>
                        </div>
                        <div>
                            <p className="font-semibold text-green-500">Solution:</p>
                            <p>Screen reader friendly with voice commands</p>
                        </div>
                    </div>
                </div>

                {/* Card 3: Naa */}
                <div className="group bg-white rounded-lg p-6 hover:shadow-blue-500 shadow-sm cursor-pointer border-t-4 border-b-4 border-blue-500">
                    <div className="flex flex-col items-center mb-4">
                        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                            N
                        </div>
                        <div className="text-center mt-4">
                            <h4 className="text-lg font-semibold text-gray-900">Naa</h4>
                            <p className="text-sm text-gray-500">Caregiver, 45</p>
                        </div>
                    </div>
                    <div className="space-y-4 text-sm text-gray-700">
                        <div>
                            <p className="font-semibold text-blue-500">Need:</p>
                            <p>Safe rides for her son with real-time tracking</p>
                        </div>
                        <div>
                            <p className="font-semibold text-red-500">Challenge:</p>
                            <p>Daily price negotiations and safety concerns</p>
                        </div>
                        <div>
                            <p className="font-semibold text-green-500">Solution:</p>
                            <p>Family dashboard with live trip monitoring</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}