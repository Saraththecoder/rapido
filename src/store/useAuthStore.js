import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  role: 'user', // default role
  isAuthenticated: false,

  login: (emailOrPhone, password) => {
    const identifier = String(emailOrPhone).trim().toLowerCase();
    
    if ((identifier === 'user@swiftgo.com' || identifier === 'hasini@swiftgo.com' || identifier === '8074244332') && password === 'password') {
      set({
        user: { name: 'Malli Hasini Sarath', email: 'hasini@swiftgo.com', phone: '8074244332', avatar: 'MHS' },
        role: 'user',
        isAuthenticated: true,
      });
      return true;
    } else if (identifier === 'rider@swiftgo.com' && password === 'password') {
      set({
        user: { name: 'Priya Reddy', email: 'rider@swiftgo.com', phone: '+91 91234 56789', avatar: 'PR' },
        role: 'rider',
        isAuthenticated: true,
      });
      return true;
    } else if (identifier === 'admin@swiftgo.com' && password === 'SwiftGo@2026') {
      set({
        user: { name: 'Admin Console', email: 'admin@swiftgo.com', phone: '+91 99999 88888', avatar: 'AD' },
        role: 'admin',
        isAuthenticated: true,
      });
      return true;
    } else if (identifier === 'vendor@swiftgo.com' && password === 'password') {
      set({
        user: { name: 'Pizza Bistro', email: 'vendor@swiftgo.com', phone: '+91 98765 55555', avatar: 'PB' },
        role: 'vendor',
        isAuthenticated: true,
      });
      return true;
    }
    return false; // login failed
  },

  register: (name, email, phone, password, role) => {
    set({
      user: {
        name,
        email,
        phone,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
      },
      role,
      isAuthenticated: true
    });
    return true;
  },

  logout: () => set({ user: null, role: 'user', isAuthenticated: false }),
  setRole: (role) => set({ role }),
}));

