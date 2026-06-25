import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Wallet, IndianRupee, AlertCircle } from 'lucide-react';
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
    <div className="flex-1 max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-8 space-y-8 text-zinc-900">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Partner Wallet</h2>
        <p className="text-xs text-zinc-500">Manage your earnings payout and review historical transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Minimalist balance card */}
        <div className="bg-zinc-900 text-white rounded-xl p-6 flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Settled Balance</span>
              <h3 className="text-3xl font-bold tracking-tight">₹{balance.toFixed(2)}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-lg text-white">
              <Wallet size={20} />
            </div>
          </div>
          <div className="text-[10px] text-zinc-400 uppercase font-semibold tracking-wider pt-4">
            Payout Bank: HDFC Bank •••• 9081
          </div>
        </div>

        {/* Withdrawal form */}
        <div className="md:col-span-2 bg-white rounded-xl border border-zinc-200 p-6 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Cash Out Earnings</h3>

          <form onSubmit={handleWithdraw} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <IndianRupee size={15} />
              </div>
              <input
                type="number"
                placeholder="Enter amount to cash out (Min: ₹100)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="100"
                className="block w-full pl-8 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-900 text-sm font-semibold transition text-zinc-900 placeholder-zinc-400"
              />
            </div>
            <button
              type="submit"
              disabled={isWithdrawing || !withdrawAmount}
              className={`py-2.5 px-6 rounded-lg text-xs font-bold text-white transition shrink-0 uppercase tracking-wider ${
                isWithdrawing || !withdrawAmount
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-transparent'
                  : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-900'
              }`}
            >
              {isWithdrawing ? 'Processing...' : 'Withdraw to Bank'}
            </button>
          </form>

          <p className="text-[10px] text-zinc-500 font-medium flex items-start gap-2 bg-zinc-50 border border-zinc-200 p-3 rounded-lg leading-normal">
            <AlertCircle size={14} className="text-zinc-600 shrink-0 mt-0.5" />
            <span>20% platform commission is automatically deducted on job completion. Withdrawals are processed instantly to your registered savings account.</span>
          </p>
        </div>

      </div>

      {/* Transaction Log */}
      <div className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Wallet History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Description</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs font-medium text-zinc-700">
              {riderTxs.map((tx) => {
                const isCredit = tx.type === 'credit';
                return (
                  <tr key={tx.id} className="hover:bg-zinc-50 transition">
                    <td className="py-3 font-mono text-[11px] text-zinc-400">{tx.id}</td>
                    <td className="py-3 text-[11px] text-zinc-500">{tx.date}</td>
                    <td className="py-3 text-zinc-900 font-medium">{tx.desc}</td>
                    <td className={`py-3 text-right font-bold text-sm ${
                      isCredit ? 'text-zinc-900' : 'text-zinc-500'
                    }`}>
                      {isCredit ? '+' : '-'}₹{tx.amount.toFixed(2)}
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
