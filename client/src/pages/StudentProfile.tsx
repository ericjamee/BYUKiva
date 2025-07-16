import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudent } from '../services/api';
import type { Student } from '../types';
import { DonationModal } from '../components/DonationModal';

export const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!id) return;
        const response = await getStudent(id);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to fetch student details');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

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

  const progressPercentage = (student.amountRaised / student.fundingGoal) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{student.country}</p>
          </div>
          <button
            onClick={() => setIsDonationModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#002E5D] hover:bg-[#00254A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002E5D]"
          >
            Support This Student
          </button>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-500">Funding Progress</span>
                  <span className="font-medium text-gray-900">
                    ${student.amountRaised.toLocaleString()} of ${student.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      progressPercentage < 25 ? 'bg-red-500' :
                      progressPercentage < 75 ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.story}</dd>
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
              <dt className="text-sm font-medium text-gray-500">Academic Progress</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.academicProgress}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Future Goals</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.futureGoals}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Why I Need This Donation</dt>
              <dd className="mt-1 text-sm text-gray-900">{student.whyNeedDonation}</dd>
            </div>
          </div>
        </div>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        student={student}
      />
    </div>
  );
}; 