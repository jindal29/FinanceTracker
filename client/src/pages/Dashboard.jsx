import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Wallet, TrendingUp, TrendingDown, Clock, Lightbulb } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/format';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, total: 0 });
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [transactionsRes, totalsRes, insightsRes] = await Promise.all([
          api.get('/transactions'),
          api.get('/transactions/totals'),
          api.get('/transactions/insights')
        ]);
        setTransactions(transactionsRes.data.data);
        setTotals(totalsRes.data.data);
        setInsights(insightsRes.data.data);
      } catch (err) {
         setError('Could not pull dashboard metrics');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  const { income, expense, total } = (totals || {});
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back! Here's a summary of your finances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
             <p className="text-sm font-medium text-gray-500 mb-1">Total Balance</p>
             <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(total)}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <Wallet size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
             <p className="text-sm font-medium text-gray-500 mb-1">Total Income</p>
             <h3 className="text-3xl font-bold text-green-600">{formatCurrency(income)}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
             <p className="text-sm font-medium text-gray-500 mb-1">Total Expense</p>
             <h3 className="text-3xl font-bold text-red-600">{formatCurrency(expense)}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
            <TrendingDown size={24} />
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      {insights && insights.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-sm border border-indigo-100 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 opacity-10 blur-[1px]">
            <Lightbulb size={120} className="text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Lightbulb size={20} className="text-indigo-600" /> 
            AI Financial Advisor
          </h3>
          <div className="space-y-3 relative z-10">
            {insights.map(insight => (
              <div key={insight.id} className="flex items-start gap-3 bg-white/60 p-4 rounded-xl border border-white hover:bg-white/90 transition-colors">
                 <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${insight.type === 'warning' ? 'bg-red-500' : insight.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                 <p className="text-indigo-950 text-sm font-medium leading-relaxed">{insight.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Clock size={18} className="text-gray-400" /> Recent Transactions
          </h3>
          <Link to="/transactions" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
        </div>
        
        {recentTransactions.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {recentTransactions.map(transaction => (
              <li key={transaction._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     {transaction.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 capitalize">{transaction.category}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
           <div className="p-8 text-center text-gray-500">
             <p>No recent transactions.</p>
             <Link to="/transactions" className="mt-4 inline-block text-primary-600 font-medium">Add one now</Link>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
