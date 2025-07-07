const fieldVisits = Array.from({ length: 20 }, (_, i) => ({
  _id: `fieldvisit${i+1}`,
  name: `Field Visit by Expert #${i+1}`,
  price: 3999 + (i % 3) * 200,
  imageUrl: "/src/assets/Images/field_visit.jpg",
  description: `Book an on-site visit from Expert #${i+1} for hands-on assessment and personalized solutions.`,
  type: 'field_visit',
  rating: 4.3 + (i % 3) * 0.2,
  reviews: 5 + (i * 2) % 30,
  duration: '2 Hours',
  expertName: `Dr. Field Expert #${i+1}`,
  features: [
    'On-site expert consultation',
    'Hands-on demonstration',
    'Detailed farm assessment',
    'Customized solutions'
  ]
}));

export default fieldVisits; 