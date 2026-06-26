import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Scale, HelpCircle, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const ParcelDelivery = () => {
  const { currentUser, sendParcel } = useContext(AppContext);
  const navigate = useNavigate();

  // Receiver details state
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');

  // Parcel details state
  const [weight, setWeight] = useState('0-1kg');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price estimate based on weight
  const getPriceEstimate = (weightVal) => {
    switch (weightVal) {
      case '0-1kg': return 50;
      case '1-5kg': return 80;
      case '5-10kg': return 150;
      default: return 50;
    }
  };

  const currentPrice = getPriceEstimate(weight);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiverName || !receiverPhone || !receiverAddress || !description) {
      toast.error("Please fill in all details.");
      return;
    }

    if (currentUser.walletBalance < currentPrice) {
      toast.error("Insufficient wallet balance. Please add money!");
      navigate('/user/wallet');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const parcelId = sendParcel(
        { name: receiverName, phone: receiverPhone, address: receiverAddress },
        weight,
        description,
        currentPrice
      );
      
      setIsSubmitting(false);

      if (parcelId) {
        navigate(`/user/track/parcel-${parcelId}`);
      }
    }, 2000);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 text-left">
      
      {/* Page Header */}
      <div className="bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl p-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="bg-primary text-white px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
            SwiftGo Courier
          </span>
          <h2 className="text-2.5xl font-display font-black text-zinc-900 leading-none">
            Same-City Parcel Delivery
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-semibold">
            Send documents, keys, food boxes, or electronics across the city instantly. Starting from just ₹50.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sender & Receiver Card */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Addresses */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5 md:p-6 space-y-5">
            <h3 className="font-display font-bold text-base text-zinc-900 border-b border-zinc-100 pb-3">Addresses</h3>

            {/* Sender Details (Auto-filled) */}
            <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Sender Details (You)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                <div>
                  <p className="text-zinc-450">Name</p>
                  <p className="font-bold text-zinc-800 mt-0.5">{currentUser?.name}</p>
                </div>
                <div>
                  <p className="text-zinc-455">Phone</p>
                  <p className="font-bold text-zinc-800 mt-0.5">{currentUser?.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-zinc-450">Pickup Address</p>
                  <p className="font-bold text-zinc-800 mt-0.5">HSR Layout, Sector 3, Bangalore</p>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-450"></span>
                <span>Recipient Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Recipient's Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Receiver's name"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Recipient's Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98xxx xxxxx"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Full Dropoff Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Floor, building, street, colony..."
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: Package Content */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5 md:p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-zinc-900 border-b border-zinc-100 pb-3">Package Specification</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Weight Class</label>
                <div className="relative">
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="block w-full px-4 py-2.5 rounded-xl input-premium text-xs font-semibold appearance-none bg-white"
                  >
                    <option value="0-1kg">Light (0 - 1 kg)</option>
                    <option value="1-5kg">Medium (1 - 5 kg)</option>
                    <option value="5-10kg">Heavy (5 - 10 kg)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">What are you sending?</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Documents, Lunchbox, Books, Keys"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Estimator Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-zinc-200 p-5 md:p-6 space-y-5">
            <h3 className="font-display font-bold text-base text-zinc-900">Price Summary</h3>
            
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 space-y-3 text-xs">
              <div className="flex justify-between text-zinc-500 font-semibold">
                <span>Base Delivery Quote</span>
                <span className="font-bold text-zinc-900">₹{currentPrice}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-semibold">
                <span>Handling Fee</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="border-t border-zinc-200 pt-3 flex justify-between font-bold text-zinc-900 text-sm">
                <span>Total Quote</span>
                <span className="text-base font-black text-primary">₹{currentPrice}</span>
              </div>
            </div>

            <div className="space-y-2 text-[9px] text-zinc-400 leading-normal font-semibold bg-zinc-50 border border-zinc-200 p-3 rounded-xl">
              <p className="font-bold text-zinc-900 flex items-center gap-1 mb-1">
                <ShieldAlert size={12} /> Restricted items:
              </p>
              We do not courier jewelry, narcotics, explosives, currency notes, or items heavier than 10kg.
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !receiverName || !receiverPhone || !receiverAddress || !description}
              className="w-full py-3.5 rounded-xl text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2 btn-primary transition duration-150"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4.5 w-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Booking...</span>
                </>
              ) : (
                <span>Confirm & Ship Now</span>
              )}
            </button>
          </div>

          {/* Service features info */}
          <div className="bg-white rounded-xl p-5 border border-zinc-200 space-y-3 text-xs text-zinc-500 text-left">
            <h4 className="font-bold text-zinc-900 flex items-center gap-1">
              <HelpCircle className="text-zinc-650" size={15} /> Why SwiftGo Delivery?
            </h4>
            <ul className="space-y-1.5 list-disc list-inside font-semibold leading-relaxed">
              <li>Instant pickup under 15 mins.</li>
              <li>Secure live tracking and OTP receipts.</li>
              <li>Affordable rates matching motorcycle fleets.</li>
            </ul>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ParcelDelivery;
