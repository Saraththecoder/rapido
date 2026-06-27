import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  LogOut, 
  Store, 
  Clock, 
  Plus, 
  Check, 
  X, 
  TrendingUp, 
  ShoppingBag, 
  ToggleLeft, 
  ToggleRight, 
  PlusCircle, 
  FileText,
  DollarSign,
  Layers,
  UtensilsCrossed
} from 'lucide-react';
import { applyTheme } from '../../utils/theme';
import { useAuthStore } from '../../store/useAuthStore';
import { RESTAURANTS } from '../../data/restaurants';

// Helper for play audio chime using web audio synth
const playNotificationSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playNote = (freq, startTime, duration) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    playNote(587.33, audioCtx.currentTime, 0.45); // D5
    playNote(880.00, audioCtx.currentTime + 0.15, 0.6); // A5
  } catch (e) {
    console.log("Audio contexts blocked or not supported:", e);
  }
};

const INITIAL_ORDERS = [
  {
    id: 'ORD-8924',
    customer: 'Rahul Sharma',
    items: [
      { name: 'Double Cheese Margherita', qty: 1, price: 219 },
      { name: 'Stuffed Garlic Bread (Veg)', qty: 1, price: 129 }
    ],
    total: 348,
    status: 'pending', // 'pending' | 'preparing' | 'ready' | 'completed'
    time: '2 mins ago'
  },
  {
    id: 'ORD-8923',
    customer: 'Alexandria V.',
    items: [
      { name: 'Spicy Pepperoni Pizza', qty: 2, price: 299 },
      { name: 'Mozzarella Cheese Sticks', qty: 1, price: 159 }
    ],
    total: 757,
    status: 'preparing',
    time: '10 mins ago',
    cookTimeRemaining: 8 
  },
  {
    id: 'ORD-8922',
    customer: 'Priyanka Reddy',
    items: [
      { name: 'Penne White Cream Pasta', qty: 1, price: 199 },
      { name: 'Chilled Lemon Sunrise', qty: 1, price: 89 }
    ],
    total: 288,
    status: 'ready',
    time: '24 mins ago'
  }
];

