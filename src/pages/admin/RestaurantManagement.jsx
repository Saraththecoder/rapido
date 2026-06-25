import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Search, Plus, X, Utensils, Ban, CheckCircle } from 'lucide-react';
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
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-display font-extrabold text-xl text-dark">Restaurant Partners</h2>
            <p className="text-xs text-gray-400 font-semibold mt-1 uppercase font-sans">Manage outlet details and suspension status.</p>
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-none sm:w-60">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search restaurant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold transition"
              />
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-1.5 transition shrink-0"
            >
              <Plus size={16} /> Add Outlet
            </button>
          </div>
        </div>

        {/* Restaurants Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="pb-3">Restaurant Name</th>
                <th className="pb-3">Cuisine Focus</th>
                <th className="pb-3">Min Order</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Open Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-650">
              {filteredRestaurants.map((rest) => (
                <tr key={rest.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <img 
                        src={rest.image} 
                        alt={rest.name} 
                        className="w-10 h-7 rounded object-cover bg-slate-100"
                      />
                      <span className="font-bold text-dark">{rest.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-550 font-semibold">{rest.cuisine}</td>
                  <td className="py-3.5 font-bold text-dark">₹{rest.minOrder}</td>
                  <td className="py-3.5 font-bold text-dark">{rest.rating} ★</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      rest.isOpen 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-rose-50 text-rose-500 border-rose-100'
                    }`}>
                      {rest.isOpen ? 'OPEN' : 'SUSPENDED'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => updateRestaurantStatus(rest.id, !rest.isOpen)}
                      className={`p-2 rounded-lg border transition ${
                        rest.isOpen 
                          ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100' 
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                      }`}
                      title={rest.isOpen ? "Suspend Restaurant" : "Approve Restaurant"}
                    >
                      {rest.isOpen ? <Ban size={14} /> : <CheckCircle size={14} />}
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 relative z-10 border border-gray-100 animate-scale-up">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-display font-extrabold text-lg text-dark">Register Restaurant Partner</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="p-1 text-gray-400 hover:text-dark transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-gray-500">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block">Restaurant Name*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Punjab"
                  value={restName}
                  onChange={(e) => setRestName(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold text-dark transition"
                />
              </div>

              {/* Cuisine */}
              <div className="space-y-1.5">
                <label className="block">Cuisines (comma separated)*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Punjabi, North Indian, Tandoori"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold text-dark transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Min Order */}
                <div className="space-y-1.5">
                  <label className="block">Min Order Amount (₹)*</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold text-dark transition"
                  />
                </div>

                {/* Delivery Time */}
                <div className="space-y-1.5">
                  <label className="block">Estimated ETA*</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="block w-full px-3 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-xs font-semibold text-dark transition"
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
                className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3.5 rounded-xl shadow-sm transition"
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
