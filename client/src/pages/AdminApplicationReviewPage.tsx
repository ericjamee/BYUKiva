import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { Student } from '../types';
import { fetchStudent, updateStudentStatus } from '../services/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AdminApplicationReviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (user?.role !== 'Admin') {
      navigate('/login');
      return;
    }

    loadStudent();
  }, [id, user, navigate]);

  const loadStudent = async () => {
    try {
      if (!id) return;
      const data = await fetchStudent(id);
      setStudent(data);
      setAdminNotes(data.adminNotes || '');
      setError(null);
    } catch (err) {
      setError('Failed to load student application');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: 'Approved' | 'Rejected') => {
    if (!student || !id) return;
    
    setUpdating(true);
    try {
      await updateStudentStatus(id, {
        status: newStatus,
        adminNotes,
        adminId: user?.id || ''
      });
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to update application status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002E5D]"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Student not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Review Application</h1>
          <p className="mt-2 text-gray-600">Review and process student loan application</p>
        </div>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <div className="flex-shrink-0 h-16 w-16 mr-4">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={student.profilePictureUrl ? `${API_BASE_URL}${student.profilePictureUrl}` : '/default-avatar.png'}
              alt={student.name}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-sm text-gray-500">
              Applied on {new Date(student.applicationDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.age}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.country}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Pathway Program</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.pathwayProgram}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Desired Degree</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.desiredDegree}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Loan Amount</dt>
              <dd className="mt-1 text-sm text-gray-900">${student.loanAmount.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Monthly Payment Capacity</dt>
              <dd className="mt-1 text-sm text-gray-900">${student.monthlyPaymentCapacity.toLocaleString()}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Story</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.story}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Future Goals</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.futureGoals}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Why Need Loan</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.whyNeedLoan}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Admin Notes</dt>
              <dd className="mt-1">
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Add any notes about this application..."
                />
              </dd>
            </div>
          </dl>
        </div>

        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
          <button
            type="button"
            disabled={updating}
            onClick={() => handleStatusUpdate('Rejected')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reject
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={() => handleStatusUpdate('Approved')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#002E5D] hover:bg-[#00254A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002E5D]"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
} 