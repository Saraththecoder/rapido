import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Car, 
  Utensils, 
  Package, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Star, 
  Plus, 
  Minus, 
  Sparkles,
  Building,
  Bike,
  Search,
  Zap,
  TrendingUp,
  Leaf,
  Smartphone,
  QrCode,
  CheckCircle2,
  ThumbsUp,
  Info
} from 'lucide-react';

const LandingPage = () => {
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Hero booking inputs
  const [activeHeroTab, setActiveHeroTab] = useState('taxi');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  // Live Map Simulation State
  const [mapStep, setMapStep] = useState(0);
  const [mapStatus, setMapStatus] = useState('Finding nearby riders...');
  const [driverPos, setDriverPos] = useState({ x: 80, y: 150 });
  const [eta, setEta] = useState(4);

  // Fare Calculator State
  const [calcService, setCalcService] = useState('taxi');
  const [calcVehicle, setCalcVehicle] = useState('bike');
  const [calcDistance, setCalcDistance] = useState(8);
  const [isPeakHour, setIsPeakHour] = useState(false);

  // How it works state
  const [activeWorkTab, setActiveWorkTab] = useState('taxi');

  // Testimonials state
  const [reviewFilter, setReviewFilter] = useState('all');

  // FAQ Search state
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Live Operations Feed State
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);

  const feedEvents = [
    { text: "🚴 Rider Ramesh accepted a food delivery order from Burger & Co.", time: "2s ago" },
    { text: "🚕 Taxi booking request matching a rider in HSR Layout", time: "5s ago" },
    { text: "📦 Parcel courier delivered securely via OTP in Indiranagar", time: "8s ago" },
    { text: "🛵 Bike taxi ride completed - User rated rider 5 stars", time: "15s ago" },
    { text: "🍕 Fresh hot Biryani picked up from Kitchen House", time: "22s ago" }
  ];

  useEffect(() => {
    const feedInterval = setInterval(() => {
      setActiveFeedIndex((prev) => (prev + 1) % feedEvents.length);
    }, 4500);
    return () => clearInterval(feedInterval);
  }, []);

  // Map simulation loop
  useEffect(() => {
    const mapInterval = setInterval(() => {
      setMapStep((prev) => {
        const next = (prev + 1) % 5;
        if (next === 0) {
          setMapStatus('Searching for closest driver...');
          setDriverPos({ x: 80, y: 150 });
          setEta(4);
        } else if (next === 1) {
          setMapStatus('Rider Amit (Bike) accepted!');
          setDriverPos({ x: 120, y: 110 });
          setEta(3);
        } else if (next === 2) {
          setMapStatus('Rider en route to pickup');
          setDriverPos({ x: 200, y: 80 });
          setEta(2);
        } else if (next === 3) {
          setMapStatus('Trip in progress...');
          setDriverPos({ x: 280, y: 100 });
          setEta(1);
        } else if (next === 4) {
          setMapStatus('Arrived at destination!');
          setDriverPos({ x: 350, y: 120 });
          setEta(0);
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(mapInterval);
  }, []);

  const faqs = [
    {
      q: "What is SwiftGo?",
      a: "SwiftGo is a premium, all-in-one on-demand platform offering motorcycle ride-sharing (Taxi), food delivery from local gourmet kitchens, and direct door-to-door courier services (Parcel) in a single unified dashboard."
    },
    {
      q: "How are taxi fares calculated?",
      a: "Taxi fares are calculated dynamically based on pickup/dropoff distance and the selected vehicle type. Bike rides start at ₹25, Autos at ₹60, and Cabs at ₹110."
    },
    {
      q: "Are my packages secure?",
      a: "Yes, all Courier deliveries require a secure digital pin (OTP) verification upon delivery. Both pickup and dropoff points are tracked live via GPS on our interactive tracking map."
    },
    {
      q: "How do I join as a delivery partner?",
      a: "You can register as a Rider directly through our sign-up form. Once verified by our administration team, you can log in, toggle your status to ONLINE, and accept instant delivery job alerts."
    },
    {
      q: "Can I track my orders in real-time?",
      a: "Absolutely! SwiftGo features a live SVG tracker map that shows driver dispatch status, routes, exact ETA details, and OTP verifications for security."
    }
  ];

  const testimonials = [
    {
      quote: "The bike taxi saved me 45 minutes of bumper-to-bumper traffic in HSR Layout. I got to my client meeting on time! The wallet top-up and OTP features are extremely convenient.",
      author: "Suresh Kumar",
      role: "customer",
      location: "Commuter (Bangalore)",
      initials: "SK",
      rating: 5
    },
    {
      quote: "We integrated our restaurant menu with SwiftGo Food and saw a 35% increase in weekly orders. The rider assignment is automatic and they arrive with hot-insulated food bags.",
      author: "Burger & Co.",
      role: "restaurant",
      location: "Merchant Partner (HSR Layout)",
      initials: "BC",
      rating: 5
    },
    {
      quote: "The rider dashboard is very clean. I can easily toggle online status, accept package and food courier requests, and see my payouts immediately. Platform commissions are low.",
      author: "Ramesh Rider",
      role: "rider",
      location: "Delivery Partner (Bangalore)",
      initials: "RR",
      rating: 5
    },
    {
      quote: "As a busy professional, I use SwiftGo courier for office documents and food delivery daily. Seamless experience, reliable riders, and accurate tracking every single time.",
      author: "Nisha Sharma",
      role: "customer",
      location: "Software Engineer",
      initials: "NS",
      rating: 5
    },
    {
      quote: "Listing our kitchen on SwiftGo opened doors to thousands of local customers. The commission transparency and instant support is unmatched.",
      author: "Green Garden Salads",
      role: "restaurant",
      location: "Kitchen Partner (Indiranagar)",
      initials: "GG",
      rating: 5
    }
  ];

  const workSteps = {
    taxi: [
      { step: "01", title: "Set Destination", desc: "Select pickup and dropoff points in the app to view fares." },
      { step: "02", title: "Match Driver", desc: "Our system instantly routes the request to the nearest active rider." },
      { step: "03", title: "Track En Route", desc: "Watch your driver's real-time coordinate movement on the map." },
      { step: "04", title: "Reach Safely", desc: "Provide your OTP, complete the trip, and pay via integrated wallet." }
    ],
    food: [
      { step: "01", title: "Browse Gourmet Menus", desc: "Select from top rated local restaurants and filter cuisines." },
      { step: "02", title: "Secure Payment", desc: "Checkout using coupons (SWIFT50) and auto-deduct from wallet." },
      { step: "03", title: "Chef Prepares", desc: "The kitchen receives the order and prepares it fresh with quality checks." },
      { step: "04", title: "Superfast Delivery", desc: "Insulated bag rider carries meals hot straight to your doorstep." }
    ],
    parcel: [
      { step: "01", title: "Enter Specifications", desc: "Input package sender details, weight up to 10kg, and description." },
      { step: "02", title: "Courier Dispatched", desc: "A rider arrives at your doorstep to pick up the package securely." },
      { step: "03", title: "Live Track Transit", desc: "Share live tracking links showing the active courier path." },
      { step: "04", title: "Secure OTP Delivery", desc: "Recipient inputs the private OTP pin to release the package." }
    ]
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
    } else {
      if (activeHeroTab === 'taxi') navigate('/user/taxi');
      else if (activeHeroTab === 'food') navigate('/user/food');
      else navigate('/user/parcel');
    }
  };

  const handleServiceClick = (link) => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'user') {
      navigate(`/${currentUser.role}/dashboard`);
    } else {
      navigate(link);
    }
  };

  const calculateFareDetails = () => {
    let base = 0;
    let perKm = 0;
    let name = '';

    if (calcService === 'taxi') {
      if (calcVehicle === 'bike') { base = 25; perKm = 10; name = 'SwiftGo Bike'; }
      else if (calcVehicle === 'auto') { base = 60; perKm = 15; name = 'SwiftGo Auto'; }
      else { base = 110; perKm = 22; name = 'SwiftGo Premium Cab'; }
    } else if (calcService === 'food') {
      base = 35; perKm = 8; name = 'Food Delivery Partner';
    } else {
      base = 50; perKm = 12; name = 'Secure Courier Run';
    }

    const distCharge = calcDistance * perKm;
    let total = base + distCharge;
    if (isPeakHour) total = total * 1.5;

    const etaMins = Math.round(calcDistance * 2.5);
    const co2Saved = (calcDistance * 0.12).toFixed(2);

    return { base, distCharge, total: Math.round(total), etaMins, co2Saved, name };
  };

  const fareResult = calculateFareDetails();

  const filteredTestimonials = testimonials.filter(item => 
    reviewFilter === 'all' ? true : item.role === reviewFilter
  );

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white font-sans animate-fade-in space-y-16 md:space-y-24 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION & LIVE DISPATCH MAP SIMULATOR (MINIMALIST WHITE THEME) */}
      <section className="bg-zinc-50 text-zinc-900 pt-12 md:pt-20 pb-20 md:pb-28 px-4 relative overflow-hidden border-b border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
          
          {/* Left: Headline & Booking Console */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left">
            <div className="inline-flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={11} />
              <span>SwiftGo On Demand</span>
            </div>
            
            <h1 className="font-display font-black text-3.5xl sm:text-5xl md:text-6xl text-zinc-900 tracking-tight leading-none">
              Your City. <br />
              <span className="text-zinc-500">On Demand.</span>
            </h1>
            
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-semibold max-w-lg">
              Book lightning-fast bike taxis, order gourmet meals from local kitchens, or courier packages across town with live tracking. Every booking is backed by secure OTP confirmation.
            </p>

            {/* Quick Booking Minimalist Form Widget */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-zinc-200 space-y-5 max-w-xl">
              {/* Tab Selector */}
              <div className="grid grid-cols-3 gap-1 bg-zinc-50 p-1 rounded-xl border border-zinc-200">
                {[
                  { id: 'taxi', label: 'Ride', icon: Bike },
                  { id: 'food', label: 'Food', icon: Utensils },
                  { id: 'parcel', label: 'Parcel', icon: Package }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveHeroTab(tab.id)}
                    className={`py-2 text-[11px] md:text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition duration-200 ${
                      activeHeroTab === tab.id ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    <tab.icon size={13} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Forms */}
              <form onSubmit={handleHeroSubmit} className="space-y-4">
                {activeHeroTab === 'taxi' && (
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                        <MapPin size={15} />
                      </div>
                      <input
                        type="text"
                        placeholder="Pickup point (e.g. HSR Layout)"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="w-full bg-zinc-50 text-zinc-900 placeholder-zinc-400 text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:bg-white focus:border-zinc-900 transition font-semibold"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                        <MapPin size={15} />
                      </div>
                      <input
                        type="text"
                        placeholder="Dropoff point (e.g. Koramangala)"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                        className="w-full bg-zinc-50 text-zinc-900 placeholder-zinc-400 text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:bg-white focus:border-zinc-900 transition font-semibold"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400 font-semibold px-1">
                      <span>Suggestions:</span>
                      <button type="button" onClick={() => { setPickup('Indiranagar'); setDrop('MG Road'); }} className="text-zinc-900 border-b border-zinc-900 pb-0.5 font-bold">Indiranagar → MG Road</button>
                    </div>
                  </div>
                )}

                {activeHeroTab === 'food' && (
                  <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-[11px] text-zinc-650 font-semibold leading-relaxed">
                    <p className="flex items-start gap-2"><CheckCircle2 className="text-zinc-900 shrink-0 mt-0.5" size={13} /> <span>650+ restaurant partners cooking fresh dishes.</span></p>
                    <p className="flex items-start gap-2"><CheckCircle2 className="text-zinc-900 shrink-0 mt-0.5" size={13} /> <span>50% discount automatically unlocked with coupon <strong className="text-zinc-900 font-bold">SWIFT50</strong>.</span></p>
                  </div>
                )}

                {activeHeroTab === 'parcel' && (
                  <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-[11px] text-zinc-650 font-semibold leading-relaxed">
                    <p className="flex items-start gap-2"><CheckCircle2 className="text-zinc-900 shrink-0 mt-0.5" size={13} /> <span>Courier packages, gadgets, or documents up to 10kg.</span></p>
                    <p className="flex items-start gap-2"><CheckCircle2 className="text-zinc-900 shrink-0 mt-0.5" size={13} /> <span>Real-time location dispatch mapping and secured receiver OTP keys.</span></p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{currentUser ? 'Explore Services Console' : 'Sign In to Proceed'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* Right: SVG Live Map & Dispatch Simulator */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
            <div className="w-full max-w-[480px] bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm relative">
              {/* Simulator HUD Header */}
              <div className="bg-zinc-50 px-4 py-2.5 border-b border-zinc-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-450"></span>
                  <span className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider">Live Booking Simulator</span>
                </div>
                <div className="bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded text-[9px] font-bold">
                  Demo
                </div>
              </div>

              {/* Map Canvas */}
              <div className="relative w-full aspect-[400/220] bg-zinc-50 p-2 overflow-hidden">
                {/* SVG City Map Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 400 220" fill="none" preserveAspectRatio="xMidYMid meet">
                  <path d="M 0 40 Q 150 90 280 20 Q 350 -10 400 20 L 400 0 L 0 0 Z" fill="#e4e4e7" opacity="0.3"/>
                  <line x1="40" y1="0" x2="40" y2="220" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="160" y1="0" x2="160" y2="220" stroke="#e4e4e7" strokeWidth="1.5" />
                  <line x1="280" y1="0" x2="280" y2="220" stroke="#e4e4e7" strokeWidth="1.5" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#e4e4e7" strokeWidth="1.5" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="180" x2="400" y2="180" stroke="#e4e4e7" strokeWidth="1.5" />
                  
                  <path d="M 0 200 L 400 80" stroke="#e4e4e7" strokeWidth="1" />
                  <path d="M 50 0 L 350 220" stroke="#e4e4e7" strokeWidth="1" />

                  <rect x="60" y="80" width="70" height="30" rx="4" fill="#f4f4f5" />
                  <rect x="295" y="135" width="80" height="35" rx="4" fill="#f4f4f5" />

                  {/* Route path connector */}
                  <path 
                    d="M 80 150 L 160 120 L 280 120 L 350 120" 
                    stroke="#18181b" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeDasharray="4 3"
                    opacity="0.8" 
                  />

                  {/* Pickup Pin */}
                  <g transform="translate(80, 150)">
                    <circle r="4" fill="#18181b" />
                    <text y="-8" textAnchor="middle" fill="#18181b" fontSize="7" fontWeight="bold">Pickup</text>
                  </g>

                  {/* Drop Pin */}
                  <g transform="translate(350, 120)">
                    <circle r="4" fill="#71717a" />
                    <text y="-8" textAnchor="middle" fill="#71717a" fontSize="7" fontWeight="bold">Dropoff</text>
                  </g>

                  {/* Dynamic Driver Node */}
                  <g transform={`translate(${driverPos.x}, ${driverPos.y})`} className="transition-all duration-1000 ease-out">
                    <circle r="6" fill="#18181b" />
                  </g>
                </svg>

                {/* Status Indicator Overlays */}
                <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 bg-white/95 border border-zinc-200 px-3 py-2 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="space-y-0.5 text-left">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Status</p>
                    <p className="text-[11px] font-bold text-zinc-900 truncate max-w-[130px] md:max-w-[180px]">{mapStatus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">ETA</p>
                    <p className="text-[11px] font-bold text-zinc-900">{eta > 0 ? `${eta} mins` : 'Arrived!'}</p>
                  </div>
                </div>
              </div>

              {/* Driver Details HUD Panel */}
              <div className="bg-zinc-50 p-3 md:p-4 border-t border-zinc-200 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0">
                    AR
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">Amit R. (Bike Rider)</h4>
                    <p className="text-[9px] text-zinc-400 font-medium truncate">Verified Partner • TVS Apache</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white border border-zinc-200 px-2 py-0.5 rounded-lg shrink-0">
                  <Star size={11} className="text-zinc-800 fill-zinc-800" />
                  <span className="text-[10px] font-bold text-zinc-900">4.9</span>
                </div>
              </div>
            </div>
            
            {/* Subtle disclaimer */}
            <p className="text-[9px] text-zinc-400 font-medium mt-3 flex items-center gap-1">
              <Info size={11} /> Interactive map simulation looping in real-time.
            </p>
          </div>

        </div>
      </section>

      {/* 2. REAL-TIME OPERATIONS FEED TICKER */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-25">
        <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span className="p-2 bg-zinc-100 text-zinc-800 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} />
            </span>
            <div className="text-left">
              <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider leading-none">Hub Operations</h4>
              <p className="text-[9px] text-zinc-400 font-bold">Real-time logs</p>
            </div>
          </div>
          
          <div className="flex-1 w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-4 overflow-hidden relative min-h-[38px] flex items-center justify-center">
            {feedEvents.map((event, idx) => {
              if (idx !== activeFeedIndex) return null;
              return (
                <div 
                  key={idx}
                  className="w-full flex items-center justify-between gap-3 animate-ticker-slide text-left"
                >
                  <p className="text-[11px] font-semibold text-zinc-700 truncate pr-2">{event.text}</p>
                  <span className="text-[8px] bg-zinc-200 text-zinc-550 font-bold px-1.5 py-0.5 rounded shrink-0">{event.time}</span>
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-4 shrink-0 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            <div className="flex items-center gap-1"><Zap size={12} className="text-zinc-700" /> <span>15k Active</span></div>
          </div>
        </div>
      </section>

      {/* 3. PARTNERSHIP INFINITE SCROLLING MARQUEE */}
      <section className="bg-white border-y border-zinc-150 py-5 overflow-hidden">
        <div className="relative w-full flex items-center">
          <div className="animate-marquee flex gap-10 text-[11px] font-bold text-zinc-400 select-none uppercase tracking-widest">
            {/* Set 1 */}
            <span className="flex items-center gap-1.5"><Building size={13} /> Burger House</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Biryani Kitchen</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Green Greens</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Pizza Bistro</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Cafe Mocha</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Waffle Town</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Dosa Hub</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Sushi Express</span>
            {/* Set 2 */}
            <span className="flex items-center gap-1.5"><Building size={13} /> Burger House</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Biryani Kitchen</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Green Greens</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Pizza Bistro</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Cafe Mocha</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Waffle Town</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Dosa Hub</span>
            <span className="flex items-center gap-1.5"><Building size={13} /> Sushi Express</span>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FARE & ETA CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Fare Estimation
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-3.5xl text-zinc-900 tracking-tight leading-none">Pricing Calculator</h2>
          <p className="text-zinc-500 text-xs md:text-sm font-medium">
            Drag the parameters below to compute travel duration and quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Card */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-5 md:p-8 text-left space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              {/* Step 1: Select Service */}
              <div className="space-y-3">
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">1. Select Service Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'taxi', label: 'Taxi Ride', icon: Bike },
                    { id: 'food', label: 'Food Delivery', icon: Utensils },
                    { id: 'parcel', label: 'Courier Hub', icon: Package }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setCalcService(s.id);
                        if (s.id !== 'taxi') setCalcVehicle('bike');
                      }}
                      className={`p-3 border rounded-xl text-xs font-bold flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-2 transition duration-150 ${
                        calcService === s.id 
                          ? 'border-zinc-900 bg-zinc-50 text-zinc-900 shadow-sm' 
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-500'
                      }`}
                    >
                      <s.icon size={16} className="shrink-0" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Vehicle (Only if Taxi) */}
              {calcService === 'taxi' && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">2. Vehicle Class</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'bike', label: 'Bike Taxi', desc: 'Fastest runs' },
                      { id: 'auto', label: 'Auto Cab', desc: 'Open-air comfort' },
                      { id: 'cab', label: 'Cab Car', desc: 'A/C Sedans' }
                    ].map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setCalcVehicle(v.id)}
                        className={`p-3 border rounded-xl text-left transition duration-150 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-2 w-full ${
                          calcVehicle === v.id 
                            ? 'border-zinc-900 bg-zinc-50 text-zinc-900' 
                            : 'border-zinc-200 hover:border-zinc-300 text-zinc-500'
                        }`}
                      >
                        <span className="text-xs font-bold shrink-0">{v.label}</span>
                        <span className="text-[9px] text-zinc-400 font-medium hidden sm:inline">{v.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Distance Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">3. Trip Distance</label>
                  <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">{calcDistance} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  value={calcDistance}
                  onChange={(e) => setCalcDistance(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />
                <div className="flex justify-between text-[9px] text-zinc-400 font-bold">
                  <span>1 km</span>
                  <span>15 km</span>
                  <span>35 km</span>
                </div>
              </div>
            </div>

            {/* Peak Hour Switch */}
            <div className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl mt-4 gap-3">
              <div className="text-left space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <Zap size={13} className="text-zinc-650 shrink-0" />
                  <span>Simulate Peak Hour Traffic</span>
                </h4>
                <p className="text-[9px] text-zinc-400 font-medium">Adds 1.5x surge fee during peak intervals.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPeakHour(!isPeakHour)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 ${
                  isPeakHour ? 'bg-zinc-900' : 'bg-zinc-200'
                } relative`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 transform ${
                  isPeakHour ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-zinc-900 text-white rounded-2xl p-5 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm text-left">
            <div className="space-y-6 relative z-10">
              <span className="bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider w-fit block">
                Quote Breakdown
              </span>
              
              <div className="space-y-1">
                <h4 className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{fareResult.name}</h4>
                <h2 className="text-4xl font-black text-white font-display tracking-tight flex items-baseline">
                  ₹{fareResult.total}
                  <span className="text-xs text-zinc-400 font-semibold ml-1.5">est. total</span>
                </h2>
              </div>

              {/* Breakdowns */}
              <div className="space-y-2 text-xs text-zinc-300 font-medium border-y border-zinc-800 py-4">
                <div className="flex justify-between">
                  <span>Base Booking Fee</span>
                  <span className="font-bold text-white">₹{fareResult.base}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Charge ({calcDistance} km)</span>
                  <span className="font-bold text-white">₹{fareResult.distCharge}</span>
                </div>
                {isPeakHour && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Peak Surge Multiplier</span>
                    <span className="font-bold">1.5x Surge</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-450 pt-1.5 border-t border-zinc-800/50">
                  <span className="flex items-center gap-1 pr-1"><Leaf size={13} className="shrink-0 text-zinc-400" /> Carbon Offset</span>
                  <span className="font-bold text-zinc-400">~{fareResult.co2Saved} kg CO₂</span>
                </div>
              </div>
            </div>

            {/* Quote details */}
            <div className="space-y-4 pt-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-white/5 border border-white/10 rounded-xl text-white flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </span>
                <div className="min-w-0">
                  <h5 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Estimated Dispatch ETA</h5>
                  <p className="text-xs font-bold text-white truncate">Ready for pickup in ~ {fareResult.etaMins} mins</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!currentUser) navigate('/login');
                  else navigate(`/user/${calcService}`);
                }}
                className="w-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold py-3.5 rounded-xl transition duration-150 flex items-center justify-center gap-1.5 active:scale-98 shadow-sm"
              >
                <span>Launch Action Center</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE HOW IT WORKS STEPPER */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Operational Blueprint
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-3.5xl text-zinc-900 tracking-tight leading-none">How It Works</h2>
          <p className="text-zinc-550 text-xs md:text-sm font-medium">
            SwiftGo integrates smart digital logs for smooth dispatching, live tracking, and receipt confirmations.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex justify-center">
          <div className="bg-zinc-50 border border-zinc-200 p-1 rounded-xl grid grid-cols-3 sm:flex sm:flex-row gap-1 w-full max-w-lg">
            {[
              { id: 'taxi', label: 'Ride', icon: Bike },
              { id: 'food', label: 'Food', icon: Utensils },
              { id: 'parcel', label: 'Courier', icon: Package }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveWorkTab(tab.id)}
                className={`py-2 sm:px-5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition duration-150 w-full ${
                  activeWorkTab === tab.id 
                    ? 'bg-zinc-900 text-white shadow-sm' 
                    : 'text-zinc-550 hover:text-zinc-900'
                }`}
              >
                <tab.icon size={13} className="shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {workSteps[activeWorkTab].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 transition duration-200 shadow-sm flex flex-col justify-between min-h-[170px]"
            >
              <div className="space-y-3">
                <span className="inline-flex h-7 w-7 bg-zinc-900 text-white rounded-lg items-center justify-center font-bold text-xs font-mono">
                  {item.step}
                </span>
                <h3 className="font-display font-bold text-base text-zinc-900">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Action decoration */}
              <div className="pt-4 border-t border-zinc-100 mt-4 flex justify-between items-center text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                <span>Verified Log</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CORE SERVICES BENTO GRID (MINIMALIST WHITE) */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Catalogue
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-3.5xl text-zinc-900 tracking-tight leading-none">Explore Our Services</h2>
          <p className="text-zinc-500 text-xs md:text-sm font-medium">
            Choose from a set of fully operational modules with live riders waiting to accept your booking.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:auto-rows-[340px] items-stretch">
          
          {/* Card 1: Taxi Ride */}
          <div 
            onClick={() => handleServiceClick('/user/taxi')}
            className="md:col-span-2 bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-zinc-400 transition duration-200 cursor-pointer group min-h-[340px] md:min-h-0"
          >
            <div className="relative h-44 md:h-52 w-full bg-zinc-100 overflow-hidden shrink-0 border-b border-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1000&auto=format&fit=crop&q=80" 
                alt="Taxi Ride" 
                className="w-full h-full object-cover grayscale-20 group-hover:scale-103 transition duration-300"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                <span className="bg-zinc-900 text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                  Bikes from ₹25
                </span>
                <span className="bg-white text-zinc-900 border border-zinc-200 text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                  Autos & Cabs
                </span>
              </div>
            </div>
            <div className="p-5 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 flex-1">
              <div className="space-y-1.5 text-left min-w-0">
                <h3 className="font-display font-bold text-xl text-zinc-900 flex items-center gap-2">
                  <Car className="text-zinc-900 shrink-0" size={20} /> Taxi Ride Services
                </h3>
                <p className="text-zinc-450 text-xs font-semibold leading-relaxed">
                  Beat peak-hour traffic grids on bike taxis, or book open-air autos and premium air-conditioned cabs. Instant driver matching in under 2 minutes.
                </p>
              </div>
              <span className="p-2.5 bg-zinc-900 text-white rounded-lg transition shrink-0 self-end sm:self-auto">
                <ArrowRight size={14} />
              </span>
            </div>
          </div>

          {/* Card 2: Courier Parcel */}
          <div 
            onClick={() => handleServiceClick('/user/parcel')}
            className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-zinc-400 transition duration-200 cursor-pointer group min-h-[340px] md:min-h-0"
          >
            <div className="relative h-44 md:h-52 w-full bg-zinc-100 overflow-hidden shrink-0 border-b border-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1566241477600-ac026ad43874?w=600&auto=format&fit=crop&q=80" 
                alt="Courier Parcel" 
                className="w-full h-full object-cover grayscale-20 group-hover:scale-103 transition duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-zinc-900 text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                  Courier from ₹50
                </span>
              </div>
            </div>
            <div className="p-5 flex justify-between items-end gap-3 flex-1">
              <div className="space-y-1.5 text-left min-w-0">
                <h3 className="font-display font-bold text-base text-zinc-900 flex items-center gap-1.5">
                  <Package className="text-zinc-900 shrink-0" size={18} /> Courier Delivery
                </h3>
                <p className="text-zinc-450 text-xs font-semibold leading-relaxed truncate">
                  Same-city courier dispatch up to 10kg. Secure OTP pins.
                </p>
              </div>
              <span className="p-2 bg-zinc-900 text-white rounded-lg transition shrink-0">
                <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card 3: Food Delivery */}
          <div 
            onClick={() => handleServiceClick('/user/food')}
            className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-zinc-400 transition duration-200 cursor-pointer group min-h-[340px] md:min-h-0"
          >
            <div className="relative h-44 md:h-52 w-full bg-zinc-100 overflow-hidden shrink-0 border-b border-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80" 
                alt="Gourmet Food" 
                className="w-full h-full object-cover grayscale-20 group-hover:scale-103 transition duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-zinc-900 text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                  Gourmet Kitchens
                </span>
              </div>
            </div>
            <div className="p-5 flex justify-between items-end gap-3 flex-1">
              <div className="space-y-1.5 text-left min-w-0">
                <h3 className="font-display font-bold text-base text-zinc-900 flex items-center gap-1.5">
                  <Utensils className="text-zinc-900 shrink-0" size={18} /> Food Delivery
                </h3>
                <p className="text-zinc-450 text-xs font-semibold leading-relaxed truncate">
                  Order hot meals. Flat 50% Off Code: SWIFT50.
                </p>
              </div>
              <span className="p-2 bg-zinc-900 text-white rounded-lg transition shrink-0">
                <ArrowRight size={12} />
              </span>
            </div>
          </div>

          {/* Card 4: Safety Shield */}
          <div 
            className="md:col-span-2 bg-zinc-900 text-white rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden group shadow-sm min-h-[220px] md:min-h-0 text-left"
          >
            <div className="space-y-3 relative z-10">
              <span className="bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider w-fit block">
                Security Desk
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl leading-snug">
                Your Safety is Our Top Priority
              </h3>
              <p className="text-xs text-zinc-400 font-semibold leading-relaxed max-w-xl">
                Every SwiftGo trip is monitored. Driver background checks, vaccine status verifications, live GPS route sharing, and secure delivery OTP protocols ensure peace of mind on every order.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider relative z-10 pt-4 border-t border-zinc-800 mt-4">
              <div className="flex items-center gap-1.5"><ShieldCheck className="text-white shrink-0" size={14} /> Verified Riders</div>
              <div className="flex items-center gap-1.5"><Clock className="text-white shrink-0" size={14} /> 24/7 Support Desk</div>
              <div className="flex items-center gap-1.5"><MapPin className="text-white shrink-0" size={14} /> GPS Live Track Links</div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. APP DOWNLOADING SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-2xl py-12 px-5 md:p-16 relative overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Text Detail */}
            <div className="lg:col-span-7 space-y-5 md:space-y-6">
              <span className="bg-zinc-900 text-white px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider w-fit block">
                Smartphone Companion
              </span>
              <h2 className="font-display font-black text-2.5xl sm:text-3.5xl md:text-5xl tracking-tight leading-tight">
                Download the SwiftGo Mobile Application
              </h2>
              <p className="text-zinc-550 text-xs md:text-sm leading-relaxed font-semibold">
                Get the ultimate experience on your phone. Dispatch orders on the fly, receive fast notification pings when riders accept, save payment cards, and enjoy offline booking capabilities.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => alert("Redirecting to App Store...")}
                  className="bg-white border border-zinc-200 px-5 py-2 rounded-xl flex items-center gap-2.5 transition duration-150"
                >
                  <Smartphone size={16} className="text-zinc-900 shrink-0" />
                  <div className="text-left leading-tight">
                    <p className="text-[8px] text-zinc-400 font-bold uppercase">Download on</p>
                    <p className="text-xs font-bold text-zinc-900">Apple App Store</p>
                  </div>
                </button>

                <button 
                  onClick={() => alert("Redirecting to Google Play...")}
                  className="bg-white border border-zinc-200 px-5 py-2 rounded-xl flex items-center gap-2.5 transition duration-150"
                >
                  <Smartphone size={16} className="text-zinc-900 shrink-0" />
                  <div className="text-left leading-tight">
                    <p className="text-[8px] text-zinc-400 font-bold uppercase">Get it on</p>
                    <p className="text-xs font-bold text-zinc-900">Google Play Store</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Mobile Phone Bezel Simulation */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row justify-center items-center gap-6 w-full">
              {/* CSS Phone Frame */}
              <div className="w-[190px] h-[340px] bg-zinc-900 border-[5px] border-zinc-850 rounded-[32px] overflow-hidden shadow-sm relative shrink-0">
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-zinc-800 rounded-full z-25"></div>
                
                {/* App Screen Mockup */}
                <div className="p-3 pt-5 flex flex-col justify-between h-full bg-white text-left text-zinc-800 select-none text-[8px] font-sans border-t border-zinc-100">
                  <div className="flex justify-between items-center pb-1.5 border-b border-zinc-150">
                    <span className="font-extrabold text-[8px] text-zinc-900">SwiftGo App</span>
                    <span className="text-zinc-400 font-medium">9:41 AM</span>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-2 rounded-lg space-y-1 mt-1.5">
                    <p className="text-[6px] text-zinc-400 font-bold uppercase">Wallet Balance</p>
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-black text-zinc-900">₹380.00</p>
                      <span className="bg-zinc-200 text-zinc-700 px-1 rounded font-bold text-[5px]">Online</span>
                    </div>
                  </div>

                  <div className="bg-zinc-100 h-20 rounded-lg relative overflow-hidden flex items-center justify-center my-2 border border-zinc-150">
                    <div className="shimmer absolute inset-0"></div>
                    <MapPin className="text-zinc-900 animate-bounce z-10" size={14} />
                    <span className="absolute bottom-1 bg-white/90 border border-zinc-200 px-1 rounded text-[5px] text-zinc-800">Live Route Tracker</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <div className="bg-zinc-50 border border-zinc-200 p-1 rounded-lg text-center font-bold text-zinc-700">
                      <Bike size={9} className="mx-auto text-zinc-900 mb-0.5" />
                      <span>Ride</span>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-200 p-1 rounded-lg text-center font-bold text-zinc-700">
                      <Utensils size={9} className="mx-auto text-zinc-900 mb-0.5" />
                      <span>Food</span>
                    </div>
                    <div className="bg-zinc-50 border border-zinc-200 p-1 rounded-lg text-center font-bold text-zinc-700">
                      <Package size={9} className="mx-auto text-zinc-900 mb-0.5" />
                      <span>Parcel</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-1.5 border-t border-zinc-150 text-center text-zinc-450 font-semibold text-[6px]">
                    © 2026 SwiftGo Inc.
                  </div>
                </div>
              </div>

              {/* QR Scanner Card */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-center shrink-0 space-y-2.5 max-w-[140px] hidden sm:block">
                <div className="bg-zinc-50 p-2 rounded-xl border border-zinc-200 inline-block shadow-inner">
                  <QrCode className="text-zinc-900" size={72} />
                </div>
                <p className="text-[9px] text-zinc-450 font-bold leading-tight uppercase">Scan QR code to install mobile app</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE REVIEW SLIDER */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Reviews & Feedback
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-3.5xl text-zinc-900 tracking-tight leading-none">Loved by Commuters</h2>
          <p className="text-zinc-550 text-xs md:text-sm font-medium">
            Read first-hand accounts from our customers, merchant kitchens, and driver network.
          </p>
        </div>

        {/* Filter categories buttons */}
        <div className="flex justify-center flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'customer', label: 'Customers' },
            { id: 'restaurant', label: 'Merchants' },
            { id: 'rider', label: 'Delivery Riders' }
          ].map(btn => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setReviewFilter(btn.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-150 border ${
                reviewFilter === btn.id 
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' 
                  : 'bg-white text-zinc-650 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm space-y-4 hover:border-zinc-400 transition text-left flex flex-col justify-between animate-scale-up min-h-[170px]"
            >
              <div className="space-y-3">
                <div className="flex gap-0.5 text-zinc-800">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-zinc-800 text-zinc-800"/>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-semibold italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-zinc-100 mt-3 shrink-0">
                <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center font-black text-xs shrink-0 border border-zinc-200">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-zinc-900 flex items-center gap-1">
                    <span className="truncate">{item.author}</span>
                    <ThumbsUp size={10} className="text-zinc-900 shrink-0" />
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-semibold truncate">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ SECTION WITH SEARCH FILTER */}
      <section className="max-w-4xl mx-auto px-4 space-y-8 text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Inquiries
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-3.5xl text-zinc-900 tracking-tight leading-none">Frequently Asked Questions</h2>
          <p className="text-zinc-550 text-xs md:text-sm font-medium">Have questions? Type your query below to get instant answers.</p>
        </div>

        {/* Live Search Input */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-450">
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="w-full bg-white text-zinc-900 placeholder-zinc-400 text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition font-semibold shadow-sm"
          />
        </div>

        {/* Accordions List */}
        <div className="space-y-3 pt-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden transition duration-150"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 flex justify-between items-center text-xs md:text-sm font-bold text-zinc-900 hover:bg-zinc-50 transition text-left gap-4"
                  >
                    <span>{faq.q}</span>
                    <span className="text-zinc-400 shrink-0 ml-2">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-zinc-550 font-semibold leading-relaxed border-t border-zinc-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white border border-zinc-200 rounded-xl space-y-1">
              <p className="text-xs font-bold text-zinc-550">No FAQ results found for "{faqSearch}"</p>
              <p className="text-[10px] text-zinc-450 font-semibold">Try searching another query or clear terms to reset.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
