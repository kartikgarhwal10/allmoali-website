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
  rating: number;
  author: string;
  text: string;
  isDemo: boolean;
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
}

export const PRODUCT_CONFIG = {
  brandName: "Allmoali",
  productName: "Joint & Muscular Pain Oil",
  tagline: "A traditional Ayurvedic oil for your everyday massage routine.",
  secondaryTagline: "50-year-old formula · Fast absorbing · Non-sticky",
  mrp: 493,
  discount: 42, // % OFF
  sellingPrice: 285, // Configurable
  whatsappNumber: "919110099087", // Configurable WhatsApp destination (+91 9110099087)
  whatsappMessage: "Hi, I want to order Allmoali Joint & Muscular Pain Oil. Please share the order details.",
  email: "info@allmoali.com",
  codAvailable: true,
  demoDisclaimer: "Product information shown on this demo is based on the requirements provided by the brand. Final claims, usage instructions, ingredients, warnings, pricing, shipping information and regulatory details should be verified against the actual product packaging and brand information before launch.",
  
  // V2 Why Allmoali Cards
  whyAllmoali: [
    {
      id: "01",
      title: "A FORMULA WITH HISTORY",
      description: "Inspired by a 50-year-old Ayurvedic formulation."
    },
    {
      id: "02",
      title: "A TEXTURE YOU'LL ENJOY USING",
      description: "Lightweight and designed to absorb without leaving a heavy sticky feel."
    },
    {
      id: "03",
      title: "A ROUTINE THAT FITS INTO YOUR DAY",
      description: "Just a few drops, a gentle massage and you're done."
    }
  ] as WhyCard[],

  // V2 Ingredients Info
  ingredientsDisclaimer: "Ingredient information will be added from the final product packaging.",
  ingredientsList: [] as { name: string; description: string }[],

  // V2 Product Experience Cards
  productExperience: [
    {
      id: "01",
      title: "FAST ABSORBING",
      description: "Designed for comfortable application."
    },
    {
      id: "02",
      title: "NON-STICKY",
      description: "A lighter feel without a heavy greasy finish."
    },
    {
      id: "03",
      title: "PLEASANT AROMA",
      description: "A soft fragrance that makes the massage routine more enjoyable."
    }
  ] as ExperienceCard[],

  // V2 Everyday Use Cases
  useCases: [
    {
      title: "AFTER A LONG DAY",
      description: "For those moments when you want to slow down and massage tired areas."
    },
    {
      title: "AFTER PHYSICAL ACTIVITY",
      description: "Make massage part of your post-activity routine."
    },
    {
      title: "EVERYDAY SELF-CARE",
      description: "A simple addition to your regular personal-care routine."
    }
  ] as UseCaseCard[],

  // V2 Allmoali Routine Steps
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
      description: "Massage gently until the oil is absorbed.",
      detail: "Massage"
    },
    {
      number: "03",
      title: "RELAX",
      description: "Let massage become part of your regular routine.",
      detail: "Absorb"
    },
    {
      number: "04",
      title: "REPEAT",
      description: "Use as directed on the final product packaging.",
      detail: "Routine"
    }
  ] as StepItem[],

  // V2 Customer Reviews (Clearly marked demo content)
  reviews: [
    {
      rating: 5,
      author: "Demo Reviewer",
      text: "The lightweight texture makes it easy to use as part of my regular massage routine.",
      isDemo: true
    }
  ] as ReviewItem[],

  // V2 Product Details Specifications Accordion
  productDetailsSpecs: [
    { label: "Product", value: "Joint & Muscular Pain Oil" },
    { label: "Form", value: "Topical Oil" },
    { label: "MRP", value: "₹493" },
    { label: "Offer", value: "42% OFF" },
    { label: "Net Quantity", value: "[TO BE CONFIRMED]" },
    { label: "Ingredients", value: "[TO BE CONFIRMED]" },
    { label: "Shelf Life", value: "[TO BE CONFIRMED]" },
    { label: "Storage", value: "[TO BE CONFIRMED]" },
    { label: "Usage", value: "[TO BE CONFIRMED FROM PACKAGING]" }
  ],

  // V2 FAQs
  faqs: [
    {
      question: "How do I use Allmoali Joint & Muscular Pain Oil?",
      answer: "Apply 3–5 drops to the affected area and gently massage until absorbed."
    },
    {
      question: "Is the oil sticky?",
      answer: "It is designed to provide a lightweight, non-sticky feel."
    },
    {
      question: "How often should I use it?",
      answer: "Use according to the directions provided on the final product packaging."
    },
    {
      question: "Is Cash on Delivery available?",
      answer: "Yes, COD is available."
    },
    {
      question: "How can I order?",
      answer: "You can order directly through the website or via WhatsApp."
    },
    {
      question: "Where can I find ingredients and product details?",
      answer: "Refer to the final product packaging and product information supplied by Allmoali."
    }
  ] as FaqItem[]
};
