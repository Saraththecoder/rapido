import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Car, Utensils, Package, Wallet, Plus, ArrowRight, History, ShoppingBag, Truck } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const UserDashboard = () => {
  const { currentUser, bookings, orders, parcels } = useContext(AppContext);
  const navigate = useNavigate();

  // Combine and sort recent activities across all three services
  const recentActivities = [
    ...bookings.map(b => ({ ...b, type: 'ride', displayTitle: `Ride to ${b.drop}`, price: b.fare, icon: Car, iconBg: 'bg-orange-50 text-primary' })),
    ...orders.map(o => ({ ...o, type: 'food', displayTitle: `Order from ${o.restaurantName}`, price: o.total, icon: Utensils, iconBg: 'bg-amber-50 text-amber-600' })),
    ...parcels.map(p => ({ ...p, type: 'parcel', displayTitle: `Parcel to ${p.receiverName}`, price: p.price, icon: Package, iconBg: 'bg-blue-50 text-blue-600' }))
  ]
  .sort((a, b) => b.id.localeCompare(a.id)) // Sort by ID prefixing/numbers for mockup order
  .slice(0, 3); // Take top 3

  const services = [
    {
      title: "Taxi Ride",
      desc: "Instant pickup & bikes",
      icon: Car,
      color: "bg-orange-500 hover:bg-orange-600",
      link: "/user/taxi",
      stats: "Bikes from ₹25"
    },
    {
      title: "Food Delivery",
      desc: "Top restaurants near you",
      icon: Utensils,
      color: "bg-amber-500 hover:bg-amber-600",
      link: "/user/food",
      stats: "Discounts up to 50%"
    },
    {
      title: "Send Parcel",
      desc: "Same-city courier courier",
      icon: Package,
      color: "bg-blue-500 hover:bg-blue-600",
      link: "/user/parcel",
      stats: "Starts at ₹50"
    }
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24 md:pb-8">
      {/* Welcome Banner */}
      <div className="bg-dark text-white rounded-3xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-2">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-wider">SwiftGo Service Console</p>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">
            Hello, {currentUser?.name || "Customer"}!
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            Where would you like to go or what would you like to order today?
          </p>
        </div>
      </div>

      {/* Grid: Wallet and Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Wallet Balance</span>
              <h3 className="text-3xl font-black text-dark font-display">
                ₹{currentUser?.walletBalance?.toFixed(2) || '0.00'}
              </h3>
            </div>
            <div className="p-3 bg-orange-50 text-primary rounded-2xl">
              <Wallet size={24} />
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link
              to="/user/wallet"
              className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition duration-200"
            >
              <Plus size={16} /> Add Money
            </Link>
            <Link
              to="/user/history"
              className="bg-slate-50 hover:bg-slate-100 text-gray-700 border border-slate-100 font-bold text-xs p-3 rounded-xl transition duration-200"
              title="Transaction History"
            >
              <History size={16} />
            </Link>
          </div>
        </div>

        {/* Dynamic promotional details or info */}
        <div className="md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-100/60 flex flex-col justify-between">
          <div>
            <span className="bg-orange-500/10 text-primary border border-orange-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              TODAY'S OFFER
            </span>
            <h3 className="font-display font-extrabold text-xl text-dark mt-2 leading-tight">
              Get 50% discount on food orders or flat ₹30 off on Auto rides!
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-medium">
              Use code <strong className="text-primary font-bold">SWIFT50</strong> on checkouts. Max discount up to ₹100. Applicable on select restaurants and auto rides.
            </p>
          </div>
          <button 
            onClick={() => navigate('/user/food')}
            className="w-fit text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 mt-4 transition group"
          >
            <span>Order Now</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>

      {/* Service Selection Tiles */}
      <div className="space-y-3">
        <h3 className="font-display font-extrabold text-xl text-dark">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link 
                key={idx}
                to={service.link}
                className="bg-white rounded-3xl shadow-sm border border-gray-100/60 p-5 flex items-center gap-4 hover:shadow-md transition duration-200"
              >
                <div className={`h-12 w-12 rounded-2xl ${service.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-dark text-base">{service.title}</h4>
                  <p className="text-gray-400 text-xs font-medium truncate">{service.desc}</p>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1">{service.stats}</p>
                </div>
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-gray-400 hover:text-primary transition shrink-0">
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-extrabold text-xl text-dark">Recent Activity</h3>
          <Link 
            to="/user/history" 
            className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
          >
            <span>See All</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="space-y-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((act) => {
              const IconComponent = act.icon;
              return (
                <div 
                  key={act.id} 
                  className="bg-white rounded-2xl border border-gray-100/60 shadow-sm p-4 flex items-center justify-between gap-4 hover:border-gray-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${act.iconBg} shrink-0`}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm">{act.displayTitle}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        ID: <span className="font-semibold">{act.id}</span> • {act.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <StatusBadge status={act.status} />
                    <span className="text-sm font-extrabold text-dark">₹{act.price}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center text-gray-400">
              No recent bookings or orders found. Begin by booking a ride or ordering food!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
