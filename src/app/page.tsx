"use client";

import React, { useState, useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RootCauseAction from "@/components/RootCauseAction";
import TrustStrip from "@/components/TrustStrip";
import ProductShowcase from "@/components/ProductShowcase";
import CareSection from "@/components/CareSection";
import PainkillerPositioning from "@/components/PainkillerPositioning";
import StorySection from "@/components/StorySection";
import WhyAllmoali from "@/components/WhyAllmoali";
import WhatsInside from "@/components/WhatsInside";
import ProductExperience from "@/components/ProductExperience";
import UseCases from "@/components/UseCases";
import HowToUse from "@/components/HowToUse";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import LifestyleSection from "@/components/LifestyleSection";
import PackagingGallery from "@/components/PackagingGallery";
import Reviews from "@/components/Reviews";
import ProductDetails from "@/components/ProductDetails";
import OfferSection from "@/components/OfferSection";
import CODTrust from "@/components/CODTrust";
import FAQ from "@/components/FAQ";
import BrandStory from "@/components/BrandStory";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

// Modals
import OrderDrawer from "@/components/OrderDrawer";
import ZoomGallery from "@/components/ZoomGallery";

import { trackEvent } from "@/utils/analytics";
import { PRODUCT_CONFIG } from "@/config/product";

export default function Home() {
  // Modal states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<1 | 2>(2); // 2 = Bundle Offer (default), 1 = Single Bottle
  
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    // Track standard ViewContent page load event
    trackEvent("ViewContent", {
      content_name: PRODUCT_CONFIG.productName,
      content_category: "Ayurvedic Care",
      value: PRODUCT_CONFIG.sellingPrice,
      currency: "INR",
    });
  }, []);

  const openDrawer = (pkg: 1 | 2 = 2) => {
    setSelectedPackage(pkg);
    setIsDrawerOpen(true);
  };

  const openGallery = (idx = 0) => {
    setGalleryIndex(idx);
    setIsGalleryOpen(true);
  };

  return (
    <>
      {/* 1. ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. NAVBAR */}
      <Navbar onOrderClick={() => openDrawer(selectedPackage)} />

      <main className="flex-1 w-full">
        {/* 3. HERO SECTION */}
        <Hero onOrderClick={() => openDrawer(selectedPackage)} />

        {/* 3.5 ROOT-CAUSE ACTION SECTION */}
        <RootCauseAction />

        {/* 4. TRUST STRIP */}
        <TrustStrip />

        {/* 5. PRODUCT SHOWCASE */}
        <ProductShowcase
          onOrderClick={() => openDrawer(selectedPackage)}
          onGalleryClick={openGallery}
        />

        {/* 6. A LITTLE CARE GOES A LONG WAY */}
        <CareSection />

        {/* 6.5 PAINKILLER ALTERNATIVE POSITIONING */}
        <PainkillerPositioning />

        {/* 7. 12 JADI-BUTIYAN FORMULA STORY */}
        <StorySection />

        {/* 8. WHY ALLMOALI */}
        <WhyAllmoali />

        {/* 9. WHAT'S INSIDE */}
        <WhatsInside />

        {/* 10. PRODUCT EXPERIENCE */}
        <ProductExperience />

        {/* 11. EVERYDAY USE CASES */}
        <UseCases />

        {/* 12. ALLMOALI ROUTINE */}
        <HowToUse />

        {/* 13. INTERACTIVE PRODUCT SHOWCASE */}
        <InteractiveShowcase />

        {/* 14. LIFESTYLE SECTION */}
        <LifestyleSection onOrderClick={() => openDrawer(selectedPackage)} />

        {/* 15. PACKAGING GALLERY */}
        <PackagingGallery onGalleryClick={openGallery} />

        {/* 16. CUSTOMER REVIEWS */}
        <Reviews />

        {/* 17. PRODUCT DETAILS */}
        <ProductDetails />

        {/* 18. SPECIAL OFFER */}
        <OfferSection onOrderClick={(pkg) => openDrawer(pkg as 1 | 2)} />

        {/* 19. COD / SHIPPING */}
        <CODTrust />

        {/* 20. FAQ */}
        <FAQ />

        {/* 21. BRAND STORY */}
        <BrandStory />

        {/* 22. CONTACT */}
        <Contact />

        {/* 23. FINAL CTA */}
        <FinalCTA />
      </main>

      {/* 24. FOOTER */}
      <Footer />

      {/* 25. MOBILE STICKY CTA */}
      <MobileStickyCTA 
        selectedPackage={selectedPackage} 
        onOrderClick={(pkg) => openDrawer(pkg)} 
        isDrawerOpen={isDrawerOpen} 
      />

      {/* Drawer & Slideshow Overlay Portals */}
      <OrderDrawer
        key={isDrawerOpen ? `drawer-${selectedPackage}` : "drawer-closed"}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialQty={selectedPackage}
      />

      <ZoomGallery
        key={isGalleryOpen ? `gallery-${galleryIndex}` : "gallery-closed"}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryIndex}
      />
    </>
  );
}