export default function FoodVendorConsole() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu' | 'analytics'
  const [isOnline, setIsOnline] = useState(true);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [earnings, setEarnings] = useState(4820);
  const [completedCount, setCompletedCount] = useState(14);
  const [incomingOrder, setIncomingOrder] = useState(null);

  // Load menu items from Napoli Artisanal Pizza as default
  const defaultRestaurant = RESTAURANTS.find(r => r.id === 'napoli-pizza') || RESTAURANTS[0];
  const [menuCategories, setMenuCategories] = useState(
    JSON.parse(JSON.stringify(defaultRestaurant.menu))
  );

  // Modals/Drawer states
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Recommended');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemIsVeg, setNewItemIsVeg] = useState(true);

  // Apply Food (orange) theme on mount
  useEffect(() => {
    applyTheme('food');
  }, []);

  // Simulate incoming orders when online
  useEffect(() => {
    let orderTimeout;
    if (isOnline && !incomingOrder) {
      orderTimeout = setTimeout(() => {
        const randId = `ORD-${Math.floor(8000 + Math.random() * 1000)}`;
        const simulatedOrder = {
          id: randId,
          customer: ['Sneha Kapoor', 'Vikram Sen', 'Ananya Roy', 'Aditya Verma'][Math.floor(Math.random() * 4)],
          items: [
            { name: 'Double Cheese Margherita', qty: 1, price: 219 },
            { name: 'Mozzarella Cheese Sticks', qty: 1, price: 159 }
          ],
          total: 378,
          status: 'pending',
          time: 'Just now'
        };
        setIncomingOrder(simulatedOrder);
        playNotificationSound();
      }, 16000); 
    }
    return () => clearTimeout(orderTimeout);
  }, [isOnline, incomingOrder]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Order Flow operations
  const handleAcceptOrder = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'preparing', cookTimeRemaining: 15 } : o));
    setIncomingOrder(null);
  };

  const handleDeclineOrder = (orderId) => {
    setIncomingOrder(null);
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleMarkReady = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'ready' } : o));
  };

  const handleSimulatePickup = (orderId) => {
    const orderObj = orders.find(o => o.id === orderId);
    if (orderObj) {
      setEarnings(prev => prev + orderObj.total);
      setCompletedCount(prev => prev + 1);
    }
    
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'completed' } : o));
    
    setTimeout(() => {
      setOrders(prev => prev.filter(o => o.id !== orderId));
    }, 2000);
  };

  // Menu operations
  const toggleItemStock = (category, itemId) => {
    const updated = { ...menuCategories };
    updated[category] = updated[category].map(item => 
      item.id === itemId ? { ...item, inStock: item.inStock === false ? true : false } : item
    );
    setMenuCategories(updated);
  };

  const handlePriceChange = (category, itemId, newPrice) => {
    const parsed = parseFloat(newPrice);
    if (isNaN(parsed)) return;
    const updated = { ...menuCategories };
    updated[category] = updated[category].map(item => 
      item.id === itemId ? { ...item, price: parsed } : item
    );
    setMenuCategories(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) {
      alert("Name and Price are required.");
      return;
    }
    
    const updated = { ...menuCategories };
    const newItem = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      price: parseFloat(newItemPrice),
      isVeg: newItemIsVeg,
      desc: newItemDesc || 'Customized dish',
      inStock: true
    };
    
    updated[newItemCategory].push(newItem);
    setMenuCategories(updated);

    // Reset
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDesc('');
    setIsAddingItem(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col relative h-full bg-white text-gray-905 font-sans"
    >
      {/* Subtle orange glow effects */}
      <div className="absolute top-[-5%] left-[-15%] w-[280px] h-[280px] rounded-full bg-orange-500/5 blur-[85px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-15%] w-[250px] h-[250px] rounded-full bg-orange-500/3 blur-[80px] pointer-events-none"></div>

      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E5E5E5] z-10 text-gray-900">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <div className="text-left leading-none">
            <span className="text-[10px] text-orange-600 font-black uppercase tracking-wider block">SwiftGo Kitchen</span>
            <h2 className="text-sm font-extrabold uppercase tracking-widest mt-1 block">
              {defaultRestaurant.name}
            </h2>
          </div>
        </div>

        {/* Online Status Toggle */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setIsOnline(!isOnline)}
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <span className={`text-[10px] font-black uppercase tracking-wider ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
              {isOnline ? 'Active' : 'Paused'}
            </span>
            {isOnline ? (
              <ToggleRight className="w-7 h-7 text-green-500" />
            ) : (
              <ToggleLeft className="w-7 h-7 text-gray-400" />
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="p-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7A00] transition-colors border border-orange-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div className="px-4 pt-4 shrink-0 z-10">
        <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-3.5 flex items-center justify-between text-left">
          <div>
            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest">Today's Earnings</span>
            <span className="text-lg font-black text-[#FF7A00] mt-1 block leading-none">₹ {earnings}</span>
          </div>
          <div className="border-l border-[#E5E5E5] pl-4.5">
            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest">Completed</span>
            <span className="text-base font-black text-gray-900 mt-1 block leading-none">{completedCount} Orders</span>
          </div>
          <div className="border-l border-[#E5E5E5] pl-4.5">
            <span className="block text-[8px] font-bold text-gray-400 uppercase tracking-widest">Avg Prep Time</span>
            <span className="text-base font-black text-gray-900 mt-1 block leading-none">12.5 Min</span>
          </div>
        </div>
      </div>

      {/* Sub tabs Navigation */}
      <div className="px-4 pt-3 flex gap-2 shrink-0 z-10">
        {[
          { id: 'orders', label: 'Orders', count: orders.length },
          { id: 'menu', label: 'Manage Menu', count: null },
          { id: 'analytics', label: 'Kitchen Analytics', count: null }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all border font-display relative ${
              activeTab === tab.id
                ? 'bg-orange-50 text-[#FF7A00] border-orange-200'
                : 'bg-[#F8F8F8] text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && tab.count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF7A00] text-black w-4.5 h-4.5 rounded-full text-[9px] font-black flex items-center justify-center border border-white">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-4 pb-20 z-10 space-y-4">

        {/* 1. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4 text-left">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Live Order Tracker</h3>

            {orders.length === 0 ? (
              <div className="py-16 text-center bg-[#F8F8F8]/45 border border-dashed border-[#E5E5E5] rounded-2xl flex flex-col items-center justify-center">
                <UtensilsCrossed className="w-8 h-8 text-gray-300 mb-2" />
                <span className="text-sm font-extrabold text-gray-500 uppercase tracking-wider">No active orders</span>
                <p className="text-[10px] text-gray-400 mt-1 max-w-[200px]">Kitchen is ready. New incoming customer orders will pop up here.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className={`bg-[#F8F8F8] border rounded-2xl p-4 transition-all relative overflow-hidden ${
                      order.status === 'completed'
                        ? 'border-green-500/40 bg-green-50/10'
                        : order.status === 'ready'
                          ? 'border-blue-500/30 bg-blue-50/5'
                          : 'border-[#E5E5E5]'
                    }`}
                  >
                    {/* Status corner badge */}
                    <div className={`absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-wider rounded-bl-xl leading-none ${
                      order.status === 'pending'
                        ? 'bg-[#FF7A00] text-black animate-pulse'
                        : order.status === 'preparing'
                          ? 'bg-amber-500 text-white'
                          : order.status === 'ready'
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white'
                    }`}>
                      {order.status}
                    </div>

                    <div className="mb-3 flex items-center justify-between pr-14">
                      <div>
                        <h4 className="font-extrabold text-xs text-gray-900 leading-tight font-mono">{order.id}</h4>
                        <span className="text-[9px] text-gray-500 block mt-0.5 font-bold uppercase">{order.customer} • {order.time}</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-xl p-3 border border-[#E5E5E5] text-xs text-gray-700 space-y-1.5 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="font-semibold text-gray-650">
                            {item.qty}x <strong className="text-gray-900 font-extrabold">{item.name}</strong>
                          </span>
                          <span className="font-mono text-gray-500 font-bold">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                      <div className="border-t border-[#E5E5E5] pt-2 mt-2 flex justify-between font-black text-gray-900 text-[13px]">
                        <span>Grand Total</span>
                        <span className="text-orange-605 font-display">₹{order.total}</span>
                      </div>
                    </div>

                    {/* Order Action Triggers */}
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeclineOrder(order.id)}
                          className="flex-1 py-2 bg-red-50 hover:bg-red-100/50 text-red-500 font-bold rounded-xl text-xs uppercase tracking-wider border border-red-200"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex-1 py-2 bg-[#FF7A00] hover:bg-[#ff9133] text-black font-black rounded-xl text-xs uppercase tracking-wider shadow-xs"
                        >
                          Accept Order
                        </button>
                      </div>
                    )}

                    {order.status === 'preparing' && (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-600 font-bold font-mono">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>~{order.cookTimeRemaining}m cooking</span>
                        </div>
                        <button
                          onClick={() => handleMarkReady(order.id)}
                          className="flex-1 max-w-[150px] py-2 bg-blue-500 hover:bg-blue-600 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-xs ml-auto"
                        >
                          Mark Ready ➔
                        </button>
                      </div>
                    )}

                    {order.status === 'ready' && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Awaiting Pickup...</span>
                        <button
                          onClick={() => handleSimulatePickup(order.id)}
                          className="flex-1 max-w-[170px] py-2 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-xs ml-auto"
                        >
                          Simulate Pickup ✓
                        </button>
                      </div>
                    )}

                    {order.status === 'completed' && (
                      <div className="text-center py-2 text-green-600 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Completed!</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. MENU TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Menu Customizer</h3>
              <button
                onClick={() => setIsAddingItem(true)}
                className="bg-[#FF7A00] text-black hover:bg-[#ff9133] font-black text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Menu Sections Categories */}
            {Object.keys(menuCategories).map((categoryName) => (
              <div key={categoryName} className="space-y-2.5">
                <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest font-display inline-block mb-1.5">
                  {categoryName}
                </span>

                <div className="space-y-2.5">
                  {menuCategories[categoryName].map((item) => {
                    const isAvailable = item.inStock !== false;
                    return (
                      <div 
                        key={item.id}
                        className={`bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4 flex items-center justify-between shadow-xs transition-all ${
                          !isAvailable ? 'opacity-55' : ''
                        }`}
                      >
                        <div className="space-y-1 flex-1 pr-4 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-[8px] border px-1.5 py-0.2 rounded font-bold leading-none ${
                              item.isVeg 
                                ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                                : 'bg-red-500/10 text-red-650 border-red-500/20'
                            }`}>
                              {item.isVeg ? 'VEG' : 'NON-VEG'}
                            </span>
                            <h4 className="font-extrabold text-xs text-gray-900 font-display truncate">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-[10px] text-gray-500 leading-relaxed font-semibold truncate">
                            {item.desc}
                          </p>
                          
                          {/* Price input edit */}
                          <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-orange-600">
                            <span>₹</span>
                            <input 
                              type="number"
                              value={item.price}
                              onChange={(e) => handlePriceChange(categoryName, item.id, e.target.value)}
                              className="w-16 bg-white border border-[#E5E5E5] rounded px-1.5 py-0.2 text-gray-900 font-mono text-[10px] focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>

                        {/* Availability switch button */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0 select-none">
                          <span className={`text-[8px] font-black uppercase tracking-wider ${
                            isAvailable ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            {isAvailable ? 'In Stock' : 'Out Stock'}
                          </span>
                          <button
                            onClick={() => toggleItemStock(categoryName, item.id)}
                            className="p-1 text-gray-400 hover:text-gray-950 transition-colors"
                          >
                            {isAvailable ? (
                              <ToggleRight className="w-7 h-7 text-green-550" />
                            ) : (
                              <ToggleLeft className="w-7 h-7 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 text-left">
            <h3 className="text-[10px] font-black text-gray-405 uppercase tracking-widest block mb-2">Performance</h3>

            {/* Popular dishes list */}
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4.5">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Popular Dishes Today</span>
              
              <div className="space-y-3 text-xs">
                {[
                  { name: 'Double Cheese Margherita', count: 14, pct: 45, color: 'bg-orange-500' },
                  { name: 'Spicy Pepperoni Pizza', count: 10, pct: 32, color: 'bg-orange-400' },
                  { name: 'Stuffed Garlic Bread (Veg)', count: 6, pct: 18, color: 'bg-orange-300' }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-gray-700">
                      <span className="font-extrabold">{item.name}</span>
                      <span className="font-mono font-bold text-gray-550">{item.count} orders ({item.pct}%)</span>
                    </div>
                    {/* Progress slider bar */}
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#E5E5E5]">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Bar Chart */}
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-2xl p-4.5">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-4">Hourly Orders Distribution</span>
              
              <div className="w-full h-24 flex items-end justify-between px-1">
                {[
                  { label: '9AM', val: '20px', count: 2 },
                  { label: '12PM', val: '65px', count: 8 },
                  { label: '3PM', val: '40px', count: 5 },
                  { label: '6PM', val: '80px', count: 11 },
                  { label: '9PM', val: '95px', count: 14 }
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 w-10">
                    <span className="text-[8px] font-bold text-gray-500 font-mono">#{bar.count}</span>
                    <div className="w-4.5 bg-orange-500/20 hover:bg-orange-500 rounded-t-sm transition-all" style={{ height: bar.val }}></div>
                    <span className="text-[8px] font-bold text-gray-400">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating incoming order modal banner */}
      <AnimatePresence>
        {incomingOrder && (
          <div className="absolute inset-x-4 top-16 z-50 bg-white border-2 border-orange-500 rounded-2xl p-4.5 shadow-2xl text-left text-gray-900">
            <div className="flex justify-between items-start mb-2.5">
              <div>
                <span className="text-[9px] font-black bg-[#FF7A00] text-black px-2 py-0.5 rounded-md uppercase tracking-wider block">
                  New Order Request
                </span>
                <h4 className="font-extrabold text-sm mt-1 font-mono">{incomingOrder.id}</h4>
              </div>
              <span className="text-[9px] font-mono text-[#FF7A00] font-bold bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                ₹{incomingOrder.total}
              </span>
            </div>

            {/* Items details */}
            <div className="text-xs text-gray-700 space-y-1 mb-4 bg-[#F8F8F8] p-2.5 rounded-xl border border-[#E5E5E5]">
              {incomingOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between font-semibold">
                  <span>{item.qty}x {item.name}</span>
                  <span className="text-gray-500 font-mono">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleDeclineOrder(incomingOrder.id)}
                className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-500 font-bold rounded-xl text-xs uppercase tracking-wider border border-red-200"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setOrders(prev => [incomingOrder, ...prev]);
                  handleAcceptOrder(incomingOrder.id);
                }}
                className="flex-1 py-2 bg-[#FF7A00] hover:bg-[#ff9133] text-black font-black rounded-xl text-xs uppercase tracking-wider shadow-xs"
              >
                Accept & Cook
              </button>
            </div>
          </div>
        )}

        {/* Modal for adding new menu item */}
        {isAddingItem && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-5">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#E5E5E5] rounded-3xl p-5 text-left w-full max-w-sm space-y-4 shadow-2xl relative text-gray-900"
            >
              {/* Close X */}
              <button 
                onClick={() => setIsAddingItem(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-sm font-extrabold uppercase tracking-widest font-display">Add Menu Dish</h3>

              <form onSubmit={handleAddItem} className="space-y-3.5">
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Garlic Mushroom Pizza"
                    className="w-full bg-[#F8F8F8] border border-[#E5E5E5] rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-orange-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      placeholder="e.g. 249"
                      className="w-full bg-[#F8F8F8] border border-[#E5E5E5] rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-orange-500 font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Category</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="w-full bg-[#F8F8F8] border border-[#E5E5E5] rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-orange-500 font-bold"
                    >
                      <option value="Recommended">Recommended</option>
                      <option value="Starters">Starters</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wide block mb-1">Dish Details</label>
                  <input
                    type="text"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Brief ingredients info..."
                    className="w-full bg-[#F8F8F8] border border-[#E5E5E5] rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-orange-500 font-semibold"
                  />
                </div>

                {/* Veg choice switch toggle */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-gray-700 font-bold">Vegetarian Item?</span>
                  <div 
                    onClick={() => setNewItemIsVeg(!newItemIsVeg)}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                  >
                    <span className={`text-[10px] font-bold ${newItemIsVeg ? 'text-green-600' : 'text-red-500'}`}>
                      {newItemIsVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                    {newItemIsVeg ? (
                      <ToggleRight className="w-7 h-7 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF7A00] hover:bg-[#ff9133] text-black font-black rounded-xl text-xs uppercase tracking-widest shadow-xs transition-colors"
                  >
                    Confirm & Publish
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
