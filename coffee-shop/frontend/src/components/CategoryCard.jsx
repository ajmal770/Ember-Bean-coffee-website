import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function CategoryCard({ category, index = 0, onCardClick }) {
  const navigate = useNavigate();
  if (!category) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      onClick={(e) => {
        if (onCardClick) onCardClick(e);
        if (!e.defaultPrevented) {
          navigate(`/menu?category=${category.slug}`);
        }
      }}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-brand-secondary h-[350px] sm:h-[360px] lg:h-[370px] w-full flex flex-col justify-end p-5 sm:p-6 shadow-xl hover:border-brand-gold/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(233,185,73,0.15)] transition-all duration-500 cursor-pointer select-none"
    >
      {/* 1. Background Image with Cinematic Zoom & Brightness */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out"
        />
        
        {/* Layered Gradient: Top soft shade, bottom rich dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25 group-hover:via-black/55 transition-colors duration-500" />
        
        {/* Ambient Golden Corner Shimmer on Hover */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-gold/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>

      {/* 2. Top Bar: Interactive Circular Arrow Button (Clean, count-free) */}
      <div className="relative z-10 flex items-center justify-end mb-auto">
        <div className="w-9 h-9 rounded-full bg-black/75 backdrop-blur-md border border-white/20 group-hover:border-brand-gold/80 flex items-center justify-center text-brand-cream group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 group-hover:scale-110 shadow-lg">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* 3. Bottom Information & Callout */}
      <div className="relative z-10 flex flex-col pt-4">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gold transition-colors duration-300 mb-2 tracking-tight">
          {category.name}
        </h3>

        <p className="text-xs text-[#C4BCB3] leading-relaxed line-clamp-2 mb-3.5 font-light">
          {category.description}
        </p>

        {/* Action Link with Expanding Golden Indicator */}
        <div className="inline-flex items-center space-x-2 text-xs font-accent uppercase tracking-[0.2em] text-brand-sand group-hover:text-brand-gold font-bold transition-colors">
          <span>Explore Category</span>
          <span className="w-4 h-[1.5px] bg-brand-sand/60 group-hover:bg-brand-gold group-hover:w-8 transition-all duration-300" />
          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>

      {/* 4. Subtle Bottom Edge Gold Highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
