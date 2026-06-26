import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, Eye, Check, X } from 'lucide-react';
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
    <div className="space-y-6 animate-fade-in">
      
      {/* Active & Pending List */}
      <div className="bg-white rounded-xl border border-zinc-100 p-6 space-y-6 text-zinc-900 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Partner Fleets (Riders)</h2>
            <p className="text-xs text-zinc-500">Monitor driver ratings, verification status, and pending approvals.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              placeholder="Search rider or vehicle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-4 py-2 bg-zinc-50 rounded-lg text-xs font-semibold transition text-zinc-900 placeholder-zinc-400 input-premium"
            />
          </div>
        </div>

        {/* Fleets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="pb-3">Rider ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Trips</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
              {allRiders.map((rider) => {
                const isPending = rider.status === 'pending';
                return (
                  <tr key={rider.id} className="hover:bg-accent-peach/20 transition">
                    <td className="py-3.5 font-mono text-[11px] text-zinc-400">{rider.id}</td>
                    <td className="py-3.5">
                      <p className="font-bold text-zinc-900">{rider.name}</p>
                      <p className="text-[10px] text-zinc-400 font-medium mt-0.5">{rider.phone}</p>
                    </td>
                    <td className="py-3.5">
                      <span className="bg-accent-peach/30 border border-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {rider.vehicleType}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-zinc-900">
                      {rider.rating > 0 ? `${rider.rating} ★` : '--'}
                    </td>
                    <td className="py-3.5 font-bold text-zinc-900">{rider.totalTrips || '0'}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-primary/10 text-zinc-800 bg-white">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          rider.status === 'online'
                            ? 'bg-emerald-500 animate-pulse'
                            : rider.status === 'offline'
                              ? 'bg-zinc-300'
                              : 'bg-amber-500'
                        }`}></span>
                        {rider.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1 shrink-0 whitespace-nowrap">
                      {isPending ? (
                        <>
                          <button
                            onClick={() => handleApproveRider(rider)}
                            className="p-1.5 rounded-md border border-zinc-200 hover:border-primary text-zinc-500 hover:text-primary transition bg-white"
                            title="Approve Rider"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            onClick={() => handleRejectRider(rider.id, rider.name)}
                            className="p-1.5 rounded-md border border-zinc-200 hover:border-primary text-zinc-500 hover:text-primary transition bg-white"
                            title="Reject Rider"
                          >
                            <X size={13} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setSelectedRider(rider)}
                          className="p-1.5 rounded-md border border-zinc-200 hover:border-primary text-zinc-500 hover:text-primary transition bg-white"
                          title="View Details"
                        >
                          <Eye size={13} />
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
          <div className="absolute inset-0 bg-zinc-950/45 backdrop-blur-xs" onClick={() => setSelectedRider(null)} />
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-5 relative z-10 border border-zinc-100 shadow-xl animate-scale-up">
            
            {/* Header info */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900 leading-none">{selectedRider.name}</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{selectedRider.id} • {selectedRider.vehicleType} executive</p>
              </div>
              <button 
                onClick={() => setSelectedRider(null)} 
                className="p-1 text-zinc-400 hover:text-primary transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* General metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent-peach/30 p-3 rounded-lg border border-primary/10">
                <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Rating Index</p>
                <p className="text-sm font-bold text-primary mt-1">{selectedRider.rating} ★</p>
              </div>
              <div className="bg-accent-peach/30 p-3 rounded-lg border border-primary/10">
                <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Total Trips</p>
                <p className="text-sm font-bold text-zinc-900 mt-1">{selectedRider.totalTrips}</p>
              </div>
            </div>

            {/* Earnings details */}
            <div className="space-y-2">
              <h4 className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Settled Earnings</h4>
              <div className="bg-accent-peach/20 rounded-lg p-4 border border-primary/10 text-xs space-y-2.5">
                <div className="flex justify-between text-zinc-650 font-medium">
                  <span>Today's Earnings:</span>
                  <span className="font-bold text-zinc-900">₹{(selectedRider.earnings?.daily || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-650 font-medium">
                  <span>Weekly Earnings:</span>
                  <span className="font-bold text-zinc-900">₹{(selectedRider.earnings?.weekly || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-650 font-medium pt-2.5 border-t border-primary/10">
                  <span className="font-bold">Monthly Earnings:</span>
                  <span className="font-bold text-primary text-sm">₹{(selectedRider.earnings?.monthly || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions info */}
            <div className="flex gap-2 pt-2">
              <a
                href={`tel:${selectedRider.phone}`}
                className="w-full font-bold text-xs py-3 rounded-lg text-center transition uppercase tracking-wider btn-primary"
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
