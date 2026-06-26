import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, TrendingUp, Wallet, Star, Power, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const RiderDashboard = () => {
  const { currentUser, updateRiderStatus, bookings, orders, parcels } = useContext(AppContext);
  const navigate = useNavigate();

  const handleToggleOnlineStatus = () => {
    const nextStatus = !currentUser.isOnline;
    updateRiderStatus(currentUser.id, nextStatus);
    if (nextStatus) {
      toast.success("Duty status ONLINE. Waiting for incoming orders...");
    } else {
      toast.error("Duty status OFFLINE. Bids suspended.");
    }
  };

  // Find active jobs assigned to this rider
  const activeTrips = [
    ...bookings.filter(b => b.rider?.name.includes(currentUser?.name) && b.status !== 'delivered' && b.status !== 'completed' && b.status !== 'cancelled'),
    ...orders.filter(o => o.rider?.name.includes(currentUser?.name) && o.status !== 'delivered' && o.status !== 'completed' && o.status !== 'cancelled'),
    ...parcels.filter(p => p.rider?.name.includes(currentUser?.name) && p.status !== 'delivered' && p.status !== 'completed' && p.status !== 'cancelled')
  ];

  const quickNav = [
    { name: 'Job Requests', path: '/rider/requests', icon: ClipboardList, desc: 'Accept new bookings' },
    { name: 'Earnings Summary', path: '/rider/earnings', icon: TrendingUp, desc: 'Daily & Weekly reports' },
    { name: 'My Wallet', path: '/rider/wallet', icon: Wallet, desc: 'Deductions & withdrawals' }
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 space-y-8 pb-24 md:pb-12 animate-fade-in text-left">
      
      {/* Online / Offline Toggle Banner */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-xl transition duration-200 ${
            currentUser?.isOnline 
              ? 'bg-primary text-white shadow-md shadow-primary/10' 
              : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
          }`}>
            <Power size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-zinc-900">
                Duty Status: {currentUser?.isOnline ? 'ONLINE' : 'OFFLINE'}
              </h3>
              <span className={`h-1.5 w-1.5 rounded-full ${currentUser?.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
            </div>
            <p className="text-xs text-zinc-500 font-semibold mt-1 leading-relaxed max-w-md">
              {currentUser?.isOnline 
                ? 'Your radar is active. Live customer ride requests and food delivery bids will alert below.' 
                : 'Turn on duty status to start receiving incoming orders and ride requests.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleOnlineStatus}
          className={`w-full md:w-auto px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition ${
            currentUser?.isOnline
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'btn-primary'
          }`}
        >
          {currentUser?.isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 text-center shadow-sm">
          <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Today's Jobs</p>
          <p className="text-2xl md:text-3xl font-black text-zinc-900 font-display mt-2 leading-none">8</p>
          <span className="text-[9px] text-zinc-500 border border-zinc-200 font-bold bg-zinc-50 px-2 py-0.5 rounded-md mt-2.5 inline-block">100% Completed</span>
        </div>
        {/* Metric 2 */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 text-center shadow-sm">
          <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Today's Pay</p>
          <p className="text-2xl md:text-3xl font-black text-zinc-900 font-display mt-2 leading-none">₹1,250</p>
          <span className="text-[9px] text-zinc-500 border border-zinc-200 font-bold bg-zinc-50 px-2 py-0.5 rounded-md mt-2.5 inline-block">Incentives Included</span>
        </div>
        {/* Metric 3 */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 text-center shadow-sm">
          <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Customer Rating</p>
          <p className="text-2xl md:text-3xl font-black text-primary font-display mt-2 leading-none flex items-center justify-center gap-0.5">
            4.8 <Star size={18} className="text-primary fill-primary" />
          </p>
          <span className="text-[9px] text-primary border border-primary/10 font-bold bg-accent-peach/30 px-2 py-0.5 rounded-md mt-2.5 inline-block">Top Partner</span>
        </div>
      </div>

      {/* Active Jobs Section */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-zinc-900 tracking-tight">Active Task Console</h3>
        {activeTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-primary text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                      Active {trip.id.startsWith('FO') ? 'Food' : trip.id.startsWith('PA') ? 'Courier' : 'Taxi'}
                    </span>
                    <h4 className="font-bold text-zinc-800 text-sm mt-3 leading-snug">
                      {trip.id.startsWith('FO') ? `Pickup: ${trip.restaurantName}` : `Pickup: ${trip.pickup || 'HSR Layout'}`}
                    </h4>
                  </div>
                  <span className="text-base font-black text-primary">₹{trip.price || trip.fare}</span>
                </div>
                
                <p className="text-xs text-zinc-500 font-semibold leading-normal">
                  Drop Location: <strong className="text-zinc-800 font-bold">{trip.receiverAddress || trip.drop || 'Client Dropoff'}</strong>
                </p>

                <div className="pt-2 border-t border-zinc-100">
                  <Link
                    to="/rider/requests"
                    className="w-full bg-white hover:bg-zinc-50 border border-primary/20 text-primary font-bold text-xs py-2 rounded-lg text-center block transition shadow-sm"
                  >
                    Open Steering Console
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-10 text-center text-zinc-400 text-xs font-semibold">
            No active jobs at the moment. Toggle ONLINE status and navigate to "Job Requests" to accept orders.
          </div>
        )}
      </div>

      {/* Partner Actions */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-zinc-900 tracking-tight">Partner Console Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {quickNav.map((nav, idx) => {
            const Icon = nav.icon;
            return (
              <Link 
                key={idx}
                to={nav.path}
                className="bg-white border border-zinc-200 rounded-xl p-5 flex items-center gap-4 hover:border-primary/20 transition duration-150 group"
              >
                <div className="h-10 w-10 rounded-lg bg-accent-peach/40 border border-primary/15 text-primary flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-900 group-hover:text-primary transition">{nav.name}</h4>
                  <p className="text-zinc-400 text-[11px] font-semibold mt-0.5">{nav.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Weekly Incentives Goal */}
      <div className="bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl p-6 md:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Award size={16} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Performance Target</span>
            </div>
            <h3 className="font-display font-bold text-xl max-w-lg leading-snug">
              Complete 10 rides to unlock a ₹200 weekly incentive bonus!
            </h3>
            <p className="text-xs text-zinc-550 font-semibold">
              You completed <strong className="text-primary">8 of 10</strong> runs. 2 more rides to secure the credit!
            </p>
            
            <div className="pt-2 flex gap-4 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
              <p>✓ Rating: <strong>4.8</strong> (Req: 4.5)</p>
              <p>✓ Hours: <strong>21h</strong> (Req: 15h)</p>
            </div>
          </div>
          
          <div className="shrink-0 w-20 h-20 relative flex items-center justify-center font-display font-black text-lg text-primary bg-[#FAF2EE] border border-primary/20 rounded-full">
            80%
          </div>
        </div>
      </div>

    </div>
  );
};

export default RiderDashboard;
