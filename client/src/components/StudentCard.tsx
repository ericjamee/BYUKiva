import React from 'react';
import type { Student } from '../types/index';
import { Link } from 'react-router-dom';

interface StudentCardProps {
    student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
    const progressPercentage = (student.amountRaised / student.fundingGoal) * 100;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>${student.amountRaised.toLocaleString()} of ${student.fundingGoal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                    </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{student.familyHistoryExperience}</p>
                <Link
                    to={`/students/${student.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default StudentCard; 