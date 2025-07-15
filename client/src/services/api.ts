import axios from 'axios';
import type { Student, Donation, StudentApplicationData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Student endpoints
export const getStudents = () => api.get<Student[]>('/students');
export const getStudent = (id: string) => api.get<Student>(`/students/${id}`);
export const createStudent = (data: StudentApplicationData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });
  return api.post<Student>('/students', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Donation endpoints
export const createDonation = (data: Omit<Donation, 'id' | 'date'>) => 
  api.post<Donation>('/donations', data);

export const getStudentDonations = (studentId: string) => 
  api.get<Donation[]>(`/students/${studentId}/donations`); 