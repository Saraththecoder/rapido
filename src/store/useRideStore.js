import { create } from 'zustand';

export const useRideStore = create((set) => ({
  pickup: '',
  dropoff: '',
  vehicle: null, // e.g. { id: 'bike', label: 'Bike Taxi', price: 45, eta: '3 min' }
  status: 'idle', // 'idle' | 'searching' | 'assigned' | 'en_route' | 'pickup_reached' | 'trip_started' | 'arrived'
  pilot: null, // e.g. { name: 'Priya Reddy', rating: '4.9', vehicleInfo: 'Hero Splendor+ · TS09AB1234', phone: '+91 91234 56789' }
  
  // Courier state
  courier: {
    senderName: '',
    pickupAddress: '',
    pickupPincode: '',
    recipientName: '',
    recipientPhone: '',
    deliveryAddress: '',
    deliveryPincode: '',
    packageDescription: '',
    weightClass: null, // e.g. { label: 'Light', price: 49 }
    price: 0,
    status: 'idle' // 'idle' | 'booking' | 'assigned' | 'collected' | 'transit' | 'out_for_delivery' | 'delivered'
  },

  setRoute: (pickup, dropoff) => set({ pickup, dropoff }),
  selectVehicle: (vehicle) => set({ vehicle }),
  assignPilot: (pilot) => set({ pilot }),
  updateStatus: (status) => set({ status }),
  
  updateCourier: (updates) => set((state) => ({
    courier: { ...state.courier, ...updates }
  })),

  resetRide: () => set({
    pickup: '',
    dropoff: '',
    vehicle: null,
    status: 'idle',
    pilot: null,
    courier: {
      senderName: '',
      pickupAddress: '',
      pickupPincode: '',
      recipientName: '',
      recipientPhone: '',
      deliveryAddress: '',
      deliveryPincode: '',
      packageDescription: '',
      weightClass: null,
      price: 0,
      status: 'idle'
    }
  })
}));
