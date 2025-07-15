import React, { useState } from 'react';
import type { Student } from '../types/index';
import { Link } from 'react-router-dom';
import { DonationModal } from './DonationModal';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const progressPercentage = (student.amountRaised / student.fundingGoal) * 100;
  const needsHelp = progressPercentage < 25;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={student.profilePictureUrl}
          alt={student.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {needsHelp && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            Needs Help
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {student.name}
        </h3>
        <p className="text-gray-600">{student.country}</p>
        <p className="text-gray-600">{student.pathwayProgram}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>${student.amountRaised.toLocaleString()} of ${student.fundingGoal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                progressPercentage < 25 ? 'bg-red-500' :
                progressPercentage < 75 ? 'bg-blue-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/students/${student.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View Profile
          </Link>
          <button
            onClick={() => setIsDonationModalOpen(true)}
            className={`px-4 py-2 rounded-md ${
              needsHelp
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {needsHelp ? 'Help Now' : 'Donate'}
          </button>
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

export default StudentCard; 