import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { Shield, Mail, Lock, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

export default function AuthAdmin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Admin — Sign In ONLY (no public sign-up for admin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) navigate('/');
      else setError('Access denied. Invalid admin credentials.');
    }, 600);
  };

  const quickLogin = () => {
    setLoading(true);
    setTimeout(() => { login('admin@swiftgo.com', 'SwiftGo@2026'); navigate('/'); }, 400);
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all shadow-sm";

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-rose-50 via-gray-50 to-slate-100 relative overflow-hidden select-none">
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-rose-400/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[80px] left-[-40px] w-[150px] h-[150px] rounded-full bg-slate-400/10 blur-[50px] pointer-events-none" />

      <Link to="/auth" className="absolute top-4 left-4 z-20 flex items-center gap-1 text-rose-600 text-xs font-bold hover:text-rose-800 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </Link>

      <div className="flex-1 flex flex-col justify-center px-6 py-10 z-10">
        <div className="w-full max-w-[320px] mx-auto space-y-5">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-slate-700 shadow-lg shadow-rose-300/40 mb-1">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900 font-display">Admin Console</h1>
            <p className="text-[11px] text-gray-500">Restricted access — authorized personnel only</p>
          </motion.div>

          {/* Security notice — no sign-up tab for admin */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200">
            <KeyRound className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="text-[10px] font-bold text-rose-600">Admin accounts are provisioned internally only</span>
          </div>

          {/* Error */}
          {error && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-200 text-center">{error}</motion.div>}

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSignIn} className="space-y-3">
            <div className="relative"><input type="text" placeholder="admin@swiftgo.com" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} /><Mail className="w-4 h-4 text-rose-400 absolute left-3 top-3.5" /></div>
            <div className="relative"><input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} /><Lock className="w-4 h-4 text-rose-400 absolute left-3 top-3.5" /></div>
            <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-slate-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-rose-300/20 flex items-center justify-center gap-2 hover:from-rose-600 hover:to-slate-800 transition-all disabled:opacity-70">
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <><span>Access Console</span><ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </motion.form>

          {/* Demo quick-login */}
          <div className="border-t border-rose-100 pt-4">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Demo Account</p>
            <button onClick={quickLogin} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all">
              <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-rose-500" /><span className="text-xs font-bold text-gray-700">Admin Console (SwiftGo)</span></div>
              <span className="text-[10px] text-rose-500 font-bold">Tap to Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
