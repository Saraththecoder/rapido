import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ShoppingBag } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, cuisine, rating, deliveryTime, minOrder, image, isOpen } = restaurant;

  return (
    <Link 
      to={isOpen ? `/user/food/${id}` : '#'}
      className={`group block bg-white rounded-xl border border-zinc-100 overflow-hidden hover:border-primary/20 hover:shadow-md transition duration-200 ${!isOpen ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      <div className="relative h-40 w-full bg-zinc-50 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale-20 group-hover:scale-103 transition duration-300"
        />
        {/* Open/Closed Label */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase ${isOpen ? 'bg-primary text-white' : 'bg-zinc-200 text-zinc-650'}`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      <div className="p-4 text-left">
        <h3 className="font-display font-bold text-base text-zinc-900 truncate mb-0.5">{name}</h3>
        <p className="text-xs text-zinc-450 truncate mb-3">{cuisine}</p>
        
        <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star size={13} className="text-primary fill-primary" />
            <span className="text-xs font-bold text-zinc-800">{rating}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 text-zinc-450">
            <Clock size={13} />
            <span className="text-xs font-semibold">{deliveryTime}</span>
          </div>

          {/* Min Order */}
          <div className="flex items-center gap-1 text-zinc-450">
            <ShoppingBag size={13} />
            <span className="text-xs font-semibold">Min: ₹{minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
