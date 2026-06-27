import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { User, Mail, Lock, Phone, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function AuthUser() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setName(''); setEmail(''); setPhone(''); setPassword(''); setError(''); };

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) navigate('/');
      else setError('Invalid credentials. Try the demo login below.');
    }, 600);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !phone || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const success = register(name, email, phone, password, 'user');
      setLoading(false);
      if (success) navigate('/');
      else setError('Registration failed. Please try again.');
    }, 600);
  };

  const quickLogin = () => {
    setLoading(true);
    setTimeout(() => { login('8074244332', 'password'); navigate('/'); }, 400);
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all shadow-sm";

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50/40 relative overflow-hidden select-none">
      <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-orange-400/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[80px] left-[-40px] w-[150px] h-[150px] rounded-full bg-amber-400/10 blur-[50px] pointer-events-none" />

      <Link to="/auth" className="absolute top-4 left-4 z-20 flex items-center gap-1 text-orange-600 text-xs font-bold hover:text-orange-800 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </Link>

      <div className="flex-1 flex flex-col justify-center px-6 py-10 z-10">
        <div className="w-full max-w-[320px] mx-auto space-y-5">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-300/40 mb-1">
              <User className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900 font-display">Customer Portal</h1>
            <p className="text-[11px] text-gray-500">Book rides, order food &amp; send parcels</p>
          </motion.div>

          {/* Tab Switch */}
          <div className="flex p-1 bg-orange-50 border border-orange-100 rounded-xl">
            <button onClick={() => { setIsSignUp(false); reset(); }} className={`flex-1 py-2 text-xs font-black rounded-lg transition-all font-display ${!isSignUp ? 'bg-white text-gray-900 shadow-sm border border-orange-100' : 'text-gray-400 hover:text-gray-700'}`}>Sign In</button>
            <button onClick={() => { setIsSignUp(true); reset(); }} className={`flex-1 py-2 text-xs font-black rounded-lg transition-all font-display ${isSignUp ? 'bg-white text-gray-900 shadow-sm border border-orange-100' : 'text-gray-400 hover:text-gray-700'}`}>Sign Up</button>
          </div>

          {/* Error */}
          {error && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 text-center">{error}</motion.div>}

          <AnimatePresence mode="wait">
            {!isSignUp ? (
              <motion.form key="signin" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }} onSubmit={handleSignIn} className="space-y-3">
                <div className="relative"><input type="text" placeholder="Phone or Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} /><Mail className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" /></div>
                <div className="relative"><input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} /><Lock className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" /></div>
                <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-orange-300/30 flex items-center justify-center gap-2 hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-70">
                  {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form key="signup" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }} onSubmit={handleSignUp} className="space-y-3">
                <div className="relative"><input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className={inputClass} /><User className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" /></div>
                <div className="relative"><input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} /><Phone className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" /></div>
                <div className="relative"><input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} /><Mail className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" /></div>
                <div className="relative"><input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} /><Lock className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" /></div>
                {/* Role badge — fixed to Customer */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-50 border border-orange-200">
                  <User className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-black text-orange-700 font-display">Registering as: Customer</span>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-orange-300/30 flex items-center justify-center gap-2 hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-70">
                  {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Demo quick-login */}
          <div className="border-t border-orange-100 pt-4">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Demo Account</p>
            <button onClick={quickLogin} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-all">
              <div className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-orange-500" /><span className="text-xs font-bold text-gray-700">Hasini (Customer)</span></div>
              <span className="text-[10px] text-orange-500 font-bold">Tap to Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
