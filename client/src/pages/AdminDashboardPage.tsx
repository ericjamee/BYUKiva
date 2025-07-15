import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Student } from '../types';
import { fetchAllStudents } from '../services/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not admin
    if (user?.role !== 'Admin') {
      navigate('/login');
      return;
    }

    loadStudents();
  }, [user, navigate]);

  const loadStudents = async () => {
    try {
      const data = await fetchAllStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load student applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    switch (activeTab) {
      case 'pending':
        return student.applicationStatus === 'Pending';
      case 'approved':
        return student.applicationStatus === 'Approved';
      case 'rejected':
        return student.applicationStatus === 'Rejected';
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002E5D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Applications</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'pending'
                  ? 'border-[#002E5D] text-[#002E5D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'approved'
                  ? 'border-[#002E5D] text-[#002E5D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'rejected'
                  ? 'border-[#002E5D] text-[#002E5D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rejected
            </button>
          </nav>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={student.profilePictureUrl ? `${API_BASE_URL}${student.profilePictureUrl}` : '/default-avatar.png'}
                          alt={student.name}
                        />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-lg font-medium text-gray-900">{student.name}</h2>
                        <div className="text-sm text-gray-500">
                          {student.pathwayProgram} • {student.country}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => navigate(`/admin/applications/${student.id}`)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#002E5D] hover:bg-[#00254A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002E5D]"
                      >
                        Review Application
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 