import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download, DollarSign, Wallet, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

const RevenueReports = () => {
  const { orders, bookings, parcels } = useContext(AppContext);

  // Dynamic calculations
  const totalVolume = 
    orders.reduce((sum, o) => sum + (o.total || 0), 0) +
    bookings.reduce((sum, b) => sum + (b.fare || 0), 0) +
    parcels.reduce((sum, p) => sum + (p.price || 0), 0);

  const platformCommission = totalVolume * 0.20; // 20%
  const riderPayouts = totalVolume * 0.80; // 80%

  // Monthly revenue mock data for Recharts bar chart
  const monthlyData = [
    { month: 'Jan', Volume: 25000, Commission: 5000 },
    { month: 'Feb', Volume: 32000, Commission: 6400 },
    { month: 'Mar', Volume: 45000, Commission: 9000 },
    { month: 'Apr', Volume: 40000, Commission: 8000 },
    { month: 'May', Volume: 55000, Commission: 11000 },
    { month: 'Jun', Volume: totalVolume + 52000, Commission: platformCommission + 10400 }
  ];

  const handleDownloadCSV = () => {
    toast.success("Downloading SwiftGo_Revenue_Report_Jun2026.csv...");
  };

  return (
    <div className="space-y-6 text-zinc-900">
      
      {/* Title Header & Actions */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">Financial Statements</h2>
          <p className="text-xs text-zinc-500">Monitor platform commissions, transaction flows, and bank disbursements.</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto shrink-0">
          {/* Mock Date picker display */}
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700">
            <Calendar size={14} className="text-zinc-400" />
            <span>June 1, 2026 - June 30, 2026</span>
          </div>

          <button
            onClick={handleDownloadCSV}
            className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition shrink-0 uppercase tracking-wider flex items-center gap-1.5"
          >
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gross Volume */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Gross Booking Volume</p>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900">₹{totalVolume.toFixed(2)}</h3>
            </div>
            <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 shrink-0">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">Total transaction volume across Taxi, Food, and Courier.</p>
        </div>

        {/* Platform commission */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Platform Commission (20%)</p>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900">₹{platformCommission.toFixed(2)}</h3>
            </div>
            <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 shrink-0">
              <Percent size={16} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">Gross revenue earned by SwiftGo company before incentives.</p>
        </div>

        {/* Rider Payouts */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Executive Payouts (80%)</p>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900">₹{riderPayouts.toFixed(2)}</h3>
            </div>
            <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 shrink-0">
              <Wallet size={16} />
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 font-medium">Net amount distributed back to the online rider wallets.</p>
        </div>

      </div>

      {/* Monthly Bar Chart */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Platform Growth Trend (H1 2026)</h3>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f4f4f5" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: '11px', fontStyle: 'normal', fill: '#71717a' }} />
              <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fontStyle: 'normal', fill: '#71717a' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontWeight: '500', fontSize: '12px' }} />
              <Bar dataKey="Volume" fill="#71717a" radius={[4, 4, 0, 0]} barSize={24} name="Gross Volume" />
              <Bar dataKey="Commission" fill="#18181b" radius={[4, 4, 0, 0]} barSize={24} name="Platform Commission" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default RevenueReports;
