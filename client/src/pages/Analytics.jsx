import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../utils/format';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

const Analytics = () => {
  const [pieData, setPieData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [categoryRes, totalsRes] = await Promise.all([
          axios.get('/transactions/analytics/category'),
          axios.get('/transactions/totals')
        ]);
        setPieData(categoryRes.data.data);
        setTotalExpenses(totalsRes.data.data.expense);
      } catch (err) {
         console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center py-10">Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Analytics</h2>
        <p className="text-gray-500">Visualize where your money goes.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Expenses by Category</h3>
          {pieData.length > 0 ? (
            <div className="flex-1 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     cx="50%"
                     cy="45%"
                     innerRadius={80}
                     outerRadius={110}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip formatter={(value) => formatCurrency(value)} />
                   <Legend verticalAlign="bottom" height={36} />
                 </PieChart>
               </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">No expense data to display</div>
          )}
        </div>

        {/* Breakdown List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[400px] overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Highest Expenses</h3>
          {pieData.length > 0 ? (
             <div className="overflow-y-auto pr-2 space-y-4">
               {pieData.map((item, index) => {
                 const percentage = totalExpenses > 0 ? ((item.value / totalExpenses) * 100).toFixed(1) : 0;
                 return (
                   <div key={item.name} className="flex items-center">
                     <span className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: COLORS[index % COLORS.length]}}></span>
                     <div className="flex-1">
                       <div className="flex justify-between mb-1">
                         <span className="text-sm font-medium text-gray-700">{item.name}</span>
                         <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                       </div>
                       <div className="w-full bg-gray-100 rounded-full h-1.5">
                         <div className="h-1.5 rounded-full" style={{width: `${percentage}%`, backgroundColor: COLORS[index % COLORS.length]}}></div>
                       </div>
                     </div>
                   </div>
                 )
               })}
             </div>
          ) : (
             <div className="h-full flex items-center justify-center text-gray-500">No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
