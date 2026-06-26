export const RIDERS = [
  {
    id: 'priya-reddy',
    name: 'Priya Reddy',
    avatar: 'PR',
    rating: '4.9',
    vehicleInfo: 'Hero Splendor+ · TS09AB1234',
    phone: '+91 91234 56789',
    type: 'bike'
  },
  {
    id: 'kavitha-s',
    name: 'Kavitha S.',
    avatar: 'KS',
    rating: '4.7',
    vehicleInfo: 'TVS Jupiter · TS08CD5678',
    phone: '+91 98765 01234',
    type: 'auto'
  },
  {
    id: 'meena-kumari',
    name: 'Meena Kumari',
    avatar: 'MK',
    rating: '4.8',
    vehicleInfo: 'Bajaj Maxima Auto · TS07EF9012',
    phone: '+91 99887 76655',
    type: 'auto'
  }
];

export const getPilotByVehicle = (vehicleType) => {
  if (vehicleType === 'bike') return RIDERS[0];
  if (vehicleType === 'auto') return RIDERS[1];
  return RIDERS[2]; // Default to Meena Kumari
};
