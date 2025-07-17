import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

export const apiFetcher = async (url) => {
    const response = await apiClient.get(url);
    return response.data;
}

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