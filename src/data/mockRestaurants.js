export const mockRestaurants = [
  {
    id: "rest1",
    name: "Biryani Darbar",
    cuisine: "Biryani, North Indian",
    rating: 4.5,
    deliveryTime: "30-35 mins",
    minOrder: 150,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=60",
    isOpen: true,
    menu: [
      { id: "m1", name: "Hyderabadi Chicken Biryani", price: 280, category: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=60" },
      { id: "m2", name: "Veg Dum Biryani", price: 220, category: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&auto=format&fit=crop&q=60" },
      { id: "m3", name: "Chicken Tikka Masala", price: 320, category: "Curries", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=60" },
      { id: "m4", name: "Butter Naan", price: 50, category: "Breads", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60" },
      { id: "m5", name: "Garlic Naan", price: 60, category: "Breads", image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=300&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: "rest2",
    name: "Burger & Co.",
    cuisine: "Fast Food, American",
    rating: 4.2,
    deliveryTime: "20-25 mins",
    minOrder: 100,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=60",
    isOpen: true,
    menu: [
      { id: "m6", name: "Classic Cheese Burger", price: 149, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=60" },
      { id: "m7", name: "Spicy Paneer Burger", price: 129, category: "Burgers", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&auto=format&fit=crop&q=60" },
      { id: "m8", name: "Peri Peri Fries", price: 99, category: "Sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop&q=60" },
      { id: "m9", name: "Onion Rings", price: 89, category: "Sides", image: "https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=300&auto=format&fit=crop&q=60" },
      { id: "m10", name: "Chocolate Milkshake", price: 120, category: "Beverages", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: "rest3",
    name: "Green Garden",
    cuisine: "Veg, Healthy, Salads",
    rating: 4.6,
    deliveryTime: "25-30 mins",
    minOrder: 200,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=60",
    isOpen: true,
    menu: [
      { id: "m11", name: "Greek Salad", price: 180, category: "Salads", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=60" },
      { id: "m12", name: "Avocado Toast", price: 210, category: "Healthy", image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=300&auto=format&fit=crop&q=60" },
      { id: "m13", name: "Quinoa Bowl", price: 240, category: "Healthy", image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=300&auto=format&fit=crop&q=60" },
      { id: "m14", name: "Fresh Watermelon Juice", price: 90, category: "Beverages", image: "https://images.unsplash.com/photo-1589733901241-5e5148a8b612?w=300&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: "rest4",
    name: "Wok Express",
    cuisine: "Chinese, Asian",
    rating: 4.0,
    deliveryTime: "35-40 mins",
    minOrder: 150,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop&q=60",
    isOpen: true,
    menu: [
      { id: "m15", name: "Schezwan Hakka Noodles", price: 180, category: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=60" },
      { id: "m16", name: "Veg Fried Rice", price: 160, category: "Rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=60" },
      { id: "m17", name: "Chilli Paneer Dry", price: 220, category: "Starters", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&auto=format&fit=crop&q=60" },
      { id: "m18", name: "Manchow Soup", price: 110, category: "Soups", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: "rest5",
    name: "The Pizza Palace",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.4,
    deliveryTime: "25-35 mins",
    minOrder: 200,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600&auto=format&fit=crop&q=60",
    isOpen: true,
    menu: [
      { id: "m19", name: "Double Cheese Margherita", price: 299, category: "Pizzas", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=60" },
      { id: "m20", name: "Farmhouse Veggie Pizza", price: 399, category: "Pizzas", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&auto=format&fit=crop&q=60" },
      { id: "m21", name: "Garlic Breadsticks", price: 129, category: "Sides", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=300&auto=format&fit=crop&q=60" },
      { id: "m22", name: "Stuffed Garlic Bread", price: 169, category: "Sides", image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300&auto=format&fit=crop&q=60" }
    ]
  },
  {
    id: "rest6",
    name: "South Indian Express",
    cuisine: "South Indian, Fast Food",
    rating: 4.7,
    deliveryTime: "15-20 mins",
    minOrder: 80,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=60",
    isOpen: false,
    menu: [
      { id: "m23", name: "Masala Dosa", price: 90, category: "Dosas", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&auto=format&fit=crop&q=60" },
      { id: "m24", name: "Idli Sambar (2 Pcs)", price: 60, category: "Idli/Vada", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=60" },
      { id: "m25", name: "Medu Vada (2 Pcs)", price: 70, category: "Idli/Vada", image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60" },
      { id: "m26", name: "Filter Coffee", price: 40, category: "Beverages", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=60" }
    ]
  }
];
