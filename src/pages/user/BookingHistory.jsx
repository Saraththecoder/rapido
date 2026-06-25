import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Car, Utensils, Package, Calendar, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Header */}
      <h2 className="font-display font-extrabold text-2xl text-dark">History & Statements</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.name} <span className="ml-1 text-xs font-semibold px-2 py-0.5 bg-slate-50 border rounded-full text-gray-500">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tab Lists Content */}
      <div className="space-y-4">
        {activeTab === 'taxi' && (
          <div className="space-y-3">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-sm hover:border-gray-200 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-orange-50 text-primary rounded-xl shrink-0">
                      <Car size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-400 font-bold">{booking.id}</span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">{booking.date}</span>
                      </div>
                      
                      <div className="mt-2 space-y-1 text-xs">
                        <p className="flex items-center gap-1 text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <span>Pickup: <strong className="text-dark">{booking.pickup}</strong></span>
                        </p>
                        <p className="flex items-center gap-1 text-gray-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                          <span>Drop: <strong className="text-dark">{booking.drop}</strong></span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-gray-50 pt-3 md:pt-0 gap-2 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={booking.status} />
                      <p className="text-base font-extrabold text-dark mt-1">₹{booking.fare}</p>
                    </div>
                    
                    {booking.status !== 'delivered' && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/ride-${booking.id}`}
                        className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition"
                      >
                        Track Ride
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400">No taxi rides booked yet.</div>
            )}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-sm hover:border-gray-200 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                      <Utensils size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-400 font-bold">{order.id}</span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">{order.date}</span>
                      </div>
                      
                      <h4 className="font-bold text-dark text-base mt-1.5">{order.restaurantName}</h4>
                      <p className="text-xs text-gray-400 mt-0.5 max-w-sm font-medium">
                        {order.items?.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-gray-50 pt-3 md:pt-0 gap-2 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={order.status} />
                      <p className="text-base font-extrabold text-dark mt-1">₹{order.total}</p>
                    </div>
                    
                    {order.status !== 'delivered' && order.status !== 'completed' && order.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/food-${order.id}`}
                        className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition"
                      >
                        Track Order
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400">No food orders placed yet.</div>
            )}
          </div>
        )}

        {activeTab === 'parcel' && (
          <div className="space-y-3">
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <div key={parcel.id} className="bg-white rounded-2xl border border-gray-100/60 p-4 shadow-sm hover:border-gray-200 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-400 font-bold">{parcel.id}</span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-xs text-gray-500 font-medium">{parcel.date}</span>
                      </div>
                      
                      <div className="mt-2 space-y-1 text-xs">
                        <p className="text-gray-500">Receiver: <strong className="text-dark">{parcel.receiverName} ({parcel.receiverPhone})</strong></p>
                        <p className="flex items-start gap-1 text-gray-500">
                          <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                          <span>Drop: <strong className="text-dark">{parcel.receiverAddress}</strong></span>
                        </p>
                        <p className="text-gray-400">Content: <span className="font-medium text-dark">{parcel.description} ({parcel.weight})</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-gray-50 pt-3 md:pt-0 gap-2 shrink-0">
                    <div className="text-left md:text-right">
                      <StatusBadge status={parcel.status} />
                      <p className="text-base font-extrabold text-dark mt-1">₹{parcel.price}</p>
                    </div>
                    
                    {parcel.status !== 'delivered' && parcel.status !== 'completed' && parcel.status !== 'cancelled' && (
                      <Link
                        to={`/user/track/parcel-${parcel.id}`}
                        className="bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition"
                      >
                        Track Parcel
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400">No parcel shipments found.</div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingHistory;
