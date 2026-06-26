import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, User, Mail, Phone, Calendar, Shield, CreditCard, Compass, Clock, MapPin, Tag, Copy, Sparkles, Sliders, Bell, Eye, HelpCircle, MessageSquare, Send } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useWalletStore } from '../store/useWalletStore';

// Base Drawer Wrapper with Slide Animation
function DrawerWrapper({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 240 }}
      className="absolute inset-0 bg-[#0C0B10] z-[60] flex flex-col text-white"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between p-4.5 border-b border-white/5 bg-[#0C0B10]">
        <button 
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5 shrink-0" />
          <span className="font-extrabold uppercase tracking-wider font-display leading-none">{title}</span>
        </button>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content scroll area */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-5">
        {children}
      </div>
    </motion.div>
  );
}

// 1. PROFILE DRAWER
export function ProfileDrawer({ isOpen, onClose }) {
  const user = useAuthStore((state) => state.user);
  const balance = useWalletStore((state) => state.balance);

  return (
    <DrawerWrapper isOpen={isOpen} title="My Profile" onClose={onClose}>
      {/* Avatar details banner */}
      <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-5 text-center space-y-3 shadow-lg">
        <div className="w-20 h-20 rounded-full border-2 border-purple-500/30 overflow-hidden mx-auto shadow">
          <img src="/avatar.png" className="w-full h-full object-cover" alt="Profile" />
        </div>
        <div>
          <h3 className="font-extrabold text-base text-white font-display">{user?.name || 'Rahul Sharma'}</h3>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold font-display mt-1 inline-block">
            MOCK USER MEMBER
          </span>
        </div>
      </div>

      {/* Personal Info Grid */}
      <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 space-y-4 text-left">
        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Personal Information</h4>
        
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-purple-300 shrink-0" />
            <div>
              <span className="text-[9px] text-gray-500 font-bold block uppercase">Email Address</span>
              <span className="text-xs font-semibold text-gray-200">{user?.email || 'user@ladypilot.in'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-purple-300 shrink-0" />
            <div>
              <span className="text-[9px] text-gray-500 font-bold block uppercase">Mobile Number</span>
              <span className="text-xs font-semibold text-gray-200">{user?.phone || '+91 98765 43210'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-purple-300 shrink-0" />
            <div>
              <span className="text-[9px] text-gray-500 font-bold block uppercase">Joined Date</span>
              <span className="text-xs font-semibold text-gray-200">June 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet details card */}
      <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 rounded-xl bg-purple-950/40 text-purple-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] text-gray-500 font-bold uppercase block leading-none">Wallet Balance</span>
            <span className="text-sm font-black text-white font-display block mt-1">₹ {balance.toFixed(2)}</span>
          </div>
        </div>
        
        <span className="text-[9px] font-black bg-purple-500/10 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/20 font-display uppercase tracking-widest">
          Active
        </span>
      </div>
    </DrawerWrapper>
  );
}

// 2. RIDE HISTORY DRAWER
const PAST_RIDES = [
  { id: 'LP-3891', type: '🛵 Bike Taxi', pilot: 'Priya Reddy', date: 'June 25, 2026', fare: '₹45.00', route: 'Hitech City -> Jubilee Hills' },
  { id: 'LP-2390', type: '🛺 Auto Ride', pilot: 'Kavitha S.', date: 'June 22, 2026', fare: '₹89.00', route: 'Secunderabad -> Banjara Hills' },
  { id: 'LP-1192', type: '🚗 Premium Cab', pilot: 'Meena Kumari', date: 'June 18, 2026', fare: '₹149.00', route: 'Charminar -> DLF Cybercity' }
];

