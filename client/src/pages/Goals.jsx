import { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, Plus, Trash2, Trophy } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { BASE_URL } from '../config';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/goals`);
      setGoals(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/goals`, {
        name,
        targetAmount: Number(targetAmount),
        currentAmount: Number(currentAmount) || 0
      });
      setGoals([res.data.data, ...goals]);
      setName('');
      setTargetAmount('');
      setCurrentAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/goals/${id}`);
      setGoals(goals.filter(g => g._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateGoalProgress = async (id, current, add) => {
     try {
       const res = await axios.put(`${BASE_URL}/goals/${id}`, { currentAmount: current + add });
       setGoals(goals.map(g => g._id === id ? res.data.data : g));
     } catch(err) {
       console.error(err);
     }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {/* Create Goal Form */}
      <div className="md:col-span-1">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white"><Target size={20} className="text-primary-500"/> New Goal</h3>
          
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Name</label>
              <input type="text" required placeholder="e.g. Vacation, New Car" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none dark:text-white" />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Amount</label>
               <input type="number" required placeholder="0.00" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full text-lg p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none dark:text-white" min="1" step="0.01" />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Amount (Optional)</label>
               <input type="number" placeholder="0.00" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none dark:text-white" min="0" step="0.01" />
            </div>

            <button type="submit" className="w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm transition-colors bg-primary-600 hover:bg-primary-700">
              Create Goal
            </button>
          </form>
        </div>
      </div>

      {/* Goals Display */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Savings Goals</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track your progress toward specific financial milestones.</p>
        </div>

        {loading ? (
           <div className="text-center py-10">Loading goals...</div>
        ) : goals.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {goals.map(goal => {
               const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
               const isComplete = percentage >= 100;

               return (
                <div key={goal._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm relative group overflow-hidden transition-all hover:shadow-md">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        {isComplete && <Trophy size={20} className="text-yellow-500 flex-shrink-0" />}
                        <h4 className={`text-lg font-bold truncate ${isComplete ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                           {goal.name}
                        </h4>
                      </div>
                      <button onClick={() => deleteGoal(goal._id)} className="text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                         <Trash2 size={16} />
                      </button>
                   </div>
                   
                   <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
                      {formatCurrency(goal.currentAmount)}
                   </p>
                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
                      of {formatCurrency(goal.targetAmount)} target
                   </p>

                   <div className="space-y-2 mb-6">
                     <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span className={isComplete ? "text-green-500" : ""}>{percentage.toFixed(1)}%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-primary-500'}`} style={{width: `${percentage}%`}}></div>
                     </div>
                   </div>

                   {!isComplete && (
                     <div className="flex justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                        <button onClick={() => updateGoalProgress(goal._id, goal.currentAmount, 50)} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                          + ₹50
                        </button>
                        <button onClick={() => updateGoalProgress(goal._id, goal.currentAmount, 100)} className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                          + ₹100
                        </button>
                     </div>
                   )}
                </div>
               )
            })}
          </div>
        ) : (
           <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-12 text-center text-gray-500 dark:text-gray-400">
             <Target className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
             <p className="text-lg font-medium">No savings goals yet</p>
             <p className="text-sm">Create a goal to start tracking milestones!</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
