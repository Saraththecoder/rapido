import React from 'react';

const StatusBadge = ({ status }) => {
  const getDotColor = (statusVal) => {
    const s = statusVal?.toLowerCase();
    switch (s) {
      case 'placed':
      case 'pending':
      case 'booked':
        return 'bg-zinc-400';
      
      case 'preparing':
      case 'picked':
      case 'picked up':
        return 'bg-amber-400';
      
      case 'in-transit':
      case 'on the way':
        return 'bg-blue-400';
      
      case 'delivered':
      case 'completed':
      case 'active':
        return 'bg-emerald-500';
      
      case 'cancelled':
      case 'suspended':
      case 'blocked':
        return 'bg-rose-500';
        
      default:
        return 'bg-zinc-400';
    }
  };

  const capitalize = (val) => {
    if (!val) return '';
    return val.charAt(0).toUpperCase() + val.slice(1).replace('-', ' ');
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-zinc-650 bg-white border border-zinc-200">
      <span className={`h-1.5 w-1.5 rounded-full ${getDotColor(status)}`}></span>
      <span>{capitalize(status)}</span>
    </span>
  );
};

export default StatusBadge;
