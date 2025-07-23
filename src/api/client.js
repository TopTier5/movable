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

export const registerUser = async (formData) => {
    const data = new FormData();
    
    data.append('fullName', formData.fullName);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('email', formData.email);
    data.append('typeOfDisability', formData.disabilityType);
    data.append('assistanceNeeds', formData.assistanceDescription);
    data.append('employmentStatus', formData.employmentStatus);
    data.append('password', '@123456');
    
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

export const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL;