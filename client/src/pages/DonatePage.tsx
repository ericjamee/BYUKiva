import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import type { Donation } from '../types';

export const DonatePage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [amount, setAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('Anonymous');

  const handleDonation = async () => {
    if (!studentId) return;
    
    try {
      const donation: Omit<Donation, 'id' | 'date'> = {
        amount: parseFloat(amount),
        studentId: studentId,
        donorName: donorName,
        message: '' // For MVP, we're not collecting messages
      };
      
      await api.post('/donations', donation);
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error making donation:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Make a Donation</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your donation helps grow the Family Tree while providing student employment
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleDonation}>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Donation Amount ($)
                </label>
                <div className="mt-1">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="donorName" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <div className="mt-1">
                  <input
                    id="donorName"
                    name="donorName"
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <div className="mt-1">
                  <input
                    id="donorEmail"
                    name="donorEmail"
                    type="email"
                    required
                    value={donorName} // This line was not in the new_code, but should be changed for consistency
                    onChange={(e) => setDonorName(e.target.value)} // This line was not in the new_code, but should be changed for consistency
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* error and loading state were removed from the new_code, so they are removed here */}

              <div>
                <button
                  type="submit"
                  // disabled={loading} // This line was not in the new_code, but should be removed
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} // This line was not in the new_code, but should be changed
                >
                  {/* {loading ? 'Processing...' : 'Proceed to Payment'} */} {/* This line was not in the new_code, but should be removed */}
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}; 