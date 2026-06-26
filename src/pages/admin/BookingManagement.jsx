import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

const BookingManagement = () => {
  const { bookings, orders, parcels, updateOrderStatus } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('taxi');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'taxi', name: 'Taxi Rides', count: bookings.length },
    { id: 'food', name: 'Food Orders', count: orders.length },
    { id: 'parcel', name: 'Parcels', count: parcels.length }
  ];

  const handleOverrideStatus = (id, type, newStatus) => {
    updateOrderStatus(id, type, newStatus);
  };

  const getFilteredData = () => {
    let source = [];
    let type = 'ride';

    if (activeTab === 'taxi') {
      source = bookings;
      type = 'ride';
    } else if (activeTab === 'food') {
      source = orders;
      type = 'food';
    } else {
      source = parcels;
      type = 'parcel';
    }

    return source.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.restaurantName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.rider?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    }).map(item => ({ ...item, serviceType: type }));
  };

  const currentRecords = getFilteredData();

  return (
    <div className="bg-white rounded-xl border border-zinc-100 p-6 space-y-6 text-zinc-900 shadow-sm animate-fade-in">
      
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">Job & Booking Ledgers</h2>
          <p className="text-xs text-zinc-500">Track ride requests, courier routes, and kitchen preparation pipelines.</p>
        </div>

        <div className="flex flex-wrap w-full md:w-auto gap-2">
          {/* Search */}
          <div className="relative flex-1 md:flex-none md:w-48">
            <input
              type="text"
              placeholder="Search ID, rider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full px-3 py-2 bg-zinc-50 rounded-lg text-xs font-semibold transition text-zinc-900 placeholder-zinc-400 input-premium"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 bg-zinc-50 rounded-lg text-xs font-semibold text-zinc-700 transition bg-white input-premium"
            >
              <option value="All">All Statuses</option>
              <option value="placed">Placed / Booked</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="picked">Picked Up</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 overflow-x-auto scrollbar-none gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setStatusFilter('All');
            }}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition duration-200 uppercase tracking-wider ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-zinc-400 hover:text-zinc-650'
            }`}
          >
            {tab.name} <span className="ml-1 text-[10px] text-zinc-400 font-medium">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              <th className="pb-3">Transaction ID</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Source/Details</th>
              <th className="pb-3">Rider/Executive</th>
              <th className="pb-3">Fare/Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Override Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
            {currentRecords.length > 0 ? (
              currentRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-accent-peach/20 transition">
                  <td className="py-3.5 font-mono text-[11px] text-zinc-400">{rec.id}</td>
                  <td className="py-3.5 text-zinc-550 font-medium">{rec.date}</td>
                  <td className="py-3.5 max-w-[180px] truncate">
                    <p className="font-bold text-zinc-900 truncate">
                      {rec.restaurantName ? `Restaurant: ${rec.restaurantName}` : `Pickup: ${rec.pickup}`}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
                      {rec.drop ? `Drop: ${rec.drop}` : rec.receiverAddress ? `Drop: ${rec.receiverAddress}` : ''}
                    </p>
                  </td>
                  <td className="py-3.5">
                    {rec.rider ? (
                      <div className="space-y-0.5">
                        <p className="font-bold text-zinc-800">{rec.rider.name}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase">{rec.rider.vehicleType}</p>
                      </div>
                    ) : (
                      <span className="text-zinc-400 font-medium italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 font-bold text-zinc-900">
                    ₹{(rec.total || rec.price || rec.fare).toFixed(2)}
                  </td>
                  <td className="py-3.5">
                    <StatusBadge status={rec.status} />
                  </td>
                  <td className="py-3.5 text-right">
                    <select
                      value={rec.status}
                      onChange={(e) => handleOverrideStatus(rec.id, rec.serviceType, e.target.value)}
                      className="px-2 py-1 bg-zinc-50 hover:bg-accent-peach/20 border border-zinc-200 focus:border-primary rounded-md text-[10px] font-bold text-zinc-755 focus:outline-none transition"
                    >
                      <option value="placed">Placed</option>
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="picked">Picked Up</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-zinc-400 font-bold">
                  No records match parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default BookingManagement;
