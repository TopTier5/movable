import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiFetcher = async (url) => {
    const response = await apiClient.get(url);
    return response.data;
}

// Login function
export const loginUser = async (phoneNumber, password) => {
    const response = await apiClient.post('/api/auth/login', {
        phoneNumber,
        password
    });
    return response.data;
};

// Get user profile from localStorage (stored during login)
export const getUserFromStorage = () => {
    try {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
    }
};

// Get auth token from localStorage
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!(getAuthToken() && getUserFromStorage());
};

// Logout function - clears localStorage
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// If you need to fetch fresh user profile data (optional)
export const fetchUserProfile = async () => {
    try {
        const response = await apiClient.get('/api/user/profile');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ✅ FIXED: Registration function now uses user's actual password
export const registerUser = async (formData) => {
    const data = new FormData();
    
    data.append('fullName', formData.fullName);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('email', formData.email);
    data.append('typeOfDisability', formData.disabilityType);
    data.append('assistanceNeeds', formData.assistanceDescription);
    data.append('employmentStatus', formData.employmentStatus);
    
    // ✅ Use the actual password from the form instead of hardcoded one
    data.append('password', formData.password);
    
    if (formData.ghanaCard) {
        data.append('ghanaCard', formData.ghanaCard);
    }
    if (formData.medicalDoc) {
        data.append('medicalRecords', formData.medicalDoc);
    }
    
    const response = await apiClient.post('/api/auth/register', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data;
};

export const calculateTravelTime = async (origin, destination) => {
    const response = await apiClient.post('/api/maps/travel-time', {
        origin,
        destination
    });
    return response.data;
};

// Request a ride
export const requestRide = async (rideDetails) => {
    const response = await apiClient.post('/api/rides/request', {
        userId: rideDetails.userId,
        origin: rideDetails.origin,
        destination: rideDetails.destination,
        pickupTime: rideDetails.pickupTime,
        notes: rideDetails.notes || ''
    });
    return response.data;
};

export const editProfile = async (profileData) => {
    const response = await apiClient.put('/api/auth/edit-profile', {
        userId: profileData.userId,
        fullName: profileData.fullName,
        email: profileData.email,
        address: profileData.address,
        phoneNumber: profileData.phoneNumber,
        emergencyContactName: profileData.emergencyContactName,
        emergencyContactPhone: profileData.emergencyContactPhone
    });
    return response.data;
};

export const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL;