
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
    subject: "Consultation Request Received — Neer Caterers",
    body: `Dear ${name},

We have received your request for a consultation regarding your upcoming event production.

The receipt of your inquiry is confirmed. A senior coordinator will evaluate the logistical requirements of your event and provide a formal response within twenty-four business hours.

We appreciate your interest in our production standards.

Best regards,

The Neer Caterers Executive Team`
  }),
  INTERNAL_NOTIFICATION: (inquiry: Inquiry) => ({
    subject: `New Consultation Inquiry — ${inquiry.eventType} | ${inquiry.clientName}`,
    body: `NEW CONSULTATION INQUIRY RECEIVED

ID: ${inquiry.id}
CLIENT: ${inquiry.clientName}
EMAIL: ${inquiry.email}
PHONE: ${inquiry.phone}

EVENT DETAILS:
TYPE: ${inquiry.eventType}
DATE: ${inquiry.eventDate}
GUESTS: ${inquiry.guestCount}
LOCATION: ${inquiry.location}

TIMESTAMP: ${inquiry.timestamp}

NEXT ACTION:
Verify calendar availability for the requested date and initiate initial client vetting within 24 hours.`
  })
};

// ... (Existing CUISINES, DETAILED_MENUS, LIVE_STATIONS, EVENTS remain unchanged)

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
              isLive: fullStr.includes('live station') || fullStr.includes('- live'),
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
    "categories": [
      { "name": "Appetizers - Veg", "items": [{ "name": "Paneer Tikka" }] },
      { "name": "Signature Chaats", "items": [{ "name": "Pani Puri" }] },
      { "name": "Appetizers – Non-Veg", "items": [{ "name": "Chicken Tikka" }] },
      { "name": "Paneer & Kofta", "items": [{ "name": "Kadai Paneer" }] },
      { "name": "Dal Selection", "items": [{ "name": "Dal Bukhara" }] },
      { "name": "Vegetarian Entrées", "items": [{ "name": "Baingan Bharta" }] },
      { "name": "Chicken Entrées", "items": [{ "name": "Chicken Makhani" }] },
      { "name": "Lamb & Goat Entrées", "items": [{ "name": "Lamb Rogan Josh" }] },
      { "name": "Biryani & Rice", "items": [{ "name": "Vegetable Biryani" }] },
      { "name": "Bread Selection", "items": [{ "name": "Butter Naan" }] }
    ]
  },
  {
    "name": "Gujarati Menu",
    "categories": [
      { "name": "Farsans", "items": [{ "name": "Khaman Dhokla" }] },
      { "name": "Special Items", "items": [{ "name": "Sabudana Kichdi" }] },
      { "name": "Shaak", "items": [{ "name": "Surti Undhiya" }] },
      { "name": "Dal / Kadhi", "items": [{ "name": "Gujarati Kadhi" }] }
    ]
  },
  {
    "name": "South Indian Menu",
    "categories": [
      { "name": "Appetizers - Veg", "items": [{ "name": "Medu Vada" }] },
      { "name": "Non-Vegetarian Appetizers", "items": [{ "name": "Chicken 65" }] },
      { "name": "Vegetarian Entrées", "items": [{ "name": "Kadala Curry" }] },
      { "name": "Non-Vegetarian Entrées", "items": [{ "name": "Chicken Chettinad" }] }
    ]
  },
  {
    "name": "World Inter-Mix Menu",
    "categories": [
      { "name": "Middle Eastern", "items": [{ "name": "Hummus" }] },
      { "name": "NYC Style Gyro", "items": [{ "name": "Chicken Over Rice" }] },
      { "name": "Mexican", "items": [{ "name": "Soft Taco" }] },
      { "name": "Italian Station", "items": [{ "name": "Pasta Station" }] }
    ]
  },
  {
    "name": "Indo-Chinese Menu",
    "categories": [
      { "name": "Vegetarian", "items": [{ "name": "Gobi Manchurian" }] },
      { "name": "Non-Veg", "items": [{ "name": "Chili Chicken" }] },
      { "name": "Rice & Noodles", "items": [{ "name": "Hakka Noodles" }] }
    ]
  },
  {
    "name": "Dessert Menu",
    "categories": [
      { "name": "Traditional Sweets", "items": [{ "name": "Gulab Jamun" }] },
      { "name": "Modern & Live", "items": [{ "name": "Rasmalai Tres Leche" }] }
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

export const SYSTEM_PROMPT = `You are the Neer Catering Concierge. Professional, calm, experienced, non-pushy. Represent Neer Caterers (NJ, NY, PA). High-trust large-scale catering focus. Maintain understated executive tone.`;
