import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, TrendingUp, Wallet, Star, ShieldAlert, Award, Power, Car } from 'lucide-react';
import toast from 'react-hot-toast';

const RiderDashboard = () => {
  const { currentUser, updateRiderStatus, bookings, orders, parcels } = useContext(AppContext);
  const navigate = useNavigate();

  const handleToggleOnlineStatus = () => {
    const nextStatus = !currentUser.isOnline;
    updateRiderStatus(currentUser.id, nextStatus);
    if (nextStatus) {
      toast.success("You are now ONLINE. Waiting for incoming orders...");
    } else {
      toast.error("You are now OFFLINE. You won't receive job requests.");
    }
  };

  // Find active jobs assigned to this rider
  const activeTrips = [
    ...bookings.filter(b => b.rider?.name.includes(currentUser?.name) && b.status !== 'delivered' && b.status !== 'completed' && b.status !== 'cancelled'),
    ...orders.filter(o => o.rider?.name.includes(currentUser?.name) && o.status !== 'delivered' && o.status !== 'completed' && o.status !== 'cancelled'),
    ...parcels.filter(p => p.rider?.name.includes(currentUser?.name) && p.status !== 'delivered' && p.status !== 'completed' && p.status !== 'cancelled')
  ];

  const quickNav = [
    { name: 'Job Requests', path: '/rider/requests', icon: ClipboardList, color: 'bg-primary text-white', desc: 'Accept new bookings' },
    { name: 'Earnings Summary', path: '/rider/earnings', icon: TrendingUp, color: 'bg-emerald-500 text-white', desc: 'Daily & Weekly reports' },
    { name: 'My Wallet', path: '/rider/wallet', icon: Wallet, color: 'bg-indigo-500 text-white', desc: 'Deductions & withdrawals' }
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Online / Offline Toggle Banner */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3.5 rounded-2xl ${currentUser?.isOnline ? 'bg-emerald-50 text-emerald-600 animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
            <Power size={24} />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-lg text-dark">
              Duty Status: {currentUser?.isOnline ? 'ONLINE' : 'OFFLINE'}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {currentUser?.isOnline ? 'You are receiving nearby taxi, food and parcel bids.' : 'Turn on duty status to start accepting requests.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleOnlineStatus}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm shadow-sm transition duration-200 ${
            currentUser?.isOnline
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/10'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10'
          }`}
        >
          {currentUser?.isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-gray-100/60 p-4 text-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Today's Jobs</p>
          <p className="text-2xl font-black text-dark font-display mt-1">8</p>
          <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded mt-1 inline-block">100% Accept</span>
        </div>
        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-gray-100/60 p-4 text-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Today's Pay</p>
          <p className="text-2xl font-black text-primary font-display mt-1">₹1,250</p>
          <span className="text-[9px] text-gray-500 font-medium bg-slate-50 border px-1.5 py-0.5 rounded mt-1 inline-block">Inc: ₹200</span>
        </div>
        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-gray-100/60 p-4 text-center">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Rating</p>
          <p className="text-2xl font-black text-dark font-display mt-1 flex items-center justify-center gap-0.5">
            4.8 <Star size={16} className="text-amber-500 fill-amber-500" />
          </p>
          <span className="text-[9px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded mt-1 inline-block">Excellent</span>
        </div>
      </div>

      {/* Active Jobs Section */}
      <div className="space-y-3">
        <h3 className="font-display font-extrabold text-xl text-dark">Active Task Handlers</h3>
        {activeTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl border border-gray-150 p-4 space-y-3 hover:border-gray-200 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-orange-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Active {trip.id.startsWith('FO') ? 'Food' : trip.id.startsWith('PA') ? 'Parcel' : 'Ride'}</span>
                    <h4 className="font-bold text-dark text-sm mt-1.5">
                      {trip.id.startsWith('FO') ? `Pickup: ${trip.restaurantName}` : `Pickup: ${trip.pickup || 'HSR Layout'}`}
                    </h4>
                  </div>
                  <span className="text-base font-black text-dark">₹{trip.price || trip.fare}</span>
                </div>
                
                <p className="text-xs text-gray-500">
                  Drop Location: <strong className="text-dark">{trip.receiverAddress || trip.drop || 'Office Location'}</strong>
                </p>

                <div className="flex gap-2 pt-2">
                  <Link
                    to="/rider/requests"
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-gray-700 font-bold text-xs py-2 rounded-xl text-center border transition"
                  >
                    Open Console
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 text-center text-gray-400 text-xs font-semibold">
            No active jobs. Toggle online status and visit "Job Requests" to accept bids.
          </div>
        )}
      </div>

      {/* Quick Nav Drawer Grid */}
      <div className="space-y-3">
        <h3 className="font-display font-extrabold text-xl text-dark">Partner Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickNav.map((nav, idx) => {
            const Icon = nav.icon;
            return (
              <Link 
                key={idx}
                to={nav.path}
                className="bg-white rounded-3xl shadow-sm border border-gray-100/60 p-5 flex items-center gap-4 hover:shadow-md transition duration-200"
              >
                <div className={`h-12 w-12 rounded-2xl ${nav.color} flex items-center justify-center shrink-0`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="font-bold text-dark text-base">{nav.name}</h4>
                  <p className="text-gray-400 text-xs font-medium">{nav.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Incentives / Target Progress */}
      <div className="bg-gradient-to-br from-indigo-50 to-orange-50 border border-indigo-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Weekly Incentive</span>
          <h4 className="font-display font-extrabold text-lg text-dark">Complete 10 rides to unlock a ₹200 bonus!</h4>
          <p className="text-xs text-gray-500 font-medium">You have completed 8 of 10 rides. Only 2 more to go.</p>
        </div>
        <div className="shrink-0 w-24 h-24 relative flex items-center justify-center font-display font-black text-lg text-dark bg-white rounded-full border-4 border-indigo-500 shadow-sm">
          80%
        </div>
      </div>

    </div>
  );
};

export default RiderDashboard;
