import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getStudent, api } from '../services/api';
import type { Student } from '../types';

export const AdminApplicationReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await getStudent(id!);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id, isAuthenticated, navigate]);

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    try {
      await api.put(`/students/${id}/status`, {
        status,
        adminNotes
      });
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to update student status');
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
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Student Application Review
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Review and process student application
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.country}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Pathway Program</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.pathwayProgram}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Desired Degree</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.desiredDegree}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Story</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.story}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Academic Progress</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.academicProgress}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Future Goals</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.futureGoals}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Why Need Donation</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.whyNeedDonation}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Admin Notes</dt>
              <dd className="mt-1">
                <textarea
                  rows={4}
                  className="shadow-sm block w-full focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm border border-gray-300 rounded-md"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-end space-x-3">
          <button
            onClick={() => handleStatusUpdate('rejected')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reject
          </button>
          <button
            onClick={() => handleStatusUpdate('approved')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}; 