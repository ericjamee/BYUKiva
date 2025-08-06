import React, { useState } from 'react';
import type { Student } from '../types';
import { createDonation } from '../services/api';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, student }) => {
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDonation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const donationAmount = customAmount ? parseFloat(customAmount) : amount;
      
      await createDonation({
        amount: donationAmount,
        studentId: student.id,
        donorName: 'Anonymous', // For MVP
        message: '', // For MVP
        status: 'Completed' // For MVP, all donations are completed immediately
      });

      onClose();
      window.location.reload(); // Refresh to show updated funding
    } catch (err) {
      setError('Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Support {student.name}</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Amount</label>
            <div className="mt-2 grid grid-cols-3 gap-3">
              {[25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    amount === preset && !customAmount
                      ? 'bg-[#002E5D] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Custom Amount</label>
            <input
              type="number"
              min="1"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(0);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#002E5D] focus:ring-[#002E5D] sm:text-sm"
              placeholder="Enter amount"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleDonation}
              disabled={loading}
              className={`px-4 py-2 bg-[#002E5D] text-white rounded-md hover:bg-[#00254A] disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? 'Processing...' : 'Complete Donation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 