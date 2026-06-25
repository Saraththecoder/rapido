import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, ShieldAlert, Award, Eye, Check, X, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const RiderManagement = () => {
  const { riders, setRiders } = useContext(AppContext);
  const [selectedRider, setSelectedRider] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Generate some simulated pending riders
  const [pendingRiders, setPendingRiders] = useState([
    { id: "PND-401", name: "Suresh Patil", phone: "+91 95000 84920", vehicleType: "bike", status: "pending", rating: 0, totalTrips: 0 },
    { id: "PND-402", name: "Vikram Jadhav", phone: "+91 82100 48201", vehicleType: "auto", status: "pending", rating: 0, totalTrips: 0 }
  ]);

  const allRiders = [
    ...riders.map(r => ({ ...r, status: r.isOnline ? 'online' : 'offline' })),
    ...pendingRiders
  ].filter(rider => 
    rider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rider.phone.includes(searchQuery) ||
    rider.vehicleType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApproveRider = (rider) => {
    // Add to active riders state list
    const newRider = {
      id: "RD" + Math.floor(100 + Math.random() * 900),
      name: rider.name,
      phone: rider.phone,
      vehicleType: rider.vehicleType,
      rating: 5.0,
      totalTrips: 0,
      isOnline: false,
      earnings: { daily: 0, weekly: 0, monthly: 0 }
    };
    setRiders(prev => [...prev, newRider]);
    setPendingRiders(prev => prev.filter(r => r.id !== rider.id));
    toast.success(`${rider.name} approved as registered driver!`);
  };

  const handleRejectRider = (riderId, name) => {
    setPendingRiders(prev => prev.filter(r => r.id !== riderId));
    toast.error(`Registration request from ${name} rejected.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Active & Pending List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-display font-extrabold text-xl text-dark">Partner Fleets (Riders)</h2>
            <p className="text-xs text-gray-400 font-semibold mt-1 uppercase">Monitor driver ratings, verification status, and pending approvals.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search rider or vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold transition"
            />
          </div>
        </div>

        {/* Fleets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="pb-3">Rider ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Trips</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-650">
              {allRiders.map((rider) => {
                const isPending = rider.status === 'pending';
                return (
                  <tr key={rider.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 font-mono font-bold text-gray-400">{rider.id}</td>
                    <td className="py-3.5 space-y-0.5">
                      <p className="font-bold text-dark">{rider.name}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{rider.phone}</p>
                    </td>
                    <td className="py-3.5">
                      <span className="bg-slate-50 border border-slate-100 text-dark px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {rider.vehicleType}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-dark">
                      {rider.rating > 0 ? `${rider.rating} ★` : '--'}
                    </td>
                    <td className="py-3.5 font-bold text-dark">{rider.totalTrips || '0'}</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        rider.status === 'online' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : rider.status === 'offline'
                            ? 'bg-slate-50 text-gray-500 border-gray-150'
                            : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {rider.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1 shrink-0 whitespace-nowrap">
                      {isPending ? (
                        <>
                          <button
                            onClick={() => handleApproveRider(rider)}
                            className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-600 rounded-lg transition"
                            title="Approve Rider"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => handleRejectRider(rider.id, rider.name)}
                            className="p-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-500 rounded-lg transition"
                            title="Reject Rider"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setSelectedRider(rider)}
                          className="p-2 bg-slate-50 border border-slate-200 text-gray-400 hover:text-primary hover:border-orange-100 rounded-lg transition"
                          title="View Earnings & Trips"
                        >
                          <Eye size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail view Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedRider(null)} />
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 relative z-10 border border-gray-100 animate-scale-up">
            
            {/* Header info */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-extrabold text-xl text-dark leading-none">{selectedRider.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1.5">{selectedRider.id} • {selectedRider.vehicleType} executive</p>
              </div>
              <button 
                onClick={() => setSelectedRider(null)} 
                className="p-1 text-gray-400 hover:text-dark rounded transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* General metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                <p className="text-gray-400 text-[10px] font-semibold uppercase">Rating Index</p>
                <p className="text-base font-extrabold text-dark mt-0.5">{selectedRider.rating} ★</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                <p className="text-gray-400 text-[10px] font-semibold uppercase">Total Trips Completed</p>
                <p className="text-base font-extrabold text-dark mt-0.5">{selectedRider.totalTrips}</p>
              </div>
            </div>

            {/* Earnings details */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider">Settled Earnings</h4>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs space-y-2.5">
                <div className="flex justify-between text-gray-500">
                  <span>Today's Earnings:</span>
                  <span className="font-bold text-dark">₹{selectedRider.earnings?.daily || 0}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Weekly Earnings:</span>
                  <span className="font-bold text-dark">₹{selectedRider.earnings?.weekly || 0}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Monthly Earnings:</span>
                  <span className="font-bold text-primary font-display text-sm">₹{selectedRider.earnings?.monthly || 0}</span>
                </div>
              </div>
            </div>

            {/* Actions info */}
            <div className="flex gap-2">
              <a
                href={`tel:${selectedRider.phone}`}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-gray-700 font-bold text-xs py-3.5 rounded-xl border text-center transition"
              >
                Call Partner ({selectedRider.phone})
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default RiderManagement;
