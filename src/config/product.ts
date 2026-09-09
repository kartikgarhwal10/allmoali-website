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
  brandName: "ALLMOALI",
  productName: "Joint & Muscular Pain Oil",
  netQuantity: "100 ml",
  tagline: "Rooted in a time-honoured Ayurvedic formula, enriched with 12 Ayurvedic Herbs.",
  secondaryTagline: "Based on a time-honoured Ayurvedic formula · Fast Absorbing · Non-Greasy",
  mrp: 493,
  discount: 42, // % OFF
  sellingPrice: 286, // Single Bottle Price
  bundlePrice: 499, // 2 PCS Bundle Price
  deliveryCharge: 80,
  deliveryDiscount: 80,
  finalDeliveryCharge: 0,
  whatsappNumber: "919110099087",
  whatsappMessage: "Hi, I want to order Allmoali Joint & Muscular Pain Oil for ₹286. Please share the order details.",
  email: "info@allmoali.com",
  codAvailable: true,
  demoDisclaimer: "Information on this website is provided for general product and self-care awareness only. Prescribed medicines should not be discontinued without professional medical advice.",
  
  // Strategic Root Cause Copy
  rootCauseHeading: "ROOT-CAUSE ACTION",
  rootCauseBody: "Unlike superficial lotions, Allmoali oil is formulated with traditional Ayurvedic herbs that penetrate deeply during massage to support everyday joint and muscular comfort.",

  // Story Copy
  storyHighlightLine1: "Most oils stay on the surface.",
  storyHighlightLine2: "This one penetrates deeply where discomfort lives.",
  storyBody: "Formulated for deep massage, this blend of 12 Ayurvedic herbs helps soothe muscular tension, promote relaxation, and support joint care as part of your daily self-care routine.",

  // Why Allmoali Cards
  whyAllmoali: [
    {
      id: "01",
      title: "NATURAL AYURVEDIC FORMULA",
      description: "Based on a time-honoured Ayurvedic formula, enriched with 12 Ayurvedic herbs."
    },
    {
      id: "02",
      title: "12 AYURVEDIC HERBS",
      description: "Crafted with a carefully selected blend of 12 time-tested Ayurvedic botanical herbs."
    },
    {
      id: "03",
      title: "FAST ABSORBING",
      description: "Lighter consistency designed to absorb quickly into the skin during massage."
    },
    {
      id: "04",
      title: "NON-GREASY FORMULA",
      description: "Non-sticky, comfortable application without leaving a greasy residue."
    },
    {
      id: "05",
      title: "DEEP PENETRATION",
      description: "Formulated for deep skin absorption to reach underneath target muscular areas."
    },
    {
      id: "06",
      title: "PLEASANT RELAXING AROMA",
      description: "A soothing, relaxing aroma that enhances your daily wellness massage routine."
    },
    {
      id: "07",
      title: "GENTLE TOPICAL CARE",
      description: "Natural Ayurvedic herbal formulation designed for everyday topical massage."
    }
  ] as WhyCard[],

  // Actual Ingredients supplied by client visual
  ingredientsDisclaimer: "Enriched with time-tested Ayurvedic herbs for joint & muscular care.",
  ingredientsList: [
    { name: "ALSI", part: "Seeds", quantity: "0.025ml", form: "Oil", description: "Rich in essential fatty acids for joint mobility and comfort." },
    { name: "KAPOOR", part: "Resin", quantity: "0.025ml", form: "Oil", description: "Provides instant soothing warmth and relieves muscle stiffness." },
    { name: "PUDINA", part: "Leaves", quantity: "0.025ml", form: "Oil", description: "Delivers cooling freshness and relaxes strained muscles." },
    { name: "GANDHAPURA KA TAIL", part: "Fruit", quantity: "0.025ml", form: "Oil", description: "Traditional Ayurvedic extract known for anti-inflammatory support." },
    { name: "NIRGUNDI", part: "Leaves", quantity: "0.025ml", form: "Oil", description: "Time-tested herb prized in Ayurveda for joint & tissue ease." },
    { name: "MALKAGINI", part: "Seeds", quantity: "0.025ml", form: "Oil", description: "Renowned botanical extract supporting nerve and muscular relaxation." },
    { name: "TILL", part: "Seeds", quantity: "0.9ml", form: "Oil", description: "Nourishing base oil ensuring deep skin absorption and warmth." },
    { name: "SALAI", part: "Seeds", quantity: "0.025ml", form: "Oil", description: "Ayurvedic Boswellia herb supporting joint flexibility and swelling reduction." },
    { name: "LAUNG", part: "Flower Bud", quantity: "0.0125ml", form: "Oil", description: "Clove oil providing soothing comfort to sore and tired areas." },
    { name: "SHUDH GUGGAL", part: "Rhizomes", quantity: "20 MG", form: "Extract", description: "Potent traditional resin for long-term joint health and vitality." },
    { name: "HALDI (EXTRACT)", part: "Haldi", quantity: "30 MG", form: "Extract", description: "Concentrated Curcumin extract targeting inflammation pathways." },
    { name: "MENTHOL / PEPPERMINT", part: "Leaves", quantity: "0.025 ml", form: "Extract", description: "Soothing natural extract for pleasant aroma and cooling sensation." }
  ],

  // Product Experience Cards (4 Key Benefits)
  productExperience: [
    {
      id: "01",
      title: "FAST ABSORBING",
      description: "Quickly absorbs during massage for comfortable application."
    },
    {
      id: "02",
      title: "NON-GREASY",
      description: "Lightweight, non-sticky feel without leaving greasy stains."
    },
    {
      id: "03",
      title: "DEEP PENETRATION",
      description: "Reaches deeper to target inflammation pathways where discomfort lives."
    },
    {
      id: "04",
      title: "PLEASANT AROMA",
      description: "Relaxing natural fragrance for a soothing daily massage ritual."
    }
  ] as ExperienceCard[],

  // Targeted Everyday Use Areas
  useCases: [
    {
      title: "KNEE PAIN",
      description: "Specially beneficial for massage care around stiff or overworked knees.",
      highlight: "Knee Joint Care"
    },
    {
      title: "BACK DISCOMFORT",
      description: "Ideal for gentle back massage care after a long work day.",
      highlight: "Back Relaxation"
    },
    {
      title: "SHOULDER & ELBOW",
      description: "Relieves everyday tension and stiffness around shoulders and elbows.",
      highlight: "Upper Body Comfort"
    },
    {
      title: "ARTHRITIS CARE",
      description: "Specially formulated for daily gentle massage routines in arthritis discomfort.",
      highlight: "Arthritis Support"
    },
    {
      title: "MUSCULAR PAIN",
      description: "Effective support for daily muscular pain and post-strain recovery.",
      highlight: "Muscle Relief"
    },
    {
      title: "WINTER JOINT PAIN",
      description: "Provides comforting warmth and lubrication for joints during cold weather.",
      highlight: "Winter Care"
    },
    {
      title: "YOGA & EXERCISE",
      description: "Ideal post-workout oil to relax tired muscles after physical activity.",
      highlight: "Active Recovery"
    },
    {
      title: "DAILY WELLNESS",
      description: "Rozmarra ke joint aur muscular discomfort ke liye regular daily massage routine.",
      highlight: "Daily Ritual"
    }
  ] as UseCaseCard[],

  // Allmoali Routine Steps
  allmoaliRoutine: [
    {
      number: "01",
      title: "APPLY",
      description: "Apply 3–5 drops to the affected joint or muscular area.",
      detail: "3–5 drops"
    },
    {
      number: "02",
      title: "MASSAGE",
      description: "Massage gently for 2–3 minutes until the oil penetrates deeply.",
      detail: "Deep Massage"
    },
    {
      number: "03",
      title: "RELAX",
      description: "Let the 12 Ayurvedic herbs absorb naturally into inflammation pathways.",
      detail: "Absorb Naturally"
    },
    {
      number: "04",
      title: "REPEAT",
      description: "Include in your everyday morning or evening self-care routine.",
      detail: "Daily Habit"
    }
  ] as StepItem[],

  // Verified Customer Reviews
  reviews: [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Jaipur, Rajasthan",
      rating: 5,
      text: "The oil texture is very light. Massage karne ke baad chipchipa feel nahi hota. Deep penetration and fast absorption are excellent.",
      verified: true,
      avatar: "RK"
    },
    {
      id: 2,
      name: "Amit Sharma",
      location: "Indore, Madhya Pradesh",
      rating: 5,
      text: "Used this after gym and exercise. Muscular pain mein kaafi aaram milta hai. The aroma is very pleasant and relaxing.",
      verified: true,
      avatar: "AS"
    },
    {
      id: 3,
      name: "Sunita Sharma",
      location: "Lucknow, Uttar Pradesh",
      rating: 5,
      text: "Using regularly for my mother's knee joint care. Natural Ayurvedic herbal oil, very gentle and soothing.",
      verified: true,
      avatar: "SS"
    },
    {
      id: 4,
      name: "Anjali Verma",
      location: "Delhi",
      rating: 5,
      text: "Best for winter joint stiffness. Fast absorption helps it absorb quickly and brings long-lasting comfort.",
      verified: true,
      avatar: "AV"
    },
    {
      id: 5,
      name: "Priya Gupta",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "Premium bottle packaging and non-greasy formula. Massage ke baad uncomfortable sticky feeling bilkul nahi rehti.",
      verified: true,
      avatar: "PG"
    },
    {
      id: 6,
      name: "Rahul Verma",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "Great for back and shoulder massage after a long working day. Soothing fragrance and authentic Ayurvedic care.",
      verified: true,
      avatar: "RV"
    }
  ] as ReviewItem[],

  // Product Specifications Accordion
  productDetailsSpecs: [
    { label: "Brand", value: "ALLMOALI" },
    { label: "Product Name", value: "Joint & Muscular Pain Oil" },
    { label: "Net Quantity", value: "100 ml" },
    { label: "Form", value: "Topical Ayurvedic Oil" },
    { label: "Single Bottle Price", value: "₹286 (MRP ₹493, 42% OFF, Free Delivery)" },
    { label: "2 Bottles Bundle", value: "₹499 (BEST VALUE, Free Delivery)" },
    { label: "Standard Delivery Charge", value: "₹80 (Discounted to ₹0 with current offer)" },
    { label: "Formula Heritage", value: "Time-Honoured Ayurvedic Formula" },
    { label: "Key Ingredients", value: "12 Ayurvedic Herbs" },
    { label: "Safety Profile", value: "Natural Ayurvedic Herbal Formula for Gentle Topical Massage" },
    { label: "Usage Directions", value: "Apply 3–5 drops to affected area and massage gently" }
  ],

  // FAQs
  faqs: [
    {
      question: "How do I use Allmoali Joint & Muscular Pain Oil?",
      answer: "Apply 3–5 drops to the affected joint or muscular area and gently massage for 2 minutes until absorbed into the skin."
    },
    {
      question: "What makes Allmoali formula unique?",
      answer: "Allmoali is based on a time-honoured Ayurvedic formula enriched with 12 Ayurvedic herbs that absorb deeply during massage to support everyday joint and muscular comfort."
    },
    {
      question: "Is Allmoali suitable for everyday topical massage?",
      answer: "Yes, Allmoali is a natural Ayurvedic herbal topical oil designed for everyday gentle massage routines around areas experiencing muscular discomfort."
    },
    {
      question: "Can I use it for winter joint pain and exercise recovery?",
      answer: "Yes, Allmoali is ideal for winter joint care, post-yoga and exercise recovery, and targeted massage care for knees, back, shoulders, elbows, and muscular pain."
    },
    {
      question: "Is Cash on Delivery (COD) available?",
      answer: "Yes, Cash on Delivery (COD) is available nationwide with free delivery under the current offer."
    },
    {
      question: "What is the price of Allmoali Joint & Muscular Pain Oil?",
      answer: "A single 100 ml bottle is ₹286 (MRP ₹493, 42% OFF). The 2-Piece Bundle is ₹499 (BEST VALUE). Standard ₹80 delivery charge is fully discounted (FREE DELIVERY)."
    }
  ] as FaqItem[]
};

