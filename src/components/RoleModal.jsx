import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Bike, ShieldAlert, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function RoleModal({ onClose, service = 'ride' }) {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const serviceName = service.toUpperCase();

  const handleQuickLogin = (role) => {
    let email = '';
    let password = '';
    let targetRoute = '';

    if (role === 'user') {
      email = 'user@swiftgo.com';
      password = 'password';
      targetRoute = `/${service}`;
    } else if (role === 'rider') {
      email = 'rider@swiftgo.com';
      password = 'password';
      targetRoute = '/ride/rider'; // Unified RiderConsole
    } else if (role === 'admin') {
      email = 'admin@swiftgo.com';
      password = 'SwiftGo@2026';
      targetRoute = '/ride/admin'; // Admin Dashboard
    } else if (role === 'vendor') {
      email = 'vendor@swiftgo.com';
      password = 'password';
      targetRoute = '/food/vendor'; // Food Vendor Console
    }

    const success = login(email, password);
    if (success) {
      onClose();
      navigate(targetRoute);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-[2px]">
      {/* Semi-transparent Backdrop Overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide-Up Bottom Sheet Panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full bg-white rounded-t-3xl p-6 text-gray-900 z-10 shadow-2xl max-h-[90%] overflow-y-auto"
      >
        {/* Close Button X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
          Choose your role
        </h3>
        <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-5">
          SwiftGo {serviceName} Service
        </p>

        {/* Role Quick Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleQuickLogin('user')}
            className="w-full flex items-center gap-4 p-3 rounded-2xl border-2 border-gray-100 hover:border-purple-400 hover:bg-purple-50/30 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-800">👤 User App</div>
              <div className="text-[11px] text-gray-500 font-medium">Order, book, and browse as a consumer</div>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin('rider')}
            className="w-full flex items-center gap-4 p-3 rounded-2xl border-2 border-gray-100 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-800">🏍️ Rider App</div>
              <div className="text-[11px] text-gray-500 font-medium">Accept client orders and track route progress</div>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin('vendor')}
            className="w-full flex items-center gap-4 p-3 rounded-2xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50/30 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600 group-hover:bg-orange-200 transition-colors">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-800">🍕 Food Vendor Console</div>
              <div className="text-[11px] text-gray-500 font-medium">Manage active restaurant orders and configure menu items</div>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin('admin')}
            className="w-full flex items-center gap-4 p-3 rounded-2xl border-2 border-gray-100 hover:border-rose-400 hover:bg-rose-50/30 transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 group-hover:bg-rose-200 transition-colors">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-800">🛠️ Admin Panel</div>
              <div className="text-[11px] text-gray-500 font-medium">Manage driver status, approval systems, and income logs</div>
            </div>
          </button>
        </div>

        {/* Credentials Sandbox Block */}
        <div className="bg-gray-55 border border-gray-100 rounded-2xl p-4 text-[11px] text-gray-700">
          <span className="block font-bold text-gray-500 mb-2 uppercase tracking-widest text-[9px]">
            Mock Sandbox Credentials
          </span>
          <div className="space-y-1 font-mono leading-relaxed">
            <div>
              <span className="font-semibold text-purple-700">User:</span> user@swiftgo.com / password
            </div>
            <div>
              <span className="font-semibold text-amber-700">Rider:</span> rider@swiftgo.com / password
            </div>
            <div>
              <span className="font-semibold text-orange-700">Vendor:</span> vendor@swiftgo.com / password
            </div>
            <div>
              <span className="font-semibold text-rose-700">Admin:</span> admin@swiftgo.com / SwiftGo@2026
            </div>
          </div>
          <div className="mt-3 text-[10px] text-gray-400 italic">
            * Tap any option above to prefill inputs and bypass authentication steps.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
