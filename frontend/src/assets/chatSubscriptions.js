const chatSubscriptions = Array.from({ length: 20 }, (_, i) => ({
  _id: `chat${i+1}`,
  name: `Chat Subscription: Specialist #${i+1}`,
  price: 299 + (i % 4) * 25,
  imageUrl: `/src/assets/Images/farmer${((i+1)%3)+1}.jpg`,
  description: `Unlimited chat access to Specialist #${i+1} for a month. Share images, get instant advice, and solve your crop issues.`,
  type: 'chat',
  rating: 4.0 + (i % 5) * 0.2,
  reviews: 8 + (i * 2) % 40,
  duration: '1 Month',
  expertName: `Dr. Specialist #${i+1}`,
  features: [
    'Unlimited chat access',
    'Share images and documents',
    'Instant expert advice',
    'Group discussion forums'
  ]
}));

export default chatSubscriptions; 