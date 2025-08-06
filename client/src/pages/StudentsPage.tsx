import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';
import type { Student } from '../types';
import StudentCard from '../components/StudentCard';

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        console.log('StudentsPage API Response:', response);
        console.log('StudentsPage Response data:', response.data);
        console.log('StudentsPage Data type:', typeof response.data);
        console.log('StudentsPage Is array:', Array.isArray(response.data));
        
        // Parse the response data if it's a string
        let studentsData = response.data;
        if (typeof response.data === 'string') {
          try {
            studentsData = JSON.parse(response.data);
            console.log('StudentsPage Parsed data:', studentsData);
          } catch (parseError) {
            console.error('StudentsPage Failed to parse response data:', parseError);
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
        console.error('StudentsPage Error fetching students:', err);
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meet Our Students</h1>
        <p className="mt-2 text-gray-600">Fund a student to add 50,000 names to the Family Tree while earning their degree</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No students found</p>
        </div>
      )}
    </div>
  );
}; 