export function HistoryDrawer({ isOpen, onClose }) {
  return (
    <DrawerWrapper isOpen={isOpen} title="Ride History" onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display text-left">
          Past Trip Logs
        </h3>

        <div className="space-y-3">
          {PAST_RIDES.map((ride) => (
            <div 
              key={ride.id}
              className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 text-left relative shadow-md"
            >
              <div className="flex justify-between items-center mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white font-display">{ride.type}</span>
                  <span className="text-[8px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20 font-bold uppercase">Completed</span>
                </div>
                <span className="text-[9px] font-mono text-purple-400 font-bold">#{ride.id}</span>
              </div>

              <div className="space-y-2 text-[11px] text-gray-400 font-semibold mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{ride.route}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>Lady Pilot: <strong className="text-gray-300 font-bold">{ride.pilot}</strong></span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-2.5 flex justify-between items-center text-[10px]">
                <span className="text-gray-500 font-bold uppercase">{ride.date}</span>
                <span className="font-black text-white text-xs font-display">{ride.fare}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DrawerWrapper>
  );
}

// 3. OFFERS & PROMOS DRAWER
const COUPONS = [
  { code: 'SWIFT50', value: '₹50 OFF', desc: 'Saves ₹50 flat on your first food order', minVal: '₹199' },
  { code: 'FIRST100', value: '₹100 OFF', desc: 'Saves ₹100 flat on your food order checkout', minVal: '₹249' },
  { code: 'FREEFOOD', value: 'FREE DEL', desc: 'Deducts delivery fee on any restaurant order', minVal: '₹99' }
];

export function OffersDrawer({ isOpen, onClose }) {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <DrawerWrapper isOpen={isOpen} title="Offers & Promos" onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display text-left">
          Available Coupon Codes
        </h3>

        <div className="space-y-3">
          {COUPONS.map((coupon) => (
            <div 
              key={coupon.code}
              className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 text-left relative overflow-hidden shadow-md flex items-center justify-between"
            >
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-lp-yellow font-display">{coupon.value}</span>
                  <span className="text-[9px] text-gray-400 font-bold">Min: {coupon.minVal}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-semibold">{coupon.desc}</p>
                <div className="pt-1.5 flex items-center">
                  <span className="font-mono text-xs font-bold bg-[#0C0B10] px-2 py-0.5 rounded border border-white/10 text-purple-300">
                    {coupon.code}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="p-2.5 rounded-full bg-[#252230] text-gray-400 hover:text-white transition-colors"
              >
                {copiedCode === coupon.code ? (
                  <span className="text-[9px] font-extrabold text-green-400 font-display">Copied!</span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DrawerWrapper>
  );
}

// 4. SETTINGS DRAWER
export function SettingsDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  return (
    <DrawerWrapper isOpen={isOpen} title="Settings" onClose={onClose}>
      <div className="space-y-5 text-left">
        
        {/* Toggle Toggles */}
        <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 space-y-4">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Preferences</h4>
          
          <div className="divide-y divide-white/5">
            <div className="flex items-center justify-between py-3 first:pt-0">
              <div>
                <span className="text-xs font-bold text-white block">Push Notifications</span>
                <span className="text-[10px] text-gray-500 font-semibold">Enable alert sound updates</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors relative ${notifications ? 'bg-[#C3B1E1]' : 'bg-gray-800'}`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-[#0C0B10] transition-transform ${notifications ? 'translate-x-[18px]' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-xs font-bold text-white block">Dark Mode</span>
                <span className="text-[10px] text-gray-500 font-semibold">Optimize visual UI brightness</span>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors relative ${darkMode ? 'bg-[#C3B1E1]' : 'bg-gray-800'}`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-[#0C0B10] transition-transform ${darkMode ? 'translate-x-[18px]' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 last:pb-0">
              <div>
                <span className="text-xs font-bold text-white block">GPS Location Access</span>
                <span className="text-[10px] text-gray-500 font-semibold">Allow automatic location lookup</span>
              </div>
              <button 
                onClick={() => setLocationServices(!locationServices)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors relative ${locationServices ? 'bg-[#C3B1E1]' : 'bg-gray-800'}`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-[#0C0B10] transition-transform ${locationServices ? 'translate-x-[18px]' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 text-xs text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>App Version</span>
            <span className="font-bold text-gray-200">v1.0.0 (Beta)</span>
          </div>
          <div className="flex justify-between">
            <span>Client Environment</span>
            <span className="font-bold text-gray-200">React 19 + Vite</span>
          </div>
        </div>
      </div>
    </DrawerWrapper>
  );
}

// 5. HELP & SUPPORT DRAWER
const FAQS = [
  { q: "How are Lady Pilots verified?", a: "Every pilot goes through background vetting, ID checks, and vehicle authorization reviews to guarantee passenger safety." },
  { q: "What should I do in an emergency?", a: "Tap the floating red 'SOS' button at the top right of the Ride Tracking view. We instantly notify local dispatch services." },
  { q: "How do I apply coupons?", a: "Go to your Food Cart, enter any active coupon code (like SWIFT50), and tap Apply to deduct flat amounts from the subtotal." }
];

export function HelpDrawer({ isOpen, onClose }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Lady Pilot Support. How can we help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { text: userText, isBot: false }]);
    setInputValue('');

    // Simulate chatbot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks for reaching out! A support operator will connect with you in a moment.", isBot: true }
      ]);
    }, 1500);
  };

  return (
    <DrawerWrapper isOpen={isOpen} title="Help & Support" onClose={onClose}>
      <div className="space-y-5 text-left">
        
        {/* FAQs */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Frequently Asked Questions</h4>
          
          <div className="space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#1A1822] border border-white/5 rounded-2xl overflow-hidden text-xs"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 flex items-center justify-between font-bold text-gray-200 hover:bg-white/2"
                  >
                    <span>{faq.q}</span>
                    <span className="text-purple-400 font-extrabold text-sm leading-none">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-[11px] text-gray-400 leading-relaxed border-t border-white/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Chat Simulator */}
        <div className="bg-[#1A1822] border border-white/5 rounded-3xl p-4.5 flex flex-col h-72">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest font-display mb-3 shrink-0">Live Chat Assistant</h4>
          
          {/* Chat message viewport */}
          <div className="flex-1 overflow-y-auto scrollbar-none space-y-3.5 pr-1 py-1">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.isBot 
                    ? 'bg-[#0c081d] text-gray-200 rounded-tl-none border border-purple-500/10' 
                    : 'bg-[#C3B1E1] text-[#0C0B10] rounded-tr-none font-bold'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-white/5 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#0C0B10] border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C3B1E1]"
            />
            <button
              type="submit"
              className="p-2 bg-[#C3B1E1] hover:bg-[#d4c8eb] text-[#0C0B10] rounded-xl flex items-center justify-center transition-colors shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </DrawerWrapper>
  );
}
