import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Download, DollarSign, Wallet, Percent, FileText } from 'lucide-react';
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
    <div className="space-y-6">
      
      {/* Title Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div>
          <h2 className="font-display font-extrabold text-xl text-dark">Financial Statements</h2>
          <p className="text-xs text-gray-400 font-semibold mt-1 uppercase">Monitor platform commissions, transaction flows, and bank disbursements.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          {/* Mock Date picker display */}
          <div className="flex items-center gap-2 bg-slate-50 border px-4 py-2.5 rounded-2xl text-xs font-bold text-gray-650">
            <Calendar size={14} className="text-gray-400" />
            <span>June 1, 2026 - June 30, 2026</span>
          </div>

          <button
            onClick={handleDownloadCSV}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5 transition shrink-0"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gross Volume */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Gross Booking Volume</p>
              <h3 className="text-3xl font-black text-dark font-display mt-1">₹{totalVolume.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-orange-50 text-primary rounded-xl">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium">Total transaction volume across Taxi, Food, and Courier.</p>
        </div>

        {/* Platform commission */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Platform Commission (20%)</p>
              <h3 className="text-3xl font-black text-primary font-display mt-1">₹{platformCommission.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Percent size={20} />
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium">Gross revenue earned by SwiftGo company before incentives.</p>
        </div>

        {/* Rider Payouts */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Disbursed Executive Payouts (80%)</p>
              <h3 className="text-3xl font-black text-emerald-600 font-display mt-1">₹{riderPayouts.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Wallet size={20} />
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-medium">Net amount distributed back to the online rider wallets.</p>
        </div>

      </div>

      {/* Monthly Bar Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-display font-extrabold text-lg text-dark">Platform Growth Trend (H1 2026)</h3>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '600', fill: '#94a3b8' }} />
              <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '600', fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontWeight: '600' }} />
              <Bar dataKey="Volume" fill="#ff9800" radius={[6, 6, 0, 0]} barSize={28} name="Gross Volume" />
              <Bar dataKey="Commission" fill="#111827" radius={[6, 6, 0, 0]} barSize={28} name="Platform Commission" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default RevenueReports;
