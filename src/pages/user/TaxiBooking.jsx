import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { MapPin, Navigation, Bike, Car, Compass, Shield } from 'lucide-react';
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
    bike: { label: 'Bike', icon: Bike, baseRate: 35, time: '2 min away', desc: 'Fastest in traffic, solo ride' },
    auto: { label: 'Auto', icon: Navigation, baseRate: 60, time: '4 min away', desc: 'Comfortable, open-air, 3 seats' },
    car: { label: 'Car Cab', icon: Car, baseRate: 110, time: '6 min away', desc: 'AC Comfort, family, 4 seats' }
  };

  const calculateFare = (type) => {
    if (!pickup || !drop) return 0;
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
      toast.success("Ride cancelled successfully.");
      setActiveRideId(null);
    }
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Booking Form Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-100 p-5 md:p-6 space-y-6 shadow-sm">
            <h2 className="font-display font-bold text-lg text-zinc-900">Book a Ride</h2>
            
            {/* Input fields */}
            <div className="space-y-4 relative">
              {/* Connector line */}
              <div className="absolute left-[17px] top-8 bottom-8 w-0.5 border-dashed border-l border-primary/20 z-0"></div>

              {/* Pickup Address */}
              <div className="relative z-10">
                <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Pickup Point</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <MapPin size={15} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter pickup station or landmark"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    list="pickup-suggestions"
                    className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                  />
                  <datalist id="pickup-suggestions">
                    {locations.map((loc, i) => <option key={i} value={loc} />)}
                  </datalist>
                </div>
              </div>

              {/* Drop Address */}
              <div className="relative z-10">
                <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Drop Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <MapPin size={15} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter destination landmark or colony"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    list="drop-suggestions"
                    className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                  />
                  <datalist id="drop-suggestions">
                    {locations.map((loc, i) => <option key={i} value={loc} />)}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Vehicle Selector */}
            {pickup && drop && pickup !== drop && (
              <div className="space-y-3 pt-2">
                <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Select Ride Service</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(vehicleRates).map(([type, details]) => {
                    const VehIcon = details.icon;
                    const fare = calculateFare(type);
                    const isSelected = selectedVehicle === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedVehicle(type)}
                        className={`flex flex-col justify-between text-left p-4 rounded-xl border transition duration-150 ${
                          isSelected 
                            ? 'bg-accent-peach/30 border-primary shadow-sm shadow-primary/5' 
                            : 'bg-white border-zinc-150 hover:border-primary/20'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className={`p-1.5 rounded-lg border ${isSelected ? 'bg-primary text-white border-primary' : 'bg-zinc-100 text-zinc-600 border-zinc-150'}`}>
                            <VehIcon size={16} />
                          </span>
                          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{details.time}</span>
                        </div>
                        <div className="mt-4">
                          <h4 className="font-bold text-zinc-800 text-xs">{details.label}</h4>
                          <p className="text-[9px] text-zinc-500 mt-0.5 leading-tight font-medium">{details.desc}</p>
                          <p className="text-sm font-black text-primary mt-2">₹{fare}</p>
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
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2 btn-primary transition duration-150"
              >
                {isSearching ? (
                  <>
                    <div className="h-4.5 w-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finding Riders...</span>
                  </>
                ) : (
                  <span>Book Ride Now</span>
                )}
              </button>
            )}

            {/* Simulated Live Booking State */}
            {isSearching && (
              <div className="bg-accent-peach/20 border border-primary/10 rounded-xl p-4 flex items-center gap-3">
                <Compass className="text-primary animate-spin shrink-0" size={20} />
                <div className="text-xs text-zinc-650 font-semibold leading-relaxed">
                  Sending request bids to nearby <strong>{selectedVehicle}</strong> drivers. Match updates in 2s...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status / Driver Assign Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-zinc-100 p-5 space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-base text-zinc-900">Active Booking Details</h3>
            
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
                <div className="bg-accent-peach/10 border border-primary/10 rounded-xl p-4 space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ride Milestones</h4>
                  <div className="space-y-2 text-xs text-zinc-600 font-semibold leading-relaxed">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                      <span>Assigned Executive: <strong>{activeRide?.rider?.name}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 animate-pulse"></span>
                      <span>Rider arriving in: <strong>3 mins</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 shrink-0"></span>
                      <span>OTP code: <strong className="font-mono text-zinc-800 bg-accent-peach border border-primary/10 px-1 py-0.5 rounded">4920</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ) : pickup && drop && pickup !== drop ? (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    <span>Estimated Route</span>
                    <span className="text-zinc-800 font-black">~4.5 km</span>
                  </div>
                  
                  <div className="relative w-full aspect-[280/140] bg-white border border-zinc-100 rounded-lg overflow-hidden">
                    <svg viewBox="0 0 300 150" className="absolute inset-0 w-full h-full p-2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                      <rect width="100%" height="100%" fill="#fafafa" />
                      <line x1="50" y1="0" x2="50" y2="150" stroke="#fdf8f6" strokeWidth="1" />
                      <line x1="150" y1="0" x2="150" y2="150" stroke="#fdf8f6" strokeWidth="1" />
                      <line x1="250" y1="0" x2="250" y2="150" stroke="#fdf8f6" strokeWidth="1" />
                      <line x1="0" y1="75" x2="300" y2="75" stroke="#fdf8f6" strokeWidth="1" />
                      
                      {/* Route Path */}
                      <path d="M 40 110 C 100 110, 120 40, 240 60" fill="none" stroke="#FAF2EE" strokeWidth="6" strokeLinecap="round" />
                      <path d="M 40 110 C 100 110, 120 40, 240 60" fill="none" stroke="#FC5A2A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
                      
                      {/* Pickup Pin */}
                      <circle cx="40" cy="110" r="4" fill="#FC5A2A" />
                      {/* Drop Pin */}
                      <circle cx="240" cy="60" r="4" fill="#09A15B" />
                    </svg>
                    
                    <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-0.5 rounded text-[8px] font-bold border border-primary/20 truncate max-w-[200px]">
                      {pickup} → {drop}
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-zinc-500 font-semibold leading-relaxed">
                    💡 Route cleared. Nearest rider arriving in <strong>2-3 min</strong> upon confirmation.
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 px-4 text-zinc-400 space-y-3">
                <Navigation size={40} className="mx-auto text-primary opacity-60" />
                <p className="text-xs font-bold text-zinc-500">No active bookings yet.</p>
                <p className="text-[11px] leading-relaxed max-w-[180px] mx-auto text-zinc-450 font-semibold">
                  Enter pickup and drop coordinates to get instant vehicle pricing and start tracking.
                </p>
              </div>
            )}
          </div>

          {/* Ride Safety Tips */}
          <div className="bg-white rounded-xl p-5 border border-zinc-100 space-y-3 text-xs shadow-sm">
            <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
              <Shield className="text-primary shrink-0" size={15} /> Safety Checklist
            </h4>
            <ul className="space-y-2 text-zinc-500 font-semibold list-disc list-inside">
              <li>Always check registration plate.</li>
              <li>Confirm the rider's identity.</li>
              <li>Helmets are mandatory.</li>
              <li>Share live status tracking.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaxiBooking;
