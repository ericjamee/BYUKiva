import React from 'react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We connect BYU-Pathway students with meaningful employment that grows the Family Tree, creating lasting impact for both students and future generations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To provide BYU-Pathway students with employment that helps them earn their degree while adding 50,000 names to the Family Tree each year, creating a lasting legacy for families worldwide.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Growing the Family Tree</li>
              <li>Student Employment</li>
              <li>Educational Support</li>
              <li>Family History Impact</li>
              <li>Generational Connection</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Student Employment</h4>
                <p className="text-gray-600">
                  Each funded student receives one year of employment, helping them focus on their education while making a meaningful contribution.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Family Tree Growth</h4>
                <p className="text-gray-600">
                  Every student adds 50,000 new names to the Family Tree during their funded year, helping connect families across generations.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Educational Success</h4>
                <p className="text-gray-600">
                  Students can focus on their BYU-Pathway degree while earning through meaningful family history work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 