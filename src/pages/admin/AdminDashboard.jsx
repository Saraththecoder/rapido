import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
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
    { label: "Total Users", val: customerCount + 4, icon: Users, color: "bg-blue-50 text-blue-600 border border-blue-100" },
    { label: "Total Riders", val: riderCount, icon: Bike, color: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
    { label: "Restaurants", val: restCount, icon: Utensils, color: "bg-amber-50 text-amber-600 border border-amber-100" },
    { label: "Food Orders", val: foodCount, icon: ShoppingBag, color: "bg-orange-50 text-primary border border-orange-100" },
    { label: "Taxi Trips", val: tripCount, icon: Car, color: "bg-sky-50 text-sky-600 border border-sky-100" },
    { label: "Deliveries", val: deliveryCount, icon: Package, color: "bg-indigo-50 text-indigo-600 border border-indigo-100" },
    { label: "Gross Revenue", val: `₹${totalRevenue}`, icon: DollarSign, color: "bg-rose-50 text-rose-650 border border-rose-100" },
    { label: "Active Riders", val: activeRiderCount, icon: Bike, color: "bg-teal-50 text-teal-600 border border-teal-100" }
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

  const PIE_COLORS = ['#38bdf8', '#F97316', '#6366f1'];

  // Combined activity log
  const systemActivity = [
    { id: "A1", desc: "Customer Suresh Kumar placed food order FO104", status: "preparing", time: "2 mins ago" },
    { id: "A2", desc: "Rider Ramesh Rider accepted ride booking TX302", status: "picked", time: "10 mins ago" },
    { id: "A3", desc: "Restaurant Biryani Darbar was approved by admin", status: "completed", time: "1 hour ago" },
    { id: "A4", desc: "Customer Amit Sharma created an account", status: "completed", time: "3 hours ago" },
    { id: "A5", desc: "Parcel SG-PRCL-8921 was successfully delivered", status: "delivered", time: "Yesterday" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display font-extrabold text-2xl text-dark">Global Administration Console</h2>

      {/* 8 Card Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-150 p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">{stat.label}</p>
                <p className="text-lg font-black text-dark font-display truncate mt-0.5">{stat.val}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-display font-extrabold text-lg text-dark">Revenue Velocity (Last 7 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '600', fill: '#94a3b8' }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: '11px', fontWeight: '600', fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontWeight: '600' }} />
                <Line type="monotone" dataKey="Revenue" stroke="#F97316" strokeWidth={3} activeDot={{ r: 6 }} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <h3 className="font-display font-extrabold text-lg text-dark">Volume Service Split</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceSplit}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
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
          
          <div className="grid grid-cols-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider pt-2 border-t border-slate-100">
            {serviceSplit.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }}></span>
                <p className="truncate">{s.name}</p>
                <p className="text-dark font-black text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="text-primary animate-pulse" size={20} />
          <h3 className="font-display font-extrabold text-lg text-dark">Live System Activity Feed</h3>
        </div>

        <div className="divide-y divide-gray-50 text-xs font-medium text-gray-600">
          {systemActivity.map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>{act.desc}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <StatusBadge status={act.status} />
                <span className="text-[10px] text-gray-400">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
