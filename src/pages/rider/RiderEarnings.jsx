import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Calendar, DollarSign } from 'lucide-react';

const RiderEarnings = () => {
  const { currentUser } = useContext(AppContext);

  // Mock daily earnings data for Recharts bar chart
  const weeklyData = [
    { day: 'Mon', Earnings: 450, Trips: 3 },
    { day: 'Tue', Earnings: 600, Trips: 4 },
    { day: 'Wed', Earnings: 750, Trips: 5 },
    { day: 'Thu', Earnings: 950, Trips: 6 },
    { day: 'Fri', Earnings: 800, Trips: 5 },
    { day: 'Sat', Earnings: 1250, Trips: 8 },
    { day: 'Sun', Earnings: 1000, Trips: 7 },
  ];

  const totalWeeklyEarnings = weeklyData.reduce((acc, curr) => acc + curr.Earnings, 0);

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Page Header */}
      <h2 className="font-display font-extrabold text-2xl text-dark">Earnings Console</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-2">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Payout</span>
          <h3 className="text-3xl font-black text-dark font-display">₹1,250.00</h3>
          <p className="text-xs text-gray-400 font-semibold flex items-center gap-1">
            <Calendar size={12} /> 8 Completed Jobs
          </p>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-2">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Weekly Payout</span>
          <h3 className="text-3xl font-black text-primary font-display">₹{totalWeeklyEarnings.toFixed(2)}</h3>
          <p className="text-xs text-emerald-600 font-bold bg-emerald-50 w-fit px-1.5 py-0.5 rounded">
            +18% from last week
          </p>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-2">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Monthly Projection</span>
          <h3 className="text-3xl font-black text-dark font-display">₹24,500.00</h3>
          <p className="text-xs text-gray-400 font-semibold">
            Commission Deducted: ₹4,900
          </p>
        </div>

      </div>

      {/* Bar Chart Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-extrabold text-lg text-dark">Weekly Performance Trends</h3>
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <TrendingUp size={14} className="text-emerald-500" /> Avg: ₹{Math.round(totalWeeklyEarnings / 7)} / day
          </span>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} style={{ fontSize: '12px', fontWeight: '600', fill: '#94a3b8' }} />
              <YAxis tickLine={false} axisLine={false} style={{ fontSize: '12px', fontWeight: '600', fill: '#94a3b8' }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontWeight: '600' }} />
              <Bar dataKey="Earnings" fill="#F97316" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incentives checklist */}
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 text-white rounded-3xl p-6 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Award size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Weekly Goals & Incentives</span>
          </div>

          <h3 className="font-display font-extrabold text-xl md:text-2xl text-white max-w-xl leading-tight">
            Complete 10 trips to unlock ₹200 bonus payout this week!
          </h3>

          <div className="space-y-2 max-w-md pt-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Goal Progress (8/10 completed)</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-indigo-950 rounded-full h-2.5 overflow-hidden border border-indigo-800">
              <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="pt-2 flex gap-4 text-xs text-indigo-200 font-medium">
            <p>✓ Minimum rating required: <strong>4.5</strong> (Current: 4.8)</p>
            <p>✓ Minimum online hours: <strong>15h</strong> (Current: 21h)</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RiderEarnings;
