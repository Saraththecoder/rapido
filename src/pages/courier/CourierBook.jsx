import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, ArrowLeft, ShieldAlert, Package, Check, MapPin, User, Inbox, Bell } from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { useWalletStore } from '../../store/useWalletStore';
import { useRideStore } from '../../store/useRideStore';
import MapSVG from '../../components/MapSVG';

const PARCEL_SIZES = [
  { id: 'small', label: 'Small', weight: 'Under 1 kg', price: 49, displayPrice: '£12.00', icon: Inbox },
  { id: 'medium', label: 'Medium', weight: 'Over 1-10 kg', price: 99, displayPrice: '£24.50', icon: Package },
  { id: 'large', label: 'Large', weight: '10 to 25 kg', price: 179, displayPrice: '£45.00', icon: Package }
];

export default function CourierBook() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const balance = useWalletStore((state) => state.balance);
  const deduct = useWalletStore((state) => state.deduct);
  const { updateCourier } = useRideStore();

  const [step, setStep] = useState(1); // 1: Pickup, 2: Receiver, 3: Summary (Active Step 3)

  // Fields prefilled to match references or allow editing
  const [senderName, setSenderName] = useState(user?.name || 'Rahul Sharma');
  const [pickupAddress, setPickupAddress] = useState('221B Baker St, London');
  const [pickupPincode, setPickupPincode] = useState('NW1 6XE');

  const [recipientName, setRecipientName] = useState('Dr. Watson');
  const [recipientPhone, setRecipientPhone] = useState('+44 7700 900077');
  const [deliveryAddress, setDeliveryAddress] = useState('Gachibowli DLF, Hyderabad');
  const [deliveryPincode, setDeliveryPincode] = useState('500032');

  const [packageDesc, setPackageDesc] = useState('Documents & medical files');
  const [selectedSizeId, setSelectedSizeId] = useState('medium'); // Default to Medium (matching Screenshot 4)

  useEffect(() => {
    applyTheme('parcel');
  }, []);

  const selectedSize = PARCEL_SIZES.find((s) => s.id === selectedSizeId);
  const finalPrice = selectedSize?.price || 99;
  const displayPriceText = selectedSize?.displayPrice || '£24.50';

  const handleNextStep = () => {
    if (step === 1) {
      if (!pickupAddress) {
        alert("Please fill in pickup details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!recipientName || !recipientPhone) {
        alert("Please fill in recipient details.");
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/courier');
  };

  const handleConfirmBooking = () => {
    if (balance < finalPrice) {
      alert("Insufficient wallet balance! Please switch roles or top up.");
      return;
    }

    // Save state
    updateCourier({
      senderName,
      pickupAddress,
      pickupPincode,
      recipientName,
      recipientPhone,
      deliveryAddress,
      deliveryPincode,
      packageDescription: packageDesc,
      weightClass: selectedSize,
      price: finalPrice,
      status: 'booking'
    });

    deduct(finalPrice);
    navigate('/courier/tracking');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-[#0C0B10] text-white font-sans"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0C0B10] border-b border-white/5 z-10">
        <div className="flex items-center gap-2.5">
          <img src="/avatar.png" className="w-7 h-7 rounded-full border border-purple-500/30 object-cover" alt="Avatar" />
          <span className="font-extrabold text-sm tracking-widest text-white uppercase font-display leading-none">
            Lady Pilot
          </span>
        </div>
        <button className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Circles Stepper Indicator (Matching Screenshot 4) */}
      <div className="bg-[#0C0B10] py-3.5 px-6 border-b border-white/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-green-500 text-white shadow-sm shadow-green-500/10">
            ✓
          </span>
          <span className="font-extrabold text-gray-300 font-display">Pickup</span>
        </div>
        
        <div className="w-8 h-0.5 bg-gray-800 flex-1 mx-3"></div>

        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
            step >= 2 ? 'bg-green-500 text-white' : 'border border-gray-700 text-gray-500'
          }`}>
            {step >= 3 ? '✓' : '2'}
          </span>
          <span className={`font-extrabold font-display ${step >= 2 ? 'text-gray-300' : 'text-gray-500'}`}>Receiver</span>
        </div>

        <div className="w-8 h-0.5 bg-gray-800 flex-1 mx-3"></div>

        <div className="flex items-center gap-1.5">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
            step >= 3 ? 'bg-[#C3B1E1] text-[#0C0B10]' : 'border border-gray-700 text-gray-500'
          }`}>
            3
          </span>
          <span className={`font-extrabold font-display ${step >= 3 ? 'text-gray-200' : 'text-gray-500'}`}>Parcel</span>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4 pb-28">
        
        {/* STEP 1: PICKUP FORM */}
        {step === 1 && (
          <div className="space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-purple-300 uppercase tracking-widest font-display">Pickup Details</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Sender Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Pickup Address</label>
                <textarea
                  rows="2"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold resize-none"
                  placeholder="Street Address"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Pickup Pincode</label>
                <input
                  type="text"
                  value={pickupPincode}
                  onChange={(e) => setPickupPincode(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold"
                  placeholder="e.g. 500081"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RECEIVER FORM */}
        {step === 2 && (
          <div className="space-y-4 text-left">
            <h3 className="text-sm font-extrabold text-purple-300 uppercase tracking-widest font-display">Recipient Details</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Recipient Phone Number</label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Delivery Address</label>
                <textarea
                  rows="2"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold resize-none"
                  placeholder="Destination Address"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Delivery Pincode</label>
                <input
                  type="text"
                  value={deliveryPincode}
                  onChange={(e) => setDeliveryPincode(e.target.value)}
                  className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold"
                  placeholder="e.g. 500032"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PARCEL DETAILS & SUMMARY (Exactly matching Screenshot 4 layout) */}
        {step === 3 && (
          <div className="space-y-4.5 text-left">
            
            {/* Small Map Preview Route (Mock map box) */}
            <div className="h-[110px] rounded-3xl overflow-hidden border border-white/5 relative bg-[#0D0C12] shadow-inner shrink-0 z-0">
              <div className="absolute inset-0 opacity-80 pointer-events-none scale-[0.8] mt-[-25px]">
                <MapSVG mode="route" />
              </div>
              <div className="absolute inset-0 bg-black/10"></div>
              
              {/* Distance Overlay details */}
              <div className="absolute bottom-2 left-3 bg-[#0D0C12]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1.5 shadow">
                <MapPin className="w-3.5 h-3.5 text-[#C3B1E1] shrink-0" />
                <span className="text-[10px] font-black text-white font-display">
                  EST. DISTANCE: 12.4 km
                </span>
                <span className="text-[9px] bg-purple-500/20 text-[#C3B1E1] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider font-display">Courier Mode</span>
              </div>
            </div>

            {/* Pickup Address block (Screenshot style) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Pickup Address</span>
              <div className="flex items-center gap-3 bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 shadow-sm">
                <MapPin className="w-4 h-4 text-[#C3B1E1] shrink-0" />
                <span className="text-xs font-extrabold text-white truncate">{pickupAddress}</span>
              </div>
            </div>

            {/* Receiver details block (Screenshot style) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Receiver Details</span>
              <div className="flex items-center gap-3 bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 shadow-sm">
                <User className="w-4 h-4 text-[#C3B1E1] shrink-0" />
                <span className="text-xs font-extrabold text-white truncate">{recipientName} ({recipientPhone})</span>
              </div>
            </div>

            {/* Parcel Size Selector Cards */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Parcel Size</span>
              
              <div className="grid grid-cols-3 gap-2.5">
                {PARCEL_SIZES.map((size) => {
                  const isSelected = selectedSizeId === size.id;
                  const Icon = size.icon;
                  return (
                    <div
                      key={size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`p-3.5 rounded-3xl border-2 flex flex-col items-center justify-between cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#C3B1E1] bg-[#221F2D] text-[#C3B1E1] shadow-lg shadow-purple-500/5' 
                          : 'border-white/5 bg-[#1A1822] text-gray-400 hover:border-gray-800'
                      }`}
                    >
                      {/* Circle container for icon */}
                      <div className={`p-2 rounded-xl mb-2 flex items-center justify-center ${
                        isSelected ? 'bg-purple-950/40 text-purple-400' : 'bg-gray-800/40 text-gray-500'
                      }`}>
                        <Icon className="w-5 h-5 stroke-[2]" />
                      </div>
                      
                      <div className="text-center">
                        <span className="block text-[11px] font-extrabold font-display leading-tight text-white">
                          {size.label}
                        </span>
                        <span className="block text-[9px] text-gray-400 mt-0.5 leading-none">
                          {size.weight}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package Description input */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Package Description</span>
              <input
                type="text"
                value={packageDesc}
                onChange={(e) => setPackageDesc(e.target.value)}
                className="w-full bg-[#1A1822] border border-white/5 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1] font-semibold"
                placeholder="What are you sending? (e.g. Documents, Clothes)"
              />
            </div>

          </div>
        )}
      </div>

      {/* Floating Price Box / Place Order Sticky Footer */}
      <div className="bg-[#110E16]/95 border-t border-white/5 p-4 absolute bottom-0 left-0 right-0 z-20 space-y-4">
        {step < 3 ? (
          <button
            onClick={handleNextStep}
            className="w-full bg-[#C3B1E1] text-[#0C0B10] font-black rounded-2xl py-3.5 text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-[#d4c8eb] transition-colors font-display"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
              <div className="text-left space-y-0.5">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest font-display block">Total Estimated Cost</span>
                <span className="text-base font-black text-white leading-none font-display block">{displayPriceText}</span>
              </div>
              
              <div className="text-right space-y-0.5">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest font-display block">Arrival</span>
                <span className="text-xs font-black text-purple-300 leading-none font-display block">~14:30 PM</span>
              </div>
            </div>

            {/* Confirm button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleConfirmBooking}
              className="w-full py-4 bg-[#C3B1E1] text-[#0C0B10] font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-purple-500/10 flex items-center justify-center gap-1.5 font-display transition-colors"
            >
              <span>Confirm Booking</span>
              <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
