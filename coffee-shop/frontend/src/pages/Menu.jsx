import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Utensils, ChevronDown, Check } from "lucide-react";
import { categories, initialMenuItems } from "../data/menuData";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { STORAGE_KEYS, getStorage } from "../utils/storage";

// Luxury Custom Sort Dropdown
function CustomSortDropdown({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "default", label: "Featured / Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const currentOption = options.find((o) => o.value === sortBy) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-brand-vantablack/90 border border-brand-warmSand/25 hover:border-brand-gold text-brand-cream text-xs font-accent tracking-wider font-semibold transition-all duration-300 shadow-md cursor-pointer select-none hover:bg-brand-deepBlack group"
      >
        <span className="text-brand-gold uppercase tracking-widest text-[10px] font-bold">
          SORT:
        </span>
        <span className="text-brand-cream font-medium">{currentOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-brand-gold transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-brand-deepBlack/98 backdrop-blur-2xl border border-brand-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(233,185,73,0.15)] py-2 z-50 overflow-hidden"
          >
            <div className="px-3.5 py-1.5 mb-1 border-b border-brand-warmSand/10">
              <span className="text-[9px] font-accent uppercase tracking-widest text-brand-sandBeige font-bold">
                Sort Selections
              </span>
            </div>
            {options.map((option) => {
              const isSelected = option.value === sortBy;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-accent tracking-wide text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-brand-gold/20 text-brand-gold font-bold border-l-2 border-brand-gold"
                      : "text-brand-cream/80 hover:bg-brand-gold/10 hover:text-brand-cream"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-gold shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuItems, setMenuItems] = useState(() => {
    const stored = getStorage(STORAGE_KEYS.PRODUCTS, null);
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
    return initialMenuItems;
  });
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    document.title = "Artisanal Menu | EMBER & BEAN";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Sync category param
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat.toLowerCase());
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]);

  // Synchronize menu items with Browser Local Storage
  useEffect(() => {
    const syncStorageItems = () => {
      const stored = getStorage(STORAGE_KEYS.PRODUCTS, null);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        setMenuItems(stored);
      }
    };

    window.addEventListener("storage", syncStorageItems);
    window.addEventListener("ember_storage_updated", syncStorageItems);
    return () => {
      window.removeEventListener("storage", syncStorageItems);
      window.removeEventListener("ember_storage_updated", syncStorageItems);
    };
  }, []);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    if (slug === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...menuItems];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter(
        (item) =>
          (item.categorySlug && item.categorySlug.toLowerCase() === activeCategory.toLowerCase()) ||
          (item.category && item.category.toLowerCase() === activeCategory.toLowerCase())
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [menuItems, activeCategory, searchQuery, sortBy]);

  // Dynamic category pills with live counts
  const categoryCounts = useMemo(() => {
    const counts = { all: menuItems.length };
    categories.forEach((cat) => {
      counts[cat.slug] = menuItems.filter(
        (item) =>
          (item.categorySlug && item.categorySlug.toLowerCase() === cat.slug.toLowerCase()) ||
          (item.category && item.category.toLowerCase() === cat.slug.toLowerCase())
      ).length;
    });
    return counts;
  }, [menuItems]);

  const allCategoryPills = useMemo(() => [
    { slug: "all", name: "ALL", count: categoryCounts.all || menuItems.length },
    ...categories.map((c) => ({
      slug: c.slug,
      name: c.name.toUpperCase(),
      count: categoryCounts[c.slug] || 0,
    })),
  ], [categoryCounts, menuItems]);

  return (
    <div className="bg-brand-vantablack min-h-screen text-brand-cream pt-24 sm:pt-28 pb-20">
      {/* 1. Menu Page Header */}
      <section className="relative py-10 md:py-14 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3.5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-deepBlack/90 border border-brand-gold/30 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.25em] font-bold shadow-sm">
            <Utensils className="w-3.5 h-3.5 text-brand-gold" />
            <span>Complete Culinary Collection</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-cream tracking-tight">
            The Artisanal Menu
          </h1>

          <p className="text-xs sm:text-sm text-brand-warmSand/80 max-w-xl mx-auto leading-relaxed font-light">
            Handcrafted culinary creations spanning crisp garden salads, smashed prime
            wagyu burgers, single-origin roasts, toasted sourdough, and 24-hour brined fried chicken.
          </p>
        </div>
      </section>

      {/* 2. Controls Bar: Search, Category Filter & Luxury Custom Sort */}
      <section className="relative z-20 bg-brand-deepBlack/95 py-4 border-y border-brand-warmSand/15 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-brand-gold absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full bg-brand-vantablack/90 border border-brand-warmSand/25 text-brand-cream pl-11 pr-10 py-2.5 rounded-full text-xs placeholder:text-brand-warmSand/50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/40 transition-all font-accent shadow-inner hover:border-brand-warmSand/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-brand-warmSand/60 hover:text-brand-gold hover:bg-brand-deepBlack transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Custom Luxury Sort Dropdown */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <CustomSortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
            {allCategoryPills.map((pill) => {
              const isActive = activeCategory === pill.slug;
              return (
                <button
                  key={pill.slug}
                  type="button"
                  onClick={() => handleCategoryChange(pill.slug)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-accent tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer select-none font-bold ${
                    isActive
                      ? "bg-brand-gold text-brand-deepBlack shadow-md shadow-brand-gold/30 border border-brand-gold scale-105"
                      : "bg-brand-vantablack/80 border border-brand-warmSand/25 text-brand-cream/85 hover:text-brand-gold hover:border-brand-gold/60 hover:bg-brand-deepBlack shadow-sm"
                  }`}
                >
                  {pill.name} ({pill.count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-brand-warmSand/90 mb-6 font-accent">
          <span className="font-medium">
            Showing {filteredProducts.length} Culinary Selections
          </span>
          {activeCategory !== "all" && (
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="text-brand-gold hover:underline cursor-pointer"
            >
              Reset to all creations
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-brand-deepBlack/50 rounded-3xl border border-brand-warmSand/15">
            <div className="w-14 h-14 rounded-full bg-brand-deepBlack border border-brand-warmSand/20 flex items-center justify-center text-brand-muted mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-brand-cream">
              No Culinary Creations Found
            </h3>
            <p className="text-xs text-brand-warmSand/80 max-w-sm mx-auto font-light">
              We couldn't find matches for "{searchQuery}". Try searching for another ingredient or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="bg-brand-gold text-brand-deepBlack font-accent text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-brand-gold/90 transition-colors cursor-pointer shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* Product Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
