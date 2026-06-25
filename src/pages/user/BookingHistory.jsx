import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Car, Utensils, Package, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';

const BookingHistory = () => {
  const { bookings, orders, parcels } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('taxi');

  const tabs = [
    { id: 'taxi', name: 'Taxi Bookings', count: bookings.length },
    { id: 'food', name: 'Food Orders', count: orders.length },
    { id: 'parcel', name: 'Parcel Shipments', count: parcels.length }
  ];

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 text-left">
      
      {/* Header */}
      <h2 className="font-display font-black text-2xl text-zinc-900 tracking-tight">Statement Logs</h2>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 overflow-x-auto scrollbar-none gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition duration-150 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'border-zinc-900 text-zinc-950'
                : 'border-transparent text-zinc-400 hover:text-zinc-650'
            }`}
          >
            <span>{tab.name}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded-md text-zinc-500">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Lists Content */}
      <div className="space-y-4">
        {activeTab === 'taxi' && (
          <div className="space-y-3">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl border border-zinc-200 p-4 hover:border-zinc-350 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2.5 bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-lg shrink-0">
                      <Car size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 font-bold">{booking.id}</span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-[11px] text-zinc-450 font-semibold">{booking.date}</span>
                      </div>
                      
                      <div className="mt-2 space-y-1 text-xs font-semibold">
                        <p className="flex items-center gap-1.5 text-zinc-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0"></span>
                          <span className="truncate">Pickup: <strong className="text-zinc-800">{booking.pickup}</strong></span>
                        </p>
                        <p className="flex items-center gap-1.5 text-zinc-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-zinc-950 shrink-0"></span>
                          <span className="truncate">Drop: <strong className="text-zinc-800">{booking.drop}</strong></span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-zinc-100 pt-3 md:pt-0 gap-2 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={booking.status} />
                      <p className="text-base font-black text-zinc-900 mt-1">₹{booking.fare}</p>
                    </div>
                    
                    {booking.status !== 'delivered' && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/ride-${booking.id}`}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition uppercase tracking-wider"
                      >
                        Track Ride
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center text-zinc-400 text-xs font-semibold">No taxi rides booked yet.</div>
            )}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl border border-zinc-200 p-4 hover:border-zinc-350 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2.5 bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-lg shrink-0">
                      <Utensils size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 font-bold">{order.id}</span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-[11px] text-zinc-450 font-semibold">{order.date}</span>
                      </div>
                      
                      <h4 className="font-bold text-zinc-900 text-sm mt-1.5 truncate">{order.restaurantName}</h4>
                      <p className="text-xs text-zinc-450 mt-0.5 truncate max-w-md font-semibold">
                        {order.items?.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-zinc-100 pt-3 md:pt-0 gap-2 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={order.status} />
                      <p className="text-base font-black text-zinc-900 mt-1">₹{order.total}</p>
                    </div>
                    
                    {order.status !== 'delivered' && order.status !== 'completed' && order.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/food-${order.id}`}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition uppercase tracking-wider"
                      >
                        Track Order
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center text-zinc-400 text-xs font-semibold">No food orders placed yet.</div>
            )}
          </div>
        )}

        {activeTab === 'parcel' && (
          <div className="space-y-3">
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <div key={parcel.id} className="bg-white rounded-xl border border-zinc-200 p-4 hover:border-zinc-350 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2.5 bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-lg shrink-0">
                      <Package size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 font-bold">{parcel.id}</span>
                        <span className="text-zinc-300">•</span>
                        <span className="text-[11px] text-zinc-455 font-semibold">{parcel.date}</span>
                      </div>
                      
                      <div className="mt-2 space-y-1 text-xs font-semibold">
                        <p className="text-zinc-500">Receiver: <strong className="text-zinc-800">{parcel.receiverName}</strong></p>
                        <p className="flex items-start gap-1 text-zinc-500">
                          <MapPin size={13} className="text-zinc-400 shrink-0 mt-0.5" />
                          <span className="truncate">Drop: <strong className="text-zinc-800">{parcel.receiverAddress}</strong></span>
                        </p>
                        <p className="text-zinc-450">Content: <span className="font-bold text-zinc-850">{parcel.description} ({parcel.weight})</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-zinc-100 pt-3 md:pt-0 gap-2 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={parcel.status} />
                      <p className="text-base font-black text-zinc-900 mt-1">₹{parcel.price}</p>
                    </div>
                    
                    {parcel.status !== 'delivered' && parcel.status !== 'completed' && parcel.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/parcel-${parcel.id}`}
                        className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition uppercase tracking-wider"
                      >
                        Track Parcel
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center text-zinc-400 text-xs font-semibold">No parcel shipments found.</div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingHistory;
