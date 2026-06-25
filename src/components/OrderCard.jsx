import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, MapPin, Package } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderCard = ({ order, type = 'food' }) => {
  const isFood = type === 'food';
  const isParcel = type === 'parcel';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100/60 p-4 space-y-4">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className={`p-2.5 rounded-xl ${isFood ? 'bg-orange-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
            {isFood ? <ShoppingBag size={20} /> : <Package size={20} />}
          </div>
          <div>
            <h4 className="font-bold text-dark text-base">
              {isFood ? order.restaurantName : `Parcel to: ${order.receiverName}`}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              ID: <span className="font-semibold text-gray-500">{order.id}</span> • {order.date}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Item list / Routes */}
      {isFood && (
        <div className="text-sm text-gray-600 pl-1">
          <ul className="space-y-1">
            {order.items?.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} <strong className="text-dark">x{item.quantity}</strong></span>
                <span className="text-gray-500">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isParcel && (
        <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-2 border border-slate-100">
          <div className="flex items-start gap-1.5 text-gray-600">
            <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-dark">Drop Location</p>
              <p className="text-gray-500 mt-0.5">{order.receiverAddress}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/60 flex justify-between text-gray-500">
            <span>Weight: <strong className="text-dark">{order.weight}</strong></span>
            <span>Content: <strong className="text-dark truncate max-w-[120px]">{order.description}</strong></span>
          </div>
        </div>
      )}

      {/* Summary Footer */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-1">
        <div>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Total Charged</p>
          <p className="font-extrabold text-dark text-lg">₹{order.total || order.price}</p>
        </div>

        {/* Dynamic CTA button based on status */}
        {order.status !== 'delivered' && order.status !== 'completed' && order.status !== 'cancelled' ? (
          <Link
            to={isFood ? `/user/track/food-${order.id}` : `/user/track/parcel-${order.id}`}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition duration-200"
          >
            <span>Track Order</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <span className="text-xs text-gray-400 font-medium italic">
            Order Complete
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
