import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockUsers } from '../data/mockUsers';
import { mockRiders } from '../data/mockRiders';
import { mockRestaurants } from '../data/mockRestaurants';
import { mockOrders } from '../data/mockOrders';
import { mockParcels } from '../data/mockParcels';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global States (with localStorage recovery)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('swiftgo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('swiftgo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('swiftgo_bookings');
    if (saved) return JSON.parse(saved);
    
    // Default taxi bookings (mocked)
    return [
      {
        id: "TX301",
        pickup: "Indiranagar Metro Station",
        drop: "HSR Layout Sector 1",
        vehicleType: "bike",
        fare: 35,
        status: "delivered",
        rider: { name: "Ramesh Rider", phone: "+91 87654 32109", vehicleType: "bike", rating: 4.8 },
        date: "2026-06-24"
      },
      {
        id: "TX302",
        pickup: "Phoenix Marketcity Mall",
        drop: "Koramangala 3rd Block",
        vehicleType: "car",
        fare: 120,
        status: "delivered",
        rider: { name: "Vikram Singh", phone: "+91 88877 76665", vehicleType: "car", rating: 4.9 },
        date: "2026-06-23"
      }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('swiftgo_orders');
    return saved ? JSON.parse(saved) : mockOrders;
  });

  const [parcels, setParcels] = useState(() => {
    const saved = localStorage.getItem('swiftgo_parcels');
    return saved ? JSON.parse(saved) : mockParcels;
  });

  const [restaurants, setRestaurants] = useState(() => {
    const saved = localStorage.getItem('swiftgo_restaurants');
    return saved ? JSON.parse(saved) : mockRestaurants;
  });

  const [riders, setRiders] = useState(() => {
    const saved = localStorage.getItem('swiftgo_riders');
    return saved ? JSON.parse(saved) : mockRiders;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('swiftgo_users');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('swiftgo_transactions');
    if (saved) return JSON.parse(saved);

    // Initial mock transactions for the default user Suresh Kumar (U1)
    return [
      { id: "T1", userId: "U1", date: "2026-06-25", description: "Food Delivery - Wok Express", amount: 370, type: "debit" },
      { id: "T2", userId: "U1", date: "2026-06-25", description: "Taxi Booking - Indiranagar", amount: 35, type: "debit" },
      { id: "T3", userId: "U1", date: "2026-06-25", description: "Added Money to Wallet", amount: 500, type: "credit" },
      { id: "T4", userId: "U1", date: "2026-06-24", description: "Food Delivery - Burger & Co.", amount: 377, type: "debit" },
      { id: "T5", userId: "U1", date: "2026-06-24", description: "Parcel Delivery - Docs to Rahul", amount: 50, type: "debit" },
      { id: "T6", userId: "U1", date: "2026-06-23", description: "Taxi Ride - Phoenix Mall", amount: 120, type: "debit" },
      { id: "T7", userId: "U1", date: "2026-06-23", description: "Added Money to Wallet", amount: 200, type: "credit" },
      { id: "T8", userId: "U1", date: "2026-06-22", description: "Food Delivery - Biryani Darbar", amount: 430, type: "debit" },
      { id: "T9", userId: "U1", date: "2026-06-21", description: "Food Delivery - Green Garden", amount: 415, type: "debit" },
      { id: "T10", userId: "U1", date: "2026-06-20", description: "Initial Account Deposit", amount: 500, type: "credit" },
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('swiftgo_user', JSON.stringify(currentUser));
      // Sync user wallet balance back to users array
      setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, walletBalance: currentUser.walletBalance } : u));
    } else {
      localStorage.removeItem('swiftgo_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('swiftgo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('swiftgo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('swiftgo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('swiftgo_parcels', JSON.stringify(parcels));
  }, [parcels]);

  useEffect(() => {
    localStorage.setItem('swiftgo_restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('swiftgo_riders', JSON.stringify(riders));
  }, [riders]);

  useEffect(() => {
    localStorage.setItem('swiftgo_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('swiftgo_transactions', JSON.stringify(transactions));
  }, [transactions]);


  // Action Dispatchers

  // Login handler supporting standard and quick login triggers
  const login = (email, password, quickRole = null) => {
    let foundUser;
    if (quickRole) {
      foundUser = users.find(u => u.role === quickRole);
    } else {
      foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    }

    if (foundUser) {
      // If logging in as rider, check if that rider exists in riders list to get vehicleType
      if (foundUser.role === 'rider') {
        const riderInfo = riders.find(r => r.phone === foundUser.phone || r.id === foundUser.id || r.name.includes(foundUser.name));
        if (riderInfo) {
          foundUser = { ...foundUser, vehicleType: riderInfo.vehicleType, isOnline: riderInfo.isOnline };
        }
      }
      setCurrentUser(foundUser);
      toast.success(`Welcome back, ${foundUser.name}!`);
      return foundUser;
    } else {
      toast.error("Invalid credentials.");
      return null;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    toast.success("Logged out successfully.");
  };

  // Add item to cart (Restricts to single restaurant at a time)
  const addToCart = (item, restaurant) => {
    setCart(prevCart => {
      if (prevCart.length > 0 && prevCart[0].restaurantId !== restaurant.id) {
        // Clearing previous restaurant cart
        toast.success(`Started new cart at ${restaurant.name}!`);
        return [{ ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name }];
      }

      const existingIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        toast.success(`Added another ${item.name} to cart!`);
        return updated;
      } else {
        toast.success(`${item.name} added to cart!`);
        return [...prevCart, { ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        if (updated[existingIndex].quantity > 1) {
          updated[existingIndex].quantity -= 1;
          toast.success("Item quantity decreased");
          return updated;
        } else {
          updated.splice(existingIndex, 1);
          toast.success("Item removed from cart");
          return updated;
        }
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Place Food Order
  const placeOrder = (discount = 0) => {
    if (cart.length === 0) return null;
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = 35;
    const total = subtotal + deliveryFee - discount;

    if (currentUser.walletBalance < total) {
      toast.error("Insufficient wallet balance. Please add money!");
      return null;
    }

    const orderId = "FO" + Math.floor(100 + Math.random() * 900);
    
    // Assign a mock rider that is online and matching 'bike' or random online rider
    const availableRider = riders.find(r => r.isOnline && r.vehicleType === 'bike') || riders.find(r => r.isOnline) || null;

    const newOrder = {
      id: orderId,
      restaurantId: cart[0].restaurantId,
      restaurantName: cart[0].restaurantName,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount,
      total,
      status: "placed",
      date: new Date().toISOString().split('T')[0],
      rider: availableRider ? { name: availableRider.name, phone: availableRider.phone, vehicleType: availableRider.vehicleType } : null
    };

    // Deduct wallet balance
    setCurrentUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - total
    }));

    // Add transaction
    const newTx = {
      id: "T" + Math.floor(100 + Math.random() * 900),
      userId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      description: `Food Delivery - ${cart[0].restaurantName}`,
      amount: total,
      type: "debit"
    };

    setOrders(prev => [newOrder, ...prev]);
    setTransactions(prev => [newTx, ...prev]);
    setCart([]);
    toast.success("Food order placed successfully!");
    
    return orderId;
  };

  // Book Taxi Ride
  const bookRide = (pickup, drop, vehicleType, fare) => {
    if (currentUser.walletBalance < fare) {
      toast.error("Insufficient wallet balance. Please add money!");
      return null;
    }

    const rideId = "TX" + Math.floor(100 + Math.random() * 900);
    
    // Find online rider with matching vehicleType
    const matchedRider = riders.find(r => r.isOnline && r.vehicleType === vehicleType) || riders.find(r => r.isOnline) || null;

    const newRide = {
      id: rideId,
      pickup,
      drop,
      vehicleType,
      fare,
      status: "placed",
      rider: matchedRider ? { name: matchedRider.name, phone: matchedRider.phone, vehicleType: matchedRider.vehicleType, rating: matchedRider.rating } : null,
      date: new Date().toISOString().split('T')[0]
    };

    setCurrentUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - fare
    }));

    const newTx = {
      id: "T" + Math.floor(100 + Math.random() * 900),
      userId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      description: `Taxi Ride - ${pickup} to ${drop}`,
      amount: fare,
      type: "debit"
    };

    setBookings(prev => [newRide, ...prev]);
    setTransactions(prev => [newTx, ...prev]);
    toast.success("Taxi booking confirmed!");

    return rideId;
  };

  // Send Parcel Delivery
  const sendParcel = (receiver, weight, description, price) => {
    if (currentUser.walletBalance < price) {
      toast.error("Insufficient wallet balance. Please add money!");
      return null;
    }

    const parcelId = "PA" + Math.floor(100 + Math.random() * 900);
    const trackingId = "SG-PRCL-" + Math.floor(1000 + Math.random() * 9000);
    
    // Assign random online bike rider
    const matchedRider = riders.find(r => r.isOnline && r.vehicleType === 'bike') || riders.find(r => r.isOnline) || null;

    const newParcel = {
      id: parcelId,
      senderName: currentUser.name,
      senderPhone: currentUser.phone,
      senderAddress: "HSR Layout, Sector 3, Bangalore", // default user location
      receiverName: receiver.name,
      receiverPhone: receiver.phone,
      receiverAddress: receiver.address,
      weight,
      description,
      price,
      status: "pending",
      trackingId,
      date: new Date().toISOString().split('T')[0],
      rider: matchedRider ? { name: matchedRider.name, phone: matchedRider.phone, vehicleType: matchedRider.vehicleType } : null
    };

    setCurrentUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - price
    }));

    const newTx = {
      id: "T" + Math.floor(100 + Math.random() * 900),
      userId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      description: `Parcel Delivery to ${receiver.name}`,
      amount: price,
      type: "debit"
    };

    setParcels(prev => [newParcel, ...prev]);
    setTransactions(prev => [newTx, ...prev]);
    toast.success("Parcel delivery requested!");

    return parcelId;
  };

  // Add Money to Wallet
  const addWalletMoney = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setCurrentUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + numericAmount
    }));

    const newTx = {
      id: "T" + Math.floor(100 + Math.random() * 900),
      userId: currentUser.id,
      date: new Date().toISOString().split('T')[0],
      description: "Added Money to Wallet",
      amount: numericAmount,
      type: "credit"
    };

    setTransactions(prev => [newTx, ...prev]);
    toast.success(`₹${numericAmount} added to your wallet!`);
  };

  // Update Rider online status
  const updateRiderStatus = (riderId, isOnline) => {
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, isOnline } : r));
    if (currentUser && currentUser.role === 'rider' && currentUser.id === riderId) {
      setCurrentUser(prev => ({ ...prev, isOnline }));
    }
  };

  // Update Orders, Bookings, or Parcels Status (Rider/Admin functions)
  const updateOrderStatus = (id, serviceType, newStatus) => {
    if (serviceType === 'food') {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      toast.success(`Order ${id} status updated to ${newStatus}`);
    } else if (serviceType === 'ride') {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      toast.success(`Ride ${id} status updated to ${newStatus}`);
    } else if (serviceType === 'parcel') {
      setParcels(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      toast.success(`Parcel ${id} status updated to ${newStatus}`);
    }
  };

  // Admin and Rider additions
  const addRestaurant = (newRest) => {
    setRestaurants(prev => [...prev, newRest]);
    toast.success("New Restaurant added successfully!");
  };

  const updateRestaurantStatus = (restId, isOpen) => {
    setRestaurants(prev => prev.map(r => r.id === restId ? { ...r, isOpen } : r));
    toast.success(`Restaurant status updated`);
  };

  const updateRiderWorkingStatus = (riderId, isOnline) => {
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, isOnline } : r));
  };

  const updateUserStatus = (userId, status) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    toast.success(`User status updated to ${status}`);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      cart,
      bookings,
      setBookings,
      orders,
      setOrders,
      parcels,
      setParcels,
      restaurants,
      setRestaurants,
      riders,
      setRiders,
      users,
      setUsers,
      transactions,
      login,
      logout,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder,
      bookRide,
      sendParcel,
      addWalletMoney,
      updateRiderStatus,
      updateOrderStatus,
      addRestaurant,
      updateRestaurantStatus,
      updateRiderWorkingStatus,
      updateUserStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};
