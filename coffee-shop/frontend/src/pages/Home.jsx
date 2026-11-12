import React, { useEffect } from "react";
import Hero from "../sections/Hero";
import WhyChooseUs from "../sections/WhyChooseUs";
import FeaturedCategories from "../sections/FeaturedCategories";
import BestSellers from "../sections/BestSellers";
import AboutPreview from "../sections/AboutPreview";
import SpecialOffers from "../sections/SpecialOffers";
import Testimonials from "../sections/Testimonials";
import Gallery from "../sections/Gallery";
import FinalCTA from "../sections/FinalCTA";

export default function Home() {
  useEffect(() => {
    document.title = "EMBER & BEAN | Good Coffee. Great Food. Better Moments.";
  }, []);

  return (
    <div className="bg-brand-vantablack min-h-screen text-brand-cream overflow-hidden">
      <Hero />
      <WhyChooseUs />
      <FeaturedCategories />
      <BestSellers />
      <AboutPreview />
      <SpecialOffers />
      <Testimonials />
      <Gallery />
      <FinalCTA />
    </div>
  );
}
