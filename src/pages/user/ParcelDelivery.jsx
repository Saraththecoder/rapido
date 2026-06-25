import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Package, User, Phone, MapPin, Scale, HelpCircle, ShieldAlert } from 'lucide-react';
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

    // Simulate shipping request processing for 2 seconds
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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Page Header */}
      <div className="bg-dark text-white rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-2">
          <span className="bg-primary/20 text-primary border border-primary/20 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            SwiftGo Delivery Services
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">
            Instant Same-City Parcel Delivery
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-medium">
            Send documents, keys, food boxes, or electronics across the city instantly. Starting from just ₹50.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sender & Receiver Card */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Addresses */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h3 className="font-display font-bold text-lg text-dark border-b border-gray-50 pb-3">Addresses</h3>

            {/* Sender Details (Auto-filled) */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Sender Details (You)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="font-bold text-dark mt-0.5">{currentUser?.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-bold text-dark mt-0.5">{currentUser?.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-400">Pickup Address</p>
                  <p className="font-bold text-dark mt-0.5">HSR Layout, Sector 3, Bangalore</p>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                <span>Recipient Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Recipient's Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Receiver's name"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Recipient's Mobile Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98xxx xxxxx"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Dropoff Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Floor, building, street, colony..."
                      value={receiverAddress}
                      onChange={(e) => setReceiverAddress(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: Package Content */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="font-display font-bold text-lg text-dark border-b border-gray-50 pb-3">Package Specification</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Weight Class</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Scale size={16} />
                  </div>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition appearance-none bg-white"
                  >
                    <option value="0-1kg">Light (0 - 1 kg)</option>
                    <option value="1-5kg">Medium (1 - 5 kg)</option>
                    <option value="5-10kg">Heavy (5 - 10 kg)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">What are you sending?</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Documents, Lunchbox, Books, Keys"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Estimator Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h3 className="font-display font-bold text-lg text-dark">Price Summary</h3>
            
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Base Delivery Quote</span>
                <span className="font-bold text-dark">₹{currentPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Handling Fee</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-semibold text-dark text-sm">
                <span>Total Quote</span>
                <span className="text-primary text-base font-extrabold font-display">₹{currentPrice}</span>
              </div>
            </div>

            <div className="space-y-2 text-[10px] text-gray-400 leading-normal font-medium bg-orange-50/50 border border-orange-100/50 p-3.5 rounded-2xl">
              <p className="font-bold text-orange-800 flex items-center gap-1 mb-1">
                <ShieldAlert size={12} /> Prohibited items:
              </p>
              We do not courier jewelry, narcotics, explosives, currency notes, or items heavier than 10kg.
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !receiverName || !receiverPhone || !receiverAddress || !description}
              className={`w-full py-4 rounded-2xl text-sm font-bold text-white shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 transition duration-200 ${
                isSubmitting || !receiverName || !receiverPhone || !receiverAddress || !description
                  ? 'bg-gray-300 cursor-not-allowed shadow-none'
                  : 'bg-primary hover:bg-primary-hover'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Booking Shipment...</span>
                </>
              ) : (
                <span>Confirm & Ship Now</span>
              )}
            </button>
          </div>

          {/* Service features info */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 space-y-3 text-xs text-gray-500">
            <h4 className="font-bold text-dark flex items-center gap-1">
              <HelpCircle className="text-primary animate-pulse" size={16} /> Why use SwiftGo Delivery?
            </h4>
            <ul className="space-y-1.5 list-disc list-inside font-medium leading-relaxed">
              <li>Door-to-door instant pickup under 15 mins.</li>
              <li>Secure live tracking and digital OTP receipts.</li>
              <li>Affordable rates matching motorcycle fleets.</li>
            </ul>
          </div>
        </div>

      </form>
    </div>
  );
};

export default ParcelDelivery;
