import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Coffee,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Flame,
  Leaf,
  Droplets,
  HeartHandshake,
  Compass,
  Quote,
} from "lucide-react";
import FinalCTA from "../sections/FinalCTA";

export default function About() {
  useEffect(() => {
    document.title = "Our Heritage & Philosophy | EMBER & BEAN";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const coffeeProcessSteps = [
    {
      phase: "Origin Sourcing",
      title: "Ethical Direct-Trade",
      desc: "We partner directly with heritage micro-lot farms in Sidama, Ethiopia and Antioquia, Colombia, ensuring regenerative agricultural methods and fair living wages.",
      icon: Leaf,
      spec: "1,900m+ Altitude • Heirloom Varieties",
    },
    {
      phase: "Thermodynamics",
      title: "Micro-Batch Roasting",
      desc: "Our custom Giesen roasters calibrate precise thermodynamic airflow curves to unlock chocolate malt, jasmine floral notes, and delicate stone fruit acidity.",
      icon: Flame,
      spec: "Custom Airflow • Cast-Iron Drum",
    },
    {
      phase: "Particle Science",
      title: "Micron Calibration",
      desc: "Titanium flat burrs calibrate particle distribution to the exact sub-millimeter requirement for each brewing method, eliminating astringent over-extraction.",
      icon: Droplets,
      spec: "Sub-Micron Tolerance • Zero Retention",
    },
    {
      phase: "Extraction",
      title: "Pressure & Temperature",
      desc: "Remineralized alkaline water at 92.5°C and 9 bars of saturated pressure yields thick, golden hazelnut crema with unparalleled lingering sweetness.",
      icon: Coffee,
      spec: "9 Bars Saturated • 92.5°C Stability",
    },
  ];

  const pillarHighlights = [
    {
      label: "Direct Farm Trade",
      detail: "Ethiopian & Colombian volcanic micro-lots",
    },
    {
      label: "Thermodynamic Roasting",
      detail: "Small-batch cast-iron profile monitoring",
    },
    {
      label: "Slow Fermentation",
      detail: "18-hour brioche & 48-hour wild sourdough",
    },
    {
      label: "Zero-Additive Standard",
      detail: "Pasture-raised meats & organic hydroponics",
    },
  ];

  return (
    <div className="bg-brand-vantablack min-h-screen text-brand-cream pt-24 sm:pt-28">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative py-14 sm:py-18 lg:py-24 overflow-hidden border-b border-brand-warmSand/10">
        {/* Ambient Radial Golden Aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-brand-gold/[0.045] rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-5 right-10 w-[400px] h-[400px] bg-brand-sandBeige/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-deepBlack/90 border border-brand-gold/30 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.25em] font-bold shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Our Heritage & Craftsmanship</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-brand-cream"
          >
            Dedicated To The Rare <br />
            <span className="italic font-normal text-brand-sandBeige">Alchemy Of Flavour.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
            className="text-sm sm:text-base text-brand-warmSand/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Born from an unyielding obsession with fire-roasting precision and haute culinary
            craft, EMBER & BEAN is a sanctuary for those who seek the extraordinary in every single sip and bite.
          </motion.p>

          {/* 4 Pillar Quick Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-4xl mx-auto text-left"
          >
            {pillarHighlights.map((pillar, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-brand-deepBlack/80 border border-brand-warmSand/15 hover:border-brand-gold/40 transition-colors shadow-sm"
              >
                <div className="flex items-center space-x-1.5 text-brand-gold text-[10px] font-accent uppercase tracking-wider font-bold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>{pillar.label}</span>
                </div>
                <p className="text-[11px] text-brand-warmSand/85 font-light leading-snug">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 2. OUR STORY (EDITORIAL SPLIT) ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-deepBlack/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Visual Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-brand-warmSand/20 bg-brand-deepBlack shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                  alt="Ember & Bean Founders and Roastery"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-vantablack/90 via-brand-vantablack/30 to-transparent pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-5 left-5 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-deepBlack/85 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[10px] font-accent uppercase tracking-[0.2em] font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span>Direct Trade Partnerships</span>
                </div>

                {/* Bottom Card Overlay */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-brand-deepBlack/85 backdrop-blur-md border border-brand-warmSand/15">
                  <span className="text-[10px] font-accent uppercase tracking-[0.2em] text-brand-gold font-bold block mb-1">
                    Established 2018
                  </span>
                  <p className="text-xs text-brand-warmSand/90 font-light leading-snug">
                    Dedicated micro-lot roastery and culinary kitchen in Bandra West, Mumbai.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Narrative Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-5 text-left"
            >
              <div className="inline-flex items-center space-x-2 text-brand-gold text-xs font-accent uppercase tracking-[0.25em] font-bold">
                <Flame className="w-4 h-4 text-brand-gold" />
                <span>The Genesis Story</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-tight leading-[1.15]">
                From A Passionate Roasting Garage <br className="hidden sm:inline" />
                <span className="italic font-normal text-brand-sandBeige">To A Culinary Sanctuary</span>
              </h2>

              <p className="text-sm text-brand-warmSand/80 leading-relaxed font-light">
                In 2018, our journey commenced with a singular vintage 5kg drum roaster and an unwavering conviction:
                that specialty coffee could possess the aromatic nuance of a grand cru vintage, and honest kitchen food
                could marry comfort with Michelin-level precision.
              </p>

              <p className="text-sm text-brand-warmSand/80 leading-relaxed font-light">
                What began as intimate cupping sessions for dedicated baristas quickly blossomed into a vibrant home for
                thinkers, creators, and culinary connoisseurs. Today, EMBER & BEAN crafts hundreds of hand-poured cups
                daily, staying strictly faithful to small-batch, zero-compromise integrity.
              </p>

              {/* Founder Quote Callout */}
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-deepBlack/80 border border-brand-gold/25 relative overflow-hidden">
                <div className="flex items-start space-x-3">
                  <Quote className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-brand-cream italic font-heading leading-relaxed">
                      "True luxury is not extravagance; it is uncompromised respect for the raw ingredient, extracted with patience and fire."
                    </p>
                    <span className="text-[10px] font-accent uppercase tracking-widest text-brand-gold font-bold block pt-1">
                      — Founders & Master Roasters
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 3. MISSION & VISION BENTO ================= */}
      <section className="py-16 sm:py-20 lg:py-22 bg-brand-vantablack relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 space-y-2.5">
            <span className="text-xs font-accent uppercase tracking-[0.25em] text-brand-gold font-bold">
              Our Compass
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-cream tracking-tight">
              Purpose & Principles
            </h2>
            <p className="text-xs sm:text-sm text-brand-warmSand/80 font-light leading-relaxed">
              Every decision we make, from the farms we patronize to the tables we polish, is guided by two pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Card 1: Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="bg-brand-deepBlack/70 border border-brand-warmSand/15 hover:border-brand-gold/60 rounded-3xl p-7 sm:p-9 space-y-4 shadow-xl transition-all duration-400 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-deepBlack transition-colors duration-300">
                <Award className="w-5 h-5" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                Our Culinary Mission
              </h3>

              <p className="text-xs sm:text-sm text-brand-warmSand/80 leading-relaxed font-light">
                To elevate everyday dining rituals by serving impeccably sourced specialty coffees,
                chef-crafted cuisine, and genuine, unpretentious hospitality within an atmosphere of architectural warmth.
              </p>

              <div className="pt-2 space-y-2 border-t border-brand-warmSand/10">
                <div className="flex items-center space-x-2 text-xs text-brand-sandBeige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Fair compensation for origin farm communities</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-brand-sandBeige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Seasonal culinary menus celebrating local terroir</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-brand-deepBlack/70 border border-brand-warmSand/15 hover:border-brand-gold/60 rounded-3xl p-7 sm:p-9 space-y-4 shadow-xl transition-all duration-400 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-deepBlack transition-colors duration-300">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                Our Architectural Vision
              </h3>

              <p className="text-xs sm:text-sm text-brand-warmSand/80 leading-relaxed font-light">
                To create a global benchmark in experiential dining where sustainable agriculture,
                tactile Scandinavian interiors, and sensory pleasure unite into an unforgettable daily ritual.
              </p>

              <div className="pt-2 space-y-2 border-t border-brand-warmSand/10">
                <div className="flex items-center space-x-2 text-xs text-brand-sandBeige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Zero single-use plastics & closed-loop composting</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-brand-sandBeige">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Sanctuary spaces engineered for focused work and conversation</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 4. ROASTING CRAFT PROCESS (NO NUMBER COUNTERS) ================= */}
      <section className="py-16 sm:py-20 lg:py-22 bg-brand-deepBlack/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-deepBlack border border-brand-gold/30 text-brand-gold text-[10px] font-accent uppercase tracking-[0.2em] font-bold">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>Seed To Cup</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-tight">
              Precision Roasting Craft
            </h2>
            <p className="text-xs sm:text-sm text-brand-warmSand/80 leading-relaxed font-light">
              Every detail is calibrated to capture the pure expression of the coffee's origin and altitude.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {coffeeProcessSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-brand-deepBlack/80 border border-brand-warmSand/15 rounded-2xl p-6 flex flex-col justify-between hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Top Phase Header with Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-accent uppercase tracking-[0.2em] text-brand-gold font-bold">
                        {step.phase}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-brand-vantablack border border-brand-warmSand/15 group-hover:border-brand-gold/50 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-deepBlack transition-all duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-brand-warmSand/80 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Craft Spec Pill */}
                  <div className="pt-4 mt-4 border-t border-brand-warmSand/10">
                    <span className="text-[10px] text-brand-sandBeige font-accent font-medium block">
                      {step.spec}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5. FRESH INGREDIENTS STORY (CULINARY INTEGRITY) ================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-vantablack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-5 text-left"
            >
              <span className="text-xs font-accent uppercase tracking-[0.3em] text-brand-gold font-bold">
                Culinary Integrity
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-tight leading-tight">
                Wholesome Earth, <br className="hidden sm:inline" />
                <span className="italic font-normal text-brand-sandBeige">Uncompromised Flavor.</span>
              </h2>

              <p className="text-sm text-brand-warmSand/80 leading-relaxed font-light">
                We strictly refuse shortcuts. Our brioche buns are slow-fermented for 18 hours using
                French cultured butter. Our crisp salad greens arrive daily before sunrise from organic
                hydroponic greenhouses nestled in the Sahyadri foothills.
              </p>

              {/* Checklist Badges */}
              <div className="space-y-2.5 pt-2">
                {[
                  "Zero artificial preservatives, emulsifiers, or trans fats",
                  "100% pasture-raised, hormone-free heritage poultry",
                  "Cold-pressed extra virgin olive oil & single-origin spices",
                  "Living sourdough mother starter nurtured since 2018",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-2.5 rounded-xl bg-brand-deepBlack/80 border border-brand-warmSand/15 text-xs text-brand-cream/90 font-light"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Asymmetric Image Duo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5"
            >
              <div className="relative rounded-2xl overflow-hidden border border-brand-warmSand/20 h-60 sm:h-72 bg-brand-deepBlack shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
                  alt="Gourmet Burger Prep"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-vantablack/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-accent uppercase tracking-wider text-brand-gold font-bold block">
                    Slow-Ferment Brioche
                  </span>
                  <span className="text-xs text-brand-cream/90 font-light">Double-Smashed Wagyu</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-brand-warmSand/20 h-60 sm:h-72 bg-brand-deepBlack shadow-xl mt-6 group">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
                  alt="Fresh Organic Greens"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-vantablack/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-accent uppercase tracking-wider text-brand-gold font-bold block">
                    Zero-Mile Harvest
                  </span>
                  <span className="text-xs text-brand-cream/90 font-light">Organic Farm Produce</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <FinalCTA />
    </div>
  );
}
