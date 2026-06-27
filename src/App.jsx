import React from 'react';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import PhoneWrapper from './components/PhoneWrapper';
import Hub from './pages/Hub';
import Auth from './pages/Auth';
import AuthUser from './pages/AuthUser';
import AuthRider from './pages/AuthRider';
import AuthVendor from './pages/AuthVendor';
import AuthAdmin from './pages/AuthAdmin';
import UserDashboard from './pages/UserDashboard';
import { useAuthStore } from './store/useAuthStore';

// Ride pages
import RideHome from './pages/ride/RideHome';
import RideBook from './pages/ride/RideBook';
import RideTracking from './pages/ride/RideTracking';
import RideRiderConsole from './pages/ride/RideRiderConsole';
import RideAdmin from './pages/ride/RideAdmin';

// Food pages
import FoodHome from './pages/food/FoodHome';
import FoodRestaurant from './pages/food/FoodRestaurant';
import FoodCart from './pages/food/FoodCart';
import FoodOrderTracking from './pages/food/FoodOrderTracking';
import FoodVendorConsole from './pages/food/FoodVendorConsole';

// Courier pages
import CourierHome from './pages/courier/CourierHome';
import CourierBook from './pages/courier/CourierBook';
import CourierTracking from './pages/courier/CourierTracking';

function DashboardRedirector() {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  switch (role) {
    case 'rider':
      return <Navigate to="/ride/rider" replace />;
    case 'vendor':
      return <Navigate to="/food/vendor" replace />;
    case 'admin':
      return <Navigate to="/ride/admin" replace />;
    case 'user':
    default:
      return <UserDashboard />;
  }
}

const router = createHashRouter([
  {
    path: '/',
    element: <PhoneWrapper />,
    children: [
      {
        path: '',
        element: <DashboardRedirector />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'auth/user',
        element: <AuthUser />
      },
      {
        path: 'auth/rider',
        element: <AuthRider />
      },
      {
        path: 'auth/vendor',
        element: <AuthVendor />
      },
      {
        path: 'auth/admin',
        element: <AuthAdmin />
      },
      // Ride routes
      {
        path: 'ride',
        element: <Navigate to="/?tab=ride" replace />
      },
      {
        path: 'ride/book',
        element: <RideBook />
      },
      {
        path: 'ride/tracking',
        element: <RideTracking />
      },
      {
        path: 'ride/rider',
        element: <RideRiderConsole />
      },
      {
        path: 'ride/admin',
        element: <RideAdmin />
      },
      // Food routes
      {
        path: 'food',
        element: <FoodHome />
      },
      {
        path: 'food/vendor',
        element: <FoodVendorConsole />
      },
      {
        path: 'food/:restaurantId',
        element: <FoodRestaurant />
      },
      {
        path: 'food/cart',
        element: <FoodCart />
      },
      {
        path: 'food/tracking',
        element: <FoodOrderTracking />
      },
      // Courier routes
      {
        path: 'courier',
        element: <CourierHome />
      },
      {
        path: 'courier/book',
        element: <CourierBook />
      },
      {
        path: 'courier/tracking',
        element: <CourierTracking />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

