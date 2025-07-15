import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Bell, Settings, Car, History, User } from 'lucide-react';

function UserNav({ onTabChange }) {
  const [activeTab, setActiveTab] = useState('bookRide'); 

  // Call onTabChange whenever activeTab changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="bg-white p-6 shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Christiana!</h1>
          <p className="text-gray-600 mt-1">Ready for your next accessible ride?</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-sm">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </button>
          <Link to={"/settings"} className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-sm">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
        </div>
      </div>
      <hr className="border-t border-slate-200" />

      {/* Bottom section of the Navbar*/}
      <div className="flex border-gray-300">
        <button
          className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
            activeTab === 'bookRide'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('bookRide')}
        >
          <Car className="w-5 h-5 mr-2" />
          Book a Ride
        </button>
        <button
          className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
            activeTab === 'rideHistory'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('rideHistory')}
        >
          <History className="w-5 h-5 mr-2" />
          Ride History
        </button>
        <button
          className={`flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200 ${
            activeTab === 'profile'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabClick('profile')}
        >
          <User className="w-5 h-5 mr-2 " />
          Profile
        </button>
      </div>
    </nav>
  );
}

export default UserNav;
