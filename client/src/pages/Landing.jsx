import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Shield, Zap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-gray-900">Manage your money</span>
          <span className="block text-primary-600 mt-2">smarter, not harder.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 sm:text-xl">
          Track expenses, build positive habits, and achieve financial freedom with SmartFinance. Your comprehensive, AI-ready personal finance dashboard.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link
            to="/signup"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-200"
          >
            Start for free
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-white rounded-3xl shadow-sm border border-gray-100 my-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Powerful features packaged in a beautiful, easy-to-use interface.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors border border-transparent hover:border-green-100">
              <div className="bg-white w-14 h-14 mx-auto rounded-xl flex items-center justify-center shadow-sm mb-6 text-primary-600">
                <BarChart2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insightful Analytics</h3>
              <p className="text-gray-500">Visualize your cash flow. Understand exactly where your money is going every single month.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
              <div className="bg-white w-14 h-14 mx-auto rounded-xl flex items-center justify-center shadow-sm mb-6 text-blue-500">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Responsive</h3>
              <p className="text-gray-500">Log transactions in seconds across all devices. We've optimized every flow for speed.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100">
              <div className="bg-white w-14 h-14 mx-auto rounded-xl flex items-center justify-center shadow-sm mb-6 text-purple-500">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-grade Security</h3>
              <p className="text-gray-500">Your data is encrypted securely. We never share your financial information with third parties.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
