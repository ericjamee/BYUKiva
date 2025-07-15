import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudentApplication } from '../services/api';

export function StudentApplicationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: '',
    pathwayProgram: '',
    desiredDegree: '',
    story: '',
    photo: null as File | null,
    loanAmount: '',
    monthlyPaymentCapacity: '',
    academicProgress: '',
    futureGoals: '',
    whyNeedLoan: '',
    expectedGraduation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createStudentApplication({
        ...formData,
        age: parseInt(formData.age),
        loanAmount: parseFloat(formData.loanAmount),
        monthlyPaymentCapacity: parseFloat(formData.monthlyPaymentCapacity),
        expectedGraduation: new Date(formData.expectedGraduation)
      });
      
      navigate('/application-submitted');
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BYU-Pathway Loan Application</h1>
        <p className="text-gray-600">
          Please fill out this form to apply for a student loan. All fields marked with * are required.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              required
              min="16"
              max="100"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
            />
          </div>

          <div>
            <label htmlFor="pathwayProgram" className="block text-sm font-medium text-gray-700 mb-1">
              BYU-Pathway Program *
            </label>
            <select
              id="pathwayProgram"
              name="pathwayProgram"
              required
              value={formData.pathwayProgram}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
            >
              <option value="">Select a program</option>
              <option value="PathwayConnect">PathwayConnect</option>
              <option value="Certificate">Certificate Program</option>
              <option value="Associates">Associate's Degree</option>
              <option value="Bachelors">Bachelor's Degree</option>
            </select>
          </div>

          <div>
            <label htmlFor="desiredDegree" className="block text-sm font-medium text-gray-700 mb-1">
              Desired Degree/Certificate *
            </label>
            <input
              type="text"
              id="desiredDegree"
              name="desiredDegree"
              required
              value={formData.desiredDegree}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
            />
          </div>

          <div>
            <label htmlFor="expectedGraduation" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Graduation Date *
            </label>
            <input
              type="date"
              id="expectedGraduation"
              name="expectedGraduation"
              required
              value={formData.expectedGraduation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount Needed (USD) *
              </label>
              <input
                type="number"
                id="loanAmount"
                name="loanAmount"
                required
                min="100"
                step="100"
                value={formData.loanAmount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
            </div>

            <div>
              <label htmlFor="monthlyPaymentCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Payment Capacity (USD) *
              </label>
              <input
                type="number"
                id="monthlyPaymentCapacity"
                name="monthlyPaymentCapacity"
                required
                min="10"
                step="10"
                value={formData.monthlyPaymentCapacity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                Your Story *
              </label>
              <textarea
                id="story"
                name="story"
                required
                rows={4}
                value={formData.story}
                onChange={handleInputChange}
                placeholder="Tell us about yourself and your background..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
            </div>

            <div>
              <label htmlFor="academicProgress" className="block text-sm font-medium text-gray-700 mb-1">
                Current Academic Progress *
              </label>
              <textarea
                id="academicProgress"
                name="academicProgress"
                required
                rows={3}
                value={formData.academicProgress}
                onChange={handleInputChange}
                placeholder="Describe your current progress in BYU-Pathway..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
            </div>

            <div>
              <label htmlFor="futureGoals" className="block text-sm font-medium text-gray-700 mb-1">
                Future Goals *
              </label>
              <textarea
                id="futureGoals"
                name="futureGoals"
                required
                rows={3}
                value={formData.futureGoals}
                onChange={handleInputChange}
                placeholder="What are your educational and career goals?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
            </div>

            <div>
              <label htmlFor="whyNeedLoan" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you need this loan? *
              </label>
              <textarea
                id="whyNeedLoan"
                name="whyNeedLoan"
                required
                rows={3}
                value={formData.whyNeedLoan}
                onChange={handleInputChange}
                placeholder="Explain why you need this loan and how it will help you achieve your goals..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo *
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                required
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
              />
              <p className="mt-1 text-sm text-gray-500">
                Please upload a clear, professional photo of yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#002E5D] hover:bg-[#00254A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002E5D] disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
} 