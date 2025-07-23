import { Link } from "react-router";
import { User, Mail, Phone, Calendar, Shield, MapPin } from 'lucide-react';

function ProfileContent({ userData }) { 
  if (!userData) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="text-center py-8">
          <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No profile data available</p>
          <p className="text-sm text-gray-500 mt-2">Please try logging in again</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 mr-3 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Full Name</p>
          <p className="text-gray-900 font-semibold">
            {userData.fullName || 'Not provided'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Phone Number</p>
          <p className="text-gray-900 font-semibold">
            {userData.phoneNumber || 'Not provided'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
          <p className="text-gray-900 font-semibold">
            {userData.email || 'Not provided'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Role</p>
          <p className="text-blue-600 font-semibold capitalize">
            {userData.role || 'Member'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Member Since</p>
          <p className="text-green-600 font-semibold">
            {formatDate(userData.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Account Status</p>
          <p className="text-green-600 font-semibold">Active</p>
        </div>
      </div>

      {/* Verification Status */}
      {userData.ghanaCard && userData.ghanaCard.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <p className="text-green-800 font-medium">Verified Account</p>
          </div>
          <p className="text-green-700 text-sm mt-1">Your Ghana Card has been verified</p>
        </div>
      )}

      {/* User ID for support */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-xs font-medium mb-1">User ID (for support)</p>
        <p className="text-gray-700 text-sm font-mono">{userData.id}</p>
      </div>

        <Link to="/editprofile">
      <button className="mt-8 w-full bg-blue-600 text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
        Edit Profile
      </button></Link>
    </div>
  );
}

export default ProfileContent;