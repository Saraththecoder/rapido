import React from 'react';
import { Star, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

const RideCard = ({ rider, pickup, drop, fare, status, onCancel, showActions = true }) => {
  if (!rider) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-6 text-center">
        <p className="text-zinc-550 font-medium text-xs">Finding an available driver nearby...</p>
        <div className="mt-3 flex justify-center">
          <div className="h-5 w-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const getVehicleNumber = (name) => {
    const letters = name.slice(0, 2).toUpperCase();
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return `KA 03 ${letters} ${numbers}`;
  };

  const getVehicleName = (type) => {
    switch (type) {
      case 'bike': return 'Bajaj Pulsar';
      case 'auto': return 'Piaggio Ape';
      case 'car': return 'Suzuki WagonR';
      default: return 'SwiftGo Ride';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4 text-left">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold text-base uppercase shrink-0">
            {rider.name.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-bold text-zinc-900 text-sm">{rider.name}</h4>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-0.5 border border-zinc-250 px-1 rounded">
                <ShieldCheck size={9} /> Verified
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mt-0.5 flex-wrap">
              <span className="font-semibold">{getVehicleName(rider.vehicleType)}</span>
              <span className="h-1 w-1 bg-zinc-300 rounded-full"></span>
              <span className="font-mono text-zinc-700 font-bold uppercase">
                {getVehicleNumber(rider.name)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="flex items-center justify-end gap-0.5 text-zinc-800 font-bold text-xs">
            <Star size={12} className="text-zinc-600 fill-zinc-650" />
            <span>{rider.rating || '4.8'}</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Rating</p>
        </div>
      </div>

      {/* Ride details summary */}
      <div className="bg-zinc-50 rounded-lg p-3 text-xs space-y-2 border border-zinc-150">
        <div className="flex justify-between items-center text-zinc-500 gap-2">
          <span>Pickup</span>
          <strong className="text-zinc-800 truncate max-w-[150px]">{pickup}</strong>
        </div>
        <div className="flex justify-between items-center text-zinc-500 gap-2">
          <span>Drop</span>
          <strong className="text-zinc-800 truncate max-w-[150px]">{drop}</strong>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-zinc-200 font-bold text-zinc-900">
          <span>Total Fare</span>
          <span>₹{fare}</span>
        </div>
      </div>

      {/* Status Alert */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 gap-2">
        <div className="text-xs text-zinc-500">
          Status: <span className="font-bold text-zinc-900 capitalize">{status}</span>
        </div>
        
        {showActions && (
          <div className="flex gap-1.5">
            <a 
              href={`tel:${rider.phone}`}
              className="p-1.5 bg-white hover:bg-zinc-50 text-zinc-600 rounded-lg border border-zinc-200 transition"
              title="Call Rider"
            >
              <Phone size={14} />
            </a>
            <button 
              onClick={() => alert(`Chatting with ${rider.name}...`)}
              className="p-1.5 bg-white hover:bg-zinc-50 text-zinc-600 rounded-lg border border-zinc-200 transition"
              title="Message Rider"
            >
              <MessageSquare size={14} />
            </button>
            {status !== 'delivered' && status !== 'completed' && onCancel && (
              <button 
                onClick={onCancel}
                className="text-[10px] font-bold uppercase tracking-wider text-rose-500 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-zinc-200 transition"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideCard;
