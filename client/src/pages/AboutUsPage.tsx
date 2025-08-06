import React from 'react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#002E5D] to-[#004085] text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              We connect BYU-Pathway students with meaningful employment that grows the Family Tree, 
              creating lasting impact for both students and future generations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                To provide BYU-Pathway students with employment that helps them earn their degree 
                while adding 50,000 names to the Family Tree each year, creating a lasting legacy 
                for families worldwide.
              </p>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#002E5D]">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#002E5D] rounded-full"></div>
                    <span className="text-gray-700 font-medium">Growing the Family Tree</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#002E5D] rounded-full"></div>
                    <span className="text-gray-700 font-medium">Student Employment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#002E5D] rounded-full"></div>
                    <span className="text-gray-700 font-medium">Educational Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#002E5D] rounded-full"></div>
                    <span className="text-gray-700 font-medium">Family History Impact</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#002E5D] rounded-full"></div>
                    <span className="text-gray-700 font-medium">Generational Connection</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🌳</div>
                <h3 className="text-2xl font-bold mb-4">Growing Together</h3>
                <p className="text-blue-100">
                  Every student we support helps grow the Family Tree while pursuing their education, 
                  creating a ripple effect that benefits generations to come.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We measure our success by the lives we touch and the families we connect
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Student Employment</h4>
              <p className="text-gray-600">
                Each funded student receives one year of employment, helping them focus on their 
                education while making a meaningful contribution to family history work.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Family Tree Growth</h4>
              <p className="text-gray-600">
                Every student adds 50,000 new names to the Family Tree during their funded year, 
                helping connect families across generations and continents.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Educational Success</h4>
              <p className="text-gray-600">
                Students can focus on their BYU-Pathway degree while earning through meaningful 
                family history work, creating a sustainable path to graduation.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-[#002E5D] to-[#004085] rounded-2xl p-12 text-white mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Numbers</h2>
            <p className="text-xl text-blue-100">
              Real impact through real numbers
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K</div>
              <div className="text-blue-100">Names Added Per Student</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1</div>
              <div className="text-blue-100">Year of Employment</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">∞</div>
              <div className="text-blue-100">Families Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Student Focus</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join us in supporting BYU-Pathway students as they grow the Family Tree while 
              pursuing their education. Every donation creates lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/students"
                className="px-8 py-4 bg-[#002E5D] hover:bg-[#001a3d] text-white font-bold rounded-lg transition-colors"
              >
                Support a Student
              </a>
              <a
                href="/how-it-works"
                className="px-8 py-4 border-2 border-[#002E5D] text-[#002E5D] hover:bg-[#002E5D] hover:text-white font-bold rounded-lg transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 