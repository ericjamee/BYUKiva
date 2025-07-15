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
    const needsHelp = progressPercentage < 25; // Show badge if less than 25% funded

    const handleDonationComplete = () => {
        // Refresh the student data or update the UI as needed
        window.location.reload();
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            {needsHelp && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Needs Help
                </div>
            )}
            <div className="relative">
                <img
                    src={student.profilePictureUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-xl font-semibold">
                        {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-gray-200">{student.country}</p>
                </div>
            </div>
            
            <div className="p-4">
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">Funding Progress</span>
                        <span className="text-sm font-bold text-gray-900">
                            ${student.amountRaised.toLocaleString()} of ${student.fundingGoal.toLocaleString()}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full transition-all duration-300 ${
                                needsHelp ? 'bg-red-500' : progressPercentage >= 75 ? 'bg-green-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                    </div>
                    <div className="mt-1 text-right">
                        <span className="text-sm font-medium text-gray-500">
                            {progressPercentage.toFixed(1)}% Funded
                        </span>
                    </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{student.familyHistoryExperience}</p>
                <div className="space-y-2">
                    <Link
                        to={`/students/${student.id}`}
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Learn More
                    </Link>
                    <button
                        onClick={() => setIsDonationModalOpen(true)}
                        className={`block w-full text-center py-2 rounded-md transition-colors ${
                            needsHelp 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                        {needsHelp ? 'Help Now' : 'Donate Now'}
                    </button>
                </div>
            </div>

            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
                student={student}
                onDonationComplete={handleDonationComplete}
            />
        </div>
    );
};

export default StudentCard; 