const videoConsultations = Array.from({ length: 20 }, (_, i) => ({
  _id: `consultation${i+1}`,
  name: `Video Consultation: Expert #${i+1}`,
  price: 499 + (i % 5) * 50,
  imageUrl: `/src/assets/Images/farmer${(i%3)+1}.jpg`,
  description: `Book a 30-minute video call with Expert #${i+1} for personalized agricultural advice and analysis.`,
  type: 'consultation',
  rating: 4.2 + (i % 4) * 0.2,
  reviews: 10 + (i * 3) % 50,
  duration: '30 Minutes',
  expertName: `Dr. Expert #${i+1}`,
  features: [
    'One-on-one video call',
    'Personalized advice',
    'Screen sharing',
    'Session recording'
  ]
}));

export default videoConsultations; 