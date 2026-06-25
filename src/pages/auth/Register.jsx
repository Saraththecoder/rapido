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
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-lightbg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="bg-primary text-white p-3 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-md">
            SG
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-dark">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary hover:text-primary-hover transition">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100/60 rounded-3xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>

            {/* Email Address */}
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
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>

            {/* Password */}
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
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition"
                />
              </div>
            </div>

            {/* Role dropdown */}
            <div>
              <label htmlFor="role" className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                Join As
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Briefcase size={18} />
                </div>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-medium transition appearance-none bg-white"
                >
                  <option value="user">Customer (User)</option>
                  <option value="rider">Delivery Executive (Rider)</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200"
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
