import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, MapPin, Package } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderCard = ({ order, type = 'food' }) => {
  const isFood = type === 'food';
  const isParcel = type === 'parcel';

  return (
    <div className="bg-white rounded-xl border border-zinc-100 p-4 space-y-4 text-left shadow-sm">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="p-2.5 rounded-lg bg-accent-peach/40 border border-primary/10 text-primary shrink-0">
            {isFood ? <ShoppingBag size={18} /> : <Package size={18} />}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-zinc-900 text-sm truncate">
              {isFood ? order.restaurantName : `Parcel to: ${order.receiverName}`}
            </h4>
            <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">
              ID: <span className="font-bold text-zinc-600">{order.id}</span> • {order.date}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Item list / Routes */}
      {isFood && (
        <div className="text-xs text-zinc-650 pl-1">
          <ul className="space-y-1">
            {order.items?.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} <strong className="text-zinc-800 font-bold">x{item.quantity}</strong></span>
                <span className="text-zinc-600 font-bold">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isParcel && (
        <div className="bg-accent-peach/10 rounded-lg p-3 text-xs space-y-2 border border-primary/5">
          <div className="flex items-start gap-1.5 text-zinc-650">
            <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-bold text-zinc-800">Drop Location</p>
              <p className="text-zinc-550 mt-0.5 truncate">{order.receiverAddress}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-primary/10 flex justify-between text-zinc-500 text-[11px] font-semibold">
            <span>Weight: <strong className="text-zinc-800 font-bold">{order.weight}</strong></span>
            <span>Content: <strong className="text-zinc-800 font-bold truncate max-w-[120px]">{order.description}</strong></span>
          </div>
        </div>
      )}

      {/* Summary Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-1 gap-2">
        <div>
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Total Charged</p>
          <p className="font-extrabold text-zinc-900 text-base">₹{order.total || order.price}</p>
        </div>

        {order.status !== 'delivered' && order.status !== 'completed' && order.status !== 'cancelled' ? (
          <Link
            to={isFood ? `/user/track/food-${order.id}` : `/user/track/parcel-${order.id}`}
            className="flex items-center gap-1 text-xs font-bold transition shrink-0 btn-primary px-3.5 py-1.5 rounded-lg"
          >
            <span>Track Order</span>
            <ChevronRight size={14} />
          </Link>
        ) : (
          <span className="text-xs text-zinc-400 font-medium italic shrink-0">
            Complete
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
