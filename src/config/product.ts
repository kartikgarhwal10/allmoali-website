export interface BenefitItem {
  id: string;
  title: string;
  description: string;
}

export interface ProblemCard {
  title: string;
  description: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface ReviewItem {
  id: string | number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  date?: string;
  verified?: boolean;
  avatar: string;
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WhyCard {
  id: string;
  title: string;
  description: string;
}

export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
}

export interface UseCaseCard {
  title: string;
  description: string;
  highlight?: string;
}

export const PRODUCT_CONFIG = {
  brandName: "Allmoali",
  productName: "Joint & Muscular Pain Oil",
  tagline: "Barson purane Ayurvedic formula se prerit, 12 jadi-butiyon se samriddh.",
  secondaryTagline: "Barson purane Ayurvedic formula · Fast absorbing · Non-sticky",
  mrp: 493,
  discount: 42, // % OFF
  sellingPrice: 286, // Final Client Approved Price
  whatsappNumber: "919110099087",
  whatsappMessage: "Hi, I want to order Allmoali Joint & Muscular Pain Oil for ₹286. Please share the order details.",
  email: "info@allmoali.com",
  codAvailable: true,
  demoDisclaimer: "Prescribed medicines should not be discontinued without professional medical advice. Product claims supported by authorized documentation.",
  
  // Why Allmoali Cards
  whyAllmoali: [
    {
      id: "01",
      title: "NATURAL AYURVEDIC FORMULA",
      description: "Barson purane Ayurvedic formula se prerit, 12 jadi-butiyon se samriddh."
    },
    {
      id: "02",
      title: "12 AYURVEDIC JADI-BUTIYAN",
      description: "Rich formulation crafted from 12 Ayurvedic botanical extracts."
    },
    {
      id: "03",
      title: "FAST ABSORBING",
      description: "Lighter consistency designed to absorb quickly during massage."
    },
    {
      id: "04",
      title: "NON-STICKY FORMULA",
      description: "Non-greasy, comfortable application without leaving a sticky finish."
    },
    {
      id: "05",
      title: "DEEP PENETRATION",
      description: "Advanced formulation designed for deep penetration during massage."
    },
    {
      id: "06",
      title: "PLEASANT RELAXING AROMA",
      description: "A soft, relaxing aroma that enhances your daily wellness routine."
    },
    {
      id: "07",
      title: "NO SIDE EFFECT",
      description: "Natural Ayurvedic chemical-free oil formulation."
    }
  ] as WhyCard[],

  // V2 Ingredients Info
  ingredientsDisclaimer: "Barson purane Ayurvedic formula se prerit, 12 jadi-butiyon se samriddh.",
  ingredientsList: [] as { name: string; description: string }[],

  // Product Experience Cards (4 Key Benefits)
  productExperience: [
    {
      id: "01",
      title: "FAST ABSORBING",
      description: "Quickly absorbs during massage for comfortable application."
    },
    {
      id: "02",
      title: "NON-STICKY",
      description: "Non-greasy, lightweight feel without a sticky layer."
    },
    {
      id: "03",
      title: "DEEP PENETRATION",
      description: "Designed for deep penetration during gentle massage."
    },
    {
      id: "04",
      title: "PLEASANT AROMA",
      description: "Pleasant fragrance for a relaxing, soothing massage experience."
    }
  ] as ExperienceCard[],

  // Targeted Everyday Use Cases
  useCases: [
    {
      title: "KNEE CARE",
      description: "Specially beneficial for massage care around the knees.",
      highlight: "Knee Massage Care"
    },
    {
      title: "BACK CARE",
      description: "Ideal for gentle back massage care after a long day.",
      highlight: "Back Care Routine"
    },
    {
      title: "SHOULDER & ELBOW",
      description: "Relieves everyday tension around shoulders and elbows.",
      highlight: "Targeted Relief"
    },
    {
      title: "ARTHRITIS CARE",
      description: "Arthritis mein faydemand — specially formulated for massage routines in arthritis-related discomfort.",
      highlight: "Arthritis Care"
    },
    {
      title: "MUSCULAR PAIN",
      description: "Muscular pain and everyday muscular discomfort ke massage routine ke liye upyogi.",
      highlight: "Muscle Relief"
    },
    {
      title: "WINTER JOINT CARE",
      description: "Sardiyon mein joints ki extra care. Winter joint pain mein atyadhik labhdayak.",
      highlight: "Winter Joint Care"
    },
    {
      title: "YOGA & EXERCISE",
      description: "Yoga aur exercise ke dardon mein atyadhik labhdayak. Physical activity ke baad massage routine ke liye upyogi.",
      highlight: "After Exercise"
    },
    {
      title: "AFTER A LONG DAY",
      description: "For those moments when you want to slow down and massage tired joints.",
      highlight: "Evening Ritual"
    }
  ] as UseCaseCard[],

  // Allmoali Routine Steps
  allmoaliRoutine: [
    {
      number: "01",
      title: "APPLY",
      description: "Apply 3–5 drops to the affected area.",
      detail: "3–5 drops"
    },
    {
      number: "02",
      title: "MASSAGE",
      description: "Massage gently until the oil penetrates deeply.",
      detail: "Deep Massage"
    },
    {
      number: "03",
      title: "RELAX",
      description: "Let the 12 Ayurvedic herbs absorb naturally.",
      detail: "Absorb"
    },
    {
      number: "04",
      title: "REPEAT",
      description: "Include in your everyday personal care routine.",
      detail: "Routine"
    }
  ] as StepItem[],

  // Verified Customer Reviews
  reviews: [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Jaipur, Rajasthan",
      rating: 5,
      text: "Oil ka texture kaafi light hai. Massage karne ke baad chipchipa feel nahi hota. Deep penetration and fast absorption bohot badhiya hai.",
      verified: true,
      avatar: "RK"
    },
    {
      id: 2,
      name: "Amit Sharma",
      location: "Indore, Madhya Pradesh",
      rating: 5,
      text: "Gym aur exercise ke baad massage ke liye use kiya. Muscular pain mein kaafi aaram milta hai. Fragrance bhi pleasant hai.",
      verified: true,
      avatar: "AS"
    },
    {
      id: 3,
      name: "Sunita Sharma",
      location: "Lucknow, Uttar Pradesh",
      rating: 5,
      text: "Mere papa ke knee and joint care ke liye regular use kar rahe hain. Chemical-free natural Ayurvedic oil hai, no side effect feel hua.",
      verified: true,
      avatar: "SS"
    },
    {
      id: 4,
      name: "Anjali Verma",
      location: "Delhi",
      rating: 5,
      text: "Sardiyon mein joints ki extra care ke liye best hai. Fast absorption se jaldi ghul jata hai aur aaram milta hai.",
      verified: true,
      avatar: "AV"
    },
    {
      id: 5,
      name: "Priya Gupta",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "Packaging premium hai aur oil ka texture lightweight hai. Massage ke baad uncomfortable sticky feeling bilkul nahi rehti.",
      verified: true,
      avatar: "PG"
    },
    {
      id: 6,
      name: "Rahul Verma",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "Long day ke baad back and shoulder massage routine mein use karna achha lagta hai. Fragrance kaafi soothing hai.",
      verified: true,
      avatar: "RV"
    }
  ] as ReviewItem[],

