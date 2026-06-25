import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { User, Mail, Phone, LogOut, Edit2, Check, X, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const { currentUser, setCurrentUser, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast.error("All fields are required.");
      return;
    }

    setCurrentUser(prev => ({
      ...prev,
      name,
      phone,
      email
    }));
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setName(currentUser?.name || '');
    setPhone(currentUser?.phone || '');
    setEmail(currentUser?.email || '');
    setIsEditing(false);
  };

  return (
    <div className="flex-1 max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6">
      
      {/* Profile Card Container */}
      <div className="bg-white rounded-3xl border border-gray-100/60 shadow-sm overflow-hidden">
        
        {/* Colorful Banner Header */}
        <div className="h-32 bg-gradient-to-r from-orange-400 to-amber-500 relative">
          <div className="absolute -bottom-10 left-6">
            <img
              src={currentUser?.avatar || "https://placehold.co/100x100?text=User"}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
            />
          </div>
        </div>

        {/* Profile details */}
        <div className="pt-14 p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-dark flex items-center gap-1.5 leading-none">
                {currentUser?.name}
                <span className="bg-orange-50 text-primary px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-0.5">
                  <ShieldCheck size={10} /> {currentUser?.role}
                </span>
              </h2>
              <p className="text-xs text-gray-400 font-semibold mt-1.5 uppercase tracking-wider">Account ID: {currentUser?.id}</p>
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-slate-50 hover:bg-slate-100 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-100 flex items-center gap-1.5 transition"
              >
                <Edit2 size={12} /> Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-primary text-sm font-medium transition"
                    />
                  </div>
                </div>
              </div>

              {/* Edit actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Check size={16} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold py-3 px-5 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                <Mail className="text-gray-400 shrink-0" size={18} />
                <div className="truncate">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-bold text-dark truncate mt-0.5">{currentUser?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                <Phone className="text-gray-400 shrink-0" size={18} />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Phone Number</p>
                  <p className="text-sm font-bold text-dark mt-0.5">{currentUser?.phone}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-50 flex gap-3">
            <button
              onClick={handleLogout}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 text-xs font-bold py-3.5 rounded-2xl flex items-center justify-center gap-1.5 transition"
            >
              <LogOut size={16} /> Log Out from Device
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Profile;
