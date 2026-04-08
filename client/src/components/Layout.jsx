import Navbar from './Navbar';
import Chatbot from './Chatbot';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-gray-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Smart Personal Finance Tracker. All rights reserved.
          </p>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
};

export default Layout;
