import React from 'react';
import { User } from 'lucide-react';

function ProfileContent() { 
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 mr-3 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Full Name</p>
          <p className="text-gray-900 font-semibold">Kwame Asante</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Phone Number</p>
          <p className="text-gray-900 font-semibold">+233 24 123 4567</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Rides</p>
          <p className="text-blue-600 font-semibold">12</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Saved Locations</p>
          <p className="text-green-600 font-semibold">3</p>
        </div>
      </div>

      <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileContent;
