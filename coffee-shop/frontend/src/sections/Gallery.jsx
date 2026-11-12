import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Coffee,
  UtensilsCrossed,
  Store,
  Compass,
} from "lucide-react";

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "All Stories", icon: Compass },
    { id: "coffee", label: "Specialty Coffee", icon: Coffee },
    { id: "kitchen", label: "Artisan Kitchen", icon: UtensilsCrossed },
    { id: "ambiance", label: "Atmosphere & Space", icon: Store },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Swan Microfoam Latte Art",
      category: "coffee",
      categoryLabel: "Specialty Coffee",
      tag: "Artisan Pour",
      description:
        "Steamed whole-milk microfoam poured with silky precision symmetry over a double ristretto pulled on our custom La Marzocco.",
      image:
        "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 lg:col-span-7",
      height: "h-[190px] sm:h-[210px] md:h-[220px]",
      craftDetails: "Ethiopian Yirgacheffe • 93.5°C Extraction",
    },
    {
      id: 2,
      title: "Minimalist Terrazzo & Timber Bar",
      category: "ambiance",
      categoryLabel: "Atmosphere & Space",
      tag: "Nordic Design",
      description:
        "Natural sunlight washing over custom Scandinavian oak counter seating, hand-poured terrazzo, and our bespoke matte black espresso station.",
      image:
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-5",
      height: "h-[190px] sm:h-[210px] md:h-[220px]",
      craftDetails: "Natural Lighting • Acoustic Oak Slats",
    },
    {
      id: 3,
      title: "Double Smashed Wagyu Brioche",
      category: "kitchen",
      categoryLabel: "Artisan Kitchen",
      tag: "Signature Burger",
      description:
        "Crispy caramelized lace edges on two smashed Wagyu patties, melted smoked gouda, house truffle aioli on toasted brioche.",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
      height: "h-[170px] sm:h-[185px] md:h-[195px]",
      craftDetails: "A5 Wagyu Blend • Slow Shallots",
    },
    {
      id: 4,
      title: "Mediterranean Feta Crisp",
      category: "kitchen",
      categoryLabel: "Artisan Kitchen",
      tag: "Farm Table",
      description:
        "Heirloom sun-ripened cherry tomatoes, Kalamata olives, crushed Persian cucumbers, barrel-aged feta, and crushed sumac vinaigrette.",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
      height: "h-[170px] sm:h-[185px] md:h-[195px]",
      craftDetails: "Zero-Mile Produce • Cold-Pressed EVOO",
    },
    {
      id: 5,
      title: "Nashville Spiced Bronze Drumsticks",
      category: "kitchen",
      categoryLabel: "Artisan Kitchen",
      tag: "Crispy Golden",
      description:
        "24-hour buttermilk brine, habanero-cayenne dust, cast-iron fried to golden crunch, served with clover honey mustard.",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-4",
      height: "h-[170px] sm:h-[185px] md:h-[195px]",
      craftDetails: "Heritage Poultry • House Hot Glaze",
    },
    {
      id: 6,
      title: "Slow Batch Drum Roasting",
      category: "coffee",
      categoryLabel: "Specialty Coffee",
      tag: "Micro-Lot Roast",
      description:
        "Green beans monitored with artisanal precision inside our cast-iron roaster, unlocking deep nuances of dark chocolate, stone fruit, and brown sugar.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-6",
      height: "h-[170px] sm:h-[185px] md:h-[195px]",
      craftDetails: "Medium-Dark Roast • Volcanic Soil Beans",
    },
    {
      id: 7,
      title: "Rosemary Sourdough Melt",
      category: "kitchen",
      categoryLabel: "Artisan Kitchen",
      tag: "Slow Bakery",
      description:
        "Natural wild yeast sourdough, charred to golden blister, filled with triple cream brie and rosemary-infused roasted garlic butter.",
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop",
      colSpan: "col-span-12 sm:col-span-6 lg:col-span-6",
      height: "h-[170px] sm:h-[185px] md:h-[195px]",
      craftDetails: "48-Hour Fermentation • Stone-Ground Flour",
    },
  ];

  // Filter items based on active tab
  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  // Keyboard navigation & dismissal for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeImage) return;
      if (e.key === "Escape") {
        setActiveImage(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredItems.findIndex(
          (item) => item.id === activeImage.id
        );
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setActiveImage(filteredItems[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredItems.findIndex(
          (item) => item.id === activeImage.id
        );
        const prevIndex =
          (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveImage(filteredItems[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, filteredItems]);

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-brand-deepBlack relative overflow-hidden">
      {/* Dynamic Ambient Glow Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-gold/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-sandBeige/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 gap-3.5 border-b border-brand-warmSand/10 pb-4 sm:pb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-xl text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-brand-vantablack/80 border border-brand-gold/30 text-brand-gold text-[9.5px] font-accent uppercase tracking-[0.22em] font-bold shadow-sm">
              <Instagram className="w-3 h-3 text-brand-gold" />
              <span>Visual Chronicle • @emberandbean</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-brand-cream tracking-tight leading-[1.15]">
              Visual Chronicle of{" "}
              <span className="italic font-normal text-brand-sandBeige">Our Daily Craft</span>
            </h2>

            {/* Description */}
            <p className="text-xs text-brand-warmSand/80 font-light leading-relaxed max-w-lg">
              A photographic record of micro-lot roasts, cast-iron searing, and sunlight over our terrazzo bar.
            </p>
          </motion.div>

          {/* Right Header Action: Instagram Pill */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center space-x-1.5 text-[11px] font-accent uppercase tracking-[0.18em] text-brand-sandBeige hover:text-brand-gold font-bold transition-all duration-300 py-1.5 px-3.5 rounded-full border border-brand-warmSand/20 hover:border-brand-gold/50 bg-brand-vantablack/40 hover:bg-brand-deepBlack shadow-sm hover:scale-105 active:scale-95"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-brand-gold" />
            </a>
          </motion.div>
        </div>

        {/* Interactive Category Filter Pills with Spring Indicator */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`relative inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-accent tracking-wider font-semibold transition-all duration-300 cursor-pointer select-none border ${
                  isActive
                    ? "text-brand-deepBlack font-bold border-transparent"
                    : "text-brand-warmSand/80 hover:text-brand-cream bg-brand-deepBlack/80 border-brand-warmSand/15 hover:border-brand-gold/40 hover:bg-brand-deepBlack"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryFilter"
                    className="absolute inset-0 bg-brand-gold rounded-full shadow-[0_0_15px_rgba(233,185,73,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-1.5">
                  <Icon className={`w-3 h-3 ${isActive ? "text-brand-deepBlack" : "text-brand-gold"}`} />
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Bento Gallery Grid (Compact Box Sizes & Tight Proportions) */}
        <motion.div
          layout
          className="grid grid-cols-12 gap-3 sm:gap-3.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.03, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => setActiveImage(item)}
                className={`group relative rounded-2xl overflow-hidden border border-brand-warmSand/15 bg-brand-deepBlack ${item.colSpan} ${item.height} flex flex-col justify-between p-3 sm:p-3.5 shadow-md hover:border-brand-gold/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(233,185,73,0.15)] transition-all duration-500 cursor-pointer select-none`}
              >
                {/* Background Image with Slow Smooth Zoom */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 group-hover:brightness-105 transition-all duration-700 ease-out"
                  />

                  {/* Multi-stage Dark Gradient for Text Clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/15 group-hover:via-black/35 transition-colors duration-500" />

                  {/* Ambient Corner Flare */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-gold/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>

                {/* Top Bar: Compact Craft Tag & Action Button */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[8.5px] font-accent uppercase tracking-[0.18em] font-bold shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-brand-gold animate-pulse" />
                    <span>{item.tag}</span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-black/75 backdrop-blur-md border border-white/20 group-hover:border-brand-gold/80 flex items-center justify-center text-brand-cream group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 group-hover:scale-105 shadow-md">
                    <Maximize2 className="w-3 h-3 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom Card Content: Crisp Title & Slide-up Drawer */}
                <div className="relative z-10 flex flex-col justify-end pt-1">
                  <div className="flex items-center space-x-1.5 text-[8.5px] font-accent uppercase tracking-[0.16em] text-brand-sandBeige font-bold mb-0.5">
                    <span>{item.categoryLabel}</span>
                    <span className="w-1 h-1 rounded-full bg-brand-gold/60" />
                    <span className="text-brand-warmSand/70 font-light truncate max-w-[170px]">
                      {item.craftDetails}
                    </span>
                  </div>

                  <h3 className="font-heading text-sm sm:text-base md:text-[17px] font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 tracking-tight leading-snug line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Smooth Micro-Drawer */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                    <div className="overflow-hidden">
                      <div className="pt-1.5 flex items-center justify-between text-xs font-accent border-t border-brand-warmSand/15 mt-1.5">
                        <span className="text-brand-warmSand/80 text-[10px] font-light line-clamp-1 pr-2">
                          {item.description}
                        </span>
                        <div className="inline-flex items-center space-x-1 text-brand-gold font-bold uppercase tracking-wider text-[9px] flex-shrink-0">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Border Golden Accent Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-brand-secondary/80 border border-white/20 hover:border-brand-gold/60 text-white hover:text-brand-gold transition-colors z-50 cursor-pointer shadow-lg"
              aria-label="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Navigation Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredItems.findIndex(
                  (item) => item.id === activeImage.id
                );
                const prevIndex =
                  (currentIndex - 1 + filteredItems.length) % filteredItems.length;
                setActiveImage(filteredItems[prevIndex]);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-secondary/80 border border-white/20 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-black text-white transition-all duration-300 z-50 cursor-pointer shadow-xl"
              aria-label="Previous Chronicle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Navigation Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredItems.findIndex(
                  (item) => item.id === activeImage.id
                );
                const nextIndex = (currentIndex + 1) % filteredItems.length;
                setActiveImage(filteredItems[nextIndex]);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-secondary/80 border border-white/20 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-black text-white transition-all duration-300 z-50 cursor-pointer shadow-xl"
              aria-label="Next Chronicle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Modal Content Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[80vh] w-full rounded-2xl overflow-hidden bg-brand-secondary border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(233,185,73,0.15)] flex flex-col md:flex-row"
            >
              {/* Media Preview */}
              <div className="md:w-3/5 h-56 sm:h-64 md:h-[380px] relative bg-black overflow-hidden">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Story & Craft Details */}
              <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-brand-secondary/95">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1.5 text-brand-gold text-[11px] font-accent uppercase tracking-widest font-bold">
                    <Sparkles className="w-3 h-3 text-brand-gold" />
                    <span>{activeImage.categoryLabel}</span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-tight">
                    {activeImage.title}
                  </h3>

                  <div className="px-2.5 py-1 rounded-lg bg-black/50 border border-brand-gold/20 text-brand-sand text-[11px] font-accent tracking-wide">
                    {activeImage.craftDetails}
                  </div>

                  <p className="text-xs text-brand-cream/80 font-light leading-relaxed">
                    {activeImage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1.5 text-[11px] text-[#9E978E] font-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    <span>{activeImage.tag}</span>
                  </div>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] font-accent uppercase tracking-wider text-brand-gold hover:text-white font-bold transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
