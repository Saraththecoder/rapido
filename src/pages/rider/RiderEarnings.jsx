import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Calendar } from 'lucide-react';

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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-8 space-y-8 text-zinc-900">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Earnings Console</h2>
        <p className="text-xs text-zinc-500">Track your daily income, active streaks, and payout projections.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-3">
          <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Today's Payout</span>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">₹1,250.00</h3>
          <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5 pt-1">
            <Calendar size={13} className="text-zinc-400" /> 8 Completed Jobs
          </p>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-3">
          <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Weekly Payout</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">₹{totalWeeklyEarnings.toFixed(2)}</h3>
            <span className="text-[10px] text-zinc-600 font-semibold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
              +18% vs last week
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium pt-1">Settles on Monday, 04:00 AM</p>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-3">
          <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Monthly Projection</span>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">₹24,500.00</h3>
          <p className="text-xs text-zinc-500 font-medium pt-1">
            Platform Fees (20%): ₹4,900.00
          </p>
        </div>

      </div>

      {/* Bar Chart Section */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Weekly Performance Trends</h3>
          <span className="text-xs font-semibold text-zinc-600 flex items-center gap-1">
            <TrendingUp size={14} className="text-zinc-900" /> Avg: ₹{Math.round(totalWeeklyEarnings / 7)} / day
          </span>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f4f4f5" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '500', fill: '#71717a' }} />
              <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '500', fill: '#71717a' }} />
              <Tooltip cursor={{ fill: '#fafafa' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontWeight: '500', fontSize: '12px' }} />
              <Bar dataKey="Earnings" fill="#18181b" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incentives checklist */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-zinc-900">
          <Award size={18} className="text-zinc-600" />
          <span className="text-xs font-bold uppercase tracking-wider">Goals & Incentives</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-900 leading-tight">
            Complete 10 trips to unlock ₹200.00 bonus payout this week
          </h3>

          <div className="space-y-2 max-w-md">
            <div className="flex justify-between text-xs font-semibold text-zinc-600">
              <span>Goal Progress (8/10 completed)</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-zinc-200">
              <div className="bg-zinc-900 h-full rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500 border-t border-zinc-100 pt-4">
            <p className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
              Min rating: <strong className="text-zinc-950 font-bold">4.5</strong> (Current: 4.8)
            </p>
            <p className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
              Min online hours: <strong className="text-zinc-950 font-bold">15h</strong> (Current: 21h)
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RiderEarnings;
