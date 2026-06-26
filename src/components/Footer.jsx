import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-50 text-zinc-500 border-t border-zinc-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-zinc-200 pb-10">
          
          {/* Logo & Corporate Summary */}
          <div className="md:col-span-2 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-primary text-white px-2.5 py-1 rounded-lg font-bold text-base">
                SG
              </span>
              <span className="font-display font-black text-xl text-zinc-900 tracking-tight">
                SwiftGo
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium max-w-sm">
              SwiftGo is a premium multi-service on-demand tech platform connecting users with instant, affordable motorcycle rides, gourmet restaurant deliveries, and direct same-city courier services.
            </p>
            <div className="flex gap-2">
              <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition">Facebook</a>
              <span className="text-zinc-300">•</span>
              <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition">Twitter</a>
              <span className="text-zinc-300">•</span>
              <a href="#" className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition">Instagram</a>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/user/taxi" className="hover:text-zinc-900 transition">Bike & Cab Rides</Link></li>
              <li><Link to="/user/food" className="hover:text-zinc-900 transition">Food Delivery</Link></li>
              <li><Link to="/user/parcel" className="hover:text-zinc-900 transition">Courier Shipping</Link></li>
              <li><a href="#" className="hover:text-zinc-900 transition">Business Fleet</a></li>
            </ul>
          </div>

          {/* Column 2: Partners */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Partner Fleet</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/register" className="hover:text-zinc-900 transition">Become a Driver</Link></li>
              <li><a href="#" className="hover:text-zinc-900 transition">Merchant Signup</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition">API Integration</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition">Incentives Program</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-zinc-900 transition">Safety Desk</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition">Corporate Contact</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition">Privacy Terms</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          <p>© 2026 SwiftGo Technologies. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-900 transition">App Store</a>
            <a href="#" className="hover:text-zinc-900 transition">Google Play</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
