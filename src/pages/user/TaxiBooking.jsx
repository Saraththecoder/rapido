import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { MapPin, Navigation, Bike, Car, Compass, Calendar, Shield, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import RideCard from '../../components/RideCard';

const TaxiBooking = () => {
  const { bookRide, currentUser, bookings } = useContext(AppContext);
  const navigate = useNavigate();

  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [isSearching, setIsSearching] = useState(false);
  const [activeRideId, setActiveRideId] = useState(null);

  const locations = [
    "Indiranagar Metro Station",
    "Koramangala 3rd Block",
    "HSR Layout Sector 1",
    "Marathahalli Outer Ring Road",
    "Electronic City Phase 1",
    "Majestic Bus Stand",
    "Phoenix Marketcity Mall",
    "Whitefield Prestige Shantiniketan"
  ];

  // Selected ride from global state
  const activeRide = bookings.find(b => b.id === activeRideId);

  const vehicleRates = {
    bike: { label: 'Bike', icon: Bike, baseRate: 35, time: '2 mins away', desc: 'Fastest in traffic, solo ride' },
    auto: { label: 'Auto', icon: Navigation, baseRate: 60, time: '4 mins away', desc: 'Comfortable, open-air, up to 3 seats' },
    car: { label: 'Car Cab', icon: Car, baseRate: 110, time: '6 mins away', desc: 'AC Comfort, family rides, up to 4 seats' }
  };

  const calculateFare = (type) => {
    if (!pickup || !drop) return 0;
    // Generate deterministic price based on character lengths to make it feel dynamic
    const lengthSum = pickup.length + drop.length;
    const base = vehicleRates[type].baseRate;
    return base + (lengthSum % 15) * 5;
  };

  const handleBook = () => {
    if (!pickup || !drop) {
      toast.error("Please enter both pickup and drop locations.");
      return;
    }
    if (pickup === drop) {
      toast.error("Pickup and Drop locations cannot be the same.");
      return;
    }

    const fare = calculateFare(selectedVehicle);

    if (currentUser.walletBalance < fare) {
      toast.error("Insufficient wallet balance. Please add money!");
      navigate('/user/wallet');
      return;
    }

    setIsSearching(true);

    // Simulate searching driver for 2.5 seconds
    setTimeout(() => {
      const rideId = bookRide(pickup, drop, selectedVehicle, fare);
      setIsSearching(false);
      if (rideId) {
        setActiveRideId(rideId);
      }
    }, 2500);
  };

  const handleCancelRide = () => {
    if (activeRideId) {
      // Refund user and change status to cancelled
      toast.success("Ride cancelled successfully.");
      setActiveRideId(null);
    }
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Booking Form Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
            <h2 className="font-display font-extrabold text-xl text-dark">Book a Ride</h2>
            
            {/* Input fields */}
            <div className="space-y-4 relative">
              {/* Connector line */}
              <div className="absolute left-[21px] top-9 bottom-9 w-0.5 bg-gray-150 border-dashed border-l-2 border-gray-300 z-0"></div>

              {/* Pickup Address */}
              <div className="relative z-10">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pickup Point</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                    <MapPin size={18} className="fill-emerald-500/20" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter pickup station or landmark"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    list="pickup-suggestions"
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                  />
                  <datalist id="pickup-suggestions">
                    {locations.map((loc, i) => <option key={i} value={loc} />)}
                  </datalist>
                </div>
              </div>

              {/* Drop Address */}
              <div className="relative z-10">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Drop Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-500">
                    <MapPin size={18} className="fill-rose-500/20" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter destination landmark or colony"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    list="drop-suggestions"
                    className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                  />
                  <datalist id="drop-suggestions">
                    {locations.map((loc, i) => <option key={i} value={loc} />)}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Vehicle Selector (only if pickup and drop are provided) */}
            {pickup && drop && pickup !== drop && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Select Ride Service</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(vehicleRates).map(([type, details]) => {
                    const VehIcon = details.icon;
                    const fare = calculateFare(type);
                    const isSelected = selectedVehicle === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedVehicle(type)}
                        className={`flex flex-col justify-between text-left p-4 rounded-2xl border transition duration-200 ${
                          isSelected 
                            ? 'bg-orange-50/50 border-primary shadow-sm shadow-orange-500/5' 
                            : 'bg-white border-gray-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className={`p-2 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-gray-600'}`}>
                            <VehIcon size={20} />
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{details.time}</span>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-bold text-dark text-sm">{details.label}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-tight font-medium">{details.desc}</p>
                          <p className="text-base font-extrabold text-primary mt-2">₹{fare}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA action */}
            {!activeRideId && (
              <button
                onClick={handleBook}
                disabled={isSearching || !pickup || !drop}
                className={`w-full py-4 rounded-2xl text-sm font-bold text-white shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 transition duration-200 ${
                  isSearching || !pickup || !drop
                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-primary hover:bg-primary-hover'
                }`}
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding Nearest Executive...</span>
                  </>
                ) : (
                  <span>Book Ride Now</span>
                )}
              </button>
            )}

            {/* Simulated Live Booking State */}
            {isSearching && (
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3">
                <Compass className="text-primary animate-spin shrink-0" size={24} />
                <div className="text-xs text-gray-600 font-medium">
                  We are sending request bids to nearby <strong>{selectedVehicle}</strong> riders. This will take a few seconds...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status / Driver Assign Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h3 className="font-display font-extrabold text-lg text-dark">Active Booking Details</h3>
            
            {activeRideId ? (
              <div className="space-y-4">
                <RideCard
                  rider={activeRide?.rider}
                  pickup={activeRide?.pickup}
                  drop={activeRide?.drop}
                  fare={activeRide?.fare}
                  status={activeRide?.status}
                  onCancel={handleCancelRide}
                />
                
                {/* Simulated Steps */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-dark uppercase tracking-wider">Ride Milestones</h4>
                  <div className="space-y-2.5 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>Assigned Executive: <strong>{activeRide?.rider?.name}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0"></span>
                      <span>Rider arriving in: <strong>3 mins</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gray-300 shrink-0"></span>
                      <span>OTP: <strong className="font-mono text-dark bg-gray-200 px-1 py-0.5 rounded">4920</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 px-4 text-gray-400 space-y-3">
                <Navigation size={48} className="mx-auto text-gray-250 animate-bounce" />
                <p className="text-xs font-semibold">No active bookings yet.</p>
                <p className="text-[11px] leading-relaxed max-w-[200px] mx-auto text-gray-400 font-medium">
                  Enter pickup and drop coordinates to get instant vehicle pricing and start tracking.
                </p>
              </div>
            )}
          </div>

          {/* Ride Safety Tips */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 space-y-3 text-xs">
            <h4 className="font-bold text-dark flex items-center gap-1.5">
              <Shield className="text-primary" size={16} /> Ride Safely Checklist
            </h4>
            <ul className="space-y-2 text-gray-500 font-medium list-disc list-inside">
              <li>Always check the rider's name and registration plate.</li>
              <li>Ask for the rider's name before boarding.</li>
              <li>Wear helmets on bike trips (mandatory).</li>
              <li>Share ride status with friends/family.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaxiBooking;
