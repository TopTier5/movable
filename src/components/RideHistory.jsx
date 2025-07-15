import React from 'react';
import { Clock, Car } from 'lucide-react';

function RideHistory() { 
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center mb-6">
        <Clock className="w-6 h-6 mr-3 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Ride History</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-green-600 font-semibold">
            <Car className="w-5 h-5 mr-2" /> GHC15
          </div>
          <span className="text-gray-500 text-sm">Today, 2:30 PM</span>
        </div>
        <div className="ml-7"> 
          <div className="flex items-center text-gray-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Apewosika
          </div>
          <div className="flex items-center text-gray-700">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            University of Cape Coast
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-green-600 font-semibold">
            <Car className="w-5 h-5 mr-2" /> GHC25
          </div>
          <span className="text-gray-500 text-sm">Yesterday, 6:52 PM</span>
        </div>
        <div className="ml-7">
          <div className="flex items-center text-gray-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Kotoka Airport
          </div>
          <div className="flex items-center text-gray-700">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            East Legon
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-green-600 font-semibold">
            <Car className="w-5 h-5 mr-2" /> GHC12
          </div>
          <span className="text-gray-500 text-sm">Dec 15, 11:20 AM</span>
        </div>
        <div className="ml-7">
          <div className="flex items-center text-gray-700 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            37 Military Hospital
          </div>
          <div className="flex items-center text-gray-700">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            Osu Oxford Street
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideHistory;
