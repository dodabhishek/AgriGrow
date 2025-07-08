import expert1 from "../assets/Images/User/expert1.jpg";
import expert2 from "../assets/Images/User/expert2.jpg";
import expert3 from "../assets/Images/User/expert3.jpg";
import expert4 from "../assets/Images/User/expert4.jpg";
import expert5 from "../assets/Images/User/expert5.jpg";
import expert6 from "../assets/Images/User/expert6.jpg";
import expert7 from "../assets/Images/User/expert7.jpg";
import expert8 from "../assets/Images/User/expert8.jpg";
import expert9 from "../assets/Images/User/expert9.jpg";
import expert10 from "../assets/Images/User/expert10.jpg";
import expert11 from "../assets/Images/User/expert11.jpg";  
import videoConsultations from "../assets/videoConsultations";
import chatSubscriptions from "../assets/chatSubscriptions";
import fieldVisits from "../assets/fieldVisits";
import toolsAndEquipment from "../assets/toolsAndEquipment";
import { smartSoilSensorImages } from "./equipmentImages";




export const expertData = [
  {
    expertId: 100,
    name: "Dr. Anjali Mehta",
    profileImage: expert1,
    expertise: "Organic Farming",
    description: "Dr. Anjali Mehta is an expert in agricultural best practices with a focus on agrochemicals.",
    consultationTopics: ["Weed Control", "Seed Treatment", "Rainwater Harvesting"],
    fees: 596,
    currency: "INR",
    languages: ["Telugu", "English"],
    location: "Guwahati, Assam",
    availability: "Mon–Fri, 10 AM–5 PM",
    videoSample: "https://example.com/videos/dr.-anjali-mehta-intro.mp4",
    rating: 4.3
  },
  {
    expertId: 101,
    name: "Mr. Ravi Sharma",
    profileImage: smartSoilSensorImages,
    expertise: "Soil Health Management",
    description: "Ravi Sharma has over 15 years of experience in soil testing and health improvement techniques.",
    consultationTopics: ["Soil Testing", "Composting", "pH Management"],
    fees: 450,
    currency: "INR",
    languages: ["Hindi", "English"],
    location: "Jaipur, Rajasthan",
    availability: "Tue–Sat, 9 AM–4 PM",
    videoSample: "https://example.com/videos/ravi-sharma-intro.mp4",
    rating: 4.6
  },
  {
    expertId: 102,
    name: "Dr. Kavita Iyer",
    profileImage: expert3,
    expertise: "Horticulture",
    description: "Dr. Kavita specializes in horticulture and greenhouse farming techniques.",
    consultationTopics: ["Greenhouse Setup", "Fruit Farming", "Pest Control"],
    fees: 720,
    currency: "INR",
    languages: ["English", "Marathi"],
    location: "Pune, Maharashtra",
    availability: "Mon–Fri, 11 AM–6 PM",
    videoSample: "https://example.com/videos/kavita-iyer.mp4",
    rating: 4.7
  },
  {
    expertId: 103,
    name: "Mr. Suresh Reddy",
    profileImage: expert4,
    expertise: "Irrigation Systems",
    description: "Expert in drip and sprinkler irrigation systems, especially for dry regions.",
    consultationTopics: ["Drip Irrigation", "Water Conservation", "System Installation"],
    fees: 380,
    currency: "INR",
    languages: ["Telugu", "Hindi"],
    location: "Hyderabad, Telangana",
    availability: "Wed–Sun, 8 AM–3 PM",
    videoSample: "https://example.com/videos/suresh-reddy.mp4",
    rating: 4.2
  },
  {
    expertId: 104,
    name: "Dr. Preeti Nair",
    profileImage: expert5,
    expertise: "Crop Disease Management",
    description: "Specialist in identifying and treating crop diseases through sustainable methods.",
    consultationTopics: ["Fungal Diseases", "Viral Infections", "Organic Treatments"],
    fees: 520,
    currency: "INR",
    languages: ["Malayalam", "English"],
    location: "Kochi, Kerala",
    availability: "Mon–Fri, 10 AM–4 PM",
    videoSample: "https://example.com/videos/preeti-nair.mp4",
    rating: 4.4
  },
  {
    expertId: 105,
    name: "Mr. Manjeet Singh",
    profileImage: expert6,
    expertise: "Wheat & Rice Farming",
    description: "Veteran agronomist with deep knowledge in wheat and rice cultivation methods.",
    consultationTopics: ["Fertilizer Usage", "Crop Rotation", "Pest Control"],
    fees: 610,
    currency: "INR",
    languages: ["Punjabi", "Hindi"],
    location: "Ludhiana, Punjab",
    availability: "Tue–Sat, 9 AM–1 PM",
    videoSample: "https://example.com/videos/manjeet-singh.mp4",
    rating: 4.5
  },
  {
    expertId: 106,
    name: "Dr. Neha Verma",
    profileImage: expert7,
    expertise: "Agroforestry",
    description: "Researcher in sustainable agroforestry practices suitable for Indian climate zones.",
    consultationTopics: ["Tree Plantation", "Intercropping", "Climate Adaptation"],
    fees: 680,
    currency: "INR",
    languages: ["Hindi", "English"],
    location: "Bhopal, Madhya Pradesh",
    availability: "Mon–Thu, 11 AM–5 PM",
    videoSample: "https://example.com/videos/neha-verma.mp4",
    rating: 4.1
  },
  {
    expertId: 107,
    name: "Mr. Arvind Bansal",
    profileImage: expert8,
    expertise: "Market Linkage & Trading",
    description: "Arvind helps farmers understand agri-market trends and improve their profits.",
    consultationTopics: ["Market Rates", "Wholesale Selling", "Logistics"],
    fees: 530,
    currency: "INR",
    languages: ["Hindi", "English"],
    location: "Delhi NCR",
    availability: "Mon–Fri, 10 AM–6 PM",
    videoSample: "https://example.com/videos/arvind-bansal.mp4",
    rating: 4.0
  },
  {
    expertId: 108,
    name: "Dr. Sunita Kulkarni",
    profileImage: expert9,
    expertise: "Dairy & Livestock",
    description: "Expert in dairy management, cattle care, and productivity enhancement.",
    consultationTopics: ["Milking Automation", "Animal Health", "Fodder Planning"],
    fees: 710,
    currency: "INR",
    languages: ["Marathi", "Hindi"],
    location: "Nagpur, Maharashtra",
    availability: "Wed–Sun, 9 AM–2 PM",
    videoSample: "https://example.com/videos/sunita-kulkarni.mp4",
    rating: 4.6
  },
  {
    expertId: 109,
    name: "Mr. Iqbal Hussain",
    profileImage: expert10,
    expertise: "Beekeeping",
    description: "Beekeeping trainer with experience in commercial honey production.",
    consultationTopics: ["Hive Setup", "Honey Harvesting", "Bee Health"],
    fees: 400,
    currency: "INR",
    languages: ["Urdu", "Hindi"],
    location: "Srinagar, Jammu & Kashmir",
    availability: "Fri–Sun, 10 AM–4 PM",
    videoSample: "https://example.com/videos/iqbal-hussain.mp4",
    rating: 4.3
  },
  {
    expertId: 110,
    name: "Ms. Meera Thomas",
    profileImage: expert11,
    expertise: "Spice Farming",
    description: "Specialist in cultivation of black pepper, cardamom, and clove.",
    consultationTopics: ["Drying Techniques", "Pest Resistance", "Export Guidelines"],
    fees: 645,
    currency: "INR",
    languages: ["Malayalam", "English"],
    location: "Idukki, Kerala",
    availability: "Mon–Wed, 9 AM–3 PM",
    videoSample: "https://example.com/videos/meera-thomas.mp4",
    rating: 4.2
  },
  {
    expertId: 111,
    name: "Dr. Vikram Joshi",
    profileImage: "https://example.com/images/vikram-joshi.jpg",
    expertise: "Precision Agriculture",
    description: "Tech-savvy agronomist applying data and IoT in farming solutions.",
    consultationTopics: ["GIS Mapping", "Yield Prediction", "Sensor Deployment"],
    fees: 800,
    currency: "INR",
    languages: ["Hindi", "English"],
    location: "Ahmedabad, Gujarat",
    availability: "Tue–Sat, 10 AM–5 PM",
    videoSample: "https://example.com/videos/vikram-joshi.mp4",
    rating: 4.8
  },
  {
    expertId: 112,
    name: "Mr. Rameshwar Yadav",
    profileImage: "https://example.com/images/rameshwar-yadav.jpg",
    expertise: "Fertilizer Advisory",
    description: "Assists farmers in balanced fertilizer use and subsidy schemes.",
    consultationTopics: ["NPK Ratios", "Biofertilizers", "Govt Schemes"],
    fees: 460,
    currency: "INR",
    languages: ["Hindi"],
    location: "Patna, Bihar",
    availability: "Mon–Fri, 9 AM–1 PM",
    videoSample: "https://example.com/videos/rameshwar-yadav.mp4",
    rating: 4.4
  },
  {
    expertId: 113,
    name: "Ms. Shruti Deshmukh",
    profileImage: "https://example.com/images/shruti-deshmukh.jpg",
    expertise: "Women in Agriculture",
    description: "Empowers rural women through farming innovations and self-help initiatives.",
    consultationTopics: ["Self Help Groups", "Seed Banks", "Rural Livelihood"],
    fees: 550,
    currency: "INR",
    languages: ["Marathi", "English"],
    location: "Nashik, Maharashtra",
    availability: "Wed–Sat, 10 AM–4 PM",
    videoSample: "https://example.com/videos/shruti-deshmukh.mp4",
    rating: 4.5
  },
  {
    expertId: 114,
    name: "Mr. Deepak Chauhan",
    profileImage: "https://example.com/images/deepak-chauhan.jpg",
    expertise: "Fisheries",
    description: "Aquaculture expert helping with pond maintenance and fish disease control.",
    consultationTopics: ["Fish Breeding", "Pond Cleaning", "Feeding Patterns"],
    fees: 600,
    currency: "INR",
    languages: ["Hindi"],
    location: "Varanasi, Uttar Pradesh",
    availability: "Tue–Sat, 11 AM–4 PM",
    videoSample: "https://example.com/videos/deepak-chauhan.mp4",
    rating: 4.3
  },
  {
    expertId: 115,
    name: "Dr. Rekha Banerjee",
    profileImage: "https://example.com/images/rekha-banerjee.jpg",
    expertise: "Agri-Policy Consultant",
    description: "Advises farmers on recent agricultural laws, MSP, and subsidies.",
    consultationTopics: ["Govt Policies", "Insurance", "Land Rights"],
    fees: 780,
    currency: "INR",
    languages: ["Bengali", "English"],
    location: "Kolkata, West Bengal",
    availability: "Mon–Fri, 12 PM–5 PM",
    videoSample: "https://example.com/videos/rekha-banerjee.mp4",
    rating: 4.6
  }
];

