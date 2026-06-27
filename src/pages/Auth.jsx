import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Bike, Store, Shield, ChevronRight } from 'lucide-react';

const roles = [
  {
    key: 'user',
    label: 'Customer',
    desc: 'Book rides, order food & send parcels',
    icon: User,
    path: '/auth/user',
    gradient: 'from-orange-400 to-amber-500',
    shadow: 'shadow-orange-300/30',
    ring: 'ring-orange-200',
    bg: 'hover:bg-orange-50',
    textColor: 'text-orange-500',
    emoji: '👤',
  },
  {
    key: 'rider',
    label: 'Delivery Rider',
    desc: 'Deliver orders & earn on your schedule',
    icon: Bike,
    path: '/auth/rider',
    gradient: 'from-indigo-500 to-violet-600',
    shadow: 'shadow-indigo-300/30',
    ring: 'ring-indigo-200',
    bg: 'hover:bg-indigo-50',
    textColor: 'text-indigo-500',
    emoji: '🛵',
  },
  {
    key: 'vendor',
    label: 'Food Vendor',
    desc: 'Manage your restaurant & grow sales',
    icon: Store,
    path: '/auth/vendor',
    gradient: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-emerald-300/30',
    ring: 'ring-emerald-200',
    bg: 'hover:bg-emerald-50',
    textColor: 'text-emerald-600',
    emoji: '🍕',
  },
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Platform control & analytics console',
    icon: Shield,
    path: '/auth/admin',
    gradient: 'from-rose-500 to-slate-700',
    shadow: 'shadow-rose-300/20',
    ring: 'ring-rose-200',
    bg: 'hover:bg-rose-50',
    textColor: 'text-rose-500',
    emoji: '🛠️',
  },
];

export default function Auth() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 via-white to-white relative overflow-hidden select-none">
      {/* Background blobs */}
      <div className="absolute top-[-40px] left-[-30px] w-[180px] h-[180px] rounded-full bg-orange-400/8 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[60px] right-[-20px] w-[160px] h-[160px] rounded-full bg-indigo-400/8 blur-[50px] pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center px-5 py-8 z-10">
        <div className="w-full max-w-[340px] mx-auto space-y-6">

          {/* Logo + Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-1.5"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FF7A00] text-white font-black text-xl shadow-lg shadow-orange-400/25 mb-2 font-display">
              S
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 font-display">SWIFTGO</h1>
            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Who are you logging in as?</p>
          </motion.div>

          {/* Role Cards */}
          <div className="space-y-3">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    to={role.path}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm ${role.bg} transition-all group ring-1 ring-transparent hover:${role.ring} hover:shadow-md`}
                  >
                    {/* Icon bubble */}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${role.gradient} shadow-md ${role.shadow} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-900 font-display leading-tight">{role.label}</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5 leading-tight truncate">{role.desc}</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className={`w-4 h-4 ${role.textColor} opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-center text-[10px] text-gray-400 font-medium">
            SwiftGo — Your city, on demand.
          </p>

        </div>
      </div>
    </div>
  );
}
