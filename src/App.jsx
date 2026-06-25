import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

// Shared Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import TaxiBooking from './pages/user/TaxiBooking';
import FoodDelivery from './pages/user/FoodDelivery';
import RestaurantMenu from './pages/user/RestaurantMenu';
import ParcelDelivery from './pages/user/ParcelDelivery';
import TrackOrder from './pages/user/TrackOrder';
import Wallet from './pages/user/Wallet';
import Profile from './pages/user/Profile';
import BookingHistory from './pages/user/BookingHistory';

// Rider Pages
import RiderDashboard from './pages/rider/RiderDashboard';
import RiderRequests from './pages/rider/RiderRequests';
import RiderEarnings from './pages/rider/RiderEarnings';
import RiderWallet from './pages/rider/RiderWallet';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RiderManagement from './pages/admin/RiderManagement';
import RestaurantManagement from './pages/admin/RestaurantManagement';
import BookingManagement from './pages/admin/BookingManagement';
import RevenueReports from './pages/admin/RevenueReports';

// Role-based Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useContext(AppContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If not authorized for this page, redirect to correct landing dashboard
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />;
  }

  return children;
};

// Application Router Content Component
const AppContent = () => {
  const { currentUser } = useContext(AppContext);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const isLandingRoute = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-lightbg antialiased">
      {/* Admin Panel Layout Switcher */}
      {isAdminRoute && currentUser?.role === 'admin' ? (
        <div className="flex flex-col lg:flex-row min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-lightbg pb-10">
            <Routes>
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
              <Route path="/admin/riders" element={<ProtectedRoute allowedRoles={['admin']}><RiderManagement /></ProtectedRoute>} />
              <Route path="/admin/restaurants" element={<ProtectedRoute allowedRoles={['admin']}><RestaurantManagement /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><BookingManagement /></ProtectedRoute>} />
              <Route path="/admin/revenue" element={<ProtectedRoute allowedRoles={['admin']}><RevenueReports /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        /* Customers, Riders, and Public Layout */
        <>
          {!isAuthRoute && <Navbar />}

          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User Routes */}
              <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
              <Route path="/user/taxi" element={<ProtectedRoute allowedRoles={['user']}><TaxiBooking /></ProtectedRoute>} />
              <Route path="/user/food" element={<ProtectedRoute allowedRoles={['user']}><FoodDelivery /></ProtectedRoute>} />
              <Route path="/user/food/:restaurantId" element={<ProtectedRoute allowedRoles={['user']}><RestaurantMenu /></ProtectedRoute>} />
              <Route path="/user/parcel" element={<ProtectedRoute allowedRoles={['user']}><ParcelDelivery /></ProtectedRoute>} />
              <Route path="/user/track/:orderId" element={<ProtectedRoute allowedRoles={['user']}><TrackOrder /></ProtectedRoute>} />
              <Route path="/user/wallet" element={<ProtectedRoute allowedRoles={['user']}><Wallet /></ProtectedRoute>} />
              <Route path="/user/profile" element={<ProtectedRoute allowedRoles={['user']}><Profile /></ProtectedRoute>} />
              <Route path="/user/history" element={<ProtectedRoute allowedRoles={['user']}><BookingHistory /></ProtectedRoute>} />

              {/* Protected Rider Routes */}
              <Route path="/rider/dashboard" element={<ProtectedRoute allowedRoles={['rider']}><RiderDashboard /></ProtectedRoute>} />
              <Route path="/rider/requests" element={<ProtectedRoute allowedRoles={['rider']}><RiderRequests /></ProtectedRoute>} />
              <Route path="/rider/earnings" element={<ProtectedRoute allowedRoles={['rider']}><RiderEarnings /></ProtectedRoute>} />
              <Route path="/rider/wallet" element={<ProtectedRoute allowedRoles={['rider']}><RiderWallet /></ProtectedRoute>} />

              {/* Fallback Catch-All */}
              <Route path="*" element={currentUser ? <Navigate to={`/${currentUser.role}/dashboard`} replace /> : <Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Render mobile sticky bottom menu */}
          {!isAuthRoute && !isLandingRoute && <BottomNav />}
        </>
      )}
    </div>
  );
};

// Global Provider Wrapper
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111827',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '605',
              borderRadius: '16px',
              padding: '12px 24px',
            },
          }}
        />
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
