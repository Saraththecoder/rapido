import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ArrowLeft, Clock } from 'lucide-react';
import RideCard from '../../components/RideCard';
import StatusBadge from '../../components/StatusBadge';

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, parcels, bookings } = useContext(AppContext);

  const idParts = orderId.split('-');
  const serviceType = idParts[0]; // 'food' or 'parcel' or 'ride'
  const actualId = idParts[1] || orderId;

  let orderData = null;
  if (serviceType === 'food') {
    orderData = orders.find(o => o.id === actualId);
  } else if (serviceType === 'parcel') {
    orderData = parcels.find(p => p.id === actualId);
  } else if (serviceType === 'ride' || actualId.startsWith('TX')) {
    orderData = bookings.find(b => b.id === actualId);
  }

  if (!orderData) {
    orderData = orders.find(o => o.id === orderId) || 
                parcels.find(p => p.id === orderId) || 
                bookings.find(b => b.id === orderId);
  }

  if (!orderData) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-20 space-y-4 text-left">
        <p className="text-zinc-550 font-bold">Order not found.</p>
        <Link to="/user/dashboard" className="text-zinc-900 font-bold hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

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
    steps = [
      { key: 'placed', label: 'Ride Booked' },
      { key: 'preparing', label: 'Rider Arrived' },
      { key: 'picked', label: 'Trip Started' },
      { key: 'delivered', label: 'Trip Ended' }
    ];
    activeIndex = steps.findIndex(s => s.key === status);
    if (status === 'delivered') activeIndex = 3;
  }

  if (activeIndex === -1) activeIndex = 0;

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 text-left">
      
      {/* Back to Dashboard */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/user/dashboard')}
          className="p-2 bg-white hover:bg-zinc-50 text-zinc-700 rounded-lg border border-zinc-200 transition"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Back to Dashboard</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map and Stepper */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Simulated Premium SVG Map */}
          <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden relative shadow-sm">
            <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
              <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">Live Delivery Track</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                <Clock size={13} className="text-zinc-650" /> ETA: 12 mins
              </span>
            </div>

            {/* Custom SVG Simulated Map */}
            <div className="relative w-full aspect-[400/200] bg-zinc-50 p-4">
              <svg viewBox="0 0 580 220" className="absolute inset-0 w-full h-full p-3" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <rect width="100%" height="100%" fill="#fafafa" />
                <line x1="100" y1="0" x2="100" y2="220" stroke="#f4f4f5" strokeWidth="1" />
                <line x1="250" y1="0" x2="250" y2="220" stroke="#f4f4f5" strokeWidth="1" />
                <line x1="400" y1="0" x2="400" y2="220" stroke="#f4f4f5" strokeWidth="1" />
                <line x1="0" y1="110" x2="580" y2="110" stroke="#f4f4f5" strokeWidth="1" />
                
                {/* Road paths */}
                <path d="M 50 120 C 150 120, 200 40, 300 80 C 400 120, 420 200, 520 180" fill="none" stroke="#e4e4e7" strokeWidth="10" strokeLinecap="round" />
                
                {/* Track active route color */}
                <path d="M 50 120 C 150 120, 200 40, 300 80" fill="none" stroke="#FC5A2A" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 3" />

                {/* Pickup marker */}
                <circle cx="50" cy="120" r="4" fill="#FC5A2A" />
                
                {/* Drop marker */}
                <circle cx="300" cy="80" r="4" fill="#71717a" />

                {/* Rider animation marker */}
                {status !== 'delivered' && (
                  <g transform="translate(180, 75)">
                    <circle r="6" fill="#FC5A2A" />
                  </g>
                )}
              </svg>

              {/* Float Map Info Overlay */}
              <div className="absolute bottom-3 left-3 bg-white border border-zinc-200 rounded-xl p-3 text-[10px] space-y-0.5 shadow-sm text-left">
                <p className="font-bold text-zinc-900 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span> Rider En Route</p>
                <p className="text-zinc-550 font-medium">Moving along HSR Main Road</p>
              </div>
            </div>
          </div>

          {/* Stepper Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6 shadow-sm">
            <h3 className="font-display font-bold text-base text-zinc-900">Track Progress</h3>
            
            {/* Visual Stepper */}
            <div className="relative">
              {/* Stepper Line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-zinc-150 z-0">
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
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 transition duration-150 ${
                        isCompleted 
                          ? 'bg-primary border-primary text-white shadow-sm' 
                          : isActive 
                            ? 'bg-accent-peach/30 border-primary text-primary font-bold shadow-sm' 
                            : 'bg-white border-zinc-200 text-zinc-400'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </span>
                      
                      {/* Step Label */}
                      <div className="text-left">
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-zinc-455'}`}>{step.label}</h4>
                        <p className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${isActive ? 'text-primary animate-pulse' : 'text-zinc-400'}`}>
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
            <h3 className="font-display font-bold text-[10px] text-zinc-400 uppercase tracking-wider mb-2">Assigned Executive</h3>
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
          <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4 text-left shadow-sm">
            <h4 className="font-display font-bold text-xs text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">Order Breakdown</h4>
            
            <div className="text-xs space-y-3 font-semibold">
              <div className="flex justify-between text-zinc-500">
                <span>Service Category:</span>
                <span className="font-bold text-zinc-900 uppercase">{serviceType}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Transaction Reference:</span>
                <span className="font-mono font-bold text-zinc-900">{orderData.id}</span>
              </div>
              
              {serviceType === 'food' && (
                <div className="pt-2 border-t border-zinc-100">
                  <p className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider mb-1.5">Dishes ordered:</p>
                  <ul className="space-y-1.5 text-zinc-650">
                    {orderData.items?.map(i => (
                      <li key={i.id} className="flex justify-between">
                        <span>{i.name} x{i.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {serviceType === 'parcel' && (
                <div className="pt-2 border-t border-zinc-100 space-y-1.5 text-zinc-650">
                  <p>Weight Class: <strong className="text-zinc-800 font-bold">{orderData.weight}</strong></p>
                  <p>Description: <strong className="text-zinc-800 font-bold">{orderData.description}</strong></p>
                  <p>Tracking Ref: <strong className="text-zinc-800 font-mono font-bold">{orderData.trackingId}</strong></p>
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
