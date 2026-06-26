import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Car, Utensils, Package, Wallet, Plus, ArrowRight, History, ArrowUpRight, Lock, ShieldCheck } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const UserDashboard = () => {
  const { currentUser, bookings, orders, parcels } = useContext(AppContext);
  const navigate = useNavigate();

  // Combine and sort recent activities across all three services
  const recentActivities = [
    ...bookings.map(b => ({ ...b, type: 'ride', displayTitle: `Ride to ${b.drop}`, price: b.fare, icon: Car, iconBg: 'bg-accent-peach/40 text-primary border border-primary/10' })),
    ...orders.map(o => ({ ...o, type: 'food', displayTitle: `Order from ${o.restaurantName}`, price: o.total, icon: Utensils, iconBg: 'bg-accent-peach/40 text-primary border border-primary/10' })),
    ...parcels.map(p => ({ ...p, type: 'parcel', displayTitle: `Parcel to ${p.receiverName}`, price: p.price, icon: Package, iconBg: 'bg-accent-peach/40 text-primary border border-primary/10' }))
  ]
  .sort((a, b) => b.id.localeCompare(a.id))
  .slice(0, 3);

  const services = [
    {
      title: "Taxi Ride",
      desc: "Instant pickup & solo bikes",
      icon: Car,
      iconBg: "bg-accent-peach/50 text-primary border border-primary/10",
      link: "/user/taxi",
      stats: "Bikes from ₹25",
      badge: "Fastest"
    },
    {
      title: "Food Delivery",
      desc: "Top restaurants near you",
      icon: Utensils,
      iconBg: "bg-accent-peach/50 text-primary border border-primary/10",
      link: "/user/food",
      stats: "Discounts up to 50%",
      badge: "50% OFF"
    },
    {
      title: "Send Parcel",
      desc: "Same-city courier shipping",
      icon: Package,
      iconBg: "bg-accent-peach/50 text-primary border border-primary/10",
      link: "/user/parcel",
      stats: "Starts at ₹50",
      badge: "Instant"
    }
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 space-y-8 pb-24 md:pb-12 animate-fade-in text-left">
      
      {/* Welcome Banner Card (Premium light theme gradient) */}
      <div className="bg-apollo-header border border-primary/10 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-primary text-white px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
              Club Executive
            </span>
            <h2 className="text-2.5xl md:text-3.5xl font-display font-black text-zinc-900 tracking-tight leading-none">
              Welcome back, {currentUser?.name || "Customer"}
            </h2>
            <p className="text-zinc-550 text-xs md:text-sm font-semibold max-w-md leading-relaxed">
              Your digital concierge is ready. Book rides, order food, or dispatch parcels instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-primary/10 rounded-xl p-3 shrink-0 shadow-sm">
            <img 
              src={currentUser?.avatar || "https://placehold.co/100x100?text=SK"} 
              alt="Avatar"
              className="w-10 h-10 rounded-lg object-cover border border-zinc-100"
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
        <div className="bg-white border border-zinc-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition duration-150">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Wallet Balance</span>
              <h3 className="text-3xl font-black text-zinc-900 font-display leading-tight">
                ₹{currentUser?.walletBalance?.toFixed(2) || '0.00'}
              </h3>
            </div>
            <div className="p-3 bg-accent-peach/40 text-primary border border-primary/15 rounded-xl">
              <Wallet size={20} />
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <Link
              to="/user/wallet"
              className="flex-1 btn-primary text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <Plus size={15} /> Add Money
            </Link>
            <Link
              to="/user/history"
              className="bg-white hover:bg-accent-peach/10 border border-primary/25 text-primary font-bold text-xs p-3 rounded-xl transition flex items-center justify-center"
              title="Statement History"
            >
              <History size={15} />
            </Link>
          </div>
        </div>

        {/* Cashback Banner (Apollo Style) */}
        <div className="md:col-span-2 bg-apollo-banner border border-[#fc5a2a]/20 text-zinc-950 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] shadow-sm">
          <div className="space-y-2 text-left">
            <span className="bg-primary text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider w-fit block">
              Exclusive Offer
            </span>
            <h3 className="font-display font-black text-lg md:text-xl leading-snug text-zinc-900">
              Get Assured ₹350 Cashback on First 3 Orders
            </h3>
            
            {/* Step circles */}
            <div className="relative flex justify-between items-center py-2 max-w-md">
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-[#fc5a2a]/30 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center shadow-sm shadow-primary/20">
                  <ShieldCheck size={12} />
                </div>
                <span className="text-[9px] font-bold text-zinc-900 mt-1">1st Order</span>
                <span className="text-[8px] text-zinc-550 font-medium">₹30 Cashback</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-7 w-7 rounded-full bg-[#FAF2EE] text-primary border border-primary/30 flex items-center justify-center">
                  <Lock size={11} />
                </div>
                <span className="text-[9px] font-bold text-zinc-900 mt-1">2nd Order</span>
                <span className="text-[8px] text-zinc-550 font-medium">₹50 Cashback</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-7 w-7 rounded-full bg-[#FAF2EE] text-primary border border-primary/30 flex items-center justify-center">
                  <Lock size={11} />
                </div>
                <span className="text-[9px] font-bold text-zinc-900 mt-1">3rd Order</span>
                <span className="text-[8px] text-zinc-550 font-medium">₹70+₹200*</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-2 border-t border-zinc-150/40 text-left">
            <button 
              onClick={() => navigate('/user/food')}
              className="w-fit btn-primary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1 transition"
            >
              <span>Start Your Journey</span>
              <ArrowUpRight size={13} />
            </button>
            <p className="text-[8px] text-zinc-400 font-medium">
              *Place 3 orders within 60 days to claim.
            </p>
          </div>
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
                className="bg-white border border-zinc-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between min-h-[200px] hover:border-primary/20 transition duration-150 cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className={`h-10 w-10 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                    <Icon size={18} />
                  </div>
                  <span className="bg-accent-peach/40 border border-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                    {service.badge}
                  </span>
                </div>

                <div className="mt-6 space-y-1">
                  <h4 className="font-display font-bold text-lg text-zinc-900 group-hover:text-primary transition">{service.title}</h4>
                  <p className="text-zinc-450 text-xs font-semibold leading-normal">{service.desc}</p>
                  
                  <div className="pt-3 mt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-800">
                    <span>{service.stats}</span>
                    <span className="p-1 bg-zinc-50 group-hover:bg-primary group-hover:text-white group-hover:border-primary rounded-lg border border-zinc-200 transition">
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
                  className="bg-white rounded-xl border border-zinc-100 p-4 flex items-center justify-between gap-4 hover:border-primary/20 shadow-sm transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${act.iconBg} shrink-0`}>
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
            <div className="bg-white rounded-xl border border-zinc-100 p-12 text-center text-zinc-400 text-xs font-semibold shadow-sm">
              No recorded activity. Start by booking a taxi ride or ordering meals!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
