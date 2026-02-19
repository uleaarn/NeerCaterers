
import { NavItem, CuisineCategory, LiveStation, EventType, MenuCuisine, Inquiry } from './types';

export const COLORS = {
  bg: '#F6F6F4',
  text: '#1C1C1C',
  secondary: '#7A7A7A',
  accent: '#C6A15B',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Cuisines', path: '/cuisines' },
  { label: 'Live Stations', path: '/stations' },
  { label: 'Events', path: '/events' },
  { label: 'Process', path: '/process' },
  { label: 'Consultation', path: '/contact' },
];

export const EMAIL_TEMPLATES = {
  CLIENT_CONFIRMATION: (name: string) => ({
    subject: "Inquiry Registered — Neer Caterers Production Queue",
    body: `Dear ${name},

We have successfully registered your inquiry within our operational ledger.

Our team is currently evaluating the logistical feasibility of your production against our existing engagement schedule. To preserve the integrity of our service standards, we maintain a restricted booking volume.

A senior coordinator will contact you within 24–48 business hours to discuss your requirements.

Best regards,

The Neer Caterers Executive Team`
  }),
  INTERNAL_NOTIFICATION: (inquiry: Inquiry) => ({
    subject: `EXECUTIVE INQUIRY: ${inquiry.eventType} | ${inquiry.clientName}`,
    body: `NEW PRODUCTION INQUIRY RECEIVED

ID: ${inquiry.id}
CLIENT: ${inquiry.clientName}
CONTACT: ${inquiry.email} | ${inquiry.phone}

LOGISTICS:
CLASSIFICATION: ${inquiry.eventType}
DATE/WINDOW: ${inquiry.eventDate}
VOLUME: ${inquiry.guestCount}
VENUE: ${inquiry.location}

ARCHITECTURE:
NATURE: ${inquiry.natureOfEvent}
SERVICE STYLE: ${inquiry.serviceStyle}
DIETARY MANDATE: ${inquiry.dietaryMandates}
PILLARS: ${inquiry.cuisines.join(', ')}

PRODUCTION NOTES:
${inquiry.internalNotes}

TIMESTAMP: ${inquiry.timestamp}

ACTION: Verify calendar availability and assign lead coordinator.`
  })
};

export const CLIENT_REFLECTIONS = [
  {
    quote: "The logistical precision for our 800-guest gala was absolute. Flawless execution from start to finish.",
    attribution: "Corporate Gala — Manhattan"
  },
  {
    quote: "Neer managed a multi-day wedding with effortless calm. The focus on guest flow was evident in every detail.",
    attribution: "Wedding Production — Princeton"
  },
  {
    quote: "Authentic depth across every station. Our community felt truly seen and served through their technical mastery.",
    attribution: "Community Event — Philadelphia"
  }
];

export const FAQ_ITEMS = [
  {
    question: "What geographical regions do you support?",
    answer: "We primarily operate across the Tri-State area, specifically New Jersey, New York, and Pennsylvania. For marquee productions outside this range, we evaluate feasibility based on logistical requirements."
  },
  {
    question: "What is your standard minimum guest count?",
    answer: "Our operational systems are optimized for large-scale productions. Typically, we accept inquiries for events with 100 or more guests to maintain our standard of logistical excellence."
  },
  {
    question: "Do you provide full orchestration (staffing & rentals)?",
    answer: "Yes. Every production includes executive captain oversight, trained service staff, and coordination of required catering rentals to ensure a seamless guest experience."
  },
  {
    question: "Can you accommodate strict religious or health dietary protocols?",
    answer: "Absolute dietary integrity is a core pillar of our methodology. We regularly manage Halal, Kosher-style, and Jain protocols with verified sourcing and separated production workflows."
  },
  {
    question: "What is the recommended booking timeframe?",
    answer: "To ensure availability and adequate site strategy, we recommend initiating a consultation 6 to 12 months in advance, particularly for peak weekend dates."
  }
];

export const CUISINES: CuisineCategory[] = [
  {
    id: 'north-indian',
    title: 'North Indian',
    description: 'A study in complexity and heritage. From clarified butter finishes to slow-rendered gravies, we bring executive precision to traditional grandeur.',
    image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FNorthIndianCatering.avif?alt=media&token=59d33f43-da11-403f-8c2e-b91efbc2ea05',
  },
  {
    id: 'gujarati',
    title: 'Gujarati',
    description: 'The delicate balance of sweet, salty, and spicy. Precise textures and authentic sourcing define our Gujarati portfolio.',
    image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FGujarathi1.jpg?alt=media&token=3c915f45-75a7-4df6-87e5-c967e941d02c',
  },
  {
    id: 'south-indian',
    title: 'South Indian',
    description: 'Technical mastery of fermentation and spice tempering. Clean, vibrant, and executed with modern consistency.',
    image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FDishes.avif?alt=media&token=0bc74007-44f0-426d-9cac-a47e8ab898ed',
  },
  {
    id: 'indo-chinese',
    title: 'Indo-Chinese',
    description: 'High-heat execution and sharp flavor profiles. A refined take on the iconic fusion movement.',
    image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FFood-1.jpg?alt=media&token=27417ea2-c188-4958-8ee0-82d7c45df735',
  },
  {
    id: 'world-intermix',
    title: 'World Inter-Mix',
    description: 'Global influences curated for a sophisticated palate. Mediterranean, Continental, and Pan-Asian selections.',
    image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2Fcatering-int.jpg?alt=media&token=c370f039-4c4e-4545-bad9-198d8a75980e',
  },
  {
    id: 'desserts',
    title: 'Desserts',
    description: 'A collection of artisanal sweets, from traditional heritage mithai to modern fusion patisserie.',
    image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FDessertStation.webp?alt=media&token=f32fbf04-6058-4549-9bc7-54ef5aa978b1',
  },
];

const parseMenuData = (rawData: any[]): MenuCuisine[] => {
  return rawData.map(c => {
    let id = c.name.toLowerCase().replace(' menu', '').replace(' ', '-');
    if (id === 'dessert') id = 'desserts';
    return {
      id,
      title: c.name.replace(' Menu', ''),
      sections: c.categories.map((cat: any) => {
        const isVegCat = cat.name.toLowerCase().includes('veg') || 
                        cat.name.toLowerCase().includes('chaat') || 
                        cat.name.toLowerCase().includes('dessert') || 
                        cat.name.toLowerCase().includes('sweets') ||
                        cat.name.toLowerCase().includes('farsan') ||
                        cat.name.toLowerCase().includes('special items') ||
                        id === 'desserts' || id === 'gujarati';
        return {
          category: cat.name,
          description: cat.description || (isVegCat ? 'Vegetarian selections' : 'Non-vegetarian curations'),
          dishes: cat.items.map((item: any) => {
            const fullStr = (item.name + ' ' + (item.description || '')).toLowerCase();
            return {
              name: item.name.split(' (')[0].split(' - ')[0],
              isVeg: isVegCat,
              isLive: fullStr.includes('live station') || fullStr.includes('- live') || fullStr.includes(' (live'),
              isButlerPassed: fullStr.includes('butler passed'),
              isExtraCharge: fullStr.includes('extra charge')
            };
          })
        };
      })
    };
  });
};

