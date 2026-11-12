import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Devika Malhotra",
      role: "Culinary Critic, Epicurean Gazette",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      content:
        "EMBER & BEAN represents the pinnacle of third-wave coffee in India. The precision of their single-origin espresso extraction paired with the unadulterated crunch of their buttermilk fried chicken is nothing short of transcendent.",
    },
    {
      id: 2,
      name: "Rohan Singhania",
      role: "Architect & Frequent Patron",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      content:
        "The ambience is pure Scandinavian minimalism bathed in warm sand and black tones. It's my daily workspace sanctuary where the Cappuccino never misses, and the Double Cheese Burger is genuinely life-changing.",
    },
    {
      id: 3,
      name: "Aanya Sen",
      role: "Sommelier & Food Enthusiast",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      content:
        "Every salad dressing is emulsified in-house; you can taste the quality of the cold-pressed olive oil and aged feta. EMBER & BEAN proves that casual bistro fare can be elevated to Michelin-level craft.",
    },
    {
      id: 4,
      name: "Vikramaditya Roy",
      role: "Coffee Roaster & Educator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      content:
        "Their barista team actually understands extraction yield, total dissolved solids, and origin terroir. Hands down the cleanest, richest Caramel Macchiato and Nitro Cold Brew in town.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-deepBlack relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-brand-gold text-xs font-accent uppercase tracking-[0.25em] font-bold">
            <Quote className="w-4 h-4" />
            <span>Patron Voices</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream">
            Moments Felt & Shared
          </h2>
          <p className="text-sm text-brand-warmSand/80 leading-relaxed font-light">
            Read what gastronomy enthusiasts, roasters, and daily visitors have to say about
            their time with us.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-brand-vantablack/90 border border-brand-warmSand/15 rounded-3xl p-8 sm:p-12 shadow-2xl relative"
            >
              <Quote className="w-12 h-12 text-brand-gold/15 absolute top-8 right-8 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center space-x-1 text-brand-gold mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold" />
                ))}
              </div>

              {/* Feedback Content */}
              <p className="font-heading text-lg sm:text-2xl text-brand-cream leading-relaxed mb-8 italic">
                "{current.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4 border-t border-brand-warmSand/10 pt-6">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold/40 shadow-md"
                />
                <div>
                  <h4 className="font-heading text-base font-bold text-brand-cream">
                    {current.name}
                  </h4>
                  <span className="text-xs text-brand-sandBeige font-accent">
                    {current.role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls (Without Number Counters) */}
          <div className="flex items-center justify-between mt-8 px-4">
            <div className="flex items-center space-x-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex ? "w-6 bg-brand-gold" : "w-1.5 bg-brand-warmSand/30 hover:bg-brand-warmSand/60"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-brand-warmSand/20 bg-brand-deepBlack text-brand-cream hover:text-brand-gold hover:border-brand-gold/50 flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-brand-warmSand/20 bg-brand-deepBlack text-brand-cream hover:text-brand-gold hover:border-brand-gold/50 flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

