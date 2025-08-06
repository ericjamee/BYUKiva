import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../services/api';
import type { Student } from '../types';
import StudentCard from '../components/StudentCard';

export const HomePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        console.log('Data type:', typeof response.data);
        console.log('Is array:', Array.isArray(response.data));
        
        // Parse the response data if it's a string
        let studentsData = response.data;
        if (typeof response.data === 'string') {
          try {
            studentsData = JSON.parse(response.data);
            console.log('Parsed data:', studentsData);
          } catch (parseError) {
            console.error('Failed to parse response data:', parseError);
            setError('Invalid data format received from server');
            return;
          }
        }
        
        // Ensure we have an array of students
        if (Array.isArray(studentsData)) {
          setStudents(studentsData);
        } else {
          console.error('Expected array but got:', typeof studentsData);
          setError('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero Section */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full">
            <iframe 
              className="absolute w-screen h-auto min-h-[150%] left-0 top-0"
              style={{ 
                objectFit: 'cover',
                transform: 'scale(1.5)',
                transformOrigin: 'top center'
              }}
              src="https://www.youtube.com/embed/qIx19EkgrDk?si=4iuOjWWHjbRWarlI&start=175&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=qIx19EkgrDk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
            Help Grow the Family Tree
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-4xl mb-8">
            Fund a BYU-Pathway student to add 50,000 names to FamilySearch while earning their degree
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#students"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-lg transition-colors"
            >
              Fund a Student
            </a>
            <Link
              to="/how-it-works"
              className="px-8 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md font-medium text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div id="students" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Meet Our Students</h2>
          <p className="text-xl text-gray-600">Your donation provides employment and grows the Family Tree</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
            {students.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No students found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 