import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, LogOut, Calendar, Activity, DollarSign } from 'lucide-react';
import api from '../utils/api';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({ count: 0, total: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/transactions/totals');
        if(res.data?.data) {
           setStats({ count: res.data.data.count || 0, total: res.data.data.total || 0 });
        }
      } catch (err) {}
    }
    fetchStats();
  }, []);
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', { name, email });
      setMessage('Profile updated successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-bl-full -z-10 opacity-50 blur-3xl"></div>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-primary-500 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 text-lg flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Active member
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
           <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center">
              <Calendar className="text-primary-500 mb-2" size={20} />
              <p className="text-xs text-gray-500 font-medium">Joined</p>
              <p className="font-bold text-gray-900">{new Date(user?.createdAt).toLocaleDateString()}</p>
           </div>
           <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center">
              <Activity className="text-indigo-500 mb-2" size={20} />
              <p className="text-xs text-gray-500 font-medium">Transactions</p>
              <p className="font-bold text-gray-900">{stats.count}</p>
           </div>
           <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center md:col-span-1 col-span-2">
              <DollarSign className="text-green-500 mb-2" size={20} />
              <p className="text-xs text-gray-500 font-medium text-center">Net Savings</p>
              <p className="font-bold text-green-600">₹{stats.total.toLocaleString()}</p>
           </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 py-3 border focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="pl-10 block w-full border-gray-200 bg-gray-100 cursor-not-allowed rounded-xl py-3 border outline-none text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Email address cannot be changed.</p>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
             <button type="button" onClick={logout} className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors">
               <LogOut size={18} /> Logout
             </button>
             <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 shadow-sm">
               Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
