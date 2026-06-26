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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 text-left">
      
      {/* Page Header */}
      <h2 className="font-display font-black text-2xl text-zinc-900 tracking-tight">Wallet Console</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Balance Card */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 flex flex-col justify-between min-h-[180px] shadow-sm">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider">Available Balance</span>
              <h3 className="text-3xl font-black font-display text-zinc-900 leading-tight">
                ₹{currentUser?.walletBalance?.toFixed(2) || '0.00'}
              </h3>
            </div>
            <div className="p-3 bg-accent-peach/40 border border-primary/15 text-primary rounded-xl">
              <WalletIcon size={20} />
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-4">
            Linked ID: <span className="font-bold text-zinc-700 font-mono">{currentUser?.phone}</span>
          </div>
        </div>

        {/* Add Money Form */}
        <div className="md:col-span-2 bg-white border border-zinc-200 rounded-xl p-6 space-y-5 shadow-sm">
          <h3 className="font-display font-bold text-base text-zinc-900">Add Money to Wallet</h3>
          
          <form onSubmit={handleAddMoney} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-450">
                <IndianRupee size={15} />
              </div>
              <input
                type="number"
                placeholder="Enter amount (e.g. 500)"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                min="10"
                className="block w-full pl-10 pr-4 py-2.5 bg-white rounded-xl input-premium text-xs font-bold text-zinc-800"
              />
            </div>
            <button
              type="submit"
              className="btn-primary text-xs font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition shrink-0 uppercase tracking-wider"
            >
              <Plus size={15} /> Add Balance
            </button>
          </form>

          {/* Quick Add Presets */}
          <div className="space-y-2">
            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {[100, 200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickAdd(amt)}
                  className="bg-white hover:border-primary/20 hover:text-primary border border-zinc-200 text-zinc-700 text-xs font-bold px-3 py-2 rounded-xl transition"
                >
                  +₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Transaction History Section */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 space-y-4 shadow-sm">
        <h3 className="font-display font-bold text-base text-zinc-900">Transaction Statement</h3>

        <div className="overflow-x-auto">
          {userTransactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="pb-3 pt-1">Reference ID</th>
                  <th className="pb-3 pt-1">Date</th>
                  <th className="pb-3 pt-1">Description</th>
                  <th className="pb-3 pt-1">Type</th>
                  <th className="pb-3 pt-1 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs font-semibold text-zinc-650">
                {userTransactions.map((tx) => {
                  const isCredit = tx.type === 'credit';
                  return (
                    <tr key={tx.id} className="hover:bg-zinc-50 transition">
                      <td className="py-3.5 font-mono text-zinc-450">{tx.id}</td>
                      <td className="py-3.5 text-zinc-450">{tx.date}</td>
                      <td className="py-3.5 text-zinc-800 font-bold">{tx.description}</td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-200 text-[9px] font-bold uppercase tracking-wider text-zinc-700">
                          {isCredit ? <ArrowDownLeft size={10} className="text-emerald-500" /> : <ArrowUpRight size={10} className="text-zinc-400" />}
                          {tx.type}
                        </span>
                      </td>
                      <td className={`py-3.5 text-right font-black text-sm ${
                        isCredit ? 'text-emerald-600' : 'text-zinc-900'
                      }`}>
                        {isCredit ? '+' : '-'}₹{tx.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-zinc-400 text-xs font-semibold">
              No transactions recorded yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Wallet;
