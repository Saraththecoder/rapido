import React from 'react';
import { Star, Phone, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

const RideCard = ({ rider, pickup, drop, fare, status, onCancel, showActions = true }) => {
  if (!rider) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-center">
        <p className="text-gray-500 font-medium">Finding an available driver nearby...</p>
        <div className="mt-3 flex justify-center">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const getVehicleNumber = (name, type) => {
    // Generate a mock vehicle registration number based on name
    const stateCode = "KA 03";
    const letters = name.slice(0, 2).toUpperCase();
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return `${stateCode} ${letters} ${numbers}`;
  };

  const getVehicleName = (type) => {
    switch (type) {
      case 'bike': return 'Bajaj Pulsar 150';
      case 'auto': return 'Piaggio Ape Auto';
      case 'car': return 'Suzuki WagonR (Cab)';
      default: return 'SwiftGo Ride';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center font-bold font-display text-xl uppercase">
            {rider.name.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-dark text-base">{rider.name}</h4>
              <span className="bg-orange-50 text-primary-hover px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                <ShieldCheck size={10} /> Verified
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
              <span className="font-semibold">{getVehicleName(rider.vehicleType)}</span>
              <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-dark font-bold text-[10px]">
                {getVehicleNumber(rider.name, rider.vehicleType)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-amber-500 font-bold text-sm">
            <Star size={14} className="fill-current" />
            <span>{rider.rating || '4.8'}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Rating</p>
        </div>
      </div>

      {/* Ride details summary */}
      <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-2 border border-slate-100">
        <div className="flex items-center justify-between text-gray-500">
          <span>Pickup: <strong className="text-dark">{pickup}</strong></span>
        </div>
        <div className="flex items-center justify-between text-gray-500">
          <span>Drop: <strong className="text-dark">{drop}</strong></span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 font-semibold text-dark">
          <span>Total Fare:</span>
          <span className="text-primary text-sm font-bold">₹{fare}</span>
        </div>
      </div>

      {/* Status Alert */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="text-xs text-gray-500">
          Status: <span className="font-bold text-primary capitalize">{status}</span>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            <a 
              href={`tel:${rider.phone}`}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-gray-700 rounded-xl transition duration-200 border border-slate-100"
              title="Call Rider"
            >
              <Phone size={16} />
            </a>
            <button 
              onClick={() => alert(`Chatting with ${rider.name}...`)}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-gray-700 rounded-xl transition duration-200 border border-slate-100"
              title="Message Rider"
            >
              <MessageSquare size={16} />
            </button>
            {status !== 'delivered' && status !== 'completed' && onCancel && (
              <button 
                onClick={onCancel}
                className="text-xs font-semibold text-rose-500 hover:bg-rose-50 px-3 py-2 rounded-xl transition border border-rose-100"
              >
                Cancel Ride
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideCard;
