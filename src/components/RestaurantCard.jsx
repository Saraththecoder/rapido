import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ShoppingBag } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, cuisine, rating, deliveryTime, minOrder, image, isOpen } = restaurant;

  return (
    <Link 
      to={isOpen ? `/user/food/${id}` : '#'}
      className={`block bg-white rounded-2xl shadow-sm border border-gray-100/60 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition duration-300 ${!isOpen ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      <div className="relative h-44 w-full bg-slate-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {/* Open/Closed Label */}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${isOpen ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-100'}`}>
            {isOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-dark truncate leading-tight mb-1">{name}</h3>
        <p className="text-xs text-gray-500 truncate mb-3">{cuisine}</p>
        
        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="bg-amber-50 text-amber-600 p-1 rounded-lg flex items-center justify-center">
              <Star size={14} className="fill-amber-600" />
            </span>
            <span className="text-sm font-bold text-dark">{rating}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={14} />
            <span className="text-xs font-semibold">{deliveryTime}</span>
          </div>

          {/* Min Order */}
          <div className="flex items-center gap-1 text-gray-500">
            <ShoppingBag size={14} />
            <span className="text-xs font-semibold">Min: ₹{minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
