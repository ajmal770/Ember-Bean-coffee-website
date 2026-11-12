import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { categories } from "../data/menuData";
import CategoryCard from "../components/CategoryCard";

export default function FeaturedCategories() {
  const carouselRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Smooth drag-to-scroll handling for desktop mouse users
  const handleMouseDown = (e) => {
    const el = carouselRef.current;
    if (!el) return;
    isDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDownRef.current = false;
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    const el = carouselRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-deepBlack relative overflow-hidden select-none">
      {/* Dynamic Ambient Glow Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-gold/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-sandBeige/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Staggered Fade Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 border-b border-brand-warmSand/10 pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3 max-w-xl text-left"
          >
            {/* Top Curated Collections Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-vantablack/80 border border-brand-gold/30 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.25em] font-bold shadow-sm">
              <Compass className="w-3.5 h-3.5 animate-spin-slow text-brand-gold" />
              <span>Curated Collections</span>
            </div>

            {/* Artisanal Selections Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-tight leading-[1.12]">
              Artisanal Selections for <br className="hidden sm:inline" />
              <span className="italic font-normal text-brand-sandBeige">Every Craving</span>
            </h2>

            {/* Description */}
            <p className="text-sm text-brand-warmSand/80 font-light leading-relaxed max-w-lg">
              Explore our six specialized culinary pillars, each crafted by world-class
              culinarians and dedicated roasters using premier ingredients.
            </p>
          </motion.div>

          {/* Right Header Action: View All Creations Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <Link
              to="/menu"
              className="group inline-flex items-center space-x-2.5 text-xs font-accent uppercase tracking-[0.2em] text-brand-sandBeige hover:text-brand-gold font-bold transition-all duration-300 py-2.5 px-5 rounded-full border border-brand-warmSand/15 hover:border-brand-gold/50 bg-brand-deepBlack/80 hover:bg-brand-deepBlack shadow-md hover:scale-105 active:scale-95"
            >
              <span>View Complete Menu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 text-brand-gold" />
            </Link>
          </motion.div>
        </div>

        {/* ================= CAROUSEL TRACK (Clean horizontal swipe / drag) ================= */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="carousel-card w-[270px] sm:w-[310px] md:w-[330px] lg:w-[350px] flex-shrink-0 snap-start"
            >
              <CategoryCard
                category={cat}
                index={idx}
                onCardClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
