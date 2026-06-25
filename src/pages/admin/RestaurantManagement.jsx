import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, Plus, X, Ban, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RestaurantManagement = () => {
  const { restaurants, addRestaurant, updateRestaurantStatus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [restName, setRestName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('25-30 mins');

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!restName || !cuisine || !minOrder) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newRest = {
      id: "rest" + Math.floor(100 + Math.random() * 900),
      name: restName,
      cuisine,
      rating: 5.0,
      deliveryTime,
      minOrder: parseInt(minOrder),
      image: `https://placehold.co/300x200?text=${restName.replace(' ', '+')}`,
      isOpen: true,
      menu: [
        { id: "m-cust-1", name: "Classic Dish", price: 150, category: "Mains", image: "https://placehold.co/100x100?text=Dish" },
        { id: "m-cust-2", name: "Starter Appetizer", price: 99, category: "Starters", image: "https://placehold.co/100x100?text=Appetizer" }
      ]
    };

    addRestaurant(newRest);
    setIsAddModalOpen(false);
    
    // Clear form
    setRestName('');
    setCuisine('');
    setMinOrder('');
  };

  return (
    <div className="space-y-6">
      
      {/* List and Actions */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-6 text-zinc-900">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Restaurant Partners</h2>
            <p className="text-xs text-zinc-500">Manage outlet details, cuisine focus, and suspension status.</p>
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-none sm:w-60">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Search size={15} />
              </div>
              <input
                type="text"
                placeholder="Search restaurant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-xs font-semibold transition text-zinc-900 placeholder-zinc-400"
              />
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition shrink-0 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Plus size={14} /> Add Outlet
            </button>
          </div>
        </div>

        {/* Restaurants Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="pb-3">Restaurant Name</th>
                <th className="pb-3">Cuisine Focus</th>
                <th className="pb-3">Min Order</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Open Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
              {filteredRestaurants.map((rest) => (
                <tr key={rest.id} className="hover:bg-zinc-50 transition">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rest.image} 
                        alt={rest.name} 
                        className="w-10 h-7 rounded border border-zinc-200 object-cover bg-zinc-50"
                      />
                      <span className="font-bold text-zinc-900">{rest.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-zinc-500 font-medium">{rest.cuisine}</td>
                  <td className="py-3.5 font-bold text-zinc-900">₹{rest.minOrder.toFixed(2)}</td>
                  <td className="py-3.5 font-bold text-zinc-900">{rest.rating} ★</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-zinc-200 text-zinc-800 bg-white">
                      <span className={`w-1.5 h-1.5 rounded-full ${rest.isOpen ? 'bg-emerald-500' : 'bg-zinc-400'}`}></span>
                      {rest.isOpen ? 'OPEN' : 'SUSPENDED'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => updateRestaurantStatus(rest.id, !rest.isOpen)}
                      className="p-1.5 rounded-md border border-zinc-200 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 transition bg-white"
                      title={rest.isOpen ? "Suspend Restaurant" : "Approve Restaurant"}
                    >
                      {rest.isOpen ? <Ban size={13} /> : <CheckCircle size={13} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add restaurant modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-5 relative z-10 border border-zinc-200 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Register Restaurant Partner</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="p-1 text-zinc-400 hover:text-zinc-900 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-zinc-500">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-zinc-400 uppercase tracking-wider text-[9px] font-bold">Restaurant Name*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Punjab"
                  value={restName}
                  onChange={(e) => setRestName(e.target.value)}
                  className="block w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-xs font-semibold text-zinc-900 transition placeholder-zinc-400"
                />
              </div>

              {/* Cuisine */}
              <div className="space-y-1.5">
                <label className="block text-zinc-400 uppercase tracking-wider text-[9px] font-bold">Cuisines (comma separated)*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Punjabi, North Indian, Tandoori"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="block w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-xs font-semibold text-zinc-900 transition placeholder-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Min Order */}
                <div className="space-y-1.5">
                  <label className="block text-zinc-400 uppercase tracking-wider text-[9px] font-bold">Min Order Amount (₹)*</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="block w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-xs font-semibold text-zinc-900 transition placeholder-zinc-400"
                  />
                </div>

                {/* Delivery Time */}
                <div className="space-y-1.5">
                  <label className="block text-zinc-400 uppercase tracking-wider text-[9px] font-bold">Estimated ETA*</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="block w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-xs font-semibold text-zinc-900 transition"
                  >
                    <option value="15-20 mins">15-20 mins (Fast)</option>
                    <option value="25-30 mins">25-30 mins</option>
                    <option value="35-40 mins">35-40 mins</option>
                    <option value="45-50 mins">45-50 mins (Slow)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-3 rounded-lg transition uppercase tracking-wider"
              >
                Approve & Register Outlet
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default RestaurantManagement;
