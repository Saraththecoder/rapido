import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Mail, Lock, User, Phone, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const { setUsers } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newUser = {
      id: "U" + Math.floor(100 + Math.random() * 900),
      name,
      email,
      password,
      phone,
      role,
      walletBalance: role === 'user' ? 500 : 0,
      avatar: `https://placehold.co/100x100?text=${name.split(' ').map(n=>n[0]).join('')}`
    };

    setUsers(prev => [...prev, newUser]);
    toast.success("Account registered! You can now log in.");
    navigate('/login');
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
          Create Account
        </h2>
        <p className="mt-1.5 text-center text-xs text-zinc-450 font-semibold uppercase tracking-wider">
          Already have an account?{' '}
          <Link to="/login" className="text-primary border-b border-primary pb-0.5 font-bold">
            Sign In
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-left">
        <div className="bg-white py-8 px-4 border border-zinc-200 rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <User size={16} />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="phone" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Phone size={16} />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium bg-white rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            {/* Role dropdown */}
            <div>
              <label htmlFor="role" className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Join As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <Briefcase size={16} />
                </div>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 input-premium rounded-xl text-xs font-semibold appearance-none bg-white"
                >
                  <option value="user">Customer (User)</option>
                  <option value="rider">Delivery Executive (Rider)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary text-xs font-bold py-3 rounded-xl uppercase tracking-wider transition"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
