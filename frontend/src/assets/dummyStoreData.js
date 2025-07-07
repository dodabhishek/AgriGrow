// Dummy data for the store, covering all toggle types

const dummyStoreData = [
  // Video Consultations (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    _id: `consultation${i+1}`,
    name: `Video Consultation: Expert #${i+1}`,
    price: 499 + (i % 5) * 50,
    imageUrl: `/src/assets/Images/farmer${(i%3)+1}.jpg`,
    description: `Book a 30-minute video call with Expert #${i+1} for personalized agricultural advice and analysis.`,
    type: "consultation"
  })),

  // Chat Subscriptions (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    _id: `chat${i+1}`,
    name: `Chat Subscription: Specialist #${i+1}`,
    price: 299 + (i % 4) * 25,
    imageUrl: `/src/assets/Images/farmer${((i+1)%3)+1}.jpg`,
    description: `Unlimited chat access to Specialist #${i+1} for a month. Share images, get instant advice, and solve your crop issues.`,
    type: "chat"
  })),

  // Field Visits by Experts (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    _id: `fieldvisit${i+1}`,
    name: `Field Visit by Expert #${i+1}`,
    price: 3999 + (i % 3) * 200,
    imageUrl: "/src/assets/Images/field_visit.jpg",
    description: `Book an on-site visit from Expert #${i+1} for hands-on assessment and personalized solutions.`,
    type: "field_visit"
  })),

  // Tools & Equipment (20, including kits)
  ...Array.from({ length: 10 }, (_, i) => ({
    _id: `tool${i+1}`,
    name: `AI Crop Monitoring Tool #${i+1}`,
    price: 999 + (i % 4) * 100,
    imageUrl: "/src/assets/Images/app.jpg",
    description: `Access our AI-powered crop monitoring tool #${i+1} for a year. Detect diseases, predict yields, and optimize your farm.`,
    type: "tool"
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    _id: `kit${i+1}`,
    name: `Soil Analysis Kit #${i+1}`,
    price: 299 + (i % 3) * 50,
    imageUrl: "/src/assets/Images/soil_kit.jpg",
    description: `Test your soil at home with our easy-to-use kit #${i+1}. Includes pH, nutrient, and moisture tests.`,
    type: "kit"
  })),

  // Premium Community Access (5)
  ...Array.from({ length: 5 }, (_, i) => ({
    _id: `community${i+1}`,
    name: `Premium Community Access (Year) #${i+1}`,
    price: 499 + (i % 2) * 50,
    imageUrl: "/src/assets/Images/community.jpg",
    description: `Join our premium farmer community #${i+1} for a year. Access group chats, expert Q&A, and exclusive resources.`,
    type: "community"
  })),

  // Workshops (5)
  ...Array.from({ length: 5 }, (_, i) => ({
    _id: `workshop${i+1}`,
    name: `Workshop: Modern Farming Techniques #${i+1}`,
    price: 199 + (i % 2) * 50,
    imageUrl: "/src/assets/Images/OrganicProducts.jpg",
    description: `Access a recorded workshop #${i+1} on the latest modern farming techniques and sustainable practices.`,
    type: "workshop"
  })),

  // E-Books (5)
  ...Array.from({ length: 5 }, (_, i) => ({
    _id: `ebook${i+1}`,
    name: `E-Book: Smart Farming Guide #${i+1}`,
    price: 99 + (i % 2) * 20,
    imageUrl: "/src/assets/Images/blog1.jpg",
    description: `Download our comprehensive e-book #${i+1} covering smart farming, AI tools, and crop management.`,
    type: "ebook"
  })),
];

export default dummyStoreData; 