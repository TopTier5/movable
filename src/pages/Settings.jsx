import { useState } from 'react';
import { Link } from 'react-router';
import { Bell, ShieldCheck, Smartphone, LogOut, User as UserIcon, ChevronLeft, Moon, Volume2 } from 'lucide-react';
import { VoiceProvider, useVoice } from '../components/VoiceContext';

const SettingsPage = () => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [anonymousData, setAnonymousData] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [rideReminders, setRideReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);

  // Voice functionality
  const { isVoiceEnabled, setIsVoiceEnabled } = useVoice();

  return (
    <header>
         <nav className='flex w-full border border-white shadow-md'>
            <div className='ml-50 flex mt-7'>
        <Link to={"/userpage"} className='flex mr-7 mb-6 mt-2 cursor-pointer hover:text-blue-500'><ChevronLeft className="w-6 h-6 text-gray-700 mr-3 hover:text-blue-500" />
        <span className='mr-2'>Back to Dashboard</span> 
        </Link> 
      <h1 className="text-2xl font-bold mb-7">Settings</h1>
      </div>
        </nav>
    <div className={darkMode ? 'bg-gray-900 text-white max-w-3xl min-h-screen m-auto p-6 mt-5' : 'bg-white text-gray-900 min-h-screen max-w-3xl m-auto p-6 mt-5'}>
       
      {/* Accessibility Section */}
      <section className="mb-10 border rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <Volume2 className="w-5 h-5 text-orange-600 mr-2" /> Accessibility
        </h2>
        <Toggle 
          label="Voice Reader" 
          description="Read content aloud when clicked or tapped" 
          enabled={isVoiceEnabled} 
          onToggle={setIsVoiceEnabled} 
        />
      </section>

      {/* Notifications Section */}
      <section className="mb-10 border rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <Bell className="w-5 h-5 text-blue-600 mr-2" /> Notifications
        </h2>
        <Toggle label="Push Notifications" description="Receive notifications about your rides" enabled={pushNotifications} onToggle={setPushNotifications} />
        <Toggle label="Ride Reminders" description="Get reminders about upcoming rides" enabled={rideReminders} onToggle={setRideReminders} />
        <Toggle label="Promotions & Offers" description="Receive promotional offers and discounts" enabled={promotions} onToggle={setPromotions} />
      </section>

      {/* Privacy & Security Section */}
      <section className="mb-10 border rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <ShieldCheck className="w-5 h-5 text-green-600 mr-2" /> Privacy & Security
        </h2>
        <Toggle label="Location Services" description="Allow location access for better service" enabled={locationEnabled} onToggle={setLocationEnabled} />
        <Toggle label="Share Anonymous Data" description="Help improve our service with anonymous usage data" enabled={anonymousData} onToggle={setAnonymousData} />
      </section>

      {/* Appearance Section */}
      <section className="mb-10 border rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <Smartphone className="w-5 h-5 text-purple-600 mr-2" /> Appearance
        </h2>
        <Toggle label="Dark Mode" description="Switch to dark theme" enabled={darkMode} onToggle={setDarkMode} />
      </section>

      {/* Account Section */}
      <section className="border rounded-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="mb-4">

          <Link to="/editprofile">
          <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md w-full text-left hover:bg-gray-200 dark:hover:bg-gray-600">
            <UserIcon className="w-5 h-5 mr-2" /> Edit Profile
          </button></Link>
        </div>


        <Link to="/">
        <button className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-md w-full hover:bg-red-100 dark:hover:bg-red-900">
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button></Link>
      </section>
    </div>
    </header>
  );
};

const Toggle = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-3 dark:border-gray-600">
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={enabled} onChange={() => onToggle(!enabled)} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 relative"></div>
    </label>
  </div>
);

export default SettingsPage;