const RAW_MENU_JSON = [
  {
    "name": "North Indian Menu",
    "description": "",
    "categories": [
      {
        "name": "Appetizers - Veg",
        "items": [
          { "name": "Paneer Tikka", "description": "- Classic Marinated And Grilled Cottage Cheese" },
          { "name": "Pudina Paneer Tikka", "description": "- Paneer Marinated With Fresh Mint And Spices" },
          { "name": "Achari Paneer Tikka", "description": "- Paneer With Tangy Pickling Seasoning" },
          { "name": "Malai Paneer Tikka", "description": "- Creamy And Mildly Spiced Grilled Paneer" },
          { "name": "Mango Tulsi Paneer Tikka", "description": "- Paneer Marinated With Mango And Fresh Basil" },
          { "name": "Paneer Tikka Zaffrani", "description": "- Marinated Cubes Of Cottage Cheese, Saffron Flavored, Char Grilled" },
          { "name": "Paneer Chutney Stuffed Pakoras", "description": "- Paneer Pakoras With Flavorful Chutney Filling" },
          { "name": "Masala Paneer Cutlet", "description": "- Spiced Paneer Patties" },
          { "name": "Paneer Methi Tikki (Extra Charge)", "description": "- Paneer And Fenugreek Tikki" },
          { "name": "Paneer Spinach Rolls (Extra Charge)", "description": "- Rolled Paneer With Spinach And Spices" },
          { "name": "Dahi Saufiyana Kabab", "description": "- Deep Fried Potato Medallions Made With Yogurt And Flavored With Fennels" },
          { "name": "Assorted Pakoras", "description": "- Mixed Vegetable Fritters" },
          { "name": "Mirchi Pakora", "description": "- Spicy Stuffed Chili Fritters" },
          { "name": "Bharvan Mirch", "description": "- Long Green Chilies, Slit, Filled With Potatoes With A Blend Of Spice And Batter Fried" },
          { "name": "Punjabi Samosa", "description": "- Classic Spiced Potato Samosa" },
          { "name": "Potli Samosa (Extra Charge)", "description": "- Mini Pouch-Shaped Samosas With Flavorful Filling" },
          { "name": "Cocktail Samosa", "description": "- Bite-Sized Samosas Perfect For Events" },
          { "name": "Jalapeno Cheese Samosa", "description": "- Spicy Jalapeno Stuffed With Cheese" },
          { "name": "Pau Bhaji (Live Station)", "description": "- Spiced Vegetable & Potato Mash Served With Toasted Buns" },
          { "name": "Truffle Butter Pau Bhaji (Live Station)", "description": "- Classic Mumbai-Style Spiced Vegetable Mash Infused With Truffle Butter, Served With Toasted Buns" },
          { "name": "Nawabi Kaju Roll (Butler Passed Only)", "description": "- Golden Fried Wraps Filled With Spiced Mashed Cashew Nuts" },
          { "name": "Bhutte Ke Cutlet With Chilly Jam Sauce (Butler Passed Only)", "description": "- Mashed And Seasoned Corn Kernel Patties" },
          { "name": "Vegetable Cutlet", "description": "- Pan-Fried Spiced Vegetable Patties" },
          { "name": "Soybean, Spinach & Lentil Tikki", "description": "- Tomato Salsa" },
          { "name": "Grilled Tandoori Vegetables", "description": "- Seasonal Vegetables Cooked In Tandoor" },
          { "name": "Tandoori Broccoli", "description": "- Broccoli Marinated And Roasted In Tandoor" },
          { "name": "Aloo Boonda", "description": "- Spiced Potato Fritters" },
          { "name": "Veg Keema Sliders (Live Station)", "description": "- Spiced Minced Vegetable Sliders" },
          { "name": "Hara Bhara Kabab", "description": "- Spinach And Green Vegetable Kabab" },
          { "name": "Goat Cheese Kabab (Extra Charge)", "description": "- Spinach & Green Vegetable Kabab With Goat Cheese" },
          { "name": "Pickled Mushrooms (Butler Passed Only)", "description": "- Tangy And Spiced Mushrooms" },
          { "name": "Truffle Grilled Mushrooms (Extra Charge) (Butler Passed Only)", "description": "- Mushrooms With Truffle Flavor" },
          { "name": "Grilled Mushroom With Goat Cheese (Extra Charge) (Butler Passed Only)", "description": "- Mushrooms Topped With Goat Cheese" }
        ]
      },
      {
        "name": "Signature Chaats – All Chaats Are Live",
        "items": [
          { "name": "Dahi Aloo Papri Chaat", "description": "- Crispy Papri With Potato And Yogurt" },
          { "name": "Bombay Bhel Puri", "description": "- Tangy Puffed Rice Snack – Tomatoes, Onions, Spices & Chutneys" },
          { "name": "Samosa Chaat", "description": "- Crushed Samosas With Chickpeas And Chutney" },
          { "name": "Sev Puri Chaat", "description": "- Crispy Puris With Potatoes, Sev, And Chutneys" },
          { "name": "Khasta Kachori", "description": "- Flaky Stuffed Pastry With Spices" },
          { "name": "Janpath Aloo Chaat", "description": "- Spiced Fried Potatoes With Fresh Fruit & Chutneys" },
          { "name": "Fruit Chaat", "description": "- Fresh Fruit Tossed With Spices" },
          { "name": "Raj Kachori Chaat", "description": "- Large Kachori Stuffed With Chickpeas, Yogurt, Chutneys, Green Moong & Kala Chana" },
          { "name": "Pani Puri", "description": "- Regular / Sweet / Burnt Garlic / Watermelon / Guava" },
          { "name": "Avocado Pani Puri", "description": "- Puri Filled With Avocado And Flavored Water" },
          { "name": "Avocado & Mango Pani Puri* (Seasonal)", "description": "- Crisp puris filled with tangy avocado-mango water and spiced potato mash" },
          { "name": "Aloo Tikki & Cholley", "description": "- Spiced Potato Patties Served With Chickpeas" }
        ]
      },
      {
        "name": "Appetizers – Non-Veg",
        "items": [
          { "name": "Chicken Cutlet", "description": "- Crispy Spiced Chicken Patties" },
          { "name": "Chicken Keema Pau (Live Station)", "description": "- Minced Chicken Served In Mini Buns (Full Pudinewala/ Truffle Cream)" },
          { "name": "Chicken Samosa", "description": "- Spiced Chicken Wrapped In Pastry" },
          { "name": "Chicken Khurchan", "description": "- Tandoori Chicken Tikka strips pan-fried with fresh cumin, bell peppers, tomatoes, and onions" },
          { "name": "Tandoori Chicken (Butler Passed Only)", "description": "- Classic Bone-In Chicken Marinated In Yogurt, Spices, And Lemon Juice, Roasted In A Clay Oven" },
          { "name": "Achari Chicken Tikka", "description": "- Chicken Marinated With Pickle Seasoning" },
          { "name": "Murgh Malai Kabab", "description": "- Creamy, Tender Pieces Of Chicken Marinated With Yogurt, Cream, And Mild Spices, Grilled To Perfection" },
          { "name": "Angare Chicken Tikka", "description": "- Smoky And Spicy Marinated Chicken Cooked In THE Tandoor For A Bold, Charred Flavor" },
          { "name": "Sharabi Kabab (Chicken Tikka)", "description": "- Juicy Pieces Of Chicken Infused With Aromatic Spices And A Touch Of Richness" },
          { "name": "Chicken Seekh Kabab", "description": "- Minced Chicken Blended With Herbs And Spices, Grilled In THE Traditional Tandoor" },
          { "name": "Haryali Chicken Tikka", "description": "- Boneless chicken pieces marinated with mint and coriander" },
          { "name": "Afghani Kabab", "description": "- Boneless Morsels Of Chicken Marinated In Ginger, Garlic, And Cardamom" },
          { "name": "Tangri Kabab (Butler Passed Only)", "description": "- Chicken Drumsticks Marinated With Garlic, Ginger, Black Pepper, Slowly Cooked In THE Tandoor" },
          { "name": "Chicken Peri Peri Kabab", "description": "- Spicy And Tangy Chicken Marinated In Peri Peri Spices, Grilled For A Fiery Flavor" },
          { "name": "Lamb Gilafi Kebab (Butler Passed Only)", "description": "- Onion And Bell Pepper Coated Minced Lamb Cooked On A Skewer" },
          { "name": "Lamb Samosa", "description": "- Crispy Pastry Filled With Spiced Minced Lamb, Fried Until Golden Brown" },
          { "name": "Lamb Seekh Kabab (Butler Passed Only)", "description": "- Minced Lamb Seasoned With Aromatic Spices And Grilled In THE Tandoor" },
          { "name": "Barrah Kabab (Extra Charge)", "description": "- Tender Lamb Chunks Marinated In Traditional Spices And Grilled To Perfection" },
          { "name": "Galouti Kabab With Mughlai Paratha (Extra Charge) (Live Station)", "description": "- Soft, Melt-In-THE-Mouth Lamb Kababs Served With Warm Mughlai Paratha" },
          { "name": "Baby Lambchops (Extra Charge) (Butler Passed Only)", "description": "- Tender Lamb Chops Marinated In Aromatic Spices And Grilled To Juicy Perfection" },
          { "name": "Masala Calamari (Extra Charge) (Live Station)", "description": "- Crispy Calamari Tossed With Bold Indian Spices And Herbs" },
          { "name": "Machli Koliwada (Extra Charge)", "description": "- Fried Fish Flavored With Crushed Black Pepper And Coriander Seeds, And A Hint Of Spice" },
          { "name": "Mahi Anarkali (Extra Charge)", "description": "- Carom Seed And Pomegranate-Flavored Fried Fish With A Sweet And Tangy Twist" },
          { "name": "Ajwaini Fish Tikka (Extra Charge)", "description": "- Cubes Of Marinated Fish Cooked Over Charcoal Fire Flavored With Caraway Seeds" },
          { "name": "Achari Fish Tikka (Extra Charge) (Butler Passed Only)", "description": "- Cubes Of Salmon Marinated In Yogurt And Spices With A Subtle Flavor Of A Pickle" },
          { "name": "Tilapia Peri Peri (Extra Charge)", "description": "- Tilapia Fillets Marinated In Fiery Peri Peri Sauce And Grilled To Perfection" },
          { "name": "Blacked Fish On Skillet (Extra Charge) (Live Station)", "description": "- Pan-Seared Fish Seasoned With Bold Spices, Served Sizzling Hot" },
          { "name": "Tandoori Fish Tikka (Extra Charge) (Butler Passed Only)", "description": "- Salmon Marinated In Spices And Grilled For A Smoky Flavor" },
          { "name": "Mango Tulsi Prawns (Extra Charge) (Butler Passed Only)", "description": "- Prawns Marinated With Mango And Basil, Grilled For A Fragrant, Refreshing Taste" },
          { "name": "Tandoori Shrimp (Extra Charge) (Butler Passed Only)", "description": "- Jumbo Shrimp Marinated In Tandoori Spices And Cooked Over High Heat For A Smoky Flavor" },
          { "name": "Shrimp Lollipop (Extra Charge)", "description": "- Crispy Fried Shrimp Served Lollipop-Style For A Fun, Flavorful Bite" },
          { "name": "Shrimp Toast (Extra Charge)", "description": "- Golden, Crisp Toast Topped With Seasoned Shrimp Paste And Fried To Perfection" }
        ]
      },
      {
        "name": "Paneer & Kofta Entrées",
        "items": [
          { "name": "Kadai Paneer", "description": "- Cottage Cheese With Tomatoes, Onions And Bell Peppers" },
          { "name": "Paneer Makhani", "description": "- Cottage Cheese In Rich Tomato Sauce With Cream & Butter" },
          { "name": "Palak Paneer", "description": "- Cottage Cheese Cubes Cooked In A Fresh Spinach" },
          { "name": "Paneer Tikka Masala", "description": "- Cottage Cheese Cubes Cooked In A Tangy Tomato Gravy With Peppers & Onions" },
          { "name": "Kali Mirch Paneer", "description": "- Cottage Cheese In A Creamy Black Pepper Sauce With Garlic And Spices" },
          { "name": "Paneer Korma", "description": "- Cottage Cheese Cooked In A Rich, Creamy Sauce With Mild Spices And Saffron" },
          { "name": "Shahi Paneer", "description": "- Cottage Cheese Simmered In A Royal, Creamy Tomato-Cashew Gravy With Aromatic Spices" },
          { "name": "Paneer Pasanda", "description": "- Cottage Cheese Cooked In A Rich, Mildly Spiced Creamy Gravy With Pins And Aromatic Flavors" },
          { "name": "Paneer Jalfrezi", "description": "- Cottage Cheese Stir-Fried With Bell Peppers, Onions, Fresh Vegetables And Spices" },
          { "name": "Achari Paneer", "description": "- Cottage Cheese Cooked In A Tangy And Spicy Pickle Seasoning Sauce" },
          { "name": "Mattar Paneer", "description": "- Cottage Cheese And Green Peas Cooked In Mildly Spiced Tomato Gravy" },
          { "name": "Paneer Khurchan", "description": "- Long Cut Cottage Cheese Sautéed With Bell Peppers, Onions, And Aromatic Spices" },
          { "name": "Methi Paneer Malai Toast", "description": "- A Double Layer Of Mint Cottage Cheese Triangles Baked And Plated In A Creamy Fenugreek & Cardamon Gravy" },
          { "name": "Paneer Labadar", "description": "- Cottage Cheese Cooked In A Rich, Creamy Tomato-Onion Gravy With Mild Spices" },
          { "name": "Kaju Paneer Makhana", "description": "- Cottage Cheese, Cashews, And Fox Pins (Makhana) Cooked In A Creamy, Mildly Spiced Gravy" },
          { "name": "Lychee Paneer", "description": "- Cottage Cheese Cooked In A Subtly Sweet And Creamy Lychee-Flavored Sauce and Garnished With Fresh Lychee" },
          { "name": "Paneer Bhurji", "description": "- Crumbled Cottage Cheese Sautéed With Onions, Tomatoes, And Spices" },
          { "name": "Paneer Methi Mattar Malai", "description": "- Cottage cheese cooked with fenugreek leaves and green peas in a creamy cashew sauce" },
          { "name": "Malai Kofte", "description": "- Mix Vegetable & Cheese Dumplings In A Rich Saffron Sauce" },
          { "name": "Palak Ke Kofte", "description": "- Spinach & Cheese Dumplings Cooked In A Rich Creamy Saffron Sauce" },
          { "name": "Anjeer Kofte", "description": "- Fig & Cheese Dumplings In A Rich Saffron Creamy Sauce" },
          { "name": "Beetroot Kofte", "description": "- Soft Beetroot Dumplings Cooked In A Rich, Creamy, And Mildly Spiced Gravy" },
          { "name": "Shaam Savera", "description": "- Spinach And Lentil Dumplings Cooked In A Rich, Creamy Tomato-Onion Gravy" },
          { "name": "Lychee Nargisi Kofta (Extra Charge)", "description": "- Crumbled Cottage Cheese Stuffed In A Whole Lychee Fruit And Cooked With Gravy" }
        ]
      },
      {
        "name": "Dal Selection",
        "items": [
          { "name": "Dal Kabila (Yellow)", "description": "- Yellow Lentils Cooked With Mild Spices For A Smooth And Comforting Dish" },
          { "name": "Dal Bukhara (Black)", "description": "- A harmonious combination of black lentils cooked over a slow fire. Our signature dish" },
          { "name": "Homestyle Dal Makhani", "description": "- Black Lentils And Kidney Beans Simmered In A Creamy, Mildly Spiced Gravy For A Comforting, Homemade Flavor" },
          { "name": "Dal Frontier", "description": "- Yellow And Black Lentils Cooked With Aromatic Spices And A Hint Of Smokiness For A Bold, Flavorful Twist" },
          { "name": "Dal Palak", "description": "- Yellow Lentils Cooked With Fresh Spinach And Mild Spices For A Wholesome, Nutritious Dish" },
          { "name": "Dal Methi", "description": "- Yellow Lentils Cooked With Fenugreek Leaves And Mild Spices For A Flavorful, Aromatic Dish" },
          { "name": "Dal Pachranga", "description": "- A Medley Of Five Lentils Cooked With Aromatic Spices For A Rich And Flavorful Dish" },
          { "name": "Yellow Dal Tadka Station- Extra Charge", "description": "- Yellow Lentils Tempered With Aromatic Spices And Herbs" },
          { "name": "Rajma Masala", "description": "- Red Kidney Beans Cooked In A Spiced Tomato-Onion Gravy" },
          { "name": "Chana Masala", "description": "- Chickpeas Are Cooked In A Tangy And Spiced Tomato-Onion Gravy" },
          { "name": "Pindi Cholley", "description": "- Chickpeas Cooked With Traditional Punjabi Spices For A Rich, Flavorful Dish" },
          { "name": "Punjabi Kadi Pakora", "description": "- Gram Flour Dumplings Simmered In A Tangy, Spiced Yogurt-Based Curry" }
        ]
      },
      {
        "name": "Vegetarian Entrées",
        "items": [
          { "name": "Aloo Jeera", "description": "- Potatoes Sautéed With Cumin Seeds And Mild Spices" },
          { "name": "Aloo Gobi Masala Dum", "description": "- Potatoes And Cauliflower Cooked In A Spiced Gravy" },
          { "name": "Aloo Palak", "description": "- Potatoes Simmered With Fresh Spinach And Mild Spices" },
          { "name": "Kashmiri Dum Aloo", "description": "- Baby Potatoes Cooked In A Rich, Aromatic Kashmiri-Style Gravy" },
          { "name": "Dum Aloo Banarsi", "description": "- Slow-Cooked Potatoes In A Flavorful Banarasi-Style Gravy" },
          { "name": "Methi Aloo", "description": "- Potatoes Cooked With Fresh Fenugreek Leaves And Spices" },
          { "name": "Dahiwale Aloo", "description": "- Potatoes Cooked In A Creamy Yogurt-Based Gravy" },
          { "name": "Gobi Taka-Tin", "description": "- Stir-Fried Cauliflower With Onions And Bell Peppers" },
          { "name": "Gobi Saag", "description": "- Cauliflower Cooked With Fresh Spinach And Mild Spices" },
          { "name": "Gobi Mattar Ki Subzi", "description": "- Cauliflower And Green Peas Cooked In A Spiced Tomato Gravy" },
          { "name": "Baingan Bharta", "description": "- Roasted Eggplant Mashed And Cooked With Onions And Spices" },
          { "name": "Mirchi Baingan Ka Salan", "description": "- Eggplant And Green Chilies In A Tangy, Spiced Curry" },
          { "name": "Baingan Aloo", "description": "- Eggplant And Potatoes Cooked Together In Aromatic Spices" },
          { "name": "Achari Baingan", "description": "- Eggplant Cooked In A Tangy Pickling-Style Masala" },
          { "name": "Dahi Baingan", "description": "- Eggplant Simmered In A Creamy Yogurt-Based Gravy" },
          { "name": "Baby Eggplant Masala", "description": "- Small Eggplants Cooked In A Flavorful Spiced Gravy" },
          { "name": "Bhindi Masala", "description": "- Okra Sautéed With Onions, Tomatoes, And Spices" },
          { "name": "Karari Stuffed Bhindi (Extra Charge)", "description": "- Okra Stuffed With Spiced Gram Flour And Pan-Fried" },
          { "name": "Mix Vegetable Jalfezzi", "description": "- Mixed Vegetables Stir-Fried With Bell Peppers And Spices" },
          { "name": "Goan Vegetables", "description": "- Mixed Vegetables Cooked In A Goan-Style Mildly Spiced Coconut Gravy" },
          { "name": "Mix Vegetable Makhani", "description": "- Mixed Vegetables In A Creamy Tomato And Butter Gravy" },
          { "name": "Palak Cholley", "description": "- Chickpeas Cooked With Fresh Spinach And Aromatic Spices" },
          { "name": "Aloo Chana", "description": "- Potatoes And Chickpeas Cooked Together In A Spiced Gravy" },
          { "name": "Vegetable Korma", "description": "- Mixed Vegetables In A Rich, Creamy Cashew-Based Gravy" },
          { "name": "Mushroom Mattar Masala", "description": "- Mushrooms And Peas Cooked In A Spiced Tomato Gravy" },
          { "name": "Mushroom Mattar Malai", "description": "- Mushrooms And Peas In A Creamy, Mildly Spiced Gravy" },
          { "name": "Palak Bhutta", "description": "- Corn Cooked With Fresh Spinach And Spices" },
          { "name": "Sarson Ka Saag", "description": "- Mustard Greens Slow-Cooked With Spices For A Traditional Punjabi Flavor" },
          { "name": "Subz Miloni", "description": "- Mixed Vegetables Cooked Together In Aromatic Spices" },
          { "name": "Kadai Zucchini", "description": "- Zucchini Sautéed In A Flavorful Kadai-Style Masala" },
          { "name": "Vegetable Kholapuri", "description": "- Mixed Vegetables Cooked In A Bold, Spicy Kolhapuri-Style Gravy" },
          { "name": "Bhindi Bukhara- On Tawa", "description": "- Okra Cooked On A Tawa With Spices" },
          { "name": "Karela Kachri- On Tawa", "description": "- Bitter Gourd Cooked On A Tawa With Spices" },
          { "name": "Masala Aloo- On Tawa", "description": "- Spiced Potatoes Sautéed On A Tawa" },
          { "name": "Lotus Masala- On Tawa", "description": "- Lotus Stem Cooked On A Tawa In A Flavorful Masala" },
          { "name": "Makai Khumb Masala", "description": "- Baby Corn And Mushrooms Cooked In Creamy Sauce" },
          { "name": "Khumb Do Piaza", "description": "- Button Mushrooms, Fresh Herbs And Spices" },
          { "name": "Lobhiah Mushroom", "description": "- Black-Eyed Beans Cooked With Mushrooms" }
        ]
      },
      {
        "name": "Chicken Entrées",
        "items": [
          { "name": "Chicken Makhani (Butter Chicken)", "description": "- Tender Chicken Cooked In A Creamy Tomato-Butter Gravy" },
          { "name": "Live Chciken Makhani Station* (Extra Charge)", "description": "- Tender Chicken Cooked In A Creamy Tomato-Butter Gravy" },
          { "name": "Chicken Tikka Masala", "description": "- Grilled Chicken Pieces In A Spiced, Creamy Tomato Sauce" },
          { "name": "Chicken Curry", "description": "- Classic Chicken Cooked In A Flavorful Onion-Tomato Gravy With Spices" },
          { "name": "Kadai Chicken", "description": "- Chicken Sautéed With Bell Peppers And Onions In A Bold, Spiced Gravy" },
          { "name": "Chicken Methi", "description": "- Chicken Cooked With Fresh Fenugreek Leaves And Aromatic Spices" },
          { "name": "Chicken Saagwala", "description": "- Chicken Simmered With Fresh Spinach In A Mildly Spiced Gravy" },
          { "name": "Chicken Keema Mattar", "description": "- Minced Chicken Cooked With Green Peas And Aromatic Spices" },
          { "name": "Chicken Jalfrezzi", "description": "- Stir-Fried Chicken With Bell Peppers, Onions, And Spices" },
          { "name": "Shahi Murgh Korma", "description": "- Chicken In A Rich, Creamy, Mildly Spiced Cashew-Based Gravy" },
          { "name": "Chicken Vindaloo", "description": "- Chicken Cooked In A Spicy, Tangy Goan-Style Sauce" },
          { "name": "Habanero Chicken Curry (Spicy)", "description": "- Chicken Cooked In A Fiery Habanero-Spiced Gravy" },
          { "name": "Mango Habanero Chicken Curry (Spicy)", "description": "- Chicken In A Sweet And Spicy Mango-Habanero Sauce" },
          { "name": "Chicken Do Pyazza", "description": "- Chicken Cooked With Double THE Onions And Aromatic Spices" },
          { "name": "Chicken Kali Mirch", "description": "- Chicken In A Creamy Black Pepper Sauce With A Hint Of Garlic" },
          { "name": "Chicken Lajawab", "description": "- Tender Chicken Cooked In A Flavorful, Aromatic Gravy" },
          { "name": "Bhuna Chicken Masala", "description": "- Chicken Sautéed And Slow-Cooked In A Rich, Spiced Gravy" },
          { "name": "Badam Murgh Pasanda", "description": "- Chicken In A Creamy Almond-Based Mildly Spiced Gravy" },
          { "name": "Chicken Methi Malai", "description": "- Chicken Cooked With Fenugreek Leaves In A Creamy Sauce" },
          { "name": "Chicken Hyderbadi", "description": "- Chicken Cooked In A Rich, Aromatic Hyderabadi-Style Masala" },
          { "name": "Murgh Makhmal-E-Zafrani", "description": "- Boneless Chicken Breasts Marinated In Saffron And Yogurt" },
          { "name": "Murgh Makhmali Kofta (Extra Charge)", "description": "- Minced Chicken Roundels Served In Saffron Gravy" },
          { "name": "Pandara Road Wala Butter Chicken (On THE Bone) Extra Charge", "description": "- Chicken On THE Bone Cooked In A Spicy & Creamy Tomato Gravy. THE Way It Is Prepared In Delhi, India" },
          { "name": "Dhaba Style Chicken Curry (On THE Bone) Extra Charge", "description": "- Traditional Roadside-Style Chicken Curry On THE Bone" }
        ]
      },
      {
        "name": "Lamb & Goat Entrées",
        "items": [
          { "name": "Lamb Rogan Josh", "description": "- Tender Lamb Cooked In A Rich, Aromatic Kashmiri-Style Gravy" },
          { "name": "Lamb Curry", "description": "- Classic Lamb Cooked In A Flavorful Onion-Tomato Spiced Gravy" },
          { "name": "Lamb Saag", "description": "- Lamb Simmered With Fresh Spinach And Mild Spices" },
          { "name": "Kadai Lamb", "description": "- Lamb Sautéed With Bell Peppers And Onions In A Bold, Spiced Gravy" },
          { "name": "Lamb Tikka Masala", "description": "- Grilled Lamb Pieces In A Creamy, Spiced Tomato Sauce" },
          { "name": "Methi Lamb", "description": "- Lamb Cooked With Fresh Fenugreek Leaves And Aromatic Spices" },
          { "name": "Lamb Keema Mattar", "description": "- Minced Lamb Cooked With Green Peas And Spices" },
          { "name": "Lamb Korma", "description": "- Lamb In A Rich, Creamy, Mildly Spiced Cashew-Based Gravy" },
          { "name": "Lamb Vindaloo", "description": "- Lamb Cooked In A Spicy, Tangy Goan-Style Sauce" },
          { "name": "Ghost Chili Lamb (Spicy)", "description": "- Lamb Cooked With Fiery Ghost Chili For Bold Heat" },
          { "name": "Bhuna Lamb", "description": "- Lamb Sautéed And Slow Cooked In A Rich, Spiced Gravy" },
          { "name": "Lamb Badami", "description": "- Lamb In A Creamy Almond-Based Mild Gravy" },
          { "name": "Rara Bhuna Goat", "description": "- Goat Meat Slow-Cooked In A Thick, Flavorful Masala" },
          { "name": "Goat Curry", "description": "- Classic Goat Curry In An Aromatic Spiced Gravy" },
          { "name": "Achari Goat", "description": "- Goat Cooked In A Tangy, Pickling-Style Masala" },
          { "name": "Baby Goat Masala (Extra Charge)", "description": "- Tender Baby Goat Cooked In A Flavorful Spiced Gravy" },
          { "name": "Goat Saag", "description": "- Goat Meat Simmered With Fresh Spinach And Mild Spices" },
          { "name": "Dal Meat", "description": "- Lentils Cooked With Meat In A Rich, Spiced Gravy" },
          { "name": "Dum Ka Goat (Extra Charge)", "description": "- Slow-Cooked Baby Goat In Aromatic Spices For A Tender, Flavorful Dish" },
          { "name": "Gosht Nargisi Kofta (Extra Charge)", "description": "- Hard Boiled Eggs Coated With Lamb In Thick Gravy" },
          { "name": "Gosht Dalcha", "description": "- Select Cuts Of Lamb Cooked With Lentils, Herbs And Spices" },
          { "name": "Gosht Do Piaza", "description": "- Pearl Onions Served With Boneless Lamb Cubes" }
        ]
      },
      {
        "name": "Fish Entrées",
        "items": [
          { "name": "Tamatar Ki Machli", "description": "- Fish Cooked In A Tangy Tomato-Based Gravy" },
          { "name": "Methi Machli", "description": "- Fish Simmered With Fresh Fenugreek Leaves And Spices" },
          { "name": "Goan Fish Curry", "description": "- Fish Cooked In A Tangy, Mildly Spiced Coconut-Based Goan Gravy" },
          { "name": "Bengali Rui Maach", "description": "- Rohu Fish Cooked In Traditional Bengali Spices And Mustard Sauce" },
          { "name": "Red Chili Fish", "description": "- Fish Cooked In A Spicy Red Chili Masala" },
          { "name": "Malabar Meen Curry (Extra Charge)", "description": "- Fish Steaks Marinated In Red Chili Paste, Turmeric, Lemon Juice And Pan Fried" },
          { "name": "Fish Moilee (Extra Charge)", "description": "- Halibut Cooked In A Coconut Sauce" }
        ]
      },
      {
        "name": "Shrimp Entrées",
        "items": [
          { "name": "Goan Shrimp Curry", "description": "- Shrimp Cooked In A Tangy, Mildly Spiced Coconut-Based Goan Gravy" },
          { "name": "Shrimp Tikka Masala", "description": "- Grilled Shrimp In A Creamy, Spiced Tomato Sauce" },
          { "name": "Garlic Shrimp Bhua", "description": "- Shrimp Sautéed With Garlic And Aromatic Spices" },
          { "name": "Shrimp Nilgiri", "description": "- Shrimp Cooked In A Creamy, Herb-Infused South Indian-Style Gravy" }
        ]
      },
      {
        "name": "Biryani Selection",
        "items": [
          { "name": "Vegetable Biryani", "description": "- Fragrant Basmati Rice Layered With Mixed Vegetables And Aromatic Spices" },
          { "name": "Khatal Biryani", "description": "- Traditional Biryani With A Rich Blend Of Spices And Long-Grain Rice" },
          { "name": "Egg Biryani", "description": "- Basmati Rice Cooked With Boiled Eggs And Aromatic Spices" },
          { "name": "Dum Pukht Chicken Biryani", "description": "- Slow-Cooked Chicken With Basmati Rice And Aromatic Spices" },
          { "name": "Dum Pukht Goat Biryani", "description": "- Tender Goat Slow-Cooked With Basmati Rice And Spices" },
          { "name": "Dum Pukht Lamb Biryani", "description": "- Lamb Slow-Cooked With Basmati Rice In Rich, Aromatic Spices" },
          { "name": "Handi Shrimp Biryani", "description": "- Shrimp Cooked With Basmati Rice And Bold, Spiced Flavors" }
        ]
      },
      {
        "name": "Rice Selection",
        "items": [
          { "name": "Basmati Jeera Rice", "description": "- Fragrant Basmati Rice Tempered With Cumin Seeds" },
          { "name": "Peas Pulao", "description": "- Basmati Rice Cooked With Green Peas And Mild Spices" },
          { "name": "Saffron Jeera Rice Pulao", "description": "- Basmati Rice With Cumin Seeds And A Hint Of Saffron" },
          { "name": "Kashmiri Pulao", "description": "- Aromatic Rice Cooked With Dry Fruits, Saffron, And Mild Spices" },
          { "name": "Lemon Rice", "description": "- Fragrant Rice Flavored With Fresh Lemon Juice And Mild Spices" },
          { "name": "Vegetable Pulao", "description": "- Basmati Rice Cooked With Mixed Vegetables And Aromatic Spices" },
          { "name": "Patiala Pulao", "description": "- Rice With Black Chickpeas, Green Peas And Cubes Of Cottage Cheese" },
          { "name": "Chamman Pulao", "description": "- Rice With Cubes Of Cottage Cheese Topped With Onions" }
        ]
      },
      {
        "name": "Bread Selection",
        "items": [
          { "name": "Tandoori Roti", "description": "- Unleavened Whole Wheat Bread" },
          { "name": "Butter Naan", "description": "- A DISH Made Of White Flour Topped With Fresh Minced Garlic" },
          { "name": "Plain Naan", "description": "- A Crispy White Flour Bread" },
          { "name": "Chili Garlic Naan", "description": "- A White Flour Bread Topped With Chilies And Fresh Coriander" },
          { "name": "Garlic Naan", "description": "- Bread Made Of White Flour Topped With Fresh Minced Garlic" },
          { "name": "Onion Kulcha", "description": "- Bread Made With White Flour Stuffed With Fresh Onions" },
          { "name": "Aloo Parantha", "description": "- Whole Wheat Bread With Potato Stuffing" },
          { "name": "Pudina Parantha", "description": "- Minted Whole Wheat Bread" },
          { "name": "Lacha Parantha", "description": "- Multi-Layered Whole Wheat Bread" },
          { "name": "Garlic Rosemary Naan", "description": "- White Flour Bread Garnished With Fresh Rosemary And Garlic" },
          { "name": "Makki Ki Roti", "description": "- Traditional Cornmeal Flatbread, Soft And Flavorful" },
          { "name": "Missi Roti", "description": "- Spiced Gram Flour And Wheat Flatbread" },
          { "name": "Roomali Roti (Extra Charge)", "description": "- Thin, Soft, Hand-Stretched Flatbread" },
          { "name": "Assorted Tandoori Paranthas", "description": "- Variety Of Flaky, Layered Stuffed And Plain Paranthas" }
        ]
      },
      {
        "name": "Raita Selection",
        "items": [
          { "name": "Carrot & Cucumber Raita", "description": "- Yogurt Mixed With Fresh Grated Carrots And Cucumber" },
          { "name": "Boondi Raita", "description": "- Yogurt With Crispy Gram Flour Pearls And Mild Spices" },
          { "name": "Bhindi Raita", "description": "- Yogurt With Cooked Okra And Aromatic Spices" },
          { "name": "Tomato Raita", "description": "- Yogurt With Fresh Tomato And Mild Seasonings" },
          { "name": "Tomato Onion Raita", "description": "- Yogurt Mixed With Fresh Tomatoes And Onions" },
          { "name": "Beetroot Raita", "description": "- Yogurt With Grated Beetroot And Subtle Spices" },
          { "name": "Baingan Raita", "description": "- Yogurt With Roasted And Spiced Eggplant" },
          { "name": "Pineapple Raita", "description": "- Yogurt With Sweet Pineapple And Mild Spices" },
          { "name": "Spinach Raita", "description": "- Yogurt Mixed With Fresh Spinach And Seasonings" },
          { "name": "Dahi Bhalla - Live", "description": "- Soft Lentil Dumplings Soaked In Yogurt And Spices" },
          { "name": "Dahi Pakori", "description": "- Gram Flour Fritters Served In Spiced Yogurt" }
        ]
      }
    ]
  },
  {
    "name": "Gujarati Menu",
    "description": "",
    "categories": [
      {
        "name": "Farsans Or Snacks",
        "items": [
          { "name": "Samosa", "description": "- Crispy Pastry Stuffed With Spiced Potatoes And Peas" },
          { "name": "Khasta Kachori", "description": "- Seasoned Lentil Filled Puffs" },
          { "name": "Mathi", "description": "- Golden Fried Whole Flour Crisp Crackers Flavored With Crushed Pepper" },
          { "name": "Chola Fali", "description": "- Spicy Mixed Flour Fingers" },
          { "name": "Gathiya", "description": "- A Deep-Fried Indian Snack Made From Wheat Flour" },
          { "name": "Khaman Dhokla", "description": "- Spongy And Savory Lentil Flour Cake" },
          { "name": "Tri-Color Dhokla", "description": "- Spongy And Savory Cake Layered With Mint Sauce And Tomato Ketchup" },
          { "name": "White Dhokla", "description": "- White Savory Lentil Flour Cake" },
          { "name": "White Sandwich Dhokla", "description": "- Combination Of Dhokla Stuffed With Chutneys In THE Centre" },
          { "name": "Patra", "description": "- Colocasia Leaves Dipped In A Seasoned Batter Steamed Or Fried Golden" },
          { "name": "Khandvi (Extra Charge)", "description": "- Thin Gram Flour Pancakes Topped With Tempered Mustard Seeds And Grated Coconut" },
          { "name": "Vegetable Cutlets", "description": "- Crisp Patties Made With Mixed Vegetables, Herbs, And Spices" },
          { "name": "Vatana Pattis", "description": "- Mashed Potato Patties Stuffed With Spiced Green Peas" },
          { "name": "Coconut Pattis", "description": "- Golden-Fried Patties Filled With A Coconut And Spice Mixture" },
          { "name": "Dahi-Vada", "description": "- Soft Lentil Dumplings Soaked In Yogurt And Topped With Sweet And Spicy Chutneys" },
          { "name": "Amiri Khaman", "description": "- Crumbled Dhokla Tossed With Mustard Seeds, Green Chilies, And Fresh Coconut" },
          { "name": "Moong Dal Kachori", "description": "- Flaky Pastry Filled With Seasoned Moong Dal Mixture And Fried Golden Brown" },
          { "name": "Lilva Kachori", "description": "- Seasoned Sweet Peas Filled Puffs" },
          { "name": "Corn Kachori", "description": "- Seasoned Corn Filled Puffs" },
          { "name": "Methi Gota", "description": "- Fried Fenugreek-Flavored Gram Flour Fritters Served With Chutney" },
          { "name": "Sev Khamani", "description": "- Savory Spongy Cakes Prepared With A Blend Of Gram And Semolina Flour, Garnished With Sautéed Mustard Seeds And Chilies" },
          { "name": "Mix Pakora", "description": "- Assorted Vegetable Fritters Dipped In Spiced Gram Flour Batter And Fried Crisp" },
          { "name": "Bataka-Vada", "description": "- Spiced Mashed Potato Balls Coated In Gram Flour Batter And Deep-Fried" }
        ]
      },
      {
        "name": "Special Items",
        "items": [
          { "name": "Corn Chevdo", "description": "- Crunchy Snack Mix Of Corn Flakes, Peanuts, And Spices" },
          { "name": "Dudhi Na Muthiya", "description": "- Steamed Or Fried Dumplings Made With Bottle Gourd And Spiced Gram Flour" },
          { "name": "Papdi No Lot", "description": "- Rice Flour Cooked With Cumin And Carom Seeds, Served With Oil" },
          { "name": "Batata Poha", "description": "- Stir Fried Rice Flakes With Diced Potatoes, Finely Chopped Onions, Tomatoes And Green Chilies" },
          { "name": "Corn Poha", "description": "- Soft Rice Flakes Tossed With Corn, Onions, And Green Chilies" },
          { "name": "Sabudana Kichdi", "description": "- Tapioca Pearls Sautéed With Potatoes, Peanuts, And Mild Spices" },
          { "name": "Sabudana Vada", "description": "- Fried Potato, Green Chilies And Tapioca Blended With Peanuts" },
          { "name": "Dudhi Handvo", "description": "- Savory Lentil And Bottle Gourd Cake Baked With Spices And Sesame Seeds" },
          { "name": "Upma", "description": "- Semolina Cooked With Vegetables, Mustard Seeds, And Curry Leaves" }
        ]
      },
      {
        "name": "Vegetarian Entrées",
        "items": [
          { "name": "Vegetable Jaipuri", "description": "- A Colorful Mix Of Seasonal Vegetables Cooked In A Mildly Spiced Curry" },
          { "name": "Surti Undhiya", "description": "- A Mélange Of Potatoes, Eggplant, Yam, Snow Peas And Fenugreek Dumplings Cooked In Indian Spices" },
          { "name": "Baingan Bharela", "description": "- Baby Eggplants Stuffed With A Spiced Masala Blend And Slow-Cooked To Perfection" },
          { "name": "Baingan Bharta", "description": "- Roasted Eggplant Mashed And Sautéed With Onions, Tomatoes, And Spices" },
          { "name": "Bhindi Masala (Extra Charge)", "description": "- Okra Sautéed With Onions, Tomatoes, And Traditional Indian Spices" },
          { "name": "Turiya Patra", "description": "- A Combination Of Ridge Gourd And Colocassia Leaves, Herbs And Spices" },
          { "name": "Tindora (Extra Charge)", "description": "- Crisp Ivy Gourd Stir-Fried With Mustard Seeds And Mild Spices" },
          { "name": "Tindora-Bataka (Extra Charge)", "description": "- Ivy Gourd And Potatoes Tossed With Indian Spices And Herbs" },
          { "name": "Bataka Bhaji", "description": "- Spiced And Sautéed Potatoes With Mustard Seeds And Curry Leaves" },
          { "name": "Baingan -Tuver", "description": "- Eggplant Cooked With Pigeon Peas In A Flavorful, Homestyle Gravy" },
          { "name": "Flower-Vatana", "description": "- Cauliflower And Green Peas Cooked In A Mild Spiced Masala" },
          { "name": "Flower-Bataka", "description": "- Cauliflower And Potatoes Simmered With Aromatic Indian Spices" },
          { "name": "Baingan -Bataka", "description": "- Eggplant And Potatoes Cooked Together With A Touch Of Tangy Spices" },
          { "name": "Vatana Muthiya Nu Shaak", "description": "- Green Peas With Fenugreek Flavor Dumplings" },
          { "name": "Parval Nu Saag", "description": "- Pointed Gourd Cooked With Fresh Herbs And Spices" },
          { "name": "Fansi Dhokli", "description": "- French Beans With Flour Dumplings Cooked With Spices" },
          { "name": "Mix Kathol", "description": "- A Blend Of Lentils Cooked To Perfection On Slow Fire" },
          { "name": "Panchkutiu Saag", "description": "- Five Vegetables In Coriander Coconut Curry" },
          { "name": "Sev Tamata Nu Shaak", "description": "- Tomato And Onion Based Curry Topped With Thin Crispy Gram Flour" },
          { "name": "Tuvar Ringan", "description": "- Diced Eggplant And Pigeon Peas Cooked With Indian Spices" },
          { "name": "Gujarati Bhinda With Potatoes", "description": "- Round Cut Okra And Potatoes Blended With Herbs And Spices" },
          { "name": "Raswala Batata", "description": "- Potatoes And Spicy Gravy" },
          { "name": "Valor Papdi Nu Shaak", "description": "- Flat Beans Cooked With Spices" },
          { "name": "Makai Capsicum", "description": "- Tender Corn And Capsicum Cooked In Milk Tempered With Indian Spices" },
          { "name": "Valor Muthiya Nu Shaak", "description": "- Broad Beans & Fenugreek Dumplings Curry" },
          { "name": "Methi-Corn", "description": "- Fresh Fenugreek Leaves Cooked With Sweet Corn In A Mildly Spiced Curry" },
          { "name": "Desi Chana (Black)", "description": "- Black Chickpeas Cooked In Traditional Gujarati Spices" },
          { "name": "Desi Val", "description": "- Field Beans Cooked With Fresh Herbs And A Touch Of Garlic" },
          { "name": "Desi Chora", "description": "- Black-Eyed Peas Simmered In A Savory Masala" },
          { "name": "Panch Kathor", "description": "- A Wholesome Mix Of Five Lentils And Beans Slow-Cooked With Spices" }
        ]
      },
      {
        "name": "Dal / Kadhi",
        "items": [
          { "name": "Tuver Dal", "description": "- Pigeon Pea Lentils Cooked With Traditional Gujarati Spices" },
          { "name": "Gujarati Kadhi", "description": "- A Thin Spicy Yogurt And Gram Flour Curry" },
          { "name": "Pakora Kadhi", "description": "- Spiced Yogurt Curry With Gram Flour Fritters Simmered For A Rich Flavor" },
          { "name": "Lachko Dal", "description": "- Thick Split Yellow Gram Curry" },
          { "name": "Palak Moong Dal", "description": "- A Blend Of Spinach Leaves And Green Lentils Flavored With A Blend Of Herbs And Spices" },
          { "name": "Magni Dal Chooti", "description": "- A Dry Preparation Of Yellow Gram Dal Tempered With Spices" },
          { "name": "Fajeto Dal", "description": "- A Delicious Sauce Like Curry Mango Pulp Combined With Curds And Tempered With Spices" }
        ]
      },
      {
        "name": "Rice / Raita Salad / Papad / Chutney",
        "items": [
          { "name": "Plain Rice", "description": "- Steamed Basmati Rice" },
          { "name": "Jeera Rice", "description": "- Basmati Rice Tempered With Cumin Seeds" },
          { "name": "Pulao Rice", "description": "- Fragrant Basmati Rice Cooked With Mild Spices And Herbs" },
          { "name": "Puri Or Parantha", "description": "- Fried Or Griddled Indian Breads Served Hot" }
        ]
      },
      {
        "name": "Sweets",
        "items": [
          { "name": "Handvo", "description": "- Savory Baked Cake Made From Lentils, Rice, And Vegetables" },
          { "name": "Fruit Shrikhand (Extra Charge)", "description": "- Strained Yogurt Dessert Flavored With Fresh Seasonal Fruits" },
          { "name": "Shrikand Rajwadi (Extra Charge)", "description": "- Rich, Traditional Yogurt Dessert Garnished With Pins And Cardamom" },
          { "name": "Rabadi (Extra Charge)", "description": "- Thickened Sweetened Milk Flavored With Saffron And Cardamom" },
          { "name": "Dudh Pak (Extra Charge)", "description": "- Slow-Cooked Milk Dessert With Rice, Pins, And Spices" },
          { "name": "Basundi (Extra Charge)", "description": "- Creamy Milk Dessert Simmered With Sugar And Flavored With Cardamom" },
          { "name": "Angur-Rabdi (Extra Charge)", "description": "- Rabdi Dessert Served With Sweetened Grapes" },
          { "name": "Kala-Jamun", "description": "- Soft, Deep-Fried Milk Dumplings Soaked In Sugar Syrup" },
          { "name": "White-Sandwich", "description": "- Soft, Layered Milk-Based Sweet With Subtle Flavoring" },
          { "name": "Rasgulla", "description": "- Spongy, Syrup-Soaked Cottage Cheese Balls" },
          { "name": "Mavajam", "description": "- Milk Solids And Sugar Confection, Rich And Flavorful" },
          { "name": "Sweet Cutlets", "description": "- Fried Sweet Patties Made From Milk Solids And Sugar" },
          { "name": "Rasmadhuri", "description": "- Traditional Milk-Based Sweet Dessert With A Rich Aroma" },
          { "name": "Chandrakala", "description": "- Pastry Filled With Sweetened Khoya And Dry Fruits" },
          { "name": "Gajjar Halwa", "description": "- Carrot-Based Pudding Cooked With Milk, Sugar, And Ghee" },
          { "name": "Madhumalti", "description": "- Soft, Sweet Dessert Flavored With Milk And Aromatic Spices" },
          { "name": "Moong-Dal Shira (Halwa)", "description": "- Sweet Semolina Or Lentil-Based Pudding With Ghee And Cardamom" },
          { "name": "Puran Poori (Extra Charge)", "description": "- Fried Sweet Flatbread Stuffed With Spiced Lentil Filling" },
          { "name": "Churma Ladoo", "description": "- Crumbled Wheat Flour Balls Mixed With Ghee And Sugar" },
          { "name": "Halvasan", "description": "- Traditional Indian Sweet Made With Flour, Ghee, And Sugar" },
          { "name": "Pista Burfi (Extra Charge)", "description": "- Rich Pistachio-Flavored Milk-Based Sweet" },
          { "name": "Tri-Color Burfi", "description": "- Layered Milk-Based Sweet In Three Vibrant Colors" },
          { "name": "Mohanthal", "description": "- Fudge-Like Sweet Made With Gram Flour, Ghee, And Pins" },
          { "name": "Badam-Puri", "description": "- Crunchy Almond-Coated Sweet Treats" },
          { "name": "Dilruba", "description": "- Soft Milk-Based Sweet Garnished With Dry Fruits" },
          { "name": "Ghari/Ghughra (Extra Charge)", "description": "- Sweet Stuffed Pastry, Deep-Fried And Flavored With Cardamom" },
          { "name": "Dry Fruit Halwa (Extra Charge)", "description": "- Rich Pudding Made With Assorted Dry Fruits And Milk" }
        ]
      }
    ]
  },
  {
    "name": "South Indian Menu",
    "description": "",
    "categories": [
      {
        "name": "Appetizers - Veg",
        "items": [
          { "name": "Medu Vada", "description": "- Crispy Lentil Fritters Served With Chutney And Sambhar" },
          { "name": "Keerai Vada", "description": "- Spinach Vada - Crispy Fried Savory Donuts Flavored With Spinach" },
          { "name": "Mini Uttapham", "description": "- Bite-Sized Savory Pancakes Topped With Vegetables" },
          { "name": "Silver Dollar Idli", "description": "- Soft Steamed Rice Cakes In Mini Form" },
          { "name": "Achari Idli", "description": "- Pickle Filled Cocktail Idlis Tossed With Gun Powder And Ghee" },
          { "name": "Podi Idli", "description": "- Bite Size Steamed Rice Puffs With A Special Blend Of Spices" },
          { "name": "Vegetable Idli", "description": "- Steamed Rice And Lentil Flour Cakes Stuffed With Vegetables" },
          { "name": "Aloo Boonda", "description": "- Spiced Mashed Potato Fritters Dipped In Gram Flour Batter" },
          { "name": "Mini Masala Dosa", "description": "- Crisp Mini Dosas Filled With Spiced Potato" },
          { "name": "Mini Plain Dosa", "description": "- Traditional Plain Dosa Served With Chutney And Sambhar" },
          { "name": "Sambhar", "description": "- Lentil And Vegetable Stew With South Indian Spices" },
          { "name": "Peanut Chutney", "description": "- Freshly ground peanuts blended with coconut, green chilies, and aromatic herbs" },
          { "name": "Coconut Chutney", "description": "- Fresh Coconut Blended With Green Chili And Herbs" },
          { "name": "Spicy Chutney", "description": "- Tangy And Fiery Chutney With South Indian Flavors" },
          { "name": "Gunpowder Masala", "description": "- Spiced Lentil Powder Mixed With Ghee For Flavor" },
          { "name": "Baby Corn Pepper Fry", "description": "- Crispy Fried Baby Corn Flavored With Black Pepper" },
          { "name": "Chennai Cutlet", "description": "- Mixed Mashed Vegetables Spiced With Ginger Garlic And Coriander Coated With Poached Rice" },
          { "name": "Chili Fritters", "description": "- Batter Fried Stuffed Chilies" },
          { "name": "Venkaya Pakoda – Eggplant Fritters", "description": "- Eggplant Fritter Coated With Gram Flour Deep Fried" },
          { "name": "Masala Paniyaram – Masala Dumpling", "description": "- Rice And Lentil Dumplings Tempered With Spices And Shallow Fried" },
          { "name": "Vengaya Pakoda – Onion Fritters", "description": "- Red Onion Fritter Coated With Gram Flour Deep Fried" },
          { "name": "Vazhakai Bajji – Plantain Fritters", "description": "- Thinly Sliced Raw Banana Fritters Deep Fried" },
          { "name": "Paneer 65", "description": "- Spiced, Fried Cottage Cheese Tossed With Curry Leaves And Chili" }
        ]
      },
      {
        "name": "Non-Vegetarian Appetizers",
        "items": [
          { "name": "Chicken 65", "description": "- South Indian-Style EXTRA CHARGE" },
          { "name": "Kozhi Varuval-Fried Chicken", "description": "- Spicy South Indian Fried Chicken" },
          { "name": "Chicken Pepper Fry", "description": "- Chicken Sautéed With Black Pepper And Aromatic Spices" },
          { "name": "Amravati Kodi", "description": "- Spicy Fried Marinated Chicken" },
          { "name": "Kai Pidi Chops – Tamil (Extra Charge)", "description": "- Lamb Chops Marinated In A Blend Of Ethnic Chettinad Masala, Dipped In Egg Batter And Grilled To Perfection" },
          { "name": "Travancore Mutton Roast – Kerala Style Lamb Roast (Extra Charge)", "description": "- Lamb Cubes Cooked With Onion And Tomato Flavored With A Fresh Blend Of Kerala Spices" },
          { "name": "Erachi Cutlet- Lamb Patties (Extra Charge)", "description": "- Lamb Patties Seasoned With Herbs And Spices" },
          { "name": "Lamb Coconut Chili Fry (Extra Charge)", "description": "- Tender Lamb Cooked With Coconut And Red Chili" },
          { "name": "Kovalam Tawa Meen – Kerala Style Tawa Fish (Extra Charge)", "description": "- Marinated Fish Fillets Flavored With A Select Blend Of Spices Served From A Skillet" },
          { "name": "Fish Moilee (Extra Charge)", "description": "- Fish Simmered In Mild Coconut Curry" },
          { "name": "Chemeen Moilee (Extra Charge)", "description": "- Shrimp Simmered In Coconut Milk And Blended With South Indian Spices" },
          { "name": "Yera Thokku– Tamil (Extra Charge)", "description": "- Shrimps Cooked In Spiced Onion And Tomato Masala" },
          { "name": "Eral Varuval (Extra Charge)", "description": "- Crispy Fried Shrimps With Sesame, Ginger, Cracked Chili And Fennel Seeds" },
          { "name": "Shrimp 65 (Extra Charge)", "description": "- Spicy, Crispy Shrimp Tossed With Curry Leaves And Peppers" }
        ]
      },
      {
        "name": "Vegetarian Entrées",
        "items": [
          { "name": "Pookose Pattani Korma – Gobhi Matar", "description": "- Cauliflower And Green Peas Cooked In A Home Style" },
          { "name": "Kadala Curry-Tamil", "description": "- Whole Bengal Gram Flour Cooked With Coconut Milk In A Hearty Coriander Masala" },
          { "name": "Guthi Vonkaya Koora – Andhra", "description": "- Baby Eggplant Cooked In Tangy Gravy With Sesame Seeds" },
          { "name": "Paalkatti Pattani Thokku – Tamil", "description": "- Cottage Cheese And Green Peas Cooked In A Spiced Onion And Tomato Masala" },
          { "name": "Kara Kuzhambu – Spicy Curry Tamil", "description": "- Onion, Green Chili, Tamarind, Toor Dal, Curry Leaves, Chili And Tomato" },
          { "name": "Malabar Avial", "description": "- Assorted Vegetables Simmered In Coconut And Yogurt Sauce Flavored With Cumin" },
          { "name": "Vendakai Kuzhambu – Tamil", "description": "- Okra Cooked With Spicy Tamarind Gravy" },
          { "name": "South Indian Korma", "description": "- Medley Of Vegetable Cooked In Spices" },
          { "name": "Keera Thoran – Kerala", "description": "- Spinach And Potato Cooked In South Indian Spices" },
          { "name": "Sukka Vendakai – Tamil", "description": "- Tender Okra Fried Crispy And Tossed With Dry Blend Of Spices" }
        ]
      },
      {
        "name": "Non-Vegetarian Entrées",
        "items": [
          { "name": "Naadan Kozhi Curry – Kerala", "description": "- Country Style Chicken Curry With Coriander Powder, Chili Powder And Coconut Milk" },
          { "name": "Chicken Chettinad", "description": "- Chicken Cooked With Poppy, Cumin, Coriander, Aniseed, Fennel Seed, Dry Red Chili, Cinnamon, Grated Coconut, Ginger, Garlic And Curry Leaves" },
          { "name": "Mysore Kolli (Mysore Chili Chicken)", "description": "- Boneless Chicken Simmered In Red Onion, Coconut, Green Chili And Coriander Masala" },
          { "name": "Gongura Mamsam (Extra Charge)", "description": "- A Wholesome Curry Of Lamb Chunks And Rosalie Leaves" },
          { "name": "Kola Urundai Kuzhambu – Tamil", "description": "- Minced meat spiced meatballs simmered in a traditional Tamil-style tamarind curry" },
          { "name": "Nellore Chapala Pulusu – Andhra (Extra Charge)", "description": "- A Spicy Fish Curry From Nellore Region In Andhra" },
          { "name": "Chemmeen Curry – Kerala (Extra Charge)", "description": "- Shrimp Cooked With Raw Mango, Red Chilies And Coconut Milk" }
        ]
      }
    ]
  },
  {
    "name": "World Inter-Mix Menu",
    "description": "",
    "categories": [
      {
        "name": "Middle Eastern",
        "items": [
          { "name": "Toasted Pita Pocket Bread - Live", "description": "- Warm Pita Bread, Lightly Toasted" },
          { "name": "Falafel - Live", "description": "- Crispy Chickpea Patties Seasoned With Herbs And Spices" },
          { "name": "Sliced Lettuce", "description": "- Fresh, Crisp Lettuce For Wraps Or Salads" },
          { "name": "Tabouleh", "description": "- Bulgur Salad With Parsley, Tomatoes, Mint, And Lemon Dressing" },
          { "name": "Babaganoush", "description": "- Roasted Eggplant Dip With Tahini And Olive Oil" },
          { "name": "Hummus", "description": "- Creamy Chickpea Dip With Tahini, Garlic, And Lemon" },
          { "name": "Spinach Dip", "description": "- Creamy Dip Made With Spinach And Herbs" },
          { "name": "Tomato Salad", "description": "- Fresh Tomatoes Tossed With Herbs And Olive Oil" },
          { "name": "Pickled Vegetables", "description": "- Assorted Tangy, Spiced Pickled Vegetables" },
          { "name": "Assorted Olives", "description": "- A Mix Of Marinated Mediterranean Olives" },
          { "name": "Tahini", "description": "- Smooth Sesame Seed Paste Sauce" },
          { "name": "Tzatziki", "description": "- Yogurt And Cucumber Dip With Garlic And Herbs" },
          { "name": "Grape Leaves", "description": "- Stuffed Grape Leaves With Rice And Herbs" },
          { "name": "Pasta Salads", "description": "- Assorted Pasta Salads Tossed With Vegetables And Dressing" },
          { "name": "Corn Salad", "description": "- Sweet Corn Mixed With Vegetables And Herbs" },
          { "name": "Feta Cheese", "description": "- Crumbled Mediterranean Feta Cheese" },
          { "name": "Chickpeas Salad", "description": "- Chickpeas Tossed With Herbs, Lemon, And Olive Oil" },
          { "name": "Couscous Salad", "description": "- Light Couscous Mixed With Vegetables And Mediterranean Spices" },
          { "name": "Fresh Mozzarella Salad", "description": "- Mozzarella With Tomatoes, Basil, And Olive Oil" },
          { "name": "Hot Sauce", "description": "- Spicy Sauce For Added Flavor" },
          { "name": "Cheese & Crackers", "description": "- Assorted Cheeses Served With Crisp Crackers" },
          { "name": "Vegetable Crudites With Dips", "description": "- Fresh Cut Vegetables Served With Assorted Dips" },
          { "name": "Saffron Chicken Kabab (Extra Charge)", "description": "- Chicken Kabab Marinated With Saffron And Spices" },
          { "name": "Chicken Kabab (Extra Charge)", "description": "- Grilled Chicken Kabab Marinated With Herbs And Spices" }
        ]
      },
      {
        "name": "NYC Style Platter & Gyro Station",
        "items": [
          { "name": "Chicken Over Rice - Live", "description": "- Grilled Chicken Served Over Fragrant Rice With Signature Sauces" },
          { "name": "Lamb Over Rice - Live", "description": "- Spiced Lamb Served Over Rice With White, Hot, And BBQ Sauces" },
          { "name": "Falafel Over Rice", "description": "- Crispy Falafel Served With Rice And Traditional Sauces" },
          { "name": "White Sauce/ Hot Sauce / BBQ Sauce", "description": "- Signature Condiments To Complement Every Platter" },
          { "name": "Pita Bread", "description": "- Soft, Warm Pita Served Alongside Platters" },
          { "name": "Chicken Gyro - Live", "description": "- Sliced Chicken Wrapped In Pita With Salad And Sauces" },
          { "name": "Lamb Gyro - Live", "description": "- Spiced Lamb Gyro With Lettuce, Tomato, And White Sauce" },
          { "name": "Falafel Gyro - Live", "description": "- Crispy Falafel Wrapped In Pita With Creamy Tahini Sauce" }
        ]
      },
      {
        "name": "Kati Roll – Live Station",
        "items": [
          { "name": "Bhuna Chicken Kati Roll - Live", "description": "- Spiced Chicken Sautéed With Onions And Peppers, Wrapped In Paratha" },
          { "name": "Lamb Kati Roll - Live", "description": "- Tender Lamb Cooked With Indian Spices And Rolled With Chutneys" },
          { "name": "Paneer Tawa Masala Kati Roll - Live", "description": "- Grilled Paneer Tossed With Peppers And Spices In A Soft Roll" },
          { "name": "Aloo Kati Roll - Live", "description": "- Spiced Potato Filling With Tangy Chutneys In A Flaky Wrap" },
          { "name": "Mix Vegetable Kati Roll - Live", "description": "- Seasonal Vegetables Cooked With Aromatic Spices And Rolled Fresh" }
        ]
      },
      {
        "name": "Mexican",
        "items": [
          { "name": "Chicken & Cheese Quesadillas", "description": "- Grilled Tortilla Stuffed With Spiced Chicken And Melted Cheese" },
          { "name": "Vegetable & Cheese Quesadillas", "description": "- Mixed Vegetables And Cheese In A Toasted Tortilla" },
          { "name": "Mexican Bhel - Live", "description": "- Crunchy Fusion Of Bhel With Mexican Flavors" },
          { "name": "Soft Taco & Hard-Shell Tacos", "description": "- Choice Of Fillings With Fresh Toppings And Sauces" },
          { "name": "Spicy Tortillas Wraps - Live", "description": "- Rolled Tortillas With Zesty Fillings And Salsa" },
          { "name": "Chili Lime Chicken", "description": "- Grilled Chicken Marinated With Chili And Lime" },
          { "name": "Chicken Empanadas", "description": "- Golden Pastry Stuffed With Spiced Chicken" },
          { "name": "Cheese Empanadas", "description": "- Crispy Pastry Filled With Seasoned Cheese" },
          { "name": "Fresh Guacamole", "description": "- Creamy Avocado Dip With Lime And Cilantro" },
          { "name": "Salsa", "description": "- Classic Tomato Salsa With Fresh Herbs" },
          { "name": "Salsa Verde", "description": "- Tangy Green Salsa Made With Tomatillos" },
          { "name": "Chicken Wings Al Pastor", "description": "- Wings Tossed In Smoky Al Pastor Sauce" },
          { "name": "Enchiladas", "description": "- Rolled Tortillas Baked With Sauce And Cheese" },
          { "name": "Ceviche (Extra Charge)", "description": "- Fresh Seafood Marinated In Citrus And Spices" },
          { "name": "Cilantro Lime Chicken Burritos", "description": "- Chicken, Rice, And Beans Wrapped With Fresh Salsa" },
          { "name": "Flautas", "description": "- Crisp Rolled Tortillas Filled With Spiced Meat Or Vegetables" }
        ]
      },
      {
        "name": "Italian Station",
        "items": [
          { "name": "Pasta Station- Choice Of Pastas & Sauces", "description": "- Customize With Sautéed Vegetables Or Grilled Chicken" },
          { "name": "Four Cheese Ravioli", "description": "- Ravioli Stuffed With A Blend Of Four Cheeses" },
          { "name": "Eggplant Rollatini", "description": "- Rolled Eggplant Stuffed With Cheese And Baked In Sauce" },
          { "name": "Baked Ziti", "description": "- Pasta Baked With Tomato Sauce And Cheese" },
          { "name": "Eggplant Parmesan", "description": "- Breaded Eggplant Baked With Marinara And Cheese" },
          { "name": "Vegetable Lasagna", "description": "- Layers Of Pasta With Vegetables, Cheese, And Sauce" },
          { "name": "Cheese Manicotti", "description": "- Pasta Tubes Filled With Ricotta And Baked In Sauce" },
          { "name": "Caponata", "description": "- Sicilian-Style Stewed Eggplant With THE Tomatoes And Capers" },
          { "name": "Focaccia (Extra Charge)", "description": "- Italian Flatbread With Olive Oil And Herbs" },
          { "name": "Fresh Mozzarella & Tomato Salad", "description": "- Classic Caprese With Fresh Basil" },
          { "name": "Margareta Flatbread", "description": "- Flatbread Topped With Tomato, Mozzarella, And Basil" },
          { "name": "Fresh Garlic Bread", "description": "- Toasted Bread With Garlic And Butter" },
          { "name": "Capresse Skewers", "description": "- Mini Mozzarella, Tomato, And Basil Skewers" },
          { "name": "Italian Stuffed Mushrooms", "description": "- Mushrooms Filled With Italian-Style Stuffing" },
          { "name": "Italian Roasted Cauliflower", "description": "- Roasted Cauliflower With Italian Herbs" },
          { "name": "Zucchini Garlic Bites", "description": "- Crispy Zucchini With Garlic And Herbs" },
          { "name": "Spaghetti", "description": "- Classic Spaghetti Pasta With Choice Of Sauce" },
          { "name": "Fettuccine Alfredo", "description": "- Fettuccine Tossed In Creamy Alfredo Sauce" },
          { "name": "Mozzarella Cheese Sticks", "description": "- Breaded And Fried Cheese Sticks" },
          { "name": "Mushroom Risotto Balls With Arabiatta Sauce", "description": "- A Delectable Combination Of Arborio Rice Balls With Mushroom" },
          { "name": "Crispy Asparagus With Asiago", "description": "- Crispy Asparagus With Asiago" },
          { "name": "Spinach & Ricotta Rolls", "description": "- Deep Fried Spinach And Ricotta Croquettes" },
          { "name": "Arancini With Gouda Cheese", "description": "- Fried Rice Balls Coated With Breadcrumbs Filled With Gouda Cheese" },
          { "name": "Naanizza", "description": "- Indian Version Of THE Italian Pizza With Toppings Of Your Choice" },
          { "name": "Chicken Meatballs", "description": "- Tender Chicken Meatballs In Tomato Sauce" },
          { "name": "Chicken Parmesan", "description": "- Breaded Chicken Baked With Marinara And Cheese" },
          { "name": "Chicken Marsala", "description": "- Chicken Sautéed With Marsala Wine And Mushrooms" },
          { "name": "Chicken Francese", "description": "- Chicken Cooked With Lemon And Butter Sauce" }
        ]
      }
    ]
  },
  {
    "name": "Indo-Chinese Menu",
    "description": "",
    "categories": [
      {
        "name": "Vegetarian",
        "items": [
          { "name": "Vegetable Spring Rolls", "description": "- Crispy rolls stuffed with fresh vegetables" },
          { "name": "Vegetable Potstickers", "description": "- Dumpling Sheets Filled With Seasoned Vegetables" },
          { "name": "Chinese Bhel* (Live Station)", "description": "- Tangy and crunchy Indo-Chinese snack" },
          { "name": "Crispy Chili Baby Corn", "description": "- Baby corn tossed in a spicy, crispy chili sauce" },
          { "name": "Vegetable Momos", "description": "- Steamed dumplings filled with seasoned vegetables" },
          { "name": "Vegetable Manchurian (Dry Or Gravy)", "description": "- Veggie balls in a spicy Manchurian sauce" },
          { "name": "Gobi Manchurian (Dry Or Gravy)", "description": "- Cauliflower in a spicy Indo-Chinese sauce" },
          { "name": "Chili Paneer (Dry Or Gravy)", "description": "- Cottage cheese stir-fried in a spicy chili sauce" },
          { "name": "Honey Chili Lotus", "description": "- Lotus stem in a sweet and spicy honey chili glaze" },
          { "name": "Szechuan Paneer", "description": "- Cottage cheese in a spicy Szechuan sauce" },
          { "name": "Black Bean Tofu", "description": "- Tofu cooked in a rich black bean sauce" },
          { "name": "Bao Buns (Tofu/Paneer/Shitake Mushrooms)- Extra Charge", "description": "- Steamed buns with choice of filling" }
        ]
      },
      {
        "name": "Non-Veg",
        "items": [
          { "name": "Chicken Spring Rolls", "description": "- Crispy rolls filled with spiced chicken and vegetables" },
          { "name": "Chili Chicken (Dry Or Gravy)", "description": "- Chicken tossed in a spicy chili sauce" },
          { "name": "Chicken Manchurian (Dry Or Gravy)", "description": "- Chicken balls cooked in a tangy savory sauce" },
          { "name": "Lollipop Chicken", "description": "- Deep-fried chicken drumettes coated in a flavorful glaze" },
          { "name": "Chicken Teriyaki", "description": "- Chicken cooked in a sweet and savory teriyaki sauce" },
          { "name": "Kung Pao Chicken", "description": "- Stir-fried chicken with peanuts and bell peppers" },
          { "name": "General Tso's Chicken", "description": "- Crispy chicken in a sweet, tangy sauce" },
          { "name": "Chicken Satay (Butler Passed Only)", "description": "- Grilled chicken skewers served with peanut sauce" },
          { "name": "Chicken Momos", "description": "- Steamed dumplings filled with seasoned chicken" },
          { "name": "Chili Garlic Lamb (Dry) (Extra Charge)", "description": "- Spicy lamb sautéed with chili and garlic" },
          { "name": "Fish In Schezwan Sauce (Extra Charge)", "description": "- Fish cooked in bold Szechuan-style sauce" },
          { "name": "Dynamite Shrimp (Extra Charge)", "description": "- Shrimp tossed in a creamy, spicy sauce" }
        ]
      },
      {
        "name": "Rice & Noodles",
        "items": [
          { "name": "Hakka Noodles", "description": "- Stir-fried noodles with vegetables" },
          { "name": "Chili Garlic Noodles", "description": "- Noodles tossed in a spicy chili garlic sauce" },
          { "name": "Singapore Noodles", "description": "- Stir-fried noodles with curry-flavored spices" },
          { "name": "Pad Thai", "description": "- Thai-style stir-fried noodles with tamarind and peanuts" },
          { "name": "Fried Rice", "description": "- Classic stir-fried rice with vegetables and soy sauce" },
          { "name": "Chili Garlic Fried Rice", "description": "- Fried rice tossed in a spicy chili garlic sauce" },
          { "name": "Pineapple Fried Rice", "description": "- Fried rice with pineapple and sweet-savory balance" },
          { "name": "Triple Schezwan Fried Rice", "description": "- Fried rice tossed in a bold, spicy Szechuan sauce" }
        ]
      }
    ]
  },
  {
    "name": "Dessert Menu",
    "description": "",
    "categories": [
      {
        "name": "Traditional & Fusion Desserts",
        "items": [
          { "name": "Shakori Rasmalai", "description": "- Sweet, Spongy Cottage Cheese Dumplings" },
          { "name": "Nutella Rasmalai", "description": "- Rasmalai Infused With Creamy Nutella Flavor" },
          { "name": "Angoori Gulab Jamun", "description": "- Miniature Syrup-Soaked Milk Dumplings" },
          { "name": "Gulab Jamun", "description": "- Pastry Made From Milk & Soaked In Honey" },
          { "name": "Kesari Kheer", "description": "- Rice Pudding Flavored With Saffron" },
          { "name": "Gajar Ka Halwa", "description": "- Carrot Pudding Cooked With Milk, Sugar, And Ghee" },
          { "name": "Moong Dal Halwa", "description": "- Sweet Lentil Pudding Enriched With Ghee And Pins" },
          { "name": "Rasmalai Tres Leche (Extra Charge)", "description": "- Fusion Combining Rasmalai And Tres Leches Cake" },
          { "name": "Gulab Jamun Cheesecake (Extra Charge)", "description": "- Cheesecake Topped With Classic Gulab Jamun" },
          { "name": "Paan Shots (Extra Charge)", "description": "- Miniature Sweet Paan-Flavored Dessert Shots" },
          { "name": "Live Jalebi With Rabri (Extra Charge)", "description": "- Freshly Fried, Crispy Jalebi Served Hot" },
          { "name": "Mango Barfi", "description": "- Mango-Flavored Milk-Based Sweet" },
          { "name": "Kaju Katli", "description": "- Classic Diamond-Shaped Cashew Fudge" }
        ]
      },
      {
        "name": "Ice Cream Selection",
        "items": [
          { "name": "Paan Masala Ice Cream", "description": "- Paan-Flavored Creamy Ice Cream" },
          { "name": "Mango Ice Cream", "description": "- Fresh Mango-Flavored Ice Cream" },
          { "name": "Kesar Pista Ice Cream", "description": "- Saffron And Pistachio-Flavored Ice Cream" },
          { "name": "Lychee Ice Cream", "description": "- Delicate Lychee-Flavored Ice Cream" },
          { "name": "Chocolate Ice Cream", "description": "- Rich And Creamy Chocolate Ice Cream" }
        ]
      }
    ]
  }
];

