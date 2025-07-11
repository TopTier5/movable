import { useState } from 'react';
import { useRef } from 'react';
import { ChevronLeft, Calendar, Clock, X, User, MapPin, Plus, Square, ChevronDown } from 'lucide-react';
import React from 'react';
import UserNavbar from '../components/UserNav';

// Main App component
function UserPage() {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false); // State to toggle between form and date/time picker
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // State for the date input
  const [selectedTime, setSelectedTime] = useState('Pickup now'); // State for the selected time
  const [showTimeOptions, setShowTimeOptions] = useState(false); // State to show/hide time options
  const dateInputRef = useRef(null); // Ref for the date input

  // Predefined time options
  const timeOptions = [
    'Now',
    '6:00 AM - 7:00 AM',
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
    'Later'
  ];

  // Function to handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowTimeOptions(false); 
  };

  // Function to focus the date input when the calendar icon is clicked
  const handleCalendarIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click(); // Simulate a click on the input to open the date picker
      console.log("Calendar icon clicked, attempting to open date picker."); // For debugging
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <UserNavbar />

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-full md:w-140 bg-white p-6 flex flex-col shadow-lg border-r border-gray-200 overflow-y-auto">
          {showDateTimePicker ? (
            
            <>
            <div className='border py-3 px-5 border-slate-300 rounded-lg shadow-md'>
              <div className="flex items-center justify-between mb-6">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setShowDateTimePicker(false)} // Go back to initial form
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors duration-200">
                  Clear
                </button>
              </div>

              {/* Date and Time Pickers */}
              <div className="space-y-4 mb-8">
                {/* Date Picker */}
                <div className="relative flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center w-full">
                    <Calendar
                      className="w-5 h-5 text-gray-600 mr-3 cursor-pointer"
                      onClick={handleCalendarIconClick} 
                    />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="text-gray-800 font-medium bg-transparent outline-none flex-1
                                   date-input-no-icon" // Custom class to hide default icon
                    />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" /> {/* Down arrow */}
                </div>

                {/* Time Picker */}
                <div className="relative">
                  <div
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                    onClick={() => setShowTimeOptions(!showTimeOptions)} // Toggle time options
                  >
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-800 font-medium">{selectedTime}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" /> {/* Down arrow */}
                  </div>
                  {showTimeOptions && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                      {timeOptions.map((time, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Information Sections */}
              <div className="flex-1 space-y-6 text-gray-700 text-sm">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-500 mr-4 mt-1 flex-shrink-0" />
                  <p>Choose your pickup time up to 90 days in advance</p>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mr-4 mt-1 flex-shrink-0" />
                  <p>Extra wait time included to meet your ride</p>
                </div>
                <div className="flex items-start">
                  <X className="w-5 h-5 text-gray-500 mr-4 mt-1 flex-shrink-0" />
                  <p className='mb-5'>Cancel at no charge up to 60 minutes in advance</p>
                </div>
              </div>

              <a href="#" className="text-blue-600 text-sm font-medium underline">
                See terms
              </a>

              {/* Next Button */}
              <button className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200 shadow-md mt-5">
                Next
              </button>
                </div>
            </>
          ) : (
          
            // Initial Form View
            <>
             <div className='border py-3 px-5 border-slate-300 rounded-lg shadow-md'>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Get a ride</h2>

              <div className="space-y-4">
                {/* Pickup Location Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pickup location"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>

                {/* Dropoff Location Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <Plus className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Pickup Now Dropdown - Now a clickable div */}
                <div
                  className="relative flex items-center justify-between p-3 rounded-lg bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setShowDateTimePicker(true)} // Click to show date/time picker
                >
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">{selectedTime}</span> {/* Display selected time */}
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>

                {/* For Me Dropdown */}
                <div className="relative">
                  <select
                    className="appearance-none w-full pl-10 pr-10 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-gray-700"
                  >
                    <option>For me</option>
                    <option>For others</option>
                 
                  </select>
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full mt-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                Search
              </button>
              </div>
            </>
          )}
        </aside>

        
  <div className="w-full overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6950467062625!2d-0.22777702688922322!3d5.611976033088184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf997d7b6d423b%3A0x85e06ae906bdf2d7!2sMarwako%20Abelemkpe%20Branch!5e0!3m2!1sen!2sgh!4v1752181502461!5m2!1sen!2sgh"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Marwako Abelemkpe Branch"
  ></iframe>
</div>
 </main>
      
    </div>
  );
}

export default UserPage;
