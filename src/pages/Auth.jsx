import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { User, Mail, Phone, Lock, ArrowRight, Shield, Store, Bike } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' | 'rider' | 'vendor' | 'admin'

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Check sandbox pre-fills below.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const success = register(name, email, phone, password, role);
    if (success) {
      navigate('/');
    } else {
      setError('Registration failed.');
    }
  };

  const prefillLogin = (prefillEmail, prefillPassword) => {
    setError('');
    const success = login(prefillEmail, prefillPassword);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center bg-gradient-to-b from-orange-50/40 via-white to-white p-6 relative select-none">
      
      {/* Background glow elements */}
      <div className="absolute top-[-5%] left-[-10%] w-[250px] h-[250px] rounded-full bg-orange-500/5 blur-[80px] pointer-events-none"></div>
      
      <div className="space-y-6 w-full max-w-[340px] mx-auto z-10">
        
        {/* Logo and Brand Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FF7A00] text-black font-black text-xl shadow-lg shadow-orange-500/20 mb-2 font-display">
            S
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 font-display">
            SWIFTGO
          </h1>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Your city. On demand.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-all font-display ${!isSignUp ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`flex-1 py-2 text-xs font-black rounded-lg transition-all font-display ${isSignUp ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 text-center"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!isSignUp ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              onSubmit={handleSignIn}
              className="space-y-4"
            >
              <div className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Phone Number or Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="8074244332 or hasini@swiftgo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3.5 bg-[#FF7A00] text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center gap-1.5 hover:bg-[#ff9133] transition-colors font-display"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              <div className="space-y-3.5 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Malli Hasini Sarath"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="8074244332"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="hasini@swiftgo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-gray-850 focus:outline-none focus:border-[#FF7A00] transition-colors"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Role Selector Grid */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block pl-1">
                    Choose Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('user')}
                      className={`flex items-center gap-2 p-2.5 border rounded-xl text-left transition-all ${role === 'user' ? 'border-[#FF7A00] bg-orange-50/30 text-gray-900' : 'border-gray-200 bg-white text-gray-550'}`}
                    >
                      <User className="w-4 h-4 text-[#FF7A00]" />
                      <span className="text-[11px] font-black font-display">User</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('rider')}
                      className={`flex items-center gap-2 p-2.5 border rounded-xl text-left transition-all ${role === 'rider' ? 'border-[#FF7A00] bg-orange-50/30 text-gray-900' : 'border-gray-200 bg-white text-gray-550'}`}
                    >
                      <Bike className="w-4 h-4 text-[#FF7A00]" />
                      <span className="text-[11px] font-black font-display">Rider</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('vendor')}
                      className={`flex items-center gap-2 p-2.5 border rounded-xl text-left transition-all ${role === 'vendor' ? 'border-[#FF7A00] bg-orange-50/30 text-gray-900' : 'border-gray-200 bg-white text-gray-550'}`}
                    >
                      <Store className="w-4 h-4 text-[#FF7A00]" />
                      <span className="text-[11px] font-black font-display">Vendor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex items-center gap-2 p-2.5 border rounded-xl text-left transition-all ${role === 'admin' ? 'border-[#FF7A00] bg-orange-50/30 text-gray-900' : 'border-gray-200 bg-white text-gray-550'}`}
                    >
                      <Shield className="w-4 h-4 text-[#FF7A00]" />
                      <span className="text-[11px] font-black font-display">Admin</span>
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 bg-[#FF7A00] text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center gap-1.5 hover:bg-[#ff9133] transition-colors font-display"
              >
                <span>Register</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Sandbox Prefills */}
        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 text-[11px] text-gray-700 text-left">
          <span className="block font-bold text-gray-400 mb-2 uppercase tracking-widest text-[9px]">
            Developer Sandbox Accounts
          </span>
          <div className="space-y-2">
            <button
              onClick={() => prefillLogin('8074244332', 'password')}
              className="w-full flex items-center justify-between p-1.5 rounded bg-white hover:bg-orange-50 border border-gray-200 text-gray-700 font-bold transition-all text-[10px]"
            >
              <span>👤 User (Hasini)</span>
              <span className="text-gray-400 font-normal">Tap to Login</span>
            </button>
            <button
              onClick={() => prefillLogin('rider@swiftgo.com', 'password')}
              className="w-full flex items-center justify-between p-1.5 rounded bg-white hover:bg-orange-50 border border-gray-200 text-gray-700 font-bold transition-all text-[10px]"
            >
              <span>🛵 Rider (Priya)</span>
              <span className="text-gray-400 font-normal">Tap to Login</span>
            </button>
            <button
              onClick={() => prefillLogin('vendor@swiftgo.com', 'password')}
              className="w-full flex items-center justify-between p-1.5 rounded bg-white hover:bg-orange-50 border border-gray-200 text-gray-700 font-bold transition-all text-[10px]"
            >
              <span>🍕 Food Vendor (Bistro)</span>
              <span className="text-gray-400 font-normal">Tap to Login</span>
            </button>
            <button
              onClick={() => prefillLogin('admin@swiftgo.com', 'SwiftGo@2026')}
              className="w-full flex items-center justify-between p-1.5 rounded bg-white hover:bg-rose-50 border border-gray-200 text-gray-700 font-bold transition-all text-[10px]"
            >
              <span>🛠️ Admin Console</span>
              <span className="text-gray-400 font-normal">Tap to Login</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
