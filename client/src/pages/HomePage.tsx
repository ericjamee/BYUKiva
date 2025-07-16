import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Fund a Student's</span>
                  <span className="block text-blue-600">Family History Mission</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join us in empowering BYU-Pathway students to earn while preserving precious family histories. Every funded student dedicates themselves to indexing 100,000 names annually during their education journey.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/students"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Fund a Student
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/how-it-works"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div className="relative h-96 bg-fixed bg-cover bg-center w-full" style={{ backgroundImage: 'url("/byupathway student.jpg")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto h-full flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Empowering Students Through Family History</h2>
            <p className="text-xl max-w-2xl mx-auto">
              Your support helps students achieve their educational goals while preserving precious family connections.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Impact</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Making a Difference Together
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Your donation helps preserve family histories while providing meaningful employment for BYU-Pathway students.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">100K Names</h3>
                  <p className="mt-2 text-gray-500">
                    Each student indexes 100,000 names per year, preserving family histories for generations.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                  <p className="mt-2 text-gray-500">
                    Students earn while pursuing their BYU-Pathway degrees, building their future.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Global Impact</h3>
                  <p className="mt-2 text-gray-500">
                    Your donation connects families across generations and continents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 