import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Mail, Lock, User, Bike, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { login, currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect to correct dashboard
  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.role}/dashboard`);
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    const user = login(email, password);
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  };

  const handleQuickLogin = (role) => {
    const user = login('', '', role);
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="bg-primary text-white px-3 py-1.5 rounded-lg flex items-center justify-center font-bold text-xl tracking-tight">
            SG
          </span>
        </div>
        <h2 className="mt-5 text-center text-2.5xl font-display font-black text-zinc-900 tracking-tight">
          Sign In
        </h2>
        <p className="mt-1.5 text-center text-xs text-zinc-450 font-semibold uppercase tracking-wider">
          Or{' '}
          <Link to="/register" className="text-primary border-b border-primary pb-0.5 font-bold">
            Create Account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-zinc-200 rounded-2xl sm:px-10 space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="text-left">
              <label htmlFor="email" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="text-left">
              <label htmlFor="password" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary text-xs font-bold py-3 rounded-xl uppercase tracking-wider transition"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Quick Login Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-150"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-wider font-bold">
              <span className="bg-white px-2.5 text-zinc-400">Quick Demo Access</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('user')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-zinc-200 hover:border-primary/30 hover:bg-accent-peach/30 hover:text-primary text-zinc-800 transition"
            >
              <User size={16} className="mb-1 text-zinc-400 transition" />
              <span className="text-[9px] font-bold uppercase tracking-wider">User</span>
            </button>
            <button
              onClick={() => handleQuickLogin('rider')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-zinc-200 hover:border-primary/30 hover:bg-accent-peach/30 hover:text-primary text-zinc-800 transition"
            >
              <Bike size={16} className="mb-1 text-zinc-400 transition" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Rider</span>
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-zinc-200 hover:border-primary/30 hover:bg-accent-peach/30 hover:text-primary text-zinc-800 transition"
            >
              <ShieldCheck size={16} className="mb-1 text-zinc-400 transition" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Admin</span>
            </button>
          </div>
          
          <div className="bg-zinc-50 border border-zinc-150 p-3 rounded-xl text-[10px] text-zinc-450 leading-relaxed font-semibold text-left">
            💡 <strong>Passwords:</strong> You can type any value or use the quick buttons above to access mock databases instantly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
