import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Car, Utensils, Package, Wallet, Plus, ArrowRight, History, ArrowUpRight } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const UserDashboard = () => {
  const { currentUser, bookings, orders, parcels } = useContext(AppContext);
  const navigate = useNavigate();

  // Combine and sort recent activities across all three services
  const recentActivities = [
    ...bookings.map(b => ({ ...b, type: 'ride', displayTitle: `Ride to ${b.drop}`, price: b.fare, icon: Car, iconBg: 'bg-zinc-100 text-zinc-800' })),
    ...orders.map(o => ({ ...o, type: 'food', displayTitle: `Order from ${o.restaurantName}`, price: o.total, icon: Utensils, iconBg: 'bg-zinc-100 text-zinc-800' })),
    ...parcels.map(p => ({ ...p, type: 'parcel', displayTitle: `Parcel to ${p.receiverName}`, price: p.price, icon: Package, iconBg: 'bg-zinc-100 text-zinc-800' }))
  ]
  .sort((a, b) => b.id.localeCompare(a.id))
  .slice(0, 3);

  const services = [
    {
      title: "Taxi Ride",
      desc: "Instant pickup & solo bikes",
      icon: Car,
      iconBg: "bg-zinc-100 text-zinc-900",
      link: "/user/taxi",
      stats: "Bikes from ₹25",
      badge: "Fastest"
    },
    {
      title: "Food Delivery",
      desc: "Top restaurants near you",
      icon: Utensils,
      iconBg: "bg-zinc-100 text-zinc-900",
      link: "/user/food",
      stats: "Discounts up to 50%",
      badge: "50% OFF"
    },
    {
      title: "Send Parcel",
      desc: "Same-city courier shipping",
      icon: Package,
      iconBg: "bg-zinc-100 text-zinc-900",
      link: "/user/parcel",
      stats: "Starts at ₹50",
      badge: "Instant"
    }
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 space-y-8 pb-24 md:pb-12 animate-fade-in text-left">
      
      {/* Welcome Banner Card (Minimalist light theme) */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-zinc-900 text-white px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
              Club Executive
            </span>
            <h2 className="text-2.5xl md:text-3.5xl font-display font-black text-zinc-900 tracking-tight leading-none">
              Welcome back, {currentUser?.name || "Customer"}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm font-semibold max-w-md leading-relaxed">
              Your digital concierge is ready. Book rides, order food, or dispatch parcels instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-xl p-3 shrink-0">
            <img 
              src={currentUser?.avatar || "https://placehold.co/100x100?text=SK"} 
              alt="Avatar"
              className="w-10 h-10 rounded-lg object-cover border border-zinc-200"
            />
            <div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase leading-none">Verified</p>
              <p className="text-xs font-bold text-zinc-800 mt-1">{currentUser?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Wallet and Ad Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Glow Wallet Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-400 transition duration-150">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Wallet Balance</span>
              <h3 className="text-3xl font-black text-zinc-900 font-display leading-tight">
                ₹{currentUser?.walletBalance?.toFixed(2) || '0.00'}
              </h3>
            </div>
            <div className="p-3 bg-zinc-50 text-zinc-800 border border-zinc-200 rounded-xl">
              <Wallet size={20} />
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <Link
              to="/user/wallet"
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Plus size={15} /> Add Money
            </Link>
            <Link
              to="/user/history"
              className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-bold text-xs p-3 rounded-xl transition flex items-center justify-center"
              title="Statement History"
            >
              <History size={15} />
            </Link>
          </div>
        </div>

        {/* Promo details Card */}
        <div className="md:col-span-2 bg-zinc-50 border border-zinc-200 text-zinc-950 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
          <div className="space-y-2">
            <span className="bg-zinc-200 text-zinc-800 border border-zinc-350 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider w-fit block">
              Voucher Coupon
            </span>
            <h3 className="font-display font-bold text-xl leading-snug max-w-lg">
              Get flat ₹50 off on food or ₹30 off on Auto rides!
            </h3>
            <p className="text-xs text-zinc-500 font-semibold max-w-md">
              Apply code <strong className="text-zinc-900 underline">SWIFT50</strong> on checkouts. Max discount up to ₹100.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/user/food')}
            className="w-fit bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1 transition"
          >
            <span>Order Cuisine</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Premium Service Tiles Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-zinc-900 tracking-tight">Select Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                onClick={() => navigate(service.link)}
                className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between min-h-[200px] hover:border-zinc-450 transition duration-150 cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className={`h-10 w-10 rounded-lg ${service.iconBg} flex items-center justify-center border border-zinc-200`}>
                    <Icon size={18} />
                  </div>
                  <span className="bg-zinc-100 border border-zinc-200 text-zinc-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                    {service.badge}
                  </span>
                </div>

                <div className="mt-6 space-y-1">
                  <h4 className="font-display font-bold text-lg text-zinc-900 group-hover:text-zinc-950 transition">{service.title}</h4>
                  <p className="text-zinc-450 text-xs font-semibold leading-normal">{service.desc}</p>
                  
                  <div className="pt-3 mt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-800">
                    <span>{service.stats}</span>
                    <span className="p-1 bg-zinc-50 group-hover:bg-zinc-900 group-hover:text-white rounded-lg border border-zinc-250 transition">
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-bold text-lg text-zinc-900 tracking-tight">Activity Log</h3>
          <Link 
            to="/user/history" 
            className="text-xs font-bold text-zinc-900 hover:underline flex items-center gap-0.5"
          >
            <span>Statement Ledger</span>
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
                  className="bg-white rounded-xl border border-zinc-200 p-4 flex items-center justify-between gap-4 hover:border-zinc-350 transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${act.iconBg} border border-zinc-200 shrink-0`}>
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm leading-snug">{act.displayTitle}</h4>
                      <p className="text-[9px] text-zinc-400 mt-1 font-semibold font-mono">
                        REF ID: {act.id} • {act.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <StatusBadge status={act.status} />
                    <span className="text-sm font-bold text-zinc-900">₹{act.price}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center text-zinc-400 text-xs font-semibold">
              No recorded activity. Start by booking a taxi ride or ordering meals!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
