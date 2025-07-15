import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { StudentApplication } from '../types';

export const StudentApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<StudentApplication>({
    name: '',
    email: '',
    country: '',
    pathwayProgram: '',
    desiredDegree: '',
    story: '',
    academicProgress: '',
    futureGoals: '',
    whyNeedDonation: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: StudentApplication) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const formData = new FormData();
      formData.append('profilePicture', file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (profilePicture) {
        data.append('profilePicture', profilePicture);
      }

      await api.post('/students/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/application-submitted');
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Donation Application</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="pathwayProgram" className="block text-sm font-medium text-gray-700">
              BYU-Pathway Program
            </label>
            <input
              type="text"
              id="pathwayProgram"
              name="pathwayProgram"
              required
              value={formData.pathwayProgram}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="desiredDegree" className="block text-sm font-medium text-gray-700">
              Desired Degree
            </label>
            <input
              type="text"
              id="desiredDegree"
              name="desiredDegree"
              required
              value={formData.desiredDegree}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-medium text-gray-700">
              Your Story
            </label>
            <textarea
              id="story"
              name="story"
              rows={4}
              required
              value={formData.story}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="academicProgress" className="block text-sm font-medium text-gray-700">
              Academic Progress
            </label>
            <textarea
              id="academicProgress"
              name="academicProgress"
              rows={4}
              required
              value={formData.academicProgress}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="futureGoals" className="block text-sm font-medium text-gray-700">
              Future Goals
            </label>
            <textarea
              id="futureGoals"
              name="futureGoals"
              rows={4}
              required
              value={formData.futureGoals}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="whyNeedDonation" className="block text-sm font-medium text-gray-700">
              Why do you need this donation?
            </label>
            <textarea
              id="whyNeedDonation"
              name="whyNeedDonation"
              rows={4}
              required
              value={formData.whyNeedDonation}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#002E5D] focus:border-[#002E5D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#002E5D] hover:bg-[#00254A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002E5D] disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 