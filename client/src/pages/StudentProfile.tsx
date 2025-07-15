import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Student, ProgressReport, LoanRepayment } from '../types';
import { DonationType } from '../types';
import { fetchStudent, createDonation, fetchStudentProgressReports, fetchStudentLoanRepayments } from '../services/api';
import { Modal } from '../components/Modal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function StudentProfile() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);
  const [loanRepayments, setLoanRepayments] = useState<LoanRepayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'story' | 'progress' | 'repayments'>('story');
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationType, setDonationType] = useState<DonationType>(DonationType.OneTime);

  useEffect(() => {
    async function loadData() {
      try {
        if (!id) return;
        const [studentData, progressData, repaymentsData] = await Promise.all([
          fetchStudent(id),
          fetchStudentProgressReports(id),
          fetchStudentLoanRepayments(id)
        ]);
        setStudent(studentData);
        setProgressReports(progressData);
        setLoanRepayments(repaymentsData);
      } catch (err) {
        setError('Failed to load student details');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleDonation = async () => {
    try {
      if (!student) return;
      
      const amount = customAmount ? parseFloat(customAmount) : donationAmount;
      
      await createDonation({
        studentId: student.id,
        amount,
        type: donationType,
        message: '',
        isAnonymous: false,
        donorId: 'temp-donor-id' // TODO: Get from auth context
      });

      const updatedStudent = await fetchStudent(id!);
      setStudent(updatedStudent);
      setDonationModalOpen(false);
    } catch (err) {
      console.error('Failed to process donation:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002E5D]"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Student not found'}</p>
      </div>
    );
  }

  const percentageFunded = (student.amountRaised / student.loanAmount) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={`${API_BASE_URL}${student.profilePictureUrl}`}
              alt={student.name}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <p className="mt-2 text-gray-600">{student.country}</p>
                <p className="text-gray-600">{student.pathwayProgram}</p>
                <p className="text-gray-600">Desired Degree: {student.desiredDegree}</p>
              </div>
              <button
                onClick={() => setDonationModalOpen(true)}
                className="px-4 py-2 bg-[#002E5D] text-white rounded-md hover:bg-[#00254A]"
              >
                Support This Student
              </button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Loan Progress</span>
                <span className="font-medium">${student.amountRaised.toLocaleString()} of ${student.loanAmount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#002E5D] h-2 rounded-full"
                  style={{ width: `${Math.min(percentageFunded, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('story')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'story'
                  ? 'text-[#002E5D] border-b-2 border-[#002E5D]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'progress'
                  ? 'text-[#002E5D] border-b-2 border-[#002E5D]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Progress Reports
            </button>
            <button
              onClick={() => setActiveTab('repayments')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'repayments'
                  ? 'text-[#002E5D] border-b-2 border-[#002E5D]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Loan Repayments
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'story' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">My Story</h2>
                  <p className="text-gray-600">{student.story}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Academic Progress</h2>
                  <p className="text-gray-600">{student.academicProgress}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Future Goals</h2>
                  <p className="text-gray-600">{student.futureGoals}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Why I Need This Loan</h2>
                  <p className="text-gray-600">{student.whyNeedLoan}</p>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                {progressReports.length === 0 ? (
                  <p className="text-gray-600">No progress reports available yet.</p>
                ) : (
                  progressReports.map((report) => (
                    <div key={report.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Progress Report - {new Date(report.date).toLocaleDateString()}
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Academic Performance</h4>
                          <p className="mt-1 text-gray-600">{report.academicPerformance}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Challenges</h4>
                          <p className="mt-1 text-gray-600">{report.challenges}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Goals</h4>
                          <p className="mt-1 text-gray-600">{report.goals}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Next Steps</h4>
                          <p className="mt-1 text-gray-600">{report.nextSteps}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'repayments' && (
              <div>
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {loanRepayments.map((repayment) => (
                              <tr key={repayment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {new Date(repayment.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  ${repayment.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      repayment.status === 'Paid'
                                        ? 'bg-green-100 text-green-800'
                                        : repayment.status === 'Late'
                                        ? 'bg-red-100 text-red-800'
                                        : repayment.status === 'Missed'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                  >
                                    {repayment.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        title="Support This Student"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[50, 100, 250, 500, 1000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setDonationAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    donationAmount === amount && !customAmount
                      ? 'bg-[#002E5D] text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  ${amount}
                </button>
              ))}
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setDonationAmount(0);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#002E5D]"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleDonation}
            className="w-full px-4 py-2 bg-[#002E5D] text-white rounded-md hover:bg-[#00254A]"
          >
            Complete Donation
          </button>
        </div>
      </Modal>
    </div>
  );
} 