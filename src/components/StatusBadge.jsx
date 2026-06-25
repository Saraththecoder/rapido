import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (statusVal) => {
    const s = statusVal?.toLowerCase();
    switch (s) {
      // General/Pending/Placed
      case 'placed':
      case 'pending':
      case 'booked':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      
      // Prep/Assign
      case 'preparing':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'picked':
      case 'picked up':
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      
      // Transit
      case 'in-transit':
      case 'on the way':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      
      // Complete
      case 'delivered':
      case 'completed':
      case 'active':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      
      // Closed/Blocked
      case 'cancelled':
      case 'suspended':
      case 'blocked':
        return 'bg-rose-100 text-rose-800 border border-rose-200';
        
      default:
        return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const capitalize = (val) => {
    if (!val) return '';
    return val.charAt(0).toUpperCase() + val.slice(1).replace('-', ' ');
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {capitalize(status)}
    </span>
  );
};

export default StatusBadge;
