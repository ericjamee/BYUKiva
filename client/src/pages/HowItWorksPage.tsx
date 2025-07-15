import React from 'react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: "1. Student Application",
      description: "BYU-Pathway students submit an application detailing their program, desired degree, and financial needs.",
      icon: "📝"
    },
    {
      title: "2. Verification Process",
      description: "We verify enrollment in BYU-Pathway, review academic progress, and assess eligibility.",
      icon: "✓"
    },
    {
      title: "3. Fundraising Period",
      description: "Approved students are featured on our platform where supporters can contribute to their employment.",
      icon: "💰"
    },
    {
      title: "4. Donation Distribution",
      description: "Once fully funded, the donation is distributed directly to cover employment expenses.",
      icon: "🎓"
    },
    {
      title: "5. Student Success",
      description: "Students focus on their studies while enjoying a year of employment paid for by their supporters(Like you!).",
      icon: "📈"
    },
    {
      title: "6. Results",
      description: "Students graduate and begin their careers, paying it forward to future students.",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Our platform connects BYU-Pathway students with supporters who provide affordable educational loans
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#002E5D] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Impact of Your Donation
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002E5D] mb-2">1</div>
              <div className="text-gray-600">Student Employed<br/>for a Year</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002E5D] mb-2">100K+</div>
              <div className="text-gray-600">Names Added to<br/>Family Tree</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002E5D] mb-2">100%</div>
              <div className="text-gray-600">Impact on<br/>Family History</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#002E5D] rounded-lg shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8">
              Whether you're a student seeking support or a supporter wanting to help, join our community today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/students"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-[#00254A]"
              >
                Support a Student
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 