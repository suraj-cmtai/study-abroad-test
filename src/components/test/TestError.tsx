import { AlertTriangle } from 'lucide-react';

interface TestErrorProps {
  error: string;
}

export const TestError = ({ error }: TestErrorProps) => {
  return (
    <div className="py-6 sm:py-8">
      <div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
        <div className="text-center px-4">
          <AlertTriangle className="h-8 w-8 sm:h-12 sm:w-12 text-red-500 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">Error Loading Test</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};