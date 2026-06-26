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
        { id: 'np-2', name: 'Spicy Pepperoni Pizza', price: 299, isVeg: false, desc: 'Spiced chicken pepperoni slices loaded on fresh hand-tossed dough.' },
        { id: 'np-6', name: 'BBQ Smoked Chicken Pizza', price: 329, isVeg: false, desc: 'Tender chicken strips, red onions, and fresh cilantro over smoky BBQ sauce.' },
        { id: 'np-7', name: 'Veggie Supreme Pizza', price: 279, isVeg: true, desc: 'Loaded with bell peppers, sweet corn, black olives, red onions, and mushrooms.' }
      ],
      Starters: [
        { id: 'np-3', name: 'Stuffed Garlic Bread (Veg)', price: 129, isVeg: true, desc: 'Baked bread buttered with garlic spread and stuffed with sweet corn and cheese.' },
        { id: 'np-8', name: 'Tomato Garlic Bruschetta', price: 149, isVeg: true, desc: 'Toasted rustic bread topped with diced tomatoes, garlic, basil, and olive oil.' },
        { id: 'np-9', name: 'Mozzarella Cheese Sticks', price: 159, isVeg: true, desc: 'Deep-fried cheese sticks served with a side of marinara dipping sauce.' }
      ],
      'Main Course': [
        { id: 'np-4', name: 'Penne White Cream Pasta', price: 199, isVeg: true, desc: 'Penne pasta tossed in heavy garlic white cream and diced mushrooms.' },
        { id: 'np-10', name: 'Spaghetti Bolognese', price: 249, isVeg: false, desc: 'Traditional Italian pasta with slow-cooked minced chicken ragout.' },
        { id: 'np-11', name: 'Lasagna Al Forno (Veg)', price: 229, isVeg: true, desc: 'Layers of fresh pasta, ricotta, spinach, and marinara sauce baked with cheese.' }
      ],
      Beverages: [
        { id: 'np-5', name: 'Chilled Lemon Sunrise', price: 89, isVeg: true, desc: 'Sweet layered blend of orange juice, grenadine, and soda.' },
        { id: 'np-12', name: 'Fresh Peach Iced Tea', price: 79, isVeg: true, desc: 'House-brewed black tea with natural peach syrup and mint leaves.' },
        { id: 'np-13', name: 'Classic Tiramisu Shake', price: 119, isVeg: true, desc: 'Rich espresso and mascarpone flavored creamy shake with cocoa powder.' }
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
        { id: 'bl-2', name: 'Double Cheese Veg Whopper', price: 149, isVeg: true, desc: 'Potato-veggie grilled patty with double cheddar cheese, pickles, and dressing.' },
        { id: 'bl-6', name: 'Smoky Bacon Cheeseburger', price: 229, isVeg: false, desc: 'Flame-grilled chicken patty topped with crispy bacon, cheddar, onions, and BBQ sauce.' },
        { id: 'bl-7', name: 'Spicy Avocado Veg Burger', price: 179, isVeg: true, desc: 'Black bean and quinoa patty with avocado slices, jalapeños, and chipotle aioli.' }
      ],
      Starters: [
        { id: 'bl-3', name: 'Cheesy Peri Peri Fries', price: 119, isVeg: true, desc: 'Golden fries dusted with peri peri seasoning and loaded with hot cheese sauce.' },
        { id: 'bl-8', name: 'Crispy Onion Rings', price: 99, isVeg: true, desc: 'Thick-cut sweet onion rings battered and panko-crusted to crispy golden brown.' },
        { id: 'bl-9', name: 'Loaded Nacho Bowl', price: 159, isVeg: true, desc: 'Tortilla chips topped with warm cheese, black beans, salsa, jalapeños, and sour cream.' }
      ],
      'Main Course': [
        { id: 'bl-4', name: 'Ultimate Monster Burger', price: 289, isVeg: false, desc: 'Double mutton patty, bacon strips, onion rings, and secret barn sauce.' },
        { id: 'bl-10', name: 'Crispy Chicken Strips & Waffles', price: 239, isVeg: false, desc: 'Southern-fried chicken tenders served over fluffy waffles with maple syrup.' },
        { id: 'bl-11', name: 'Classic Mac & Cheese', price: 189, isVeg: true, desc: 'Elbow macaroni baked in a rich, creamy blend of three cheddar cheeses.' }
      ],
      Beverages: [
        { id: 'bl-5', name: 'Choco Fudge Milkshake', price: 109, isVeg: true, desc: 'Creamy milk chocolate shake blended with chocolate fudge chunks.' },
        { id: 'bl-12', name: 'Oreo Mint Blast Shake', price: 119, isVeg: true, desc: 'Thick vanilla shake blended with chocolate Oreo cookies and fresh mint syrup.' },
        { id: 'bl-13', name: 'Classic Soda Float', price: 89, isVeg: true, desc: 'Chilled cola with a scoop of premium vanilla bean ice cream.' }
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
    image: '/food_promo.png',
    gradient: 'from-red-600 to-rose-700',
    menu: {
      Recommended: [
        { id: 'dp-1', name: 'Schezwan Chicken Noodles', price: 189, isVeg: false, desc: 'Wok tossed noodles in fiery Schezwan chili paste and shredded chicken.' },
        { id: 'dp-2', name: 'Paneer Manchurian Dry', price: 169, isVeg: true, desc: 'Fried paneer blocks tossed in soy sauce, garlic, ginger, and green chilies.' },
        { id: 'dp-6', name: 'Chicken Hakka Noodles', price: 179, isVeg: false, desc: 'Stir-fried noodles with crisp vegetables, shredded chicken, and savory sauces.' },
        { id: 'dp-7', name: 'Veg Dumpling Dim Sum (6 Pcs)', price: 149, isVeg: true, desc: 'Steamed transparent dim sum dumplings packed with mixed vegetables.' }
      ],
      Starters: [
        { id: 'dp-3', name: 'Spring Roll Veg (4 Pcs)', price: 129, isVeg: true, desc: 'Crispy pastry sheets rolled with julienned vegetables and fried.' },
        { id: 'dp-8', name: 'Chili Chicken Dry', price: 189, isVeg: false, desc: 'Crisp fried chicken chunks tossed in spicy chili-soy sauce with bell peppers.' },
        { id: 'dp-9', name: 'Honey Chili Potato', price: 139, isVeg: true, desc: 'Crispy french fries tossed in sweet and spicy honey chili sauce.' }
      ],
      'Main Course': [
        { id: 'dp-4', name: 'Kung Pao Chicken', price: 229, isVeg: false, desc: 'Stir fried chicken cubes cooked with dried red peppers and peanuts.' },
        { id: 'dp-10', name: 'Sweet and Sour Veg Bowl', price: 199, isVeg: true, desc: 'Assorted vegetables cooked in tangy sweet and sour sauce served with steamed rice.' },
        { id: 'dp-11', name: 'Chicken Fried Rice', price: 199, isVeg: false, desc: 'Wok-tossed long grain basmati rice with eggs, chicken, and green onions.' }
      ],
      Beverages: [
        { id: 'dp-5', name: 'Jasmine Hot Tea', price: 69, isVeg: true, desc: 'Aromatic green tea infused with jasmine blossoms.' },
        { id: 'dp-12', name: 'Iced Matcha Green Tea', price: 89, isVeg: true, desc: 'Refreshing cold milk beverage whisked with pure Japanese matcha powder.' },
        { id: 'dp-13', name: 'Litchi Cooler Soda', price: 79, isVeg: true, desc: 'Chilled soda splash infused with sweet litchi syrup and mint leaves.' }
      ]
    }
  },
  {
    id: 'sakura-sushi',
    name: 'Sakura Sushi Bar',
    cuisines: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.7,
    eta: '35-40 min',
    minOrder: 299,
    offer: 'Free Dessert',
    image: '/food_promo.png',
    gradient: 'from-pink-500 to-red-500',
    menu: {
      Recommended: [
        { id: 'ss-1', name: 'Classic California Roll (8 Pcs)', price: 289, isVeg: false, desc: 'Sushi rolls filled with crab stick, fresh avocado, cucumber, and orange tobiko.' },
        { id: 'ss-2', name: 'Spicy Tempura Asparagus Roll', price: 249, isVeg: true, desc: 'Crispy fried asparagus spears and spicy mayo rolled in seasoned sushi rice.' },
        { id: 'ss-6', name: 'Premium Spicy Tuna Roll (8 Pcs)', price: 349, isVeg: false, desc: 'Yellowfin tuna mixed with sriracha spicy sauce, rolled with cucumber and sesame.' }
      ],
      Starters: [
        { id: 'ss-3', name: 'Edamame with Sea Salt', price: 149, isVeg: true, desc: 'Steamed green soybeans in pods sprinkled with Maldon sea salt flakes.' },
        { id: 'ss-8', name: 'Crispy Veg Tempura', price: 179, isVeg: true, desc: 'Assorted vegetables dipped in light tempura batter and fried to crispy perfection.' },
        { id: 'ss-9', name: 'Gyoza Dumplings Chicken (5 Pcs)', price: 199, isVeg: false, desc: 'Pan-seared Japanese dumplings stuffed with seasoned minced chicken.' }
      ],
      'Main Course': [
        { id: 'ss-4', name: 'Tofu Teriyaki Bento Box', price: 299, isVeg: true, desc: 'Includes Teriyaki Tofu, steamed rice, house salad, and 4 pieces of veg roll.' },
        { id: 'ss-10', name: 'Chicken Katsu Curry', price: 349, isVeg: false, desc: 'Breaded crispy chicken cutlet served over steamed rice with thick aromatic curry sauce.' },
        { id: 'ss-11', name: 'Salmon Teriyaki Fillet', price: 399, isVeg: false, desc: 'Grilled fresh salmon fillet glazed in sweet teriyaki sauce served with bok choy.' }
      ],
      Beverages: [
        { id: 'ss-5', name: 'Aromatic Oolong Tea', price: 79, isVeg: true, desc: 'Traditional roasted Chinese tea served hot.' },
        { id: 'ss-12', name: 'Yuzu Citrus Lemonade', price: 99, isVeg: true, desc: 'Sweet and sour lemonade flavored with refreshing Japanese yuzu juice.' },
        { id: 'ss-13', name: 'Ramune Japanese Soda', price: 129, isVeg: true, desc: 'Traditional carbonated soft drink sealed with a glass marble.' }
      ]
    }
  }
];
