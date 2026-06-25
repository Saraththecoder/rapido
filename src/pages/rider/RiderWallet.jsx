import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Wallet, IndianRupee, ArrowDownRight, ArrowUpLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RiderWallet = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Local state list for rider's mock wallet transaction logs
  const [riderTxs, setRiderTxs] = useState([
    { id: "TXN-701", date: "2026-06-25", desc: "Earnings Credit - Job FO821", amount: 120, type: "credit" },
    { id: "TXN-702", date: "2026-06-25", desc: "Platform Commission (20%)", amount: 24, type: "debit" },
    { id: "TXN-703", date: "2026-06-25", desc: "Earnings Credit - Job TX451", amount: 55, type: "credit" },
    { id: "TXN-704", date: "2026-06-24", desc: "Withdrawal to Bank Account", amount: 1000, type: "debit" },
    { id: "TXN-705", date: "2026-06-24", desc: "Weekly Incentive Bonus", amount: 200, type: "credit" },
    { id: "TXN-706", date: "2026-06-23", desc: "Earnings Credit - Job PA109", amount: 80, type: "credit" },
    { id: "TXN-707", date: "2026-06-23", desc: "Platform Commission (20%)", amount: 16, type: "debit" }
  ]);

  const balance = currentUser?.walletBalance || 0;

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(withdrawAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      toast.error("Please enter a valid amount to withdraw.");
      return;
    }

    if (amountVal > balance) {
      toast.error("Insufficient balance in your partner wallet.");
      return;
    }

    setIsWithdrawing(true);

    setTimeout(() => {
      // Deduct from wallet balance
      setCurrentUser(prev => ({
        ...prev,
        walletBalance: prev.walletBalance - amountVal
      }));

      // Add to list
      const newTx = {
        id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        desc: "Withdrawal to Bank Account",
        amount: amountVal,
        type: "debit"
      };

      setRiderTxs(prev => [newTx, ...prev]);
      setIsWithdrawing(false);
      setWithdrawAmount('');
      toast.success(`₹${amountVal} cashed out to your bank account successfully!`);
    }, 2000);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Page Header */}
      <h2 className="font-display font-extrabold text-2xl text-dark">Partner Wallet</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Glow balance card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-md shadow-emerald-500/10 flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-emerald-100 text-xs font-bold uppercase tracking-wider">Settled Balance</span>
              <h3 className="text-3.5xl font-black font-display">₹{balance.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <Wallet size={24} />
            </div>
          </div>
          <div className="text-[10px] text-emerald-100 uppercase font-semibold">
            Bank Account: HDFC **** 9081
          </div>
        </div>

        {/* Withdrawal form */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-display font-bold text-lg text-dark">Cash Out Earnings</h3>

          <form onSubmit={handleWithdraw} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <IndianRupee size={16} />
              </div>
              <input
                type="number"
                placeholder="Enter amount to cash out (Min: ₹100)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="100"
                className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary text-sm font-bold transition"
              />
            </div>
            <button
              type="submit"
              disabled={isWithdrawing || !withdrawAmount}
              className={`py-3 px-6 rounded-2xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 transition shrink-0 ${
                isWithdrawing || !withdrawAmount
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              {isWithdrawing ? 'Cashing Out...' : 'Withdraw to Bank'}
            </button>
          </form>

          <p className="text-[10px] text-gray-400 font-semibold flex items-center gap-1.5 bg-slate-50 border p-3 rounded-2xl leading-normal">
            <AlertCircle size={14} className="text-amber-500 shrink-0" />
            <span>20% platform commission is automatically deducted on job completion. Withdrawals are processed instantly to your registered savings account.</span>
          </p>
        </div>

      </div>

      {/* Transaction Log */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-display font-bold text-lg text-dark">Wallet History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Description</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-medium">
              {riderTxs.map((tx) => {
                const isCredit = tx.type === 'credit';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 font-mono text-xs text-gray-400">{tx.id}</td>
                    <td className="py-3.5 text-xs text-gray-500">{tx.date}</td>
                    <td className="py-3.5 text-dark font-semibold">{tx.desc}</td>
                    <td className={`py-3.5 text-right font-bold text-sm ${
                      isCredit ? 'text-emerald-600' : 'text-rose-500'
                    }`}>
                      {isCredit ? '+' : '-'}₹{tx.amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RiderWallet;
