import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Sparkles, ChefHat } from "lucide-react";
import { initialMenuItems } from "../data/menuData";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function BestSellers() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Favourites" },
    { id: "coffee", label: "Specialty Coffee" },
    { id: "burgers", label: "Prime Burgers" },
    { id: "starters", label: "Starters & Chicken" },
    { id: "sandwiches", label: "Sandwiches & Salads" },
  ];

  // Pick bestseller items
  const allBestSellers = useMemo(() => {
    return initialMenuItems.filter((item) => item.bestseller);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return allBestSellers.slice(0, 8);
    if (activeFilter === "coffee")
      return allBestSellers.filter((i) => i.categorySlug === "coffee");
    if (activeFilter === "burgers")
      return allBestSellers.filter((i) => i.categorySlug === "burgers");
    if (activeFilter === "starters")
      return allBestSellers.filter(
        (i) => i.categorySlug === "starters" || i.categorySlug === "fried-chicken"
      );
    if (activeFilter === "sandwiches")
      return allBestSellers.filter(
        (i) => i.categorySlug === "sandwiches" || i.categorySlug === "salads"
      );
    return allBestSellers.slice(0, 8);
  }, [allBestSellers, activeFilter]);

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-brand-vantablack via-brand-deepBlack/40 to-brand-vantablack relative overflow-hidden">
      {/* Subtle Ambient Gold Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-sandBeige/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-brand-gold text-xs font-accent uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30">
              <Flame className="w-3.5 h-3.5 text-brand-gold" />
              <span>Gastronomic Hall of Fame</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream">
              Our Celebrated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-warmSand to-brand-cream">
                Chef Best Sellers
              </span>
            </h2>

            <p className="text-sm text-brand-warmSand/80 leading-relaxed font-light">
              Voted patron essentials. Precision-extracted roasts, double-smashed prime patties,
              and 24-hour buttermilk-marinated fried chicken.
            </p>
          </div>

          {/* Quick Menu Link */}
          <Link
            to="/menu"
            className="inline-flex items-center space-x-2 text-xs font-accent uppercase tracking-widest text-brand-gold hover:text-brand-cream font-bold transition-colors group p-2.5 px-4 rounded-xl bg-brand-deepBlack/80 border border-brand-warmSand/15"
          >
            <span>Full Artisanal Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs in Best Sellers */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-accent uppercase tracking-wider font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/20 scale-105"
                    : "bg-brand-secondary/80 border border-brand-charcoal text-brand-cream/70 hover:text-brand-cream hover:border-brand-gold/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4 Cards in One Line on Desktop (`xl:grid-cols-4`) */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner Note */}
        <div className="mt-14 p-6 rounded-3xl bg-brand-secondary/60 border border-brand-charcoal/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div className="flex items-center space-x-3 text-brand-cream">
            <ChefHat className="w-5 h-5 text-brand-gold shrink-0" />
            <span>
              All recipes are prepared fresh to order with certified halal meats and organic farm greens.
            </span>
          </div>
          <Link
            to="/menu"
            className="text-brand-gold hover:underline font-accent uppercase tracking-wider font-bold shrink-0"
          >
            Explore All Categories →
          </Link>
        </div>
      </div>

      {/* Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
