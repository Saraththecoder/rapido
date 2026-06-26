import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [], // Array of { id, name, price, qty }
  restaurantId: null,

  addItem: (item, restaurantId) => {
    const currentRestaurantId = get().restaurantId;
    let currentItems = [...get().items];

    // If user adds item from a different restaurant, clear cart
    if (currentRestaurantId && currentRestaurantId !== restaurantId) {
      currentItems = [];
    }

    const existingIndex = currentItems.findIndex((i) => i.id === item.id);
    if (existingIndex > -1) {
      currentItems[existingIndex] = {
        ...currentItems[existingIndex],
        qty: currentItems[existingIndex].qty + 1
      };
    } else {
      currentItems.push({ ...item, qty: 1 });
    }

    set({ items: currentItems, restaurantId });
  },

  removeItem: (itemId) => {
    const newItems = get().items.filter((i) => i.id !== itemId);
    set({
      items: newItems,
      restaurantId: newItems.length === 0 ? null : get().restaurantId
    });
  },

  updateQty: (itemId, change) => {
    const currentItems = [...get().items];
    const itemIndex = currentItems.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return;

    const newQty = currentItems[itemIndex].qty + change;
    if (newQty <= 0) {
      const filtered = currentItems.filter((i) => i.id !== itemId);
      set({
        items: filtered,
        restaurantId: filtered.length === 0 ? null : get().restaurantId
      });
    } else {
      currentItems[itemIndex] = { ...currentItems[itemIndex], qty: newQty };
      set({ items: currentItems });
    }
  },

  clearCart: () => set({ items: [], restaurantId: null }),

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}));
