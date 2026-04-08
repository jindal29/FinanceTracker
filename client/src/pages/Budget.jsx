import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Target, AlertTriangle, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const BudgetPlanner = () => {
  const { user } = useContext(AuthContext);
  const [budget, setBudget] = useState(user?.monthlyBudget || 0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('/transactions/totals');
        setExpense(res.data.data.expense);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const handleUpdateBudget = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/auth/profile', { monthlyBudget: Number(budget) });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const percentage = budget > 0 ? (expense / budget) * 100 : 0;
  const isExceeded = percentage > 100;
  const remaining = budget - expense;

  if (loading) return <div className="py-10 text-center">Loading budget metrics...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Budget Planner</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Set limits and track your monthly spending efficiency.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Target size={20} className="text-primary-500" /> Goal Setting</h3>
           <form onSubmit={handleUpdateBudget} className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Budget Limit</label>
                 <input 
                   type="number" 
                   value={budget} 
                   onChange={(e) => setBudget(e.target.value)}
                   className="w-full text-lg p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-colors dark:text-white"
                   min="0"
                 />
              </div>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
              >
                {saving ? 'Updating...' : 'Set Budget'}
              </button>
           </form>
           
           <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Spent</span>
                 <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(expense)}</span>
              </div>
           </div>
        </div>

        <div className={`rounded-3xl p-6 shadow-sm border ${isExceeded ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'} flex flex-col justify-center relative overflow-hidden transition-colors`}>
           <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Remaining Allowance</h3>
           <h1 className={`text-5xl font-extrabold tracking-tight ${isExceeded ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              {formatCurrency(remaining)}
           </h1>
           
           <div className="mt-8">
              <div className="flex justify-between text-sm font-medium mb-2">
                 <span className="text-gray-500 dark:text-gray-400">0%</span>
                 <span className="text-gray-500 dark:text-gray-400">{percentage.toFixed(0)}% Used</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                 <div 
                   className={`h-3 rounded-full transition-all duration-500 ${isExceeded ? 'bg-red-500 w-full' : 'bg-primary-500'}`} 
                   style={{ width: isExceeded ? '100%' : `${percentage}%` }}
                 ></div>
              </div>
           </div>

           {isExceeded && (
              <div className="absolute top-6 right-6 text-red-500 animate-pulse">
                 <AlertTriangle size={32} />
              </div>
           )}
           {isExceeded && (
              <p className="mt-6 text-red-600 dark:text-red-400 font-medium text-sm flex gap-2">
                 <TrendingDown size={18} /> You have exceeded your monthly budget configuration.
              </p>
           )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
