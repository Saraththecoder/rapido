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
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-lightbg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="bg-primary text-white p-3 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md">
            SG
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-dark">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Or{' '}
          <Link to="/register" className="font-bold text-primary hover:text-primary-hover transition">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100/60 rounded-3xl sm:px-10 space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Quick Login Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-400 font-bold tracking-wider">Demo Quick Login</span>
            </div>
          </div>

          {/* Quick Logins Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => handleQuickLogin('user')}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-orange-100 bg-orange-50/40 hover:bg-orange-50 text-primary transition duration-200"
            >
              <User size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">As User</span>
            </button>
            <button
              onClick={() => handleQuickLogin('rider')}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-600 transition duration-200"
            >
              <Bike size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">As Rider</span>
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 text-indigo-600 transition duration-200"
            >
              <ShieldCheck size={20} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">As Admin</span>
            </button>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-[11px] text-gray-500 leading-relaxed font-medium">
            💡 <strong>Passwords:</strong> You can type any password (e.g. <code>password</code>) or use the buttons above to log in instantly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
