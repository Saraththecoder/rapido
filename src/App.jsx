import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import PhoneWrapper from './components/PhoneWrapper';
import Hub from './pages/Hub';

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

const router = createHashRouter([
  {
    path: '/',
    element: <PhoneWrapper />,
    children: [
      {
        path: '',
        element: <Hub />
      },
      // Ride routes
      {
        path: 'ride',
        element: <RideHome />
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
