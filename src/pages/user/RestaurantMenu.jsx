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
        <p className="text-zinc-550 font-bold">Restaurant not found.</p>
        <Link to="/user/food" className="text-zinc-900 font-bold hover:underline">Back to Food Delivery</Link>
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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-32 md:pb-24 relative text-left">
      
      {/* Back button and Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate('/user/food')}
          className="p-2 bg-white hover:bg-zinc-50 text-zinc-700 rounded-lg border border-zinc-200 transition"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Back to Restaurants</span>
      </div>

      {/* Restaurant Info Header */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden flex flex-col md:flex-row gap-6 p-6">
        <div className="h-40 w-full md:w-56 rounded-lg bg-zinc-100 overflow-hidden shrink-0">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover grayscale-10"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h2 className="font-display font-black text-2.5xl text-zinc-900 leading-tight mb-1">
              {restaurant.name}
            </h2>
            <p className="text-xs text-zinc-500 font-semibold">{restaurant.cuisine}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-6 border-t border-zinc-100 pt-4">
            <div className="flex items-center gap-1.5">
              <Star size={15} className="text-zinc-650 fill-zinc-650" />
              <div>
                <p className="text-[9px] text-zinc-400 font-bold uppercase leading-none">Rating</p>
                <p className="text-xs font-bold text-zinc-800 mt-1">{restaurant.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-zinc-650" />
              <div>
                <p className="text-[9px] text-zinc-400 font-bold uppercase leading-none">Delivery Time</p>
                <p className="text-xs font-bold text-zinc-800 mt-1">{restaurant.deliveryTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <ShoppingBag size={15} className="text-zinc-650" />
              <div>
                <p className="text-[9px] text-zinc-400 font-bold uppercase leading-none">Minimum Order</p>
                <p className="text-xs font-bold text-zinc-800 mt-1">₹{restaurant.minOrder}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-200 my-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-sm shadow-primary/10'
                : 'bg-white hover:border-primary/20 text-zinc-650 border border-zinc-200'
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
              className="bg-white rounded-xl border border-zinc-200 p-4 flex gap-4 hover:border-zinc-350 transition duration-150"
            >
              {/* Item Image */}
              <div className="w-20 h-20 rounded-lg bg-zinc-100 overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale-10"
                />
              </div>

              {/* Item Details */}
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm leading-snug truncate">{item.name}</h4>
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">{item.category}</p>
                </div>
                <div className="flex items-end justify-between gap-2 mt-2">
                  <p className="text-base font-black text-primary">₹{item.price}</p>
                  
                  {/* Add button / quantity controls */}
                  {qty > 0 ? (
                    <div className="flex items-center bg-primary text-white rounded-lg overflow-hidden shrink-0">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 hover:bg-primary-hover transition"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="px-2 text-xs font-bold font-mono">{qty}</span>
                      <button 
                        onClick={() => addToCart(item, restaurant)}
                        className="px-2 py-1 hover:bg-primary-hover transition"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item, restaurant)}
                      className="bg-white border border-zinc-300 hover:border-primary hover:text-primary text-zinc-800 font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition flex items-center gap-1 shrink-0"
                    >
                      <Plus size={12} /> Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Cart Summary Bar */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 max-w-lg mx-auto bg-[#2A2A20] text-white rounded-xl shadow-lg p-4 flex items-center justify-between z-40 border border-primary/20 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 border border-primary/30 rounded-lg text-primary">
              <ShoppingCart size={16} />
            </div>
            <div className="text-left">
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in cart</p>
              <p className="text-sm font-black text-white">₹{cartSubtotal} <span className="text-[9px] text-zinc-500 font-normal">excl. delivery</span></p>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Review Cart</span>
            <ShoppingCart size={12} />
          </button>
        </div>
      )}

      {/* Cart Drawer / Slide-over Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white flex flex-col h-full rounded-l-2xl border-l border-zinc-200">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-zinc-250 flex justify-between items-center bg-zinc-50 rounded-tl-2xl">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-zinc-900" size={18} />
                  <h3 className="font-display font-bold text-base text-zinc-900">Checkout Cart</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-900 rounded transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="border-b border-zinc-200 pb-2">
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Restaurant</p>
                  <p className="text-base font-bold text-zinc-900">{restaurant.name}</p>
                </div>

                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-zinc-50 rounded-xl p-3 border border-zinc-200">
                      <div className="flex-1 min-w-0 pr-3">
                        <h4 className="font-bold text-zinc-800 text-xs truncate">{item.name}</h4>
                        <p className="text-xs text-zinc-900 font-bold mt-0.5">₹{item.price}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white border border-[#fc5a2a]/20 rounded-lg overflow-hidden shrink-0">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="px-2 py-1 text-primary hover:bg-accent-peach/25 transition"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 text-xs font-bold text-zinc-900 font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item, restaurant)}
                          className="px-2 py-1 text-primary hover:bg-accent-peach/25 transition"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mt-6 space-y-3">
                  <label className="block text-[10px] font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1">
                    <Ticket size={13} /> Apply Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter SWIFT50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-primary font-bold uppercase placeholder:text-zinc-300 input-premium"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="btn-primary text-xs font-bold px-3.5 py-1.5 rounded-lg transition"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[9px] text-zinc-450 font-semibold leading-none">
                    Use code <strong className="text-primary">SWIFT50</strong> to get ₹50 off on orders above ₹150.
                  </p>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4 rounded-bl-2xl">
                <div className="space-y-2 text-xs text-zinc-550 font-semibold">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-zinc-800">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-zinc-800">₹{deliveryFee}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-zinc-800 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>Total Amount</span>
                    <span className="text-sm font-black text-zinc-900">₹{cartSubtotal + deliveryFee - discount}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full btn-primary text-xs font-bold py-3.5 rounded-lg flex items-center justify-center transition"
                  >
                    <span>Place Order (Pay via Wallet)</span>
                  </button>
                  <p className="text-[9px] text-center text-zinc-450 mt-2 font-medium leading-none">
                    Wallet balance: <strong>₹{currentUser?.walletBalance?.toFixed(2)}</strong>.
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
