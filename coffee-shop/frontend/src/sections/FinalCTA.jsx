import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Coffee } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-deepBlack relative overflow-hidden text-center border-t border-brand-warmSand/10">
      {/* Golden Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-14 h-14 rounded-full border border-brand-gold/50 bg-brand-vantablack flex items-center justify-center text-brand-gold mx-auto shadow-xl shadow-brand-gold/10"
        >
          <Coffee className="w-6 h-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-xs font-accent uppercase tracking-[0.3em] text-brand-gold font-bold">
            Join Us for Haute Dining & Specialty Roasts
          </span>

          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-brand-cream leading-tight">
            Your Next Favourite Moment <br />
            <span className="italic font-normal text-brand-sandBeige">Starts Here.</span>
          </h2>

          <p className="text-sm sm:text-base text-brand-warmSand/80 max-w-xl mx-auto leading-relaxed font-light">
            Whether it's your morning cortado, an afternoon business lunch, or an evening
            feast with friends, our tables are prepared for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            to="/menu"
            className="inline-flex items-center space-x-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest px-9 py-4 rounded-full font-bold shadow-xl shadow-brand-gold/25 transition-all duration-300 hover:scale-105"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-brand-vantablack hover:bg-brand-deepBlack text-brand-cream border border-brand-warmSand/20 hover:border-brand-gold/50 font-accent text-xs uppercase tracking-widest px-9 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span>Visit Us</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

