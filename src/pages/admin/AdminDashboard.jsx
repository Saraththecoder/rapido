import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Bike, Utensils, ShoppingBag, Car, Package, DollarSign, Activity } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const AdminDashboard = () => {
  const { users, riders, restaurants, orders, bookings, parcels } = useContext(AppContext);

  // Calculate stats dynamically
  const customerCount = users.filter(u => u.role === 'user').length;
  const riderCount = riders.length;
  const restCount = restaurants.length;
  const foodCount = orders.length;
  const tripCount = bookings.length;
  const deliveryCount = parcels.length;
  const activeRiderCount = riders.filter(r => r.isOnline).length;

  // Mock revenue calculation
  const totalRevenue = 
    orders.reduce((sum, o) => sum + (o.total || 0), 0) +
    bookings.reduce((sum, b) => sum + (b.fare || 0), 0) +
    parcels.reduce((sum, p) => sum + (p.price || 0), 0);

  const stats = [
    { label: "Total Users", val: customerCount + 4, icon: Users },
    { label: "Total Riders", val: riderCount, icon: Bike },
    { label: "Restaurants", val: restCount, icon: Utensils },
    { label: "Food Orders", val: foodCount, icon: ShoppingBag },
    { label: "Taxi Trips", val: tripCount, icon: Car },
    { label: "Deliveries", val: deliveryCount, icon: Package },
    { label: "Gross Revenue", val: `₹${totalRevenue}`, icon: DollarSign },
    { label: "Active Riders", val: activeRiderCount, icon: Bike }
  ];

  // Recharts Line Chart Data: Revenue last 7 days
  const revenueTrend = [
    { date: '06-19', Revenue: 4200 },
    { date: '06-20', Revenue: 5100 },
    { date: '06-21', Revenue: 4800 },
    { date: '06-22', Revenue: 5900 },
    { date: '06-23', Revenue: 6200 },
    { date: '06-24', Revenue: 7800 },
    { date: '06-25', Revenue: totalRevenue },
  ];

  // Recharts Pie Chart Data: Service Split
  const serviceSplit = [
    { name: 'Taxi Rides', value: tripCount },
    { name: 'Food Orders', value: foodCount },
    { name: 'Parcels', value: deliveryCount },
  ];

  // Monochrome scale colors
  const PIE_COLORS = ['#18181b', '#71717a', '#d4d4d8'];

  // Combined activity log
  const systemActivity = [
    { id: "A1", desc: "Customer Suresh Kumar placed food order FO104", status: "preparing", time: "2 mins ago" },
    { id: "A2", desc: "Rider Ramesh Rider accepted ride booking TX302", status: "picked", time: "10 mins ago" },
    { id: "A3", desc: "Restaurant Biryani Darbar was approved by admin", status: "completed", time: "1 hour ago" },
    { id: "A4", desc: "Customer Amit Sharma created an account", status: "completed", time: "3 hours ago" },
    { id: "A5", desc: "Parcel SG-PRCL-8921 was successfully delivered", status: "delivered", time: "Yesterday" }
  ];

  return (
    <div className="space-y-8 text-zinc-900">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Global Administration Console</h2>
        <p className="text-xs text-zinc-500">Overview of operational metrics, revenue splits, and platform activity logs.</p>
      </div>

      {/* 8 Card Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-zinc-200 p-4 flex items-center gap-3">
              <div className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-650 shrink-0">
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider truncate">{stat.label}</p>
                <p className="text-base font-bold text-zinc-900 tracking-tight truncate mt-0.5">{stat.val}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 p-6 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Revenue Velocity (Last 7 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" stroke="#f4f4f5" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '500', fill: '#71717a' }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '500', fill: '#71717a' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontWeight: '500', fontSize: '12px' }} />
                <Line type="monotone" dataKey="Revenue" stroke="#18181b" strokeWidth={2.5} activeDot={{ r: 5 }} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Volume Service Split</h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceSplit}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {serviceSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} jobs`, 'Volume']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider pt-4 border-t border-zinc-150">
            {serviceSplit.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }}></span>
                </div>
                <p className="truncate text-zinc-400 font-semibold">{s.name}</p>
                <p className="text-zinc-900 font-bold text-xs">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="text-zinc-500" size={16} />
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Live System Activity Feed</h3>
        </div>

        <div className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
          {systemActivity.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900"></span>
                <span className="font-semibold text-zinc-800">{act.desc}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={act.status} />
                <span className="text-[10px] text-zinc-400 font-medium">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
