import { useState, useEffect } from 'react';
import { ChevronLeft, Clock, User, MapPin, Plus, Square, ChevronDown } from 'lucide-react';
import React from 'react';
import UserNav from '../components/UserNav';
import { Dialog, DialogContent, Button, Typography, Box } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from 'date-fns/format';
import RideHistory from '../components/RideHistory'; 
import ProfileContent from '../components/ProfilePage'; 
import InfoSection from '../components/InfoSection';
import { getUserFromStorage, isAuthenticated } from '../api/client.js';
import { useNavigate } from 'react-router';

function UserPage() {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [currentContentTab, setCurrentContentTab] = useState('bookRide');
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and get user data
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const user = getUserFromStorage();
    if (user) {
      setUserData(user);
    }
    setLoading(false);
  }, [navigate]);

  const handleNavbarTabChange = (tabName) => {
    if (tabName !== currentContentTab) {
      setCurrentContentTab(tabName);
      setShowDateTimePicker(false);
    }
  };

  const formatTimeForDisplay = (time) => {
    return time ? format(time, 'hh:mm a') : 'Select';
  };

  if (loading) {
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
    <div className="min-h-screen flex flex-col font-sans">
      <UserNav onTabChange={handleNavbarTabChange} userData={userData} />

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-full md:w-140 bg-white p-6 flex flex-col shadow-lg border-r border-gray-200 overflow-y-auto">
          {showDateTimePicker ? (
            <div className='border py-3 px-5 border-slate-300 rounded-lg shadow-md'>
              <div className="flex items-center justify-between mb-3">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setShowDateTimePicker(false)}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors duration-200">
                  Clear
                </button>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" mb={2} sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}> Select pickup time and date</Typography>
                  <Typography variant="body2" mb={3}>
                    Choose your pickup time up to 90 days in advance
                  </Typography>

                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <div>
                      <Typography variant="caption" color="text.secondary" mr={12}>Date</Typography>
                      <Button variant="outlined" onClick={() => setShowDatePicker(true)}>
                        {format(selectedDate, 'eee, dd MMM ')}
                      </Button>
                    </div>
                    <div>
                      <Typography variant="caption" color="text.secondary">Pickup time</Typography>
                      <Button variant="outlined" onClick={() => setShowTimePicker(true)}>
                        {formatTimeForDisplay(selectedTime)}
                      </Button>
                    </div>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Timezone is based on pickup location
                  </Typography>

                  <Button variant="contained" fullWidth sx={{ mt: 4 }} color="success">
                    Continue
                  </Button>
                </Box>

                <Dialog open={showDatePicker} onClose={() => setShowDatePicker(false)}>
                  <DialogContent>
                    <Typography variant="caption" mr={2}>SELECT DATE</Typography>
                    <DatePicker
                      disablePast
                      value={selectedDate}
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                        setShowDatePicker(false);
                      }}
                      slotProps={{ textField: { variant: 'standard' } }}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog open={showTimePicker} onClose={() => setShowTimePicker(false)}>
                  <DialogContent>
                    <Typography variant="caption" mr={2}>SELECT TIME</Typography>
                    <TimePicker
                      value={selectedTime}
                      onChange={(newValue) => {
                        setSelectedTime(newValue);
                        setShowTimePicker(false);
                      }}
                      slotProps={{ textField: { variant: 'standard' } }}
                    />
                  </DialogContent>
                </Dialog>
              </LocalizationProvider>
            </div>
          ) : (
            <div className='border py-3 px-5 border-slate-300 rounded-lg shadow-md'>
              {userData?.fullName && (
                <div className="mb-4">
                  <p className="text-lg text-blue-600 font-semibold">
                    Welcome back, {userData.fullName.split(' ')[0]}!
                  </p>
                </div>
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-6">Get a ride</h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pickup location" id='pickupnow'
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
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
                <div
                  className="relative flex items-center justify-between p-3 rounded-lg bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setShowDateTimePicker(true)}
                >
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Schedule Ride</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                Search
              </button>
            </div>
          )}
        </aside>

        <div className="w-full relative overflow-hidden mx-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6950467062625!2d-0.22777702688922322!3d5.611976033088184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf997d7b6d423b%3A0x85e06ae906bdf2d7!2sMarwako%20Abelemkpe%20Branch!5e0!3m2!1sen!2sgh!4v1752181502461!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>

          {currentContentTab === 'rideHistory' && (
            <div className="absolute inset-0 bg-white/90 p-4 overflow-y-auto">
              <RideHistory userData={userData} />
            </div>
          )}

          {currentContentTab === 'profile' && (
            <div className="absolute inset-0 bg-white/90 p-4 overflow-y-auto">
              <ProfileContent userData={userData} />
            </div>
          )}
        </div>
      </main>

      {currentContentTab === 'bookRide' && (
        <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose Your Ride</h2>
          <InfoSection />
          <button className="mt-6 w-full bg-blue-400 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 cursor-pointer">
            Book Ride Now
          </button>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 mr-2"></div>
              <p className="text-blue-800 text-sm">
                <span className="font-semibold">Safety First</span><br />
                All our drivers are trained in disability assistance and first aid. Your ride will be tracked in real-time for your safety.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;