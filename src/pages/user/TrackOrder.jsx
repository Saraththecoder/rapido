import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ArrowLeft, MapPin, Phone, MessageSquare, Shield, Clock, Navigation } from 'lucide-react';
import RideCard from '../../components/RideCard';
import StatusBadge from '../../components/StatusBadge';

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, parcels, bookings } = useContext(AppContext);

  // We can parse service type from the orderId prefix e.g. 'food-FO101' or 'parcel-PA501' or 'ride-TX301'
  const idParts = orderId.split('-');
  const serviceType = idParts[0]; // 'food' or 'parcel' or 'ride'
  const actualId = idParts[1] || orderId; // the actual ID

  let orderData = null;
  if (serviceType === 'food') {
    orderData = orders.find(o => o.id === actualId);
  } else if (serviceType === 'parcel') {
    orderData = parcels.find(p => p.id === actualId);
  } else if (serviceType === 'ride' || actualId.startsWith('TX')) {
    orderData = bookings.find(b => b.id === actualId);
  }

  // Fallbacks if not prefixed properly
  if (!orderData) {
    orderData = orders.find(o => o.id === orderId) || 
                parcels.find(p => p.id === orderId) || 
                bookings.find(b => b.id === orderId);
  }

  if (!orderData) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-20 space-y-4">
        <p className="text-gray-500 font-bold">Order or Trip not found.</p>
        <Link to="/user/dashboard" className="text-primary font-bold hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  // Determine steps and current index based on service type and status
  let steps = [];
  let activeIndex = 0;
  const status = orderData.status?.toLowerCase();

  if (serviceType === 'food' || orderData.id.startsWith('FO')) {
    steps = [
      { key: 'placed', label: 'Order Placed' },
      { key: 'preparing', label: 'Food Preparing' },
      { key: 'picked', label: 'Out for Delivery' },
      { key: 'delivered', label: 'Delivered' }
    ];
    activeIndex = steps.findIndex(s => s.key === status);
    if (status === 'delivered') activeIndex = 3;
  } else if (serviceType === 'parcel' || orderData.id.startsWith('PA')) {
    steps = [
      { key: 'pending', label: 'Booked' },
      { key: 'picked', label: 'Picked Up' },
      { key: 'in-transit', label: 'In Transit' },
      { key: 'delivered', label: 'Delivered' }
    ];
    activeIndex = steps.findIndex(s => s.key === status);
    if (status === 'delivered') activeIndex = 3;
  } else {
    // Taxi booking
    steps = [
      { key: 'placed', label: 'Ride Booked' },
      { key: 'preparing', label: 'Rider Arrived' },
      { key: 'picked', label: 'Trip Started' },
      { key: 'delivered', label: 'Trip Ended' }
    ];
    activeIndex = steps.findIndex(s => s.key === status);
    if (status === 'delivered') activeIndex = 3;
  }

  if (activeIndex === -1) activeIndex = 0; // Fallback

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Back to Dashboard */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/user/dashboard')}
          className="p-2.5 bg-white hover:bg-slate-50 text-gray-700 rounded-xl transition border border-gray-100/60"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Back to Dashboard</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map and Stepper */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Simulated Premium SVG Map */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Delivery Track</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <Clock size={14} /> ETA: 12 mins
              </span>
            </div>

            {/* Custom SVG Simulated Map */}
            <div className="h-64 relative bg-slate-50 flex items-center justify-center p-4">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Grid patterns */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Road paths */}
                <path d="M 50 120 C 150 120, 200 40, 300 80 C 400 120, 420 200, 520 180" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
                <path d="M 50 120 C 150 120, 200 40, 300 80 C 400 120, 420 200, 520 180" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                
                {/* Track active route color */}
                <path d="M 50 120 C 150 120, 200 40, 300 80" fill="none" stroke="#ff9800" strokeWidth="6" strokeLinecap="round" strokeDasharray="6 4 animate-dash" />

                {/* Pickup marker */}
                <circle cx="50" cy="120" r="10" fill="#10b981" fillOpacity="0.2" />
                <circle cx="50" cy="120" r="5" fill="#10b981" />
                
                {/* Drop marker */}
                <circle cx="300" cy="80" r="12" fill="#f43f5e" fillOpacity="0.2" />
                <circle cx="300" cy="80" r="6" fill="#f43f5e" />

                {/* Rider animation marker */}
                {status !== 'delivered' && (
                  <g transform="translate(180, 75)">
                    <circle r="14" fill="#ff9800" fillOpacity="0.3" className="animate-ping" />
                    <circle r="8" fill="#ff9800" />
                    <path d="M -3 -3 L 3 0 L -3 3 Z" fill="white" />
                  </g>
                )}
              </svg>

              {/* Float Map Info Overlay */}
              <div className="absolute bottom-3 left-3 bg-dark/90 text-white rounded-xl p-3 text-[10px] space-y-1 backdrop-blur-xs border border-gray-800 shadow-lg">
                <p className="font-bold flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span> Rider En Route</p>
                <p className="text-gray-400">Moving along HSR Main Road</p>
              </div>
            </div>
          </div>

          {/* Stepper Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
            <h3 className="font-display font-extrabold text-lg text-dark">Track Progress</h3>
            
            {/* Visual Stepper */}
            <div className="relative">
              {/* Stepper Line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gray-100 z-0">
                <div 
                  className="bg-primary w-full transition-all duration-500" 
                  style={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {/* Steps */}
              <div className="space-y-6 relative z-10">
                {steps.map((step, index) => {
                  const isCompleted = index < activeIndex;
                  const isActive = index === activeIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-4">
                      {/* Step Indicator Dot */}
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 transition-colors duration-300 ${
                        isCompleted 
                          ? 'bg-primary border-primary text-white' 
                          : isActive 
                            ? 'bg-orange-50 border-primary text-primary ring-4 ring-orange-100' 
                            : 'bg-white border-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </span>
                      
                      {/* Step Label */}
                      <div>
                        <h4 className={`text-sm font-bold ${isActive ? 'text-primary' : 'text-dark'}`}>{step.label}</h4>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {isCompleted ? 'Completed' : isActive ? 'Active Now' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Assigned Rider & Summary Card */}
        <div className="space-y-6">
          {/* Assigned Rider Info */}
          <div>
            <h3 className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider mb-3">Assigned Executive</h3>
            <RideCard
              rider={orderData.rider}
              pickup={orderData.pickup || "HSR Layout Sector 3"}
              drop={orderData.receiverAddress || orderData.drop || "Order Destination"}
              fare={orderData.total || orderData.price || orderData.fare}
              status={orderData.status}
              showActions={true}
            />
          </div>

          {/* Details Summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h4 className="font-display font-bold text-sm text-dark border-b border-gray-50 pb-2">Order Breakdown</h4>
            
            <div className="text-xs space-y-2.5">
              <div className="flex justify-between text-gray-500">
                <span>Service Category:</span>
                <span className="font-bold text-dark uppercase">{serviceType}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Transaction Reference:</span>
                <span className="font-mono font-bold text-dark">{orderData.id}</span>
              </div>
              
              {serviceType === 'food' && (
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-gray-400 font-semibold mb-1">Dishes ordered:</p>
                  <ul className="space-y-1 text-gray-500">
                    {orderData.items?.map(i => (
                      <li key={i.id} className="flex justify-between">
                        <span>{i.name} x{i.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {serviceType === 'parcel' && (
                <div className="pt-2 border-t border-slate-100 space-y-1 text-gray-500">
                  <p>Weight Class: <strong className="text-dark">{orderData.weight}</strong></p>
                  <p>Description: <strong className="text-dark">{orderData.description}</strong></p>
                  <p>Tracking Ref: <strong className="text-primary font-mono">{orderData.trackingId}</strong></p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;
