import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ClipboardList, Play, CheckCircle, Navigation, MapPin, Compass, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import StatusBadge from '../../components/StatusBadge';

const RiderRequests = () => {
  const { currentUser, bookings, setBookings, orders, setOrders, parcels, setParcels, updateOrderStatus } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' or 'active'

  // Local state for auto-refreshing incoming request listings
  const [incomingRequests, setIncomingRequests] = useState([]);
  
  // Custom mock pool of requests to cycle through
  const requestPool = [
    { id: "REQ-901", type: "ride", pickup: "Indiranagar Metro Station", drop: "Domlur Flyover", distance: "3.2 km", fare: 45, date: "2026-06-25" },
    { id: "REQ-902", type: "food", restaurantName: "Biryani Darbar", drop: "HSR Layout Sector 2", distance: "4.8 km", fare: 65, date: "2026-06-25", items: "1x Chicken Biryani, 2x Naan" },
    { id: "REQ-903", type: "parcel", pickup: "Koramangala 3rd Block", receiverAddress: "Bellandur Adarsh Palm", distance: "6.5 km", fare: 90, date: "2026-06-25", description: "Keys & Documents" },
    { id: "REQ-904", type: "ride", pickup: "Phoenix Marketcity", drop: "Marathahalli Bridge", distance: "5.1 km", fare: 70, date: "2026-06-25" },
    { id: "REQ-905", type: "food", restaurantName: "Burger & Co.", drop: "Electronic City Phase 1", distance: "9.2 km", fare: 120, date: "2026-06-25", items: "2x Classic Cheese Burger" }
  ];

  // Retrieve active tasks assigned to this rider in global state
  const activeJobs = [
    ...bookings.filter(b => b.rider?.name.includes(currentUser?.name) && b.status !== 'delivered' && b.status !== 'completed' && b.status !== 'cancelled').map(b => ({ ...b, jobType: 'ride' })),
    ...orders.filter(o => o.rider?.name.includes(currentUser?.name) && o.status !== 'delivered' && o.status !== 'completed' && o.status !== 'cancelled').map(o => ({ ...o, jobType: 'food' })),
    ...parcels.filter(p => p.rider?.name.includes(currentUser?.name) && p.status !== 'delivered' && p.status !== 'completed' && p.status !== 'cancelled').map(p => ({ ...p, jobType: 'parcel' }))
  ];

  // Effect: Generate simulated incoming requests if online
  useEffect(() => {
    if (!currentUser?.isOnline) {
      setIncomingRequests([]);
      return;
    }

    // Initialize with one request immediately
    if (incomingRequests.length === 0) {
      setIncomingRequests([requestPool[0]]);
    }

    const interval = setInterval(() => {
      setIncomingRequests(prev => {
        if (prev.length >= 3) return prev; // Limit to 3 pending requests
        
        // Pick a random request not already in list
        const remaining = requestPool.filter(poolItem => !prev.some(p => p.id === poolItem.id));
        if (remaining.length === 0) return prev;
        
        const randomItem = remaining[Math.floor(Math.random() * remaining.length)];
        
        // Dynamic ID to avoid duplicate keys
        const newReq = {
          ...randomItem,
          id: `REQ-${Math.floor(100 + Math.random() * 900)}`
        };

        toast.success(`New Job Alert: ${newReq.type.toUpperCase()} request nearby!`);
        return [...prev, newReq];
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [currentUser?.isOnline, incomingRequests]);

  const handleAccept = (req) => {
    // Add to global state list depending on request type
    if (req.type === 'ride') {
      const newRide = {
        id: "TX" + Math.floor(100 + Math.random() * 900),
        pickup: req.pickup,
        drop: req.drop,
        vehicleType: currentUser.vehicleType || "bike",
        fare: req.fare,
        status: "preparing", // Arriving at pickup
        rider: { name: currentUser.name, phone: currentUser.phone, vehicleType: currentUser.vehicleType || 'bike', rating: 4.8 },
        date: req.date
      };
      setBookings(prev => [newRide, ...prev]);
    } else if (req.type === 'food') {
      const newFoodOrder = {
        id: "FO" + Math.floor(100 + Math.random() * 900),
        restaurantId: "rest1",
        restaurantName: req.restaurantName,
        items: [{ id: "m1", name: req.items || "Combo Meal", price: req.fare - 35, quantity: 1 }],
        subtotal: req.fare - 35,
        deliveryFee: 35,
        discount: 0,
        total: req.fare,
        status: "preparing", // Preparing food
        date: req.date,
        rider: { name: currentUser.name, phone: currentUser.phone, vehicleType: currentUser.vehicleType || 'bike' }
      };
      setOrders(prev => [newFoodOrder, ...prev]);
    } else if (req.type === 'parcel') {
      const newParcelOrder = {
        id: "PA" + Math.floor(100 + Math.random() * 900),
        senderName: "Suresh Kumar",
        senderPhone: "+91 98765 43210",
        senderAddress: req.pickup,
        receiverName: "Recipient Partner",
        receiverPhone: "+91 98000 01122",
        receiverAddress: req.receiverAddress,
        weight: "1-5kg",
        description: req.description,
        price: req.fare,
        status: "picked", // Picked up package
        trackingId: "SG-PRCL-" + Math.floor(1000 + Math.random() * 9000),
        date: req.date,
        rider: { name: currentUser.name, phone: currentUser.phone, vehicleType: currentUser.vehicleType || 'bike' }
      };
      setParcels(prev => [newParcelOrder, ...prev]);
    }

    // Remove from local list
    setIncomingRequests(prev => prev.filter(p => p.id !== req.id));
    toast.success("Job accepted! Navigating to Active Tasks tab.");
    setActiveTab('active');
  };

  const handleReject = (reqId) => {
    setIncomingRequests(prev => prev.filter(p => p.id !== reqId));
    toast.error("Request rejected.");
  };

  // Progression chain helper
  const getNextStatusText = (statusVal, jobType) => {
    const s = statusVal.toLowerCase();
    if (jobType === 'ride') {
      if (s === 'preparing') return 'Arrive at Pickup';
      if (s === 'picked') return 'Start Ride (OTP Verified)';
      return 'Complete Trip';
    } else if (jobType === 'food') {
      if (s === 'preparing') return 'Mark as Picked Up';
      return 'Mark as Delivered';
    } else {
      // Parcel
      if (s === 'picked') return 'Mark In Transit';
      return 'Mark as Delivered';
    }
  };

  const handleProgressJobStatus = (job) => {
    const s = job.status.toLowerCase();
    let nextStatus = '';

    if (job.jobType === 'ride') {
      if (s === 'preparing' || s === 'placed') nextStatus = 'picked';
      else if (s === 'picked') nextStatus = 'delivered';
    } else if (job.jobType === 'food') {
      if (s === 'preparing' || s === 'placed') nextStatus = 'picked';
      else if (s === 'picked') nextStatus = 'delivered';
    } else if (job.jobType === 'parcel') {
      if (s === 'pending' || s === 'picked') nextStatus = 'in-transit';
      else if (s === 'in-transit') nextStatus = 'delivered';
    }

    if (nextStatus) {
      updateOrderStatus(job.id, job.jobType, nextStatus);
    }
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Tab selection */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition duration-200 ${
            activeTab === 'incoming'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Incoming Offers ({incomingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition duration-200 ${
            activeTab === 'active'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Active Tasks ({activeJobs.length})
        </button>
      </div>

      {/* Tab Panel Content */}
      <div className="space-y-4">
        
        {/* Incoming Tab */}
        {activeTab === 'incoming' && (
          <div className="space-y-4">
            {!currentUser?.isOnline ? (
              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-center space-y-3 max-w-md mx-auto">
                <AlertCircle className="text-primary mx-auto" size={40} />
                <h4 className="font-bold text-dark text-base">You are offline</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Go online from the Rider Dashboard to start receiving incoming trip and package delivery request alerts.
                </p>
              </div>
            ) : incomingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingRequests.map((req) => (
                  <div key={req.id} className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-orange-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{req.type}</span>
                        <h4 className="font-bold text-dark text-base mt-2">
                          {req.type === 'food' ? `From: ${req.restaurantName}` : `Pickup: ${req.pickup}`}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-primary">₹{req.fare}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{req.distance}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-gray-500 space-y-1">
                      <p>Drop Location: <strong className="text-dark">{req.drop || req.receiverAddress}</strong></p>
                      {req.items && <p>Items: <strong className="text-dark">{req.items}</strong></p>}
                      {req.description && <p>Content: <strong className="text-dark">{req.description}</strong></p>}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleAccept(req)}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 rounded-xl shadow-sm transition"
                      >
                        Accept Job
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold py-3 px-5 rounded-xl transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 space-y-3">
                <Compass className="mx-auto text-gray-250 animate-spin" size={48} />
                <p className="text-xs font-bold text-dark">Radar scanning for requests...</p>
                <p className="text-[11px] max-w-xs mx-auto leading-relaxed">
                  Incoming requests show up here. Simulator fires new requests randomly every 6 seconds while online.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Active Tab */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-3xl border border-gray-150 p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                            {job.jobType}
                          </span>
                          <span className="font-mono text-xs text-gray-400 font-bold">{job.id}</span>
                        </div>
                        <h4 className="font-bold text-dark text-base mt-2">
                          {job.jobType === 'food' ? `Pickup: ${job.restaurantName}` : `Pickup: ${job.pickup || 'HSR Layout'}`}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-dark">₹{job.total || job.price || job.fare}</p>
                        <StatusBadge status={job.status} />
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 text-xs text-gray-500 space-y-1.5 border border-slate-100">
                      <p className="flex items-start gap-1">
                        <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                        <span>Drop: <strong className="text-dark">{job.receiverAddress || job.drop || 'Client Dropoff'}</strong></span>
                      </p>
                      {job.description && <p>Detail: <strong className="text-dark">{job.description}</strong></p>}
                    </div>

                    {/* Progression actions */}
                    <button
                      onClick={() => handleProgressJobStatus(job)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-1"
                    >
                      <CheckCircle size={14} />
                      <span>{getNextStatusText(job.status, job.jobType)}</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border rounded-3xl p-12 text-center text-gray-400 text-xs font-semibold">
                No active assignments. Visit the incoming tab to accept jobs!
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default RiderRequests;