export const chatExperts = [
  {
    expertId: 300,
    name: "Ms. Aarti Desai",
    profileImage: expert1,
    expertise: "Soil Nutrition",
    languages: ["Hindi", "English"],
    description: "Guidance on soil health, organic treatments, and pH management.",
    availability: "Mon–Sat, 10 AM–6 PM",
    avgResponseTime: "2 min",
    rating: 4.5,
    subscriptionFee: 99,
    currency: "INR"
  },
  {
    expertId: 301,
    name: "Mr. Rajeev Thakur",
    profileImage: expert2,
    expertise: "Pest Management",
    languages: ["Hindi", "Punjabi"],
    description: "Helps identify pests and recommend organic pest control solutions.",
    availability: "Mon–Fri, 9 AM–5 PM",
    avgResponseTime: "1 min",
    rating: 4.6,
    subscriptionFee: 149,
    currency: "INR"
  },
  {
    expertId: 302,
    name: "Dr. Swati Ramesh",
    profileImage: expert3,
    expertise: "Crop Diseases",
    languages: ["English", "Marathi"],
    description: "Quick diagnosis and treatment plans for common crop diseases.",
    availability: "Tue–Sat, 11 AM–4 PM",
    avgResponseTime: "3 min",
    rating: 4.4,
    subscriptionFee: 129,
    currency: "INR"
  },
  {
    expertId: 303,
    name: "Mr. Amit Solanki",
    profileImage: expert4,
    expertise: "Market Prices",
    languages: ["Hindi", "Gujarati"],
    description: "Updates on local mandi prices and profit-maximizing sales strategy.",
    availability: "Daily, 8 AM–8 PM",
    avgResponseTime: "1 min",
    rating: 4.7,
    subscriptionFee: 119,
    currency: "INR"
  },
  {
    expertId: 304,
    name: "Ms. Tanvi Sharma",
    profileImage: expert5,
    expertise: "Seed Selection",
    languages: ["English", "Hindi"],
    description: "Recommends high-yield seeds for various climates and soils.",
    availability: "Mon–Fri, 10 AM–4 PM",
    avgResponseTime: "2 min",
    rating: 4.4,
    subscriptionFee: 99,
    currency: "INR"
  },
  {
    expertId: 305,
    name: "Mr. Mohan Reddy",
    profileImage: expert6,
    expertise: "Irrigation Support",
    languages: ["Telugu", "English"],
    description: "Advice on drip, sprinkler systems, and water scheduling.",
    availability: "Wed–Sun, 9 AM–1 PM",
    avgResponseTime: "4 min",
    rating: 4.1,
    subscriptionFee: 139,
    currency: "INR"
  },
  {
    expertId: 306,
    name: "Dr. Seema Bansal",
    profileImage: expert7,
    expertise: "Fertilizer Guidance",
    languages: ["Hindi", "English"],
    description: "Balanced fertilizer use and crop-specific recommendations.",
    availability: "Mon–Thu, 12 PM–6 PM",
    avgResponseTime: "3 min",
    rating: 4.6,
    subscriptionFee: 149,
    currency: "INR"
  },
  {
    expertId: 307,
    name: "Mr. Abdul Khan",
    profileImage: expert8,
    expertise: "Weather Forecasting",
    languages: ["Hindi", "Urdu"],
    description: "Helps plan sowing and irrigation based on weather forecasts.",
    availability: "Daily, 7 AM–2 PM",
    avgResponseTime: "2 min",
    rating: 4.2,
    subscriptionFee: 109,
    currency: "INR"
  },
  {
    expertId: 308,
    name: "Ms. Rina Ghosh",
    profileImage: expert9,
    expertise: "Vegetable Farming",
    languages: ["Bengali", "English"],
    description: "Expert in low-cost vegetable farming and disease prevention.",
    availability: "Mon–Sat, 11 AM–5 PM",
    avgResponseTime: "2 min",
    rating: 4.5,
    subscriptionFee: 119,
    currency: "INR"
  },
  {
    expertId: 309,
    name: "Dr. Nitin Kulkarni",
    profileImage: expert10,
    expertise: "Farm Tools",
    languages: ["Marathi", "Hindi"],
    description: "Helps with tool selection, usage, and maintenance.",
    availability: "Tue–Sat, 9 AM–3 PM",
    avgResponseTime: "1 min",
    rating: 4.8,
    subscriptionFee: 159,
    currency: "INR"
  },
  {
    expertId: 310,
    name: "Dr. Shalini Patel",
    profileImage: expert11,
    expertise: "Greenhouse Farming",
    languages: ["Gujarati", "Hindi"],
    description: "Tips on polyhouse setup, temperature control, and ROI.",
    availability: "Mon–Fri, 10 AM–5 PM",
    avgResponseTime: "3 min",
    rating: 4.3,
    subscriptionFee: 179,
    currency: "INR"
  },
  {
    expertId: 311,
    name: "Mr. Harsh Chauhan",
    profileImage: "https://example.com/images/harsh-chauhan.jpg",
    expertise: "Wheat & Rice",
    languages: ["Hindi", "Punjabi"],
    description: "Support on sowing methods, fertilizers, and disease protection.",
    availability: "Mon–Sat, 8 AM–4 PM",
    avgResponseTime: "2 min",
    rating: 4.6,
    subscriptionFee: 149,
    currency: "INR"
  },
  {
    expertId: 312,
    name: "Ms. Jyoti Sinha",
    profileImage: "https://example.com/images/jyoti-sinha.jpg",
    expertise: "Organic Farming",
    languages: ["Hindi", "English"],
    description: "Expert in composting, natural pesticides, and organic certification.",
    availability: "Tue–Sat, 9 AM–3 PM",
    avgResponseTime: "3 min",
    rating: 4.5,
    subscriptionFee: 129,
    currency: "INR"
  },
  {
    expertId: 313,
    name: "Dr. Umesh Rathi",
    profileImage: "https://example.com/images/umesh-rathi.jpg",
    expertise: "Agrochemicals",
    languages: ["Marathi", "Hindi"],
    description: "Supports safe and effective agrochemical usage.",
    availability: "Mon–Fri, 11 AM–6 PM",
    avgResponseTime: "2 min",
    rating: 4.1,
    subscriptionFee: 139,
    currency: "INR"
  },
  {
    expertId: 314,
    name: "Ms. Neelam Verma",
    profileImage: "https://example.com/images/neelam-verma.jpg",
    expertise: "Women in Agriculture",
    languages: ["Hindi", "English"],
    description: "Special focus on empowering women farmers with tech & finance help.",
    availability: "Wed–Sat, 10 AM–4 PM",
    avgResponseTime: "4 min",
    rating: 4.4,
    subscriptionFee: 119,
    currency: "INR"
  },
  {
    expertId: 315,
    name: "Mr. Sanjay Shetty",
    profileImage: "https://example.com/images/sanjay-shetty.jpg",
    expertise: "Farm Budgeting",
    languages: ["Kannada", "English"],
    description: "Advises farmers on budgeting, input cost planning, and savings.",
    availability: "Mon–Fri, 9 AM–3 PM",
    avgResponseTime: "2 min",
    rating: 4.3,
    subscriptionFee: 149,
    currency: "INR"
  },
  {
    expertId: 316,
    name: "Dr. Meenakshi Rao",
    profileImage: "https://example.com/images/meenakshi-rao.jpg",
    expertise: "Post-Harvest Management",
    languages: ["Telugu", "Hindi"],
    description: "Specialist in storage, drying, and packaging of crops.",
    availability: "Mon–Sat, 10 AM–5 PM",
    avgResponseTime: "3 min",
    rating: 4.2,
    subscriptionFee: 159,
    currency: "INR"
  },
  {
    expertId: 317,
    name: "Mr. Dinesh Kumar",
    profileImage: "https://example.com/images/dinesh-kumar.jpg",
    expertise: "Government Schemes",
    languages: ["Hindi"],
    description: "Guides farmers to access subsidies, loans, and schemes.",
    availability: "Mon–Fri, 8 AM–2 PM",
    avgResponseTime: "1 min",
    rating: 4.6,
    subscriptionFee: 99,
    currency: "INR"
  },
  {
    expertId: 318,
    name: "Ms. Pooja Singh",
    profileImage: "https://example.com/images/pooja-singh.jpg",
    expertise: "Kitchen Gardening",
    languages: ["Hindi", "English"],
    description: "Provides tips for terrace farming and home gardens.",
    availability: "Tue–Sat, 9 AM–2 PM",
    avgResponseTime: "2 min",
    rating: 4.4,
    subscriptionFee: 89,
    currency: "INR"
  },
  {
    expertId: 319,
    name: "Dr. Manoj Jha",
    profileImage: "https://example.com/images/manoj-jha.jpg",
    expertise: "Precision Agriculture",
    languages: ["Hindi", "English"],
    description: "Uses data, sensors, and AI tools to optimize farming.",
    availability: "Mon–Fri, 11 AM–5 PM",
    avgResponseTime: "2 min",
    rating: 4.8,
    subscriptionFee: 199,
    currency: "INR"
  }
];


