export const mockOrders = [
  {
    id: "FO101",
    restaurantId: "rest1",
    restaurantName: "Biryani Darbar",
    items: [
      { id: "m1", name: "Hyderabadi Chicken Biryani", price: 280, quantity: 1 },
      { id: "m4", name: "Butter Naan", price: 50, quantity: 2 }
    ],
    subtotal: 380,
    deliveryFee: 40,
    discount: 0,
    total: 420,
    status: "delivered",
    date: "2026-06-24",
    rider: {
      name: "Amit Sharma",
      phone: "+91 99988 87776",
      vehicleType: "auto"
    }
  },
  {
    id: "FO102",
    restaurantId: "rest2",
    restaurantName: "Burger & Co.",
    items: [
      { id: "m6", name: "Classic Cheese Burger", price: 149, quantity: 2 },
      { id: "m8", name: "Peri Peri Fries", price: 99, quantity: 1 }
    ],
    subtotal: 397,
    deliveryFee: 30,
    discount: 50,
    total: 377,
    status: "delivered",
    date: "2026-06-24",
    rider: {
      name: "Ramesh Rider",
      phone: "+91 87654 32109",
      vehicleType: "bike"
    }
  },
  {
    id: "FO103",
    restaurantId: "rest3",
    restaurantName: "Green Garden",
    items: [
      { id: "m11", name: "Greek Salad", price: 180, quantity: 1 },
      { id: "m13", name: "Quinoa Bowl", price: 240, quantity: 1 }
    ],
    subtotal: 420,
    deliveryFee: 35,
    discount: 0,
    total: 455,
    status: "placed",
    date: "2026-06-25",
    rider: null
  },
  {
    id: "FO104",
    restaurantId: "rest4",
    restaurantName: "Wok Express",
    items: [
      { id: "m15", name: "Schezwan Hakka Noodles", price: 180, quantity: 2 }
    ],
    subtotal: 360,
    deliveryFee: 40,
    discount: 30,
    total: 370,
    status: "preparing",
    date: "2026-06-25",
    rider: {
      name: "Deepak Gupta",
      phone: "+91 94443 32211",
      vehicleType: "bike"
    }
  },
  {
    id: "FO105",
    restaurantId: "rest5",
    restaurantName: "The Pizza Palace",
    items: [
      { id: "m19", name: "Double Cheese Margherita", price: 299, quantity: 1 },
      { id: "m21", name: "Garlic Breadsticks", price: 129, quantity: 1 }
    ],
    subtotal: 428,
    deliveryFee: 30,
    discount: 0,
    total: 458,
    status: "picked",
    date: "2026-06-25",
    rider: {
      name: "Sunita Rao",
      phone: "+91 66655 54443",
      vehicleType: "auto"
    }
  },
  {
    id: "FO106",
    restaurantId: "rest2",
    restaurantName: "Burger & Co.",
    items: [
      { id: "m7", name: "Spicy Paneer Burger", price: 129, quantity: 1 },
      { id: "m10", name: "Chocolate Milkshake", price: 120, quantity: 1 }
    ],
    subtotal: 249,
    deliveryFee: 30,
    discount: 20,
    total: 259,
    status: "delivered",
    date: "2026-06-23",
    rider: {
      name: "Pooja Patel",
      phone: "+91 93332 21100",
      vehicleType: "bike"
    }
  },
  {
    id: "FO107",
    restaurantId: "rest1",
    restaurantName: "Biryani Darbar",
    items: [
      { id: "m2", name: "Veg Dum Biryani", price: 220, quantity: 2 }
    ],
    subtotal: 440,
    deliveryFee: 40,
    discount: 50,
    total: 430,
    status: "delivered",
    date: "2026-06-22",
    rider: {
      name: "Ramesh Rider",
      phone: "+91 87654 32109",
      vehicleType: "bike"
    }
  },
  {
    id: "FO108",
    restaurantId: "rest3",
    restaurantName: "Green Garden",
    items: [
      { id: "m12", name: "Avocado Toast", price: 210, quantity: 2 }
    ],
    subtotal: 420,
    deliveryFee: 35,
    discount: 40,
    total: 415,
    status: "delivered",
    date: "2026-06-21",
    rider: {
      name: "Deepak Gupta",
      phone: "+91 94443 32211",
      vehicleType: "bike"
    }
  },
  {
    id: "FO109",
    restaurantId: "rest4",
    restaurantName: "Wok Express",
    items: [
      { id: "m17", name: "Chilli Paneer Dry", price: 220, quantity: 1 },
      { id: "m16", name: "Veg Fried Rice", price: 160, quantity: 1 }
    ],
    subtotal: 380,
    deliveryFee: 40,
    discount: 0,
    total: 420,
    status: "delivered",
    date: "2026-06-20",
    rider: {
      name: "Amit Sharma",
      phone: "+91 99988 87776",
      vehicleType: "auto"
    }
  },
  {
    id: "FO110",
    restaurantId: "rest5",
    restaurantName: "The Pizza Palace",
    items: [
      { id: "m20", name: "Farmhouse Veggie Pizza", price: 399, quantity: 1 }
    ],
    subtotal: 399,
    deliveryFee: 30,
    discount: 40,
    total: 389,
    status: "delivered",
    date: "2026-06-19",
    rider: {
      name: "Vikram Singh",
      phone: "+91 88877 76665",
      vehicleType: "car"
    }
  }
];
