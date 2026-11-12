import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import CoffeeSteam from "../components/CoffeeSteam";

export default function Hero() {
  return (
    <section className="relative bg-brand-vantablack pt-24 sm:pt-26 lg:pt-28 pb-12 sm:pb-14 lg:pb-16 overflow-hidden text-brand-cream border-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        {/* Balanced grid layout with zero excess vertical gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT SIDE: Editorial Typography & CTAs ================= */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Editorial Headline: Exact visual match to reference image with balanced scale and zero line-wrapping */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-brand-cream leading-[1.08] tracking-tight"
            >
              Good Coffee. <br />
              <span className="italic font-normal text-brand-sandBeige">Great Food.</span> <br />
              <span className="inline-block whitespace-nowrap">
                <span className="text-brand-gold">Better </span>
                <span className="text-brand-cream">Moments.</span>
              </span>
            </motion.h1>

            {/* Editorial Description: Decreased text size, refined luxury styling matching reference image */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-[15px] md:text-base text-brand-warmSand/80 max-w-lg font-body leading-[1.75] font-light pt-2 tracking-wide"
            >
              Start your day with coffee, enhancing productivity and mood. <br className="hidden sm:inline" />
              Its invigorating aroma sets a focused tone for tackling tasks <br className="hidden sm:inline" />
              with renewed energy and positivity.
            </motion.p>

            {/* Two Action Buttons - Sits in eye-level harmony with the Cup & Saucer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/menu"
                className="group inline-flex items-center space-x-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-accent text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold shadow-xl shadow-brand-gold/25 transition-all duration-300 hover:scale-105 active:scale-95 border-none"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center space-x-2 bg-transparent hover:bg-brand-deepBlack/80 text-brand-cream hover:text-brand-gold border border-brand-warmSand/20 hover:border-brand-gold/50 font-accent text-xs uppercase tracking-widest px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* ================= RIGHT SIDE: Perfectly Positioned Steaming Cup & Saucer ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative mt-6 lg:mt-0 flex items-center justify-center lg:justify-end select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[620px] flex items-center justify-center lg:justify-end"
            >
              <img
                src="/hero_cup_borderless.png"
                onError={(e) => {
                  e.currentTarget.src = "/hero_cup_aligned.png";
                }}
                alt="Steaming Hot Coffee Cup and Saucer"
                className="w-full h-auto max-h-[440px] sm:max-h-[500px] md:max-h-[560px] lg:max-h-[600px] xl:max-h-[640px] object-contain object-center select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />

              {/* Realistic Animated Hot Coffee & Tea Steam Effect */}
              <CoffeeSteam />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 sm:mt-8 flex flex-col items-center justify-center text-center text-brand-muted"
        >
          <span className="text-[10px] font-accent uppercase tracking-[0.3em] mb-2 text-brand-sand">
            Scroll To Discover
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-brand-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