export const fieldVisitExperts = [
  {
    expertId: 400,
    name: "Ms. Aarti Desai",
    profileImage: "https://example.com/images/aarti-desai.jpg",
    expertise: "Soil Nutrition",
    languages: ["Hindi", "English"],
    location: "Gaya, Bihar",
    availabilityDays: ["Mon", "Wed", "Fri"],
    fieldVisitFee: 499,
    currency: "INR",
    rating: 4.5,
    visitRangeKm: 30,
    experienceYears: 7
  },
  {
    expertId: 401,
    name: "Mr. Rajeev Thakur",
    profileImage: "https://example.com/images/rajeev-thakur.jpg",
    expertise: "Pest Management",
    languages: ["Hindi", "Punjabi"],
    location: "Rohtak, Haryana",
    availabilityDays: ["Tue", "Thu", "Sat"],
    fieldVisitFee: 599,
    currency: "INR",
    rating: 4.6,
    visitRangeKm: 40,
    experienceYears: 9
  },
  {
    expertId: 402,
    name: "Dr. Swati Ramesh",
    profileImage: "https://example.com/images/swati-ramesh.jpg",
    expertise: "Crop Diseases",
    languages: ["English", "Marathi"],
    location: "Nashik, Maharashtra",
    availabilityDays: ["Mon", "Tue", "Thu"],
    fieldVisitFee: 649,
    currency: "INR",
    rating: 4.4,
    visitRangeKm: 25,
    experienceYears: 8
  },
  {
    expertId: 403,
    name: "Mr. Mohan Reddy",
    profileImage: "https://example.com/images/mohan-reddy.jpg",
    expertise: "Irrigation Systems",
    languages: ["Telugu", "English"],
    location: "Nalgonda, Telangana",
    availabilityDays: ["Wed", "Fri", "Sat"],
    fieldVisitFee: 550,
    currency: "INR",
    rating: 4.3,
    visitRangeKm: 50,
    experienceYears: 6
  },
  {
    expertId: 404,
    name: "Ms. Rina Ghosh",
    profileImage: "https://example.com/images/rina-ghosh.jpg",
    expertise: "Vegetable Farming",
    languages: ["Bengali", "English"],
    location: "Howrah, West Bengal",
    availabilityDays: ["Mon", "Thu", "Sat"],
    fieldVisitFee: 499,
    currency: "INR",
    rating: 4.6,
    visitRangeKm: 20,
    experienceYears: 5
  },
  {
    expertId: 405,
    name: "Dr. Nitin Kulkarni",
    profileImage: "https://example.com/images/nitin-kulkarni.jpg",
    expertise: "Farm Equipment & Tools",
    languages: ["Marathi", "Hindi"],
    location: "Jalgaon, Maharashtra",
    availabilityDays: ["Tue", "Thu", "Sun"],
    fieldVisitFee: 650,
    currency: "INR",
    rating: 4.7,
    visitRangeKm: 35,
    experienceYears: 10
  },
  {
    expertId: 406,
    name: "Dr. Shalini Patel",
    profileImage: "https://example.com/images/shalini-patel.jpg",
    expertise: "Greenhouse & Polyhouse Farming",
    languages: ["Gujarati", "Hindi"],
    location: "Surat, Gujarat",
    availabilityDays: ["Wed", "Fri", "Sun"],
    fieldVisitFee: 799,
    currency: "INR",
    rating: 4.5,
    visitRangeKm: 40,
    experienceYears: 7
  },
  {
    expertId: 407,
    name: "Dr. Seema Bansal",
    profileImage: "https://example.com/images/seema-bansal.jpg",
    expertise: "Fertilizer Guidance",
    languages: ["Hindi", "English"],
    location: "Kanpur, Uttar Pradesh",
    availabilityDays: ["Mon", "Wed", "Sat"],
    fieldVisitFee: 559,
    currency: "INR",
    rating: 4.6,
    visitRangeKm: 30,
    experienceYears: 9
  },
  {
    expertId: 408,
    name: "Mr. Abdul Khan",
    profileImage: "https://example.com/images/abdul-khan.jpg",
    expertise: "Weather-Based Planning",
    languages: ["Hindi", "Urdu"],
    location: "Aligarh, Uttar Pradesh",
    availabilityDays: ["Tue", "Thu", "Sat"],
    fieldVisitFee: 499,
    currency: "INR",
    rating: 4.3,
    visitRangeKm: 25,
    experienceYears: 6
  },
  {
    expertId: 409,
    name: "Ms. Jyoti Sinha",
    profileImage: "https://example.com/images/jyoti-sinha.jpg",
    expertise: "Organic Practices",
    languages: ["Hindi", "English"],
    location: "Patna, Bihar",
    availabilityDays: ["Mon", "Thu", "Sat"],
    fieldVisitFee: 599,
    currency: "INR",
    rating: 4.5,
    visitRangeKm: 30,
    experienceYears: 8
  }
];


const getProductsByType = (type) => {
  if (type === 'consultation') return videoConsultations;
  if (type === 'chat') return chatSubscriptions;
  if (type === 'field_visit') return fieldVisits;
  if (type === 'tool') return toolsAndEquipment;
  // 'all' returns all combined
  return [
    ...videoConsultations,
    ...chatSubscriptions,
    ...fieldVisits,
    ...toolsAndEquipment
  ];
};

const products = getProductsByType('all');


 



