import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Leaf, Sparkles, Award } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-vantablack relative overflow-hidden">
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-gold/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-sandBeige/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT COLUMN: Refined Visual Composition ================= */}
          <div className="lg:col-span-6 relative pb-6 sm:pb-8">
            {/* Ambient Backlight Glow */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl sm:rounded-[32px] overflow-hidden border border-brand-warmSand/20 bg-brand-deepBlack shadow-[0_25px_60px_rgba(0,0,0,0.9)] aspect-[4/5] max-h-[560px] group"
            >
              {/* Chemex Pour-over Coffee Crafting Photograph */}
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop"
                alt="EMBER & BEAN Chemex Pour-Over Coffee Crafting"
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Multi-stage Luxury Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-vantablack/95 via-brand-vantablack/30 to-brand-vantablack/30" />

              {/* Top Floating Badge: Established 2018 */}
              <div className="absolute top-5 sm:top-6 left-5 sm:left-6 z-10">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-vantablack/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.22em] font-bold shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                  <span>Established 2018</span>
                </div>
              </div>

              {/* Bottom Frosted Glass Caption Plate (Zero text collision, 100% visible) */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10">
                <div className="p-4 sm:p-5 rounded-2xl bg-brand-deepBlack/85 backdrop-blur-xl border border-brand-warmSand/15 shadow-2xl">
                  <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.25em] text-brand-gold font-accent font-bold block mb-1">
                    Artisanal Heritage
                  </span>
                  <p className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-brand-cream leading-snug tracking-tight">
                    Where Craftsmanship Meets Conviviality.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Accent Floating Plaque: Bespoke Roasts (Cleanly docked at the corner without overlapping text) */}
            <motion.div
              initial={{ opacity: 0, x: 25, y: 25 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="absolute -bottom-3 sm:-bottom-4 right-2 sm:-right-4 z-20 w-60 sm:w-64 bg-brand-deepBlack/95 backdrop-blur-xl border border-brand-gold/40 p-4 sm:p-5 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_25px_rgba(233,185,73,0.15)] group/card"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover/card:bg-brand-gold group-hover/card:text-brand-deepBlack transition-colors duration-300">
                  <Coffee className="w-4 h-4" />
                </div>
                <span className="text-xs font-accent uppercase tracking-wider text-brand-cream font-bold">
                  Bespoke Roasts
                </span>
              </div>
              <p className="text-[11.5px] sm:text-xs text-brand-warmSand/80 leading-relaxed font-light">
                Direct trade partnerships across Ethiopian and Colombian volcanic terroirs.
              </p>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: Editorial Narrative & Accents ================= */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            
            {/* Header Heritage Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-deepBlack/90 border border-brand-gold/30 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.25em] font-bold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
              <span>Our Heritage</span>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-tight leading-[1.12]"
            >
              A Philosophy Born From <br />
              <span className="italic font-normal text-brand-sandBeige">A Passion For Perfection.</span>
            </motion.h2>

            {/* Narrative Body Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4 text-sm sm:text-[15px] text-brand-warmSand/85 leading-[1.8] font-light"
            >
              <p>
                At EMBER & BEAN, we believe dining is not merely sustenance—it is an art form.
                Every batch of green coffee beans is hand-inspected, roasted in micro-lots, and
                brewed to extract nuanced profiles of dark cocoa, dried berries, and stone fruit.
              </p>
              <p>
                In our kitchen, classic comfort food is elevated to fine dining. Hand-kneaded
                brioche buns, 24-hour slow brines, cold-pressed extra virgin oils, and
                farm-fresh microgreens come together with surgical precision.
              </p>
            </motion.div>

            {/* Feature Bullets: 2 Luxury Interactive Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
            >
              {/* Feature 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-brand-deepBlack/95 via-brand-secondary to-brand-vantablack border border-brand-warmSand/15 hover:border-brand-gold/40 transition-all duration-300 group/feature shadow-lg hover:-translate-y-1">
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-brand-gold group-hover/feature:text-brand-cream transition-colors">
                    100% Organic
                  </span>
                </div>
                <p className="text-xs text-brand-sandBeige/80 font-accent leading-relaxed">
                  Locally sourced farm produce & heirloom herbs.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-brand-deepBlack/95 via-brand-secondary to-brand-vantablack border border-brand-warmSand/15 hover:border-brand-gold/40 transition-all duration-300 group/feature shadow-lg hover:-translate-y-1">
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-heading text-lg sm:text-xl font-bold text-brand-gold group-hover/feature:text-brand-cream transition-colors">
                    Artisan Roasters
                  </span>
                </div>
                <p className="text-xs text-brand-sandBeige/80 font-accent leading-relaxed">
                  Poured on custom La Marzocco Italian machines.
                </p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-2"
            >
              <Link
                to="/about"
                className="group inline-flex items-center space-x-3.5 bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold shadow-xl shadow-brand-gold/25 transition-all duration-300 hover:scale-105 active:scale-95 border-none"
              >
                <span>Discover Our Complete Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
