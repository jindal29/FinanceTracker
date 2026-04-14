import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { formatCurrency, formatDate } from '../utils/format';
import { Plus, Trash2, Filter } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/transactions`);
      setTransactions(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/transactions`, {
        amount: Number(amount),
        category,
        type,
        description,
        date
      });
      setTransactions([res.data.data, ...transactions]);
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/transactions/${id}`);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTransactions = transactions.filter(t => 
    filterType === 'all' ? true : t.type === filterType
  );

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Add Transaction Form */}
      <div className="md:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus size={20} /> Add New</h3>
          
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${type === 'expense' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500'}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${type === 'income' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}
              >
                Income
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input type="number" required placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full text-lg p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" min="0" step="0.01" />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
               <input type="text" required placeholder="e.g. Groceries, Salary" value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
               <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>

            <button type="submit" className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm transition-colors ${type === 'income' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
              Add {type === 'income' ? 'Income' : 'Expense'}
            </button>
          </form>
        </div>
      </div>

      {/* Transactions List */}
      <div className="md:col-span-2 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Transaction History</h2>
            <p className="text-gray-500 text-sm mt-1">Review all your financial activities.</p>
          </div>
          
          <div className="flex bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
            {['all', 'income', 'expense'].map(f => (
               <button key={f} onClick={() => setFilterType(f)} className={`capitalize px-3 py-1.5 text-sm font-medium rounded-md ${filterType === f ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}>
                 {f}
               </button>
            ))}
          </div>
        </div>

        {loading ? (
           <div className="text-center py-10">Loading...</div>
        ) : filteredTransactions.length > 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredTransactions.map(t => (
                <li key={t._id} className="p-5 flex items-center justify-between hover:bg-gray-50 group transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => deleteTransaction(t._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 capitalize text-lg">{t.category}</p>
                      <p className="text-sm text-gray-400">{formatDate(t.date)} {t.description && `• ${t.description}`}</p>
                    </div>
                  </div>
                  <div className={`font-bold text-lg whitespace-nowrap ${t.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
           <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500">
             <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
             <p className="text-lg font-medium">No transactions found</p>
             <p className="text-sm">Try adjusting your filters or adding a new transaction.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
