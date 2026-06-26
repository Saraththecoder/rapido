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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8 text-left animate-fade-in">
      
      {/* Header */}
      <div className="space-y-1.5 border-l-4 border-primary pl-4 py-1">
        <h2 className="font-display font-black text-3xl text-zinc-900 tracking-tight">Statement Logs</h2>
        <p className="text-zinc-505 text-xs font-semibold">Track and manage your taxi rides, food orders, and parcel shipments</p>
      </div>

      {/* Tabs */}
      <div className="bg-accent-peach/30 border border-primary/10 p-1.5 rounded-2xl flex overflow-x-auto scrollbar-none gap-1.5 max-w-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-2 flex-1 cursor-pointer active:scale-98 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md shadow-primary/20 font-extrabold'
                : 'text-zinc-500 hover:text-primary hover:bg-accent-peach/50'
            }`}
          >
            <span>{tab.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
              activeTab === tab.id
                ? 'bg-white/20 text-white'
                : 'bg-primary/10 text-primary border border-primary/5'
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Lists Content */}
      <div className="space-y-4">
        {activeTab === 'taxi' && (
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-primary/10 p-5 md:p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="p-3 bg-accent-peach/40 border border-primary/10 text-primary rounded-xl shrink-0">
                      <Car size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">Ride #{booking.id}</span>
                        <span className="text-zinc-200">•</span>
                        <span className="text-[11px] text-zinc-400 font-semibold">{booking.date}</span>
                      </div>
                      
                      {/* Connected Pickup/Drop Route */}
                      <div className="mt-3 relative pl-4 border-l border-dashed border-zinc-200 space-y-3 text-xs font-semibold">
                        <div className="relative">
                          <span className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-primary border-2 border-white ring-2 ring-primary/20"></span>
                          <p className="text-zinc-500 leading-tight">
                            Pickup: <span className="text-zinc-800 font-bold ml-1">{booking.pickup}</span>
                          </p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-500/20"></span>
                          <p className="text-zinc-500 leading-tight">
                            Dropoff: <span className="text-zinc-800 font-bold ml-1">{booking.drop}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status, Price, and Track Button */}
                  <div className="flex items-center md:items-end justify-between md:flex-col border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0 gap-3 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={booking.status} />
                      <p className="text-lg font-black text-primary mt-1">₹{booking.fare}</p>
                    </div>
                    
                    {booking.status !== 'delivered' && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/ride-${booking.id}`}
                        className="btn-primary text-[10px] px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                      >
                        <span>Track Ride</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-primary/10 p-12 text-center text-zinc-400 text-xs font-semibold shadow-sm flex flex-col items-center justify-center gap-2">
                <Car size={24} className="text-zinc-300" />
                <p>No taxi rides booked yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-primary/10 p-5 md:p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="p-3 bg-accent-peach/40 border border-primary/10 text-primary rounded-xl shrink-0">
                      <Utensils size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">Order #{order.id}</span>
                        <span className="text-zinc-200">•</span>
                        <span className="text-[11px] text-zinc-400 font-semibold">{order.date}</span>
                      </div>
                      
                      <h4 className="font-bold text-zinc-900 text-sm mt-2 truncate">{order.restaurantName}</h4>
                      <p className="text-xs text-zinc-500 mt-1 truncate max-w-md font-semibold">
                        {order.items?.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Status, Price, and Track Button */}
                  <div className="flex items-center md:items-end justify-between md:flex-col border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0 gap-3 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={order.status} />
                      <p className="text-lg font-black text-primary mt-1">₹{order.total}</p>
                    </div>
                    
                    {order.status !== 'delivered' && order.status !== 'completed' && order.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/food-${order.id}`}
                        className="btn-primary text-[10px] px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                      >
                        <span>Track Order</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-primary/10 p-12 text-center text-zinc-400 text-xs font-semibold shadow-sm flex flex-col items-center justify-center gap-2">
                <Utensils size={24} className="text-zinc-300" />
                <p>No food orders placed yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'parcel' && (
          <div className="space-y-4">
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <div key={parcel.id} className="bg-white rounded-2xl border border-primary/10 p-5 md:p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="p-3 bg-accent-peach/40 border border-primary/10 text-primary rounded-xl shrink-0">
                      <Package size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">Shipment #{parcel.id}</span>
                        <span className="text-zinc-200">•</span>
                        <span className="text-[11px] text-zinc-400 font-semibold">{parcel.date}</span>
                      </div>
                      
                      <div className="mt-2.5 space-y-1.5 text-xs font-semibold">
                        <p className="text-zinc-550">Recipient: <strong className="text-zinc-800">{parcel.receiverName}</strong></p>
                        <p className="flex items-start gap-1.5 text-zinc-555">
                          <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                          <span className="truncate">Destination: <strong className="text-zinc-800">{parcel.receiverAddress}</strong></span>
                        </p>
                        <p className="text-zinc-550">Content: <span className="font-bold text-zinc-800">{parcel.description} ({parcel.weight})</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Status, Price, and Track Button */}
                  <div className="flex items-center md:items-end justify-between md:flex-col border-t md:border-t-0 border-zinc-100 pt-4 md:pt-0 gap-3 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={parcel.status} />
                      <p className="text-lg font-black text-primary mt-1">₹{parcel.price}</p>
                    </div>
                    
                    {parcel.status !== 'delivered' && parcel.status !== 'completed' && parcel.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/parcel-${parcel.id}`}
                        className="btn-primary text-[10px] px-4 py-2 rounded-xl uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                      >
                        <span>Track Parcel</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-primary/10 p-12 text-center text-zinc-400 text-xs font-semibold shadow-sm flex flex-col items-center justify-center gap-2">
                <Package size={24} className="text-zinc-300" />
                <p>No parcel shipments found.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingHistory;
