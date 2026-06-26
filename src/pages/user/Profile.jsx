import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { User, Mail, Phone, LogOut, Edit2, Check, ShieldCheck } from 'lucide-react';
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
    <div className="flex-1 max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-6 text-left">
      
      {/* Profile Card Container */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
        
        {/* Minimal Banner Header */}
        <div className="h-28 bg-zinc-50 border-b border-zinc-200 relative">
          <div className="absolute -bottom-8 left-6">
            <img
              src={currentUser?.avatar || "https://placehold.co/100x100?text=User"}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-xl object-cover border border-zinc-250 bg-white"
            />
          </div>
        </div>

        {/* Profile details */}
        <div className="pt-12 p-5 md:p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display font-black text-xl md:text-2xl text-zinc-900 flex items-center gap-1.5 leading-none">
                {currentUser?.name}
                <span className="text-[9px] font-bold text-zinc-500 border border-zinc-250 px-1 rounded uppercase tracking-wider flex items-center gap-0.5">
                  <ShieldCheck size={9} /> {currentUser?.role}
                </span>
              </h2>
              <p className="text-[9px] text-zinc-400 font-bold mt-1.5 uppercase tracking-wider">Account ID: {currentUser?.id}</p>
            </div>
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white hover:border-primary/20 hover:text-primary text-zinc-800 font-bold text-xs px-3.5 py-1.5 rounded-lg border border-zinc-200 flex items-center gap-1 transition shadow-sm"
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
                  <label className="block text-[9px] font-bold text-zinc-450 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <User size={15} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[9px] font-bold text-zinc-450 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Phone size={15} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-[9px] font-bold text-zinc-455 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Mail size={15} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 bg-white rounded-xl input-premium text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Edit actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 btn-primary text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 transition"
                >
                  <Check size={14} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-white border border-zinc-200 hover:border-primary/20 hover:text-primary text-zinc-700 text-xs font-bold py-2.5 px-4 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 min-w-0">
                <Mail className="text-zinc-400 shrink-0" size={16} />
                <div className="truncate min-w-0">
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="text-xs font-bold text-zinc-800 truncate mt-1">{currentUser?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                <Phone className="text-zinc-400 shrink-0" size={16} />
                <div>
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Phone Number</p>
                  <p className="text-xs font-bold text-zinc-800 mt-1">{currentUser?.phone}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-zinc-150 flex gap-3">
            <button
              onClick={handleLogout}
              className="w-full bg-white hover:bg-rose-50 text-rose-600 border border-zinc-200 hover:border-rose-200 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <LogOut size={15} /> Log Out from Device
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default Profile;
