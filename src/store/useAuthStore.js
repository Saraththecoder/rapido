import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: {
    name: 'Rahul Sharma',
    email: 'user@swiftgo.com',
    phone: '+91 98765 43210',
    avatar: 'RS',
  },
  role: 'user', // default role
  isAuthenticated: true,

  login: (email, password) => {
    if (email === 'user@swiftgo.com' && password === 'password') {
      set({
        user: { name: 'Rahul Sharma', email, phone: '+91 98765 43210', avatar: 'RS' },
        role: 'user',
        isAuthenticated: true,
      });
      return true;
    } else if (email === 'rider@swiftgo.com' && password === 'password') {
      set({
        user: { name: 'Priya Reddy', email, phone: '+91 91234 56789', avatar: 'PR' },
        role: 'rider',
        isAuthenticated: true,
      });
      return true;
    } else if (email === 'admin@swiftgo.com' && password === 'SwiftGo@2026') {
      set({
        user: { name: 'Admin Console', email, phone: '+91 99999 88888', avatar: 'AD' },
        role: 'admin',
        isAuthenticated: true,
      });
      return true;
    } else if (email === 'vendor@swiftgo.com' && password === 'password') {
      set({
        user: { name: 'Pizza Bistro', email, phone: '+91 98765 55555', avatar: 'PB' },
        role: 'vendor',
        isAuthenticated: true,
      });
      return true;
    }
    return false; // login failed
  },

  logout: () => set({ user: null, role: 'user', isAuthenticated: false }),
  setRole: (role) => set({ role }),
}));
