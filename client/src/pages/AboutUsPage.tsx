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
            We are dedicated to connecting BYU-Pathway students with meaningful employment opportunities in family history work, creating a lasting impact for both students and genealogical research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To empower BYU-Pathway students through employment opportunities that not only support their educational journey but also contribute to the vital work of family history research, creating a dual impact that benefits both the students and the global genealogical community.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Educational and employment support</li>
              <li>Family history preservation</li>
              <li>Student empowerment</li>
              <li>Community impact</li>
              <li>Sustainable development</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Student Employment</h4>
                <p className="text-gray-600">
                  We provide students with one year of meaningful employment, helping them support their education while gaining valuable work experience.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Family History Impact</h4>
                <p className="text-gray-600">
                  Each employed student contributes to adding over 100,000 names to family trees, preserving genealogical history for future generations.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Educational Growth</h4>
                <p className="text-gray-600">
                  Students can focus on their studies while gaining practical work experience in family history research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 