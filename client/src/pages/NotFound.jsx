import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-red-50 text-red-500 p-6 rounded-full mb-6">
        <AlertCircle size={64} />
      </div>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors shadow-sm">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
