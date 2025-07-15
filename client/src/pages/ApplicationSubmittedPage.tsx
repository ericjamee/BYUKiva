import { Link } from 'react-router-dom';

export function ApplicationSubmittedPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for submitting your application. Our team will review it and get back to you within 2-3 business days.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h2>
        <div className="space-y-4 text-left">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-emerald-600 font-medium">1</span>
            </div>
            <p className="text-gray-600">
              Our team will review your application to ensure all information is complete and meets our criteria.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-emerald-600 font-medium">2</span>
            </div>
            <p className="text-gray-600">
              You'll receive an email notification about the status of your application within 2-3 business days.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-emerald-600 font-medium">3</span>
            </div>
            <p className="text-gray-600">
              If approved, your profile will be published on our platform and you can start receiving support from donors.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Return Home
        </Link>
        <a
          href="mailto:support@integrity.org"
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md text-white bg-emerald-500 hover:bg-emerald-600"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
} 