  // Product Details Specifications Accordion
  productDetailsSpecs: [
    { label: "Product", value: "Joint & Muscular Pain Oil" },
    { label: "Form", value: "Topical Ayurvedic Oil" },
    { label: "Single Bottle Price", value: "₹286 (+ ₹80 delivery)" },
    { label: "2 Bottles Bundle", value: "₹499 (+ ₹80 delivery) — BEST VALUE" },
    { label: "Delivery Charge", value: "₹80" },
    { label: "MRP (Single)", value: "₹493" },
    { label: "Offer (Single)", value: "42% OFF" },
    { label: "Formula Heritage", value: "Barson Purane Ayurvedic Formula" },
    { label: "Key Ingredients", value: "12 Ayurvedic Jadi-Butiyan" },
    { label: "Safety", value: "Chemical-Free, No Side Effect" },
    { label: "Usage", value: "Apply 3–5 drops and massage gently" }
  ],

  // FAQs
  faqs: [
    {
      question: "How do I use Allmoali Joint & Muscular Pain Oil?",
      answer: "Apply 3–5 drops to the affected joint or muscular area and gently massage for 2 minutes until absorbed."
    },
    {
      question: "What makes Allmoali formula unique?",
      answer: "Allmoali is inspired by a barson purane Ayurvedic formula enriched with 12 Ayurvedic jadi-butiyan for deep penetration, fast absorption, and a non-sticky feel."
    },
    {
      question: "Does Allmoali have any side effects?",
      answer: "Allmoali is a natural Ayurvedic, chemical-free massage oil with no known side effects for everyday topical application."
    },
    {
      question: "Can I use it for winter joint care and exercise recovery?",
      answer: "Yes, Allmoali is specially formulated for winter joint care, post-yoga and exercise recovery, and targeted massage care for knees, back, shoulders, and elbows."
    },
    {
      question: "Is Cash on Delivery available?",
      answer: "Yes, Cash on Delivery (COD) is available nationwide."
    },
    {
      question: "What is the price of Allmoali Joint & Muscular Pain Oil?",
      answer: "A single bottle is ₹286 (MRP ₹493, 42% OFF) + ₹80 delivery. The 2 Bottles Bundle is ₹499 + ₹80 delivery (BEST VALUE)."
    }
  ] as FaqItem[]
};
