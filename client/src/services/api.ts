import axios from 'axios';
import type { Student, StudentApplication, Donation } from '../types';

export const API_BASE_URL = 'https://byukiva.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const submitApplication = async (data: StudentApplication): Promise<void> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  
  if (data.profilePicture) {
    formData.append('profilePicture', data.profilePicture);
  }

  await api.post('/api/students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Student endpoints
export const getStudents = () => api.get<Student[]>('/api/students');
export const getStudent = (id: string) => api.get<Student>(`/api/students/${id}`);

// Donation endpoints
export const createDonation = (data: Omit<Donation, 'id' | 'date'>) => 
  api.post<Donation>('/api/donations', data);

export const getStudentDonations = (studentId: string) => 
  api.get<Donation[]>(`/api/students/${studentId}/donations`); 