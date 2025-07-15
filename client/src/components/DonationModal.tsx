import React, { useState } from 'react';
import { Modal } from './Modal';
import type { Student } from '../types/index';
import { createDonation } from '../services/api';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onDonationComplete: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  student,
  onDonationComplete
}) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!amount && !customAmount) {
      setError('Please select or enter an amount');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await createDonation({
        amount: amount || parseFloat(customAmount),
        donorName: 'Anonymous', // For MVP
        message: '',
        studentId: student.id
      });
      onDonationComplete();
      onClose();
    } catch (err) {
      setError('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Support">
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">Select Amount</h3>
          <div className="grid grid-cols-3 gap-4">
            {[25, 50, 100].map((value) => (
              <button
                key={value}
                onClick={() => {
                  setAmount(value);
                  setCustomAmount('');
                }}
                className={`py-2 px-4 text-center rounded-md transition-colors ${
                  amount === value
                    ? 'bg-[#002E5D] text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                ${value}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">Custom Amount</h3>
          <input
            type="number"
            min="1"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(null);
            }}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#002E5D] focus:border-[#002E5D]"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || (!amount && !customAmount)}
          className="w-full py-3 bg-[#002E5D] text-white rounded-md hover:bg-[#00254A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Complete Donation'}
        </button>
      </div>
    </Modal>
  );
}; 