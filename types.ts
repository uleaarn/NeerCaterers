
export interface NavItem {
  label: string;
  path: string;
}

export interface CuisineCategory {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface MenuDish {
  name: string;
  isVeg?: boolean;
  isLive?: boolean;
  isButlerPassed?: boolean;
  isExtraCharge?: boolean;
}

export interface MenuSection {
  category: string;
  description?: string;
  dishes: MenuDish[];
}

export interface MenuCuisine {
  id: string;
  title: string;
  sections: MenuSection[];
}

export interface LiveStation {
  title: string;
  description: string;
  image?: string;
}

export interface EventType {
  title: string;
  focus: string;
  description: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Qualified' | 'Booked' | 'Closed';

export interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  natureOfEvent: string;
  serviceStyle: string;
  dietaryMandates: string;
  cuisines: string[];
  internalNotes: string;
  status: InquiryStatus;
  assignedTo: string;
  timestamp: string;
}
