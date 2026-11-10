// All copy for the page. Facts come from the hotel's public listings
// (Google, Booking.com); anything unconfirmed is listed in README.md.
// Headings are lists of [text, italic?] parts.

export const hotel = {
  name: "Metropole",
  bengali: "মেট্রোপোল",
  street: "174, Sarat Bose Road",
  city: "Kolkata 700029",
  phone: "033 4008 6969",
  tel: "+913340086969",
  maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Metropole+174+Sarat+Bose+Road+Kolkata",
  checkIn: "12:00 pm",
  checkOut: "11:00 am",
};

export const nav = [
  { label: "Rooms", href: "#rooms" },
  { label: "A day", href: "#day" },
  { label: "Dine", href: "#dine" },
  { label: "Gather", href: "#gather" },
  { label: "Around", href: "#around" },
];

export const hero = {
  top: ["Boutique hotel", "174, Sarat Bose Road · Kolkata"],
  line: [
    ["Your address", false],
    ["in South Kolkata.", true],
  ],
};

// The statement is text with small photographs set into the line.
export const welcome = {
  label: "Welcome",
  parts: [
    "Metropole is a boutique hotel in the business heart of South Kolkata. Rooms",
    { src: "/photos/room-king.jpg", alt: "A room" },
    "upstairs, the Ivory",
    { src: "/photos/restaurant.jpg", alt: "The Ivory restaurant" },
    "restaurant and bar downstairs, and a front desk",
    { src: "/photos/lobby.jpg", alt: "The lobby" },
    "that never closes.",
  ],
  badge: "Open 24 hours · Front desk · Open 24 hours · Front desk · ",
  basics: [
    { k: "Free", v: "Parking and Wi-Fi" },
    { k: "Ivory", v: "Restaurant and bar" },
    { k: "On call", v: "Tour desk and car hire" },
  ],
};

export const roomsCopy = {
  label: "Rooms",
  title: [
    ["Rooms to", false],
    ["come home to.", true],
  ],
  types: "Standard · Deluxe · Executive",
  everyLabel: "In every room",
  ask: "Ask about a room",
};

export const rooms = [
  {
    id: "double",
    name: "Double",
    src: "/photos/room-king.jpg",
    text: "A double bed in crisp white linen, a deep leather headboard and framed photographs of the city.",
  },
  {
    id: "corner",
    name: "Corner",
    src: "/photos/room-corner.jpg",
    text: "Windows on two sides, over the trees of Sarat Bose Road, with a table and chair by the light.",
  },
  {
    id: "twin",
    name: "Twin",
    src: "/photos/room-twin.jpg",
    text: "Two beds side by side, for friends and colleagues travelling together.",
  },
];

export const everyRoom = [
  "Air conditioning",
  "Flat-screen TV",
  "Minibar",
  "Personal safe",
  "En suite shower",
  "Free Wi-Fi",
];

// One day at the hotel. `hour` places each moment on the clock the scroll turns;
// `tone` is the sky behind it.
export const day = {
  label: "A day",
  title: [
    ["One day", false],
    ["at Metropole.", true],
  ],
  moments: [
    {
      part: "Morning",
      hour: 7,
      tone: { bg: "#f7e6cc", fg: "#1d1a16" },
      title: "Tea, before the city wakes.",
      text: "A kettle and a tray in every room, and breakfast can come up to you.",
      src: "/photos/detail-tea.jpg",
      alt: "A tea tray with a kettle and cups",
    },
    {
      part: "Noon",
      hour: 12,
      tone: { bg: "#f3eee4", fg: "#1d1a16" },
      title: "Your key is waiting.",
      text: "Check in from 12:00 pm. The front desk looks after parking, cars and tours.",
      src: "/photos/entrance-day.jpg",
      alt: "The entrance to Metropole on Sarat Bose Road",
    },
    {
      part: "Afternoon",
      hour: 16,
      tone: { bg: "#ecd4a8", fg: "#1d1a16" },
      title: "A coffee, a book, a board game.",
      text: "The café corner downstairs keeps a shelf of both.",
      src: "/photos/cafe-corner.jpg",
      alt: "The café corner at Metropole, with a shelf of books and board games",
    },
    {
      part: "Evening",
      hour: 20,
      tone: { bg: "#6d2a1f", fg: "#f6f0e4" },
      title: "Dinner at Ivory, then the bar.",
      text: "Indian, Chinese and Continental, under the lamps.",
      src: "/photos/restaurant-2.jpg",
      alt: "Tables set for dinner at the Ivory restaurant",
    },
    {
      part: "Night",
      hour: 23,
      tone: { bg: "#12110f", fg: "#f3eee4" },
      title: "The front desk is still awake.",
      text: "Open 24 hours. Come back whenever the city lets you go.",
      src: "/photos/street-night.jpg",
      alt: "Metropole from the street at night",
    },
  ],
};

export const marquee = ["Stay", "Dine", "Gather", "Sarat Bose Road", "South Kolkata"];

export const cards = [
  {
    id: "dine",
    tone: "ox",
    label: "Dine · Ivory",
    title: [
      ["Indian, Chinese and Continental,", false],
      ["and a bar to match.", true],
    ],
    text: "Ivory is the hotel's own restaurant and bar: lamps low, tables set, and a kitchen that sends breakfast up to your room if you'd rather stay in.",
    cta: "Reserve a table",
    src: "/photos/restaurant.jpg",
    alt: "The Ivory restaurant at Metropole",
  },
  {
    id: "gather",
    tone: "sand",
    label: "Gather",
    title: [
      ["Meetings, banquets", false],
      ["and family occasions.", true],
    ],
    text: "A banquet hall and meeting rooms, set up the way your day needs: a boardroom table, rows for a seminar, or a long lunch for the whole family.",
    cta: "Plan an event",
    src: "/photos/meetings.jpg",
    alt: "A meeting room at Metropole, set for a conference",
  },
];

export const aroundCopy = {
  label: "Around",
  title: [
    ["South Kolkata,", false],
    ["at the door.", true],
  ],
  idle: "Point at a place",
  note: "Rings show distance from the hotel, not direction.",
};

export const around = [
  { km: 1, d: "1 km", v: "Gariahat Market" },
  { km: 2, d: "2 km", v: "Kalighat Temple" },
  { km: 2.7, d: "2.7 km", v: "South City Mall" },
  { km: 3, d: "3 km", v: "Birla Temple" },
  { km: 3.4, d: "3.4 km", v: "Victoria Memorial" },
  { km: 10, d: "10 km", v: "Howrah Station" },
  { km: 20, d: "20 km", v: "Kolkata Airport" },
];

export const book = {
  label: "Book direct",
  title: [
    ["Speak to the hotel,", false],
    ["not a booking site.", true],
  ],
};
