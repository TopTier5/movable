import { useState, useEffect } from 'react';
import { ChevronLeft, Clock, User, MapPin, Plus, Square, ChevronDown, Navigation, Star, Users, Car, Zap, Shield } from 'lucide-react';
import UserNav from '../components/UserNav';
import { Dialog, DialogContent, Button, Typography, Box } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from 'date-fns/format';
import RideHistory from '../components/RideHistory'; 
import ProfileContent from '../components/ProfilePage'; 
import InfoSection from '../components/InfoSection';
import { getUserFromStorage, isAuthenticated, calculateTravelTime, requestRide } from '../api/client.js';
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

  // New state for Uber-like functionality
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [searchingRides, setSearchingRides] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [tripDistance, setTripDistance] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6950467062625!2d-0.22777702688922322!3d5.611976033088184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf997d7b6d423b%3A0x85e06ae906bdf2d7!2sMarwako%20Abelemkpe%20Branch!5e0!3m2!1sen!2sgh!4v1752181502461!5m2!1sen!2sgh");

  // API Integration state
  const [travelTimeData, setTravelTimeData] = useState(null);

  // Ghana locations for autocomplete suggestions
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const ghanaLocations = [
    'Accra Mall', 'Airport Terminal 3', 'University of Ghana, Legon', 'Circle (Kwame Nkrumah Circle)',
    'Osu Oxford Street', 'East Legon', 'Tema Station', 'Madina Market', 'Dansoman', 'Spintex Road',
    'Achimota Mall', 'Kumasi Central Market', 'Cape Coast Castle', 'Tamale Central Market',
    'Labadi Beach', 'Kaneshie Market', 'Adabraka', 'Kokomlemle', 'Asylum Down', 'Ridge'
  ];

  // Ride options data
  const rideOptions = [
    {
      id: 'economy',
      name: 'Movable Economy',
      icon: <Car className="w-8 h-8" />,
      time: '3 min',
      price: 'GH₵15.50',
      description: 'Affordable rides for everyday trips',
      capacity: '1-4 passengers',
      rating: 4.8
    },
    {
      id: 'comfort',
      name: 'Movable Comfort',
      icon: <Users className="w-8 h-8" />,
      time: '5 min',
      price: 'GH₵22.30',
      description: 'Newer cars with extra legroom',
      capacity: '1-4 passengers',
      rating: 4.9
    },
    {
      id: 'premium',
      name: 'Movable Premium',
      icon: <Star className="w-8 h-8" />,
      time: '7 min',
      price: 'GH₵35.80',
      description: 'High-end cars with top-rated drivers',
      capacity: '1-4 passengers',
      rating: 4.95
    },
    {
      id: 'electric',
      name: 'Movable Green',
      icon: <Zap className="w-8 h-8" />,
      time: '6 min',
      price: 'GH₵18.90',
      description: 'Electric and hybrid vehicles',
      capacity: '1-4 passengers',
      rating: 4.7
    }
  ];

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
      // Reset ride booking state when switching tabs
      setShowRideOptions(false);
      setSelectedRide(null);
    }
  };

  const formatTimeForDisplay = (time) => {
    return time ? format(time, 'hh:mm a') : 'Select';
  };

  // Location search functionality
  const searchLocations = (query, isPickup = true) => {
    if (!query.trim()) {
      if (isPickup) {
        setPickupSuggestions([]);
        setShowPickupSuggestions(false);
      } else {
        setDropoffSuggestions([]);
        setShowDropoffSuggestions(false);
      }
      return;
    }

    const filtered = ghanaLocations.filter(location =>
      location.toLowerCase().includes(query.toLowerCase())
    );

    if (isPickup) {
      setPickupSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowPickupSuggestions(true);
    } else {
      setDropoffSuggestions(filtered.slice(0, 5));
      setShowDropoffSuggestions(true);
    }
  };

  const selectLocation = (location, isPickup = true) => {
    if (isPickup) {
      setPickupLocation(location);
      setShowPickupSuggestions(false);
    } else {
      setDropoffLocation(location);
      setShowDropoffSuggestions(false);
    }

    // Update map to show route when both locations are selected
    if ((isPickup && dropoffLocation) || (!isPickup && pickupLocation)) {
      updateMapWithRoute(isPickup ? location : pickupLocation, isPickup ? dropoffLocation : location);
    }
  };

  const updateMapWithRoute = (pickup, dropoff) => {
    if (!pickup || !dropoff) return;

    // Create Google Maps URL with directions
    const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${encodeURIComponent(pickup + ', Ghana')}&destination=${encodeURIComponent(dropoff + ', Ghana')}&mode=driving`;
    
    // For demo purposes, we'll use a static map showing Accra with route simulation
    const routeUrl = `https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d63530.59324289141!2d-0.22777702688922322!3d5.611976033088184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2s${encodeURIComponent(pickup + ', Accra, Ghana')}!3m2!1d5.6037168!2d-0.1869644!4m5!1s0xfdf90a7d6e3c3f5%3A0x5d6e2bb5b6c9e1d7!2s${encodeURIComponent(dropoff + ', Accra, Ghana')}!3m2!1d5.6277!2d-0.1514!5e0!3m2!1sen!2sgh!4v1752181502461!5m2!1sen!2sgh`;
    
    setMapUrl(routeUrl);
  };

  // Updated function to handle search with API integration
  const handleSearch = async () => {
    if (!pickupLocation.trim() || !dropoffLocation.trim()) {
      alert('Please enter both pickup and dropoff locations');
      return;
    }

    setSearchingRides(true);
    
    try {
      // 🔥 API INTEGRATION 1: Get real travel time and distance
      const travelResponse = await calculateTravelTime(pickupLocation, dropoffLocation);
      
      if (travelResponse.success) {
        setTravelTimeData(travelResponse.data);
        setTripDistance(travelResponse.data.distance);
        setEstimatedTime(travelResponse.data.duration_in_traffic || travelResponse.data.duration);
      } else {
        // Fallback to mock data if API fails
        const distance = Math.floor(Math.random() * 15) + 5;
        const time = Math.floor(distance * 2.5) + Math.floor(Math.random() * 10);
        setTripDistance(`${distance}.${Math.floor(Math.random() * 9)} km`);
        setEstimatedTime(`${time}-${time + 5} min`);
      }
    } catch (error) {
      console.error('Error getting travel time:', error);
      // Fallback to mock data
      const distance = Math.floor(Math.random() * 15) + 5;
      const time = Math.floor(distance * 2.5) + Math.floor(Math.random() * 10);
      setTripDistance(`${distance}.${Math.floor(Math.random() * 9)} km`);
      setEstimatedTime(`${time}-${time + 5} min`);
    }
    
    // Update map with route
    updateMapWithRoute(pickupLocation, dropoffLocation);
    
    setSearchingRides(false);
    setShowRideOptions(true);
  };

  const handleRideSelect = (ride) => {
    setSelectedRide(ride);
  };

  // Updated function to handle booking with API integration
  const handleBookRide = async () => {
    if (!selectedRide) {
      alert('Please select a ride option');
      return;
    }
    
    try {
      // 🔥 API INTEGRATION 2: Submit ride request
      const rideDetails = {
        userId: userData._id, // Assuming userData has _id field
        origin: pickupLocation,
        destination: dropoffLocation,
        pickupTime: selectedTime 
          ? new Date(selectedDate.toDateString() + ' ' + selectedTime.toTimeString()).toISOString()
          : new Date().toISOString(), // Use current time if no specific time selected
        notes: `Selected ride: ${selectedRide.name}. Trip distance: ${tripDistance}. Estimated time: ${estimatedTime}.`
      };

      const response = await requestRide(rideDetails);
      
      if (response.success) {
        alert(`✅ Ride booked successfully! Ride ID: ${response.ride._id}`);
        // Reset the form
        setPickupLocation('');
        setDropoffLocation('');
        setShowRideOptions(false);
        setSelectedRide(null);
        setSelectedTime(null);
        setSelectedDate(new Date());
      } else {
        alert('❌ Failed to book ride. Please try again.');
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      alert('❌ Error booking ride. Please check your connection and try again.');
    }
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
                    placeholder="Pickup location"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      searchLocations(e.target.value, true);
                    }}
                    onFocus={() => {
                      if (pickupLocation) searchLocations(pickupLocation, true);
                    }}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  
                  {/* Pickup Suggestions */}
                  {showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {pickupSuggestions.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => selectLocation(location, true)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center border-b border-gray-100 last:border-b-0"
                        >
                          <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-700">{location}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    value={dropoffLocation}
                    onChange={(e) => {
                      setDropoffLocation(e.target.value);
                      searchLocations(e.target.value, false);
                    }}
                    onFocus={() => {
                      if (dropoffLocation) searchLocations(dropoffLocation, false);
                    }}
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <Plus className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  {/* Dropoff Suggestions */}
                  {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {dropoffSuggestions.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => selectLocation(location, false)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center border-b border-gray-100 last:border-b-0"
                        >
                          <Square className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-700">{location}</span>
                        </button>
                      ))}
                    </div>
                  )}
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
              <button 
                onClick={handleSearch}
                disabled={searchingRides || !pickupLocation.trim() || !dropoffLocation.trim()}
                className={`w-full mt-6 py-3 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  (!pickupLocation.trim() || !dropoffLocation.trim()) 
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                    : searchingRides
                    ? 'bg-blue-600 text-white cursor-wait'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {searchingRides ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Finding rides...
                  </div>
                ) : 'Search'}
              </button>
            </div>
          )}
        </aside>

        <div className="w-full relative overflow-hidden mx-6">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>

          {/* Trip Route Indicator (shows when ride options are visible) */}
          {showRideOptions && currentContentTab === 'bookRide' && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center text-sm text-gray-600">
                <Navigation className="w-4 h-4 mr-2" />
                <span>{tripDistance} • {estimatedTime}</span>
              </div>
            </div>
          )}

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

      {/* ONLY Show Choose Ride Section After Search - Static InfoSection Removed */}
      {currentContentTab === 'bookRide' && showRideOptions && (
        <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Choose a ride</h2>
              <p className="text-gray-600">{tripDistance} trip • {estimatedTime}</p>
            </div>
            <button 
              onClick={() => setShowRideOptions(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronDown className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {rideOptions.map((ride) => (
              <div
                key={ride.id}
                onClick={() => handleRideSelect(ride)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedRide?.id === ride.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {ride.icon}
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{ride.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{ride.price}</div>
                    <div className="text-sm text-gray-600">{ride.time}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{ride.description}</p>
                <p className="text-xs text-gray-500">{ride.capacity}</p>
              </div>
            ))}
          </div>

          {selectedRide && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Safety First</p>
                    <p className="text-sm text-gray-600">Your trip will be tracked and shared with trusted contacts</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">{selectedRide.price}</p>
                  <p className="text-sm text-gray-600">Final price</p>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={handleBookRide}
            disabled={!selectedRide}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              selectedRide
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedRide ? `Book ${selectedRide.name}` : 'Select a ride option'}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPage;