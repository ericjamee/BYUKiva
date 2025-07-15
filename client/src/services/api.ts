import type { Student, StudentApplicationData, Donation, LoanRepayment, LoginData, LoginResponse, ProgressReport } from '../types';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } : {
    'Content-Type': 'application/json'
  };
}

// Student endpoints
export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/students`, {
    headers: getAuthHeaders()
  });
  return handleResponse<Student[]>(response);
}

export async function fetchStudent(id: string): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    headers: getAuthHeaders()
  });
  return handleResponse<Student>(response);
}

export async function createStudentApplication(data: StudentApplicationData): Promise<Student> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  const response = await fetch(`${API_BASE_URL}/students/apply`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<Student>(response);
}

// Donation endpoints
export async function createDonation(data: Omit<Donation, 'id' | 'date'>): Promise<Donation> {
  const response = await fetch(`${API_BASE_URL}/donations`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Donation>(response);
}

export async function fetchStudentDonations(studentId: string): Promise<Donation[]> {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/donations`, {
    headers: getAuthHeaders()
  });
  return handleResponse<Donation[]>(response);
}

// Progress Report endpoints
export async function createProgressReport(data: Omit<ProgressReport, 'id' | 'date'>): Promise<ProgressReport> {
  const response = await fetch(`${API_BASE_URL}/progress-reports`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<ProgressReport>(response);
}

export async function fetchStudentProgressReports(studentId: string): Promise<ProgressReport[]> {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/progress-reports`, {
    headers: getAuthHeaders()
  });
  return handleResponse<ProgressReport[]>(response);
}

// Loan Repayment endpoints
export async function createLoanRepayment(data: Omit<LoanRepayment, 'id' | 'date'>): Promise<LoanRepayment> {
  const response = await fetch(`${API_BASE_URL}/loan-repayments`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<LoanRepayment>(response);
}

export async function fetchStudentLoanRepayments(studentId: string): Promise<LoanRepayment[]> {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/loan-repayments`, {
    headers: getAuthHeaders()
  });
  return handleResponse<LoanRepayment[]>(response);
}

// Authentication endpoints
export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<LoginResponse>(response);
}

export async function getCurrentUser(): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<LoginResponse>(response);
}

// Admin endpoints
export async function fetchAllStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/students/all`, {
    headers: getAuthHeaders(),
  });
  return handleResponse<Student[]>(response);
}

export async function updateStudentStatus(
  studentId: string,
  data: {
    status: 'Approved' | 'Rejected';
    adminNotes: string;
    adminId: string;
  }
): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/students/${studentId}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Student>(response);
} 