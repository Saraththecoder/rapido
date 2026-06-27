import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { Store, Mail, Lock, ArrowRight, ArrowLeft, ChefHat } from 'lucide-react';

export default function AuthVendor() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

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
      else setError('Invalid credentials. Try the quick-login below.');
    }, 600);
  };

  const quickLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login('vendor@swiftgo.com', 'password');
      setLoading(false);
      navigate('/');
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50/40 relative overflow-hidden select-none">
      {/* Decorative blobs */}
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-emerald-400/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[80px] left-[-40px] w-[150px] h-[150px] rounded-full bg-teal-400/10 blur-[50px] pointer-events-none" />

      {/* Back button */}
      <Link to="/auth" className="absolute top-4 left-4 z-20 flex items-center gap-1 text-emerald-600 text-xs font-bold hover:text-emerald-800 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </Link>

      <div className="flex-1 flex flex-col justify-center px-6 py-8 z-10">
        <div className="w-full max-w-[320px] mx-auto space-y-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-300/40 mb-1">
              <Store className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900 font-display">Vendor Login</h1>
            <p className="text-[11px] text-gray-500">Manage your restaurant &amp; grow sales</p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 text-center">
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSignIn}
            className="space-y-4"
          >
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Vendor Email</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="vendor@swiftgo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm"
                  />
                  <Mail className="w-4 h-4 text-emerald-500 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm"
                  />
                  <Lock className="w-4 h-4 text-emerald-500 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-300/30 flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-70"
            >
              {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <>
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>}
            </motion.button>
          </motion.form>

          {/* Quick login */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Demo Account</p>
            <button
              onClick={quickLogin}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all"
            >
              <div className="flex items-center gap-2">
                <ChefHat className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold text-gray-700">Pizza Bistro (Vendor)</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">Tap to Login</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
