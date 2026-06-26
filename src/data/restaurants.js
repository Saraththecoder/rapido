export const RESTAURANTS = [
  {
    id: 'napoli-pizza',
    name: 'Napoli Artisanal Pizza',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.8,
    eta: '25-35 min',
    minOrder: 199,
    offer: 'Free Delivery',
    image: '/food_promo.png',
    gradient: 'from-orange-500 to-amber-600',
    menu: {
      Recommended: [
        { id: 'np-1', name: 'Double Cheese Margherita', price: 219, isVeg: true, desc: 'San Marzano tomato base with fresh mozzarella cubes and fresh basil.' },
        { id: 'np-2', name: 'Spicy Pepperoni Pizza', price: 299, isVeg: false, desc: 'Spiced chicken pepperoni slices loaded on fresh hand-tossed dough.' }
      ],
      Starters: [
        { id: 'np-3', name: 'Stuffed Garlic Bread (Veg)', price: 129, isVeg: true, desc: 'Baked bread buttered with garlic spread and stuffed with sweet corn and cheese.' }
      ],
      'Main Course': [
        { id: 'np-4', name: 'Penne White Cream Pasta', price: 199, isVeg: true, desc: 'Penne pasta tossed in heavy garlic white cream and diced mushrooms.' }
      ],
      Beverages: [
        { id: 'np-5', name: 'Chilled Lemon Sunrise', price: 89, isVeg: true, desc: 'Sweet layered blend of orange juice, grenadine, and soda.' }
      ]
    }
  },
  {
    id: 'burger-lab',
    name: 'The Burger Lab',
    cuisines: ['American', 'Burgers'],
    rating: 4.5,
    eta: '15-20 min',
    minOrder: 149,
    offer: 'Up to 40% OFF',
    image: '/burger_promo.png',
    gradient: 'from-red-500 to-yellow-600',
    menu: {
      Recommended: [
        { id: 'bl-1', name: 'Crunchy Chicken Zinger', price: 169, isVeg: false, desc: 'Crispy double fried chicken patty, iceberg lettuce, and spicy mayo.' },
        { id: 'bl-2', name: 'Double Cheese Veg Whopper', price: 149, isVeg: true, desc: 'Potato-veggie grilled patty with double cheddar cheese, pickles, and dressing.' }
      ],
      Starters: [
        { id: 'bl-3', name: 'Cheesy Peri Peri Fries', price: 119, isVeg: true, desc: 'Golden fries dusted with peri peri seasoning and loaded with hot cheese sauce.' }
      ],
      'Main Course': [
        { id: 'bl-4', name: 'Ultimate Monster Burger', price: 289, isVeg: false, desc: 'Double mutton patty, bacon strips, onion rings, and secret barn sauce.' }
      ],
      Beverages: [
        { id: 'bl-5', name: 'Choco Fudge Milkshake', price: 109, isVeg: true, desc: 'Creamy milk chocolate shake blended with chocolate fudge chunks.' }
      ]
    }
  },
  {
    id: 'dragon-palace',
    name: 'Dragon Palace',
    cuisines: ['Chinese', 'Asian', 'Noodles'],
    rating: 4.4,
    eta: '30-35 min',
    minOrder: 249,
    offer: '50% OFF on First Order',
    image: '/food_promo.png', // Fallback to Pizza image as representative food
    gradient: 'from-red-600 to-rose-700',
    menu: {
      Recommended: [
        { id: 'dp-1', name: 'Schezwan Chicken Noodles', price: 189, isVeg: false, desc: 'Wok tossed noodles in fiery Schezwan chili paste and shredded chicken.' },
        { id: 'dp-2', name: 'Paneer Manchurian Dry', price: 169, isVeg: true, desc: 'Fried paneer blocks tossed in soy sauce, garlic, ginger, and green chilies.' }
      ],
      Starters: [
        { id: 'dp-3', name: 'Spring Roll Veg (4 Pcs)', price: 129, isVeg: true, desc: 'Crispy pastry sheets rolled with julienned vegetables and fried.' }
      ],
      'Main Course': [
        { id: 'dp-4', name: 'Kung Pao Chicken', price: 229, isVeg: false, desc: 'Stir fried chicken cubes cooked with dried red peppers and peanuts.' }
      ],
      Beverages: [
        { id: 'dp-5', name: 'Jasmine Hot Tea', price: 69, isVeg: true, desc: 'Aromatic green tea infused with jasmine blossoms.' }
      ]
    }
  }
];
