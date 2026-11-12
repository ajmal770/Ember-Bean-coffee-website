import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, ArrowRight, Sparkles, Clock, Copy, Check } from "lucide-react";

export default function SpecialOffers() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("AURELIA20");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-brand-black relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(233,185,73,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-brand-gold/40 bg-gradient-to-br from-brand-secondary via-brand-black to-brand-secondary p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Text Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-accent uppercase tracking-widest font-bold">
                <Tag className="w-3.5 h-3.5" />
                <span>Limited Gastronomic Tasting</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-cream leading-tight">
                The Signature <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-warmSand to-brand-cream">
                  Artisan Duo Experience
                </span>
              </h2>

              <p className="text-sm sm:text-base text-brand-cream/80 leading-relaxed max-w-lg">
                Pair any of our handcrafted Double Smashed Angus Burgers or Golden Buttermilk
                Crispy Chicken with a signature cold brew or velvety cappuccino and enjoy 20%
                off on your afternoon dining experience.
              </p>

              {/* Time & Interactive Coupon Code */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-sand pt-2 font-accent">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-charcoal/50 border border-brand-charcoal">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span>Valid Daily • 02:00 PM – 06:00 PM</span>
                </div>

                {/* Copyable Promo Code Button */}
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-brand-gold/15 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 font-bold cursor-pointer group"
                  title="Click to copy coupon code"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Code: AURELIA20</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-400 group-hover:text-brand-black" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  )}
                  {copied && <span className="text-[10px] text-green-400 group-hover:text-brand-black font-semibold">Copied!</span>}
                </button>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-accent text-xs uppercase tracking-widest px-8 py-4 rounded-full font-bold shadow-xl shadow-brand-gold/25 transition-all duration-300 hover:scale-105"
                >
                  <span>Claim Tasting Offer</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-brand-black/60 hover:bg-brand-secondary text-brand-cream border border-brand-charcoal hover:border-brand-gold/50 font-accent text-xs uppercase tracking-widest px-7 py-4 rounded-full font-semibold transition-all"
                >
                  <span>Reserve Table</span>
                </Link>
              </div>
            </div>

            {/* Food Visual Column */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl aspect-[4/3] bg-brand-charcoal group"
              >
                <img
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
                  alt="Special Offer Artisan Burger & Coffee"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-gold font-accent font-bold block">
                      Chef Recommendation
                    </span>
                    <span className="font-heading font-bold text-brand-cream text-base">
                      Angus Deluxe & Cortado
                    </span>
                  </div>
                  <div className="bg-brand-gold text-brand-black font-accent font-extrabold px-3 py-1.5 rounded-full text-xs shadow-md">
                    Save 20%
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
