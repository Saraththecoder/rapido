import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Wallet, Check, Ticket, ShoppingCart, Trash2 } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { RESTAURANTS } from '../../data/restaurants';
import { useCartStore } from '../../store/useCartStore';
import { useWalletStore } from '../../store/useWalletStore';

export default function FoodCart() {
  const navigate = useNavigate();
  const { items, restaurantId, updateQty, clearCart, getTotal } = useCartStore();
  const { balance, deduct } = useWalletStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponStatus, setCouponStatus] = useState(null); // 'success' | 'error' | null
  const [couponMessage, setCouponMessage] = useState('');

  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);

  useEffect(() => {
    applyTheme('food');
    if (items.length === 0) {
      // If empty, let them browse
      navigate('/food');
    }
  }, [items, navigate]);

  if (items.length === 0) return null;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SWIFTGO50') {
      setDiscountAmount(50);
      setCouponStatus('success');
      setCouponMessage('SWIFTGO50 coupon applied! You saved ₹50.');
    } else if (code === 'FIRST100') {
      setDiscountAmount(100);
      setCouponStatus('success');
      setCouponMessage('FIRST100 coupon applied! You saved ₹100.');
    } else {
      setDiscountAmount(0);
      setCouponStatus('error');
      setCouponMessage('Invalid coupon code. Try SWIFTGO50 or FIRST100.');
    }
  };

  const itemTotal = getTotal();
  const deliveryFee = 30;
  const platformFee = 5;
  const taxes = Math.round(itemTotal * 0.05); // 5% taxes
  const finalTotal = Math.max(0, itemTotal + deliveryFee + platformFee + taxes - discountAmount);
  
  const hasSufficientBalance = balance >= finalTotal;

  const handlePlaceOrder = () => {
    if (!hasSufficientBalance) {
      alert("Insufficient wallet balance! Please switch roles or top up.");
      return;
    }

    // Deduct order cost from wallet
    deduct(finalTotal);
    
    // Clear food cart state
    clearCart();
    
    // Redirect to tracking page
    navigate('/food/tracking');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-900"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button
          onClick={() => navigate(restaurantId ? `/food/${restaurantId}` : '/food')}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-left leading-tight">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
            Your Cart
          </h2>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
            {restaurant?.name || 'SwiftGo Food'}
          </span>
        </div>
      </div>

      {/* Main Cart Content Window */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-5 pb-8">
        
        {/* Item Rows List */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl p-4 text-left">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3.5">
            Selected Food Items
          </h3>
          
          <div className="divide-y divide-gray-150">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="text-left flex-1 pr-2">
                  <h4 className="font-bold text-xs text-gray-900">{item.name}</h4>
                  <span className="text-[10px] font-black text-gray-550">₹{item.price} each</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity counter */}
                  <div className="bg-white border border-gray-250 rounded-lg flex items-center justify-between px-2 py-0.5 w-16 text-xs text-green-600 font-bold">
                    <button 
                      onClick={() => updateQty(item.id, -1)}
                      className="hover:text-green-800 font-black text-sm px-0.5"
                    >
                      −
                    </button>
                    <span className="font-extrabold text-[11px]">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.id, 1)}
                      className="hover:text-green-800 font-black text-sm px-0.5"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-black text-xs text-gray-800 w-12 text-right">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-150 mt-3 pt-3 text-right">
            <button
              onClick={() => {
                clearCart();
                navigate('/food');
              }}
              className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-red-500 hover:text-red-700 ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Empty Cart</span>
            </button>
          </div>
        </div>

        {/* Promo / Coupon Input Block */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl p-4 text-left">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">
            Apply Promo Coupon
          </span>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="TRY: SWIFT50 or FIRST100"
                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-2 py-2 text-xs text-gray-800 placeholder-gray-400 font-semibold focus:outline-none focus:border-orange-500"
              />
              <Ticket className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
            
            <button
              onClick={handleApplyCoupon}
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] px-4 rounded-xl uppercase tracking-wider transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>

          {/* Validation Feedback message */}
          {couponStatus && (
            <div className={`mt-2.5 text-[10px] font-bold px-3 py-1.5 rounded-lg ${
              couponStatus === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {couponMessage}
            </div>
          )}
        </div>

        {/* Bill Breakdown Calculations Card */}
        <div className="bg-gray-50 border border-gray-150/40 rounded-2xl p-4 text-left text-xs font-semibold text-gray-600 space-y-2">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">
            Bill Summary Details
          </span>
          
          <div className="flex justify-between">
            <span>Item Total</span>
            <span className="text-gray-800 font-bold">₹{itemTotal}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="text-gray-800 font-bold">₹{deliveryFee}</span>
          </div>

          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span className="text-gray-800 font-bold">₹{platformFee}</span>
          </div>

          <div className="flex justify-between">
            <span>GST Taxes (5%)</span>
            <span className="text-gray-800 font-bold">₹{taxes}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600 font-bold">
              <span>Promo Discount</span>
              <span>- ₹{discountAmount}</span>
            </div>
          )}

          <div className="border-t border-gray-150 my-1 pt-2 flex justify-between text-sm font-black text-gray-900">
            <span>Grand Total</span>
            <span className="text-orange-500 text-base leading-none">₹{finalTotal}</span>
          </div>
        </div>

        {/* Wallet Balance Integration Section */}
        <div className="bg-gray-55 border border-gray-150/40 rounded-2xl p-4 text-left flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-500">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-wide">Pay via Wallet</span>
              <span className="text-xs font-black text-gray-800 block">Balance: ₹{balance.toFixed(2)}</span>
            </div>
          </div>

          {/* Balance Sufficient Checkmark */}
          {hasSufficientBalance ? (
            <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          ) : (
            <span className="text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
              Low Balance
            </span>
          )}
        </div>
      </div>

      {/* Place Order CTA Bottom Bar */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-20">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePlaceOrder}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-2xl py-3.5 text-xs uppercase tracking-widest shadow-md shadow-orange-500/10 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Place Order • ₹{finalTotal} ➔</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
