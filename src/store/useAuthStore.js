import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    name: 'Rahul Sharma',
    email: 'user@ladypilot.in',
    phone: '+91 98765 43210',
    avatar: 'RS',
  },
  role: 'user', // default role
  isAuthenticated: true,

  login: (email, password) => {
    if (email === 'user@ladypilot.in' && password === 'password') {
      set({
        user: { name: 'Rahul Sharma', email, phone: '+91 98765 43210', avatar: 'RS' },
        role: 'user',
        isAuthenticated: true,
      });
      return true;
    } else if (email === 'rider@ladypilot.in' && password === 'password') {
      set({
        user: { name: 'Priya Reddy', email, phone: '+91 91234 56789', avatar: 'PR' },
        role: 'rider',
        isAuthenticated: true,
      });
      return true;
    } else if (email === 'admin@ladypilot.in' && password === 'LadyPilot@2026') {
      set({
        user: { name: 'Admin Console', email, phone: '+91 99999 88888', avatar: 'AD' },
        role: 'admin',
        isAuthenticated: true,
      });
      return true;
    }
    return false; // login failed
  },

  logout: () => set({ user: null, role: 'user', isAuthenticated: false }),
  setRole: (role) => set({ role }),
}));