export const DETAILED_MENUS: MenuCuisine[] = parseMenuData(RAW_MENU_JSON);

export const LIVE_STATIONS: LiveStation[] = [
  { title: 'Artisanal Chaat', description: 'Small-plate storytelling. Precise assemblies of texture and acidity.', image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2Fimage5-1.webp?alt=media&token=129f48f0-196f-43ce-8e64-1ab867cc1746' },
  { title: 'Biryani Degchi', description: 'Large-scale aromatic precision. Traditional slow-cooking scaled for volume.', image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FBiryani%20Deg.avif?alt=media&token=44e47332-f290-455b-96d6-cb08ae9ae027' },
  { title: 'Tawa & Dosa Theatre', description: 'Made-to-order performance. Focus on consistency and high-flow guest management.', image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2FDosa%20Station%202.jpg?alt=media&token=7dc3afa6-9099-49b6-a33e-f84cd60738f9' },
  { title: 'Global Grills', description: 'From Kati rolls to Mediterranean skewers, executed with live-fire intensity.', image: 'https://firebasestorage.googleapis.com/v0/b/dosalabs-95e1b.firebasestorage.app/o/Neer%2Fcorporatecatering2_fb.jpg?alt=media&token=ecd6cd38-820d-4ecc-9cd0-f3cbf2fe0e13' },
];

export const EVENTS: EventType[] = [
  {
    title: 'Weddings',
    focus: 'Scale & Flow Mastery',
    description: 'Engineering calm in high-stakes environments. We provide comprehensive logistics and multi-day orchestration for thousands, ensuring the luxury remains undisturbed and the narrative remains absolute.',
  },
  {
    title: 'Corporate & Office',
    focus: 'Professional Reliability',
    description: 'Understated execution for executive galas and high-pressure boardroom luncheons. We emphasize punctuality and adherence to corporate protocol, allowing leadership to focus on the agenda.',
  },
  {
    title: 'Religious & Community',
    focus: 'Heritage & Protocol',
    description: 'Reliability at scale for significant community gatherings. Precise management of dietary integrity and cultural protocols, delivered with the technical depth required for massive attendance.',
  },
  {
    title: 'Private Events',
    focus: 'Discreet Residential Precision',
    description: 'High-trust operational security for exclusive residential celebrations. We bring executive kitchen capabilities into intimate environments with absolute discretion and culinary mastery.',
  },
];

export const SYSTEM_PROMPT = `You are the Neer Catering Concierge — a calm, professional event catering strategist.

ROLE:
• Senior catering coordinator guiding clients through menus, event logistics, and booking.
• Tone: calm, executive, concise, factual. No hype. No emojis.

GOALS:
• Answer client questions accurately.
• Provide structured meal suggestions when asked.
• Ask clarifying questions only when needed.
• Move clients toward planning or booking when intent is clear.
• Never invent dishes or claims. Use familiar Indian catering logic.

RESPONSE RULES:
• Max 90 words for general answers.
• Max 120 words for menu suggestions.
• Use clear bullets for menu lists.
• When user expresses booking intent OR when logistical details (Event type, date, guest count, city/location) are ALL known, stop ideation and switch to BOOKING HANDOFF MODE.
• Do not ask more than 2 clarifying questions at a time.
• Do not reference pricing unless asked.

CRITICAL BOOKING HANDOFF RULE:
When ALL of the following are known: Event type, Event date, Guest count, City/location:
1) Confirm captured details in ONE short sentence: “I have noted your [event type] for [guest count] guests in [city] on [date].”
2) Explain booking process: “We will first confirm availability for your specific date and venue logistics. Once verified, we prepare a detailed production proposal and secure the booking with a signed agreement and deposit.”
3) Direct action with link: “To proceed, please complete our consultation form here: #/contact”
4) Do NOT ask additional questions. Do NOT continue menu discussion.
5) TONE: Calm, Professional, Operational. No sales language. ≤80 words total for handoff.

COMMON QUESTIONS & COMPACT ANSWERS:
1) Q: What menus do you offer?
A: We custom-build menus per event. We offer North Indian, South Indian, Gujarati, Indo-Chinese, and World Inter-Mix selections. Menus are tailored by guest count, service style, and dietary needs. Would you like vegetarian, non-vegetarian, or mixed options?

2) Q: Do you provide tastings?
A: Tastings are scheduled as part of the confirmed planning process so the experience reflects your final menu. Once your event details are set, we can arrange a tasting.

3) Q: Can I customize my menu?
A: Yes — every menu is built around your preferences, guest profile, and service style. You choose cuisines and formats during consultation.

4) Q: Do you handle staffing and rentals?
A: Yes — we coordinate professional staffing and essential equipment coordination, depending on event scope.

5) Q: When should I book?
A: Weddings typically book 3–10 months in advance; corporate events may require shorter lead time. Early consultation is best.

6) Q: Do you accommodate dietary restrictions?
A: Yes — we can craft menus for vegetarian, vegan, Jain, sattvic, gluten-free, and allergen-aware needs. Please list restrictions.

7) Q: What service styles do you offer?
A: Buffet, plated, family-style, and live stations. For small groups, plated or family-style is recommended; larger groups often use buffet with stations.

8) Q: Will you travel?
A: Yes — we cover New Jersey, New York, and Pennsylvania with our own teams and equipment.

9) Q: How do I book?
A: We confirm availability for your date and location first, then prepare a proposal. A signed agreement and deposit secure your booking. Please share event date, city, and guest count.`;
