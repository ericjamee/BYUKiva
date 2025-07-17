import React from 'react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: "1. Student Application",
      description: "BYU-Pathway students apply to join our program, committing to add 50,000 names to the Family Tree.",
      icon: "📝"
    },
    {
      title: "2. Verification Process",
      description: "We verify BYU-Pathway enrollment and ensure students are ready to contribute to family history work.",
      icon: "✓"
    },
    {
      title: "3. Fundraising Period",
      description: "Approved students are featured on our platform where supporters can fund their year of employment.",
      icon: "💰"
    },
    {
      title: "4. Employment Begins",
      description: "Once funded, students begin their year-long employment adding names to the Family Tree.",
      icon: "🎓"
    },
    {
      title: "5. Growing the Tree",
      description: "Students work on family history while pursuing their degree, adding 50,000 names to FamilySearch.",
      icon: "📈"
    },
    {
      title: "6. Lasting Impact",
      description: "Your support helps students graduate while connecting thousands of families through the Family Tree.",
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
            Fund a student's employment to help grow the Family Tree while they earn their degree
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

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Impact of Your Donation
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002E5D] mb-2">1</div>
              <div className="text-gray-600">Year of Student<br/>Employment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002E5D] mb-2">50K</div>
              <div className="text-gray-600">New Names Added<br/>to Family Tree</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#002E5D] mb-2">∞</div>
              <div className="text-gray-600">Families<br/>Connected</div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#002E5D] rounded-lg shadow-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8">
              Help a student earn their degree while growing the Family Tree for future generations.
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