import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight, Plus, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

const Wallet = () => {
  const { currentUser, transactions, addWalletMoney } = useContext(AppContext);
  const [addAmount, setAddAmount] = useState('');

  const userTransactions = transactions.filter(tx => tx.userId === currentUser?.id);

  const handleAddMoney = (e) => {
    e.preventDefault();
    if (!addAmount || parseFloat(addAmount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    addWalletMoney(addAmount);
    setAddAmount('');
  };

  const handleQuickAdd = (amount) => {
    addWalletMoney(amount);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Page Header */}
      <h2 className="font-display font-extrabold text-2xl text-dark">My SwiftGo Wallet</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Glow Balance Card */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-3xl p-6 shadow-lg shadow-orange-500/20 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          {/* Decorative overlay circles */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-lg -ml-6 -mb-6"></div>

          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
              <span className="text-orange-100 text-xs font-bold uppercase tracking-wider">Available Balance</span>
              <h3 className="text-4xl font-black font-display text-white">
                ₹{currentUser?.walletBalance?.toFixed(2) || '0.00'}
              </h3>
            </div>
            <div className="p-3 bg-white/15 text-white rounded-2xl">
              <WalletIcon size={24} />
            </div>
          </div>

          <div className="text-xs text-orange-100 mt-6 relative z-10 font-medium">
            Linked Account: <span className="font-bold text-white font-mono">{currentUser?.phone}</span>
          </div>
        </div>

        {/* Add Money Form */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-display font-bold text-lg text-dark">Add Money to Wallet</h3>
          
          <form onSubmit={handleAddMoney} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <IndianRupee size={16} />
              </div>
              <input
                type="number"
                placeholder="Enter amount (e.g. 500)"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                min="10"
                className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-sm font-bold transition"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5 transition shrink-0"
            >
              <Plus size={16} /> Add Balance
            </button>
          </form>

          {/* Quick Add Presets */}
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Popular Top-ups</p>
            <div className="flex gap-2.5">
              {[100, 200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAdd(amt)}
                  className="bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 text-dark-light hover:text-primary text-xs font-bold px-4 py-2.5 rounded-xl transition duration-200"
                >
                  +₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Transaction History Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-display font-extrabold text-xl text-dark">Transaction Statement</h3>

        <div className="overflow-x-auto">
          {userTransactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 pt-1">Reference ID</th>
                  <th className="pb-3 pt-1">Date</th>
                  <th className="pb-3 pt-1">Description</th>
                  <th className="pb-3 pt-1">Type</th>
                  <th className="pb-3 pt-1 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-medium">
                {userTransactions.map((tx) => {
                  const isCredit = tx.type === 'credit';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 font-mono text-xs text-gray-400">{tx.id}</td>
                      <td className="py-3.5 text-xs text-gray-500">{tx.date}</td>
                      <td className="py-3.5 text-dark font-semibold">{tx.description}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-gray-600'
                        }`}>
                          {isCredit ? <ArrowDownLeft size={10} /> : <ArrowUpRight size={10} />}
                          {tx.type}
                        </span>
                      </td>
                      <td className={`py-3.5 text-right font-bold text-base ${
                        isCredit ? 'text-emerald-600' : 'text-dark'
                      }`}>
                        {isCredit ? '+' : '-'}₹{tx.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-gray-400 text-xs font-semibold">
              No transactions recorded yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Wallet;
