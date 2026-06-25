import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Star, Clock, ShoppingBag, ArrowLeft, Plus, Minus, ShoppingCart, X, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { 
    restaurants, 
    cart, 
    addToCart, 
    removeFromCart, 
    placeOrder, 
    currentUser 
  } = useContext(AppContext);

  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center py-20 space-y-4">
        <p className="text-gray-500 font-bold">Restaurant not found.</p>
        <Link to="/user/food" className="text-primary font-bold hover:underline">Back to Food Delivery</Link>
      </div>
    );
  }

  // Get unique categories from menu
  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];

  // Filtered menu items
  const filteredMenu = activeCategory === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === activeCategory);

  // Cart calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 35 : 0;
  
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SWIFT50') {
      if (cartSubtotal < 150) {
        toast.error("Minimum order for promo code is ₹150");
        return;
      }
      setDiscount(50);
      toast.success("Promo code applied! Saved ₹50");
    } else {
      toast.error("Invalid coupon code.");
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    const finalTotal = cartSubtotal + deliveryFee - discount;
    if (currentUser.walletBalance < finalTotal) {
      toast.error("Insufficient wallet balance. Please add money!");
      setIsCartOpen(false);
      navigate('/user/wallet');
      return;
    }

    const orderId = placeOrder(discount);
    if (orderId) {
      setIsCartOpen(false);
      setDiscount(0);
      setPromoCode('');
      navigate(`/user/track/food-${orderId}`);
    }
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-32 md:pb-24 relative">
      
      {/* Back button and Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/user/food')}
          className="p-2.5 bg-white hover:bg-slate-50 text-gray-700 rounded-xl transition border border-gray-100/60"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Back to Restaurants</span>
      </div>

      {/* Restaurant Info Header */}
      <div className="bg-white rounded-3xl border border-gray-100/60 shadow-sm overflow-hidden flex flex-col md:flex-row gap-6 p-6">
        <div className="h-44 w-full md:w-64 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-tight mb-2">
              {restaurant.name}
            </h2>
            <p className="text-sm text-gray-500 font-medium">{restaurant.cuisine}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-6 border-t border-gray-50 pt-4">
            <div className="flex items-center gap-1.5">
              <span className="bg-amber-50 text-amber-600 p-1.5 rounded-xl flex items-center justify-center">
                <Star size={16} className="fill-amber-600" />
              </span>
              <div>
                <p className="text-xs text-gray-400 font-semibold leading-3">Rating</p>
                <p className="text-sm font-bold text-dark mt-0.5">{restaurant.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="bg-orange-50 text-primary p-1.5 rounded-xl flex items-center justify-center">
                <Clock size={16} />
              </span>
              <div>
                <p className="text-xs text-gray-400 font-semibold leading-3">Delivery Time</p>
                <p className="text-sm font-bold text-dark mt-0.5">{restaurant.deliveryTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="bg-blue-50 text-blue-600 p-1.5 rounded-xl flex items-center justify-center">
                <ShoppingBag size={16} />
              </span>
              <div>
                <p className="text-xs text-gray-400 font-semibold leading-3">Minimum Order</p>
                <p className="text-sm font-bold text-dark mt-0.5">₹{restaurant.minOrder}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 my-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition duration-200 shrink-0 ${
              activeCategory === cat
                ? 'bg-dark text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-gray-600 border border-gray-150'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map((item) => {
          const qty = getItemQuantity(item.id);
          return (
            <div 
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100/60 p-4 flex gap-4 hover:border-gray-200 transition"
            >
              {/* Item Image */}
              <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="font-bold text-dark text-base leading-tight mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.category}</p>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-lg font-extrabold text-primary">₹{item.price}</p>
                  
                  {/* Add button / quantity controls */}
                  {qty > 0 ? (
                    <div className="flex items-center bg-primary text-white rounded-xl overflow-hidden">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="px-2.5 py-1.5 hover:bg-primary-hover transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2.5 text-xs font-bold font-mono">{qty}</span>
                      <button 
                        onClick={() => addToCart(item, restaurant)}
                        className="px-2.5 py-1.5 hover:bg-primary-hover transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item, restaurant)}
                      className="bg-white border border-primary text-primary hover:bg-orange-50 font-bold text-xs px-4 py-2 rounded-xl transition duration-200 flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Cart Summary Bar (shows if items in cart) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 max-w-lg mx-auto bg-dark text-white rounded-2xl shadow-xl p-4 flex items-center justify-between z-40 border border-gray-800 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary text-white rounded-xl">
              <ShoppingCart size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in cart</p>
              <p className="text-base font-extrabold text-white font-display">₹{cartSubtotal} <span className="text-[10px] text-gray-500 font-normal font-sans">excl. taxes</span></p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-3 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-orange-500/10"
          >
            <span>Review Cart</span>
            <ShoppingCart size={14} />
          </button>
        </div>
      )}

      {/* Cart Drawer / Slide-over Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full rounded-l-3xl border-l border-gray-100">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50 rounded-tl-3xl">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-primary" size={20} />
                  <h3 className="font-display font-extrabold text-lg text-dark">Checkout Cart</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 hover:bg-slate-200 text-gray-400 hover:text-dark rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="border-b border-gray-50 pb-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Restaurant</p>
                  <p className="text-base font-bold text-dark">{restaurant.name}</p>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex-1 min-w-0 pr-3">
                        <h4 className="font-bold text-dark text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-primary font-bold mt-0.5">₹{item.price}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white border border-gray-150 rounded-lg overflow-hidden shrink-0">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="px-2 py-1 text-gray-500 hover:bg-slate-50 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-dark font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item, restaurant)}
                          className="px-2 py-1 text-gray-500 hover:bg-slate-50 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 mt-6 space-y-3">
                  <label className="block text-xs font-bold text-orange-800 flex items-center gap-1.5">
                    <Ticket size={14} /> Apply Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter SWIFT50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-semibold uppercase placeholder:text-gray-300"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium leading-none">
                    Use code <strong className="text-primary">SWIFT50</strong> to get ₹50 off on orders above ₹150.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-gray-100 bg-slate-50 space-y-4 rounded-bl-3xl">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-dark">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-dark">₹{deliveryFee}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-dark pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-primary text-base font-extrabold font-display">₹{cartSubtotal + deliveryFee - discount}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10 transition"
                  >
                    <span>Place Order (Pay via Wallet)</span>
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2.5 font-medium leading-tight">
                    Current wallet balance: <strong>₹{currentUser?.walletBalance?.toFixed(2)}</strong>.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RestaurantMenu;
