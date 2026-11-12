import React from "react";
import { motion } from "framer-motion";
import { Leaf, Coffee, UtensilsCrossed, HeartHandshake, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Leaf,
      title: "Finest Plantations",
      tagline: "100% Single-Origin",
      description:
        "Direct trade with smallholder farms in high-altitude volcanic terroirs. Hand-harvested red cherries, zero compromises on ethical sustainability.",
      highlight: "Ethically Sourced",
    },
    {
      icon: Coffee,
      title: "Artisan Micro-Roasting",
      tagline: "Roasted To Order",
      description:
        "Every batch is roasted only after you order. Our roast masters calibrate air-flow and drum temperature to unlock complex floral and cacao notes.",
      highlight: "Small-Batch Crafted",
    },
    {
      icon: UtensilsCrossed,
      title: "Haute Kitchen Creations",
      tagline: "Fresh Gastronomy",
      description:
        "From crisp 24-hour buttermilk-brined chicken to prime smashed burgers and garden salads, every recipe is crafted to complement our roasts.",
      highlight: "Scratch-Made Daily",
    },
    {
      icon: HeartHandshake,
      title: "Delivered Fresh To Your Door",
      tagline: "Unrivalled Hospitality",
      description:
        "Nitrogen-flushed degas valved pouches preserve peak aromatic freshness within 24 hours of roasting, straight to your doorstep or table.",
      highlight: "Nitrogen Fresh-Sealed",
    },
  ];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-deepBlack relative overflow-hidden">
      {/* Subtle Ambient Golden Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-gold/[0.03] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-sandBeige/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3.5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-vantablack/80 border border-brand-gold/30 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.25em] font-bold shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span>The Ember & Bean Standard</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-tight leading-[1.14]"
          >
            Why <span className="text-brand-gold">Ember & Bean</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-[15px] text-brand-warmSand/80 leading-[1.8] font-light max-w-xl mx-auto"
          >
            Our unwavering dedication to artisanal fire-roasting, single-origin sourcing, and gourmet cuisine
            ensures every single sip and bite elevates your daily ritual.
          </motion.p>
        </div>

        {/* 4 Feature Cards (Without Numbers/Counts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-brand-deepBlack/95 via-brand-secondary to-brand-vantablack/95 backdrop-blur-xl border border-brand-warmSand/15 hover:border-brand-gold/50 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(233,185,73,0.12)] transition-all duration-500 flex flex-col justify-between cursor-pointer overflow-hidden select-none"
              >
                {/* Ambient Golden Top Corner Light */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-gold/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Luxury Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-vantablack border border-brand-warmSand/15 group-hover:border-brand-gold/60 flex items-center justify-center text-brand-gold shadow-lg group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-deepBlack transition-all duration-400 mb-6">
                    <Icon className="w-6 h-6 transition-transform duration-300" />
                  </div>

                  {/* Tagline Badge */}
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-[10px] font-accent uppercase tracking-[0.2em] font-bold mb-3 group-hover:bg-brand-gold/20 transition-colors">
                    <span>{feature.tagline}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-2.5 tracking-tight leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-brand-warmSand/80 leading-[1.75] font-light">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Interactive Feature Highlight (Zero Number Counts) */}
                <div className="pt-5 mt-6 border-t border-brand-warmSand/10 flex items-center justify-between text-xs text-brand-sandBeige/80 group-hover:text-brand-warmSand transition-colors font-accent">
                  <span className="font-medium tracking-wide">{feature.highlight}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-gold" />
                </div>

                {/* Subtle Bottom Gold Gradient Edge on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
