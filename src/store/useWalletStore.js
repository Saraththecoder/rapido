import { create } from 'zustand';

export const useWalletStore = create((set) => ({
  balance: 500.00,
  deduct: (amount) => set((state) => ({ balance: Math.max(0, state.balance - amount) })),
  add: (amount) => set((state) => ({ balance: state.balance + amount })),
}));
