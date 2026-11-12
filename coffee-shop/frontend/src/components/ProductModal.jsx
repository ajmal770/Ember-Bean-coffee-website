import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Heart,
  Plus,
  Minus,
  Star,
  Clock,
  Flame,
  ShieldCheck,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Dark Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-brand-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-brand-secondary border border-brand-charcoal rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-black/75 border border-brand-charcoal text-brand-cream hover:text-brand-gold hover:border-brand-gold/50 flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer hover:rotate-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-brand-charcoal overflow-hidden group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/90 via-transparent to-transparent md:hidden" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {product.bestseller && (
                <div className="bg-brand-gold text-brand-black text-[10px] font-accent uppercase tracking-widest font-black px-3 py-1 rounded-full shadow-lg">
                  Chef Signature
                </div>
              )}
              <div className="bg-brand-black/80 backdrop-blur-md text-brand-sand text-[10px] font-accent uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-brand-charcoal">
                {product.category}
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Star Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-accent uppercase tracking-widest text-brand-gold font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Artisanal Selection</span>
                </span>

                <div className="flex items-center space-x-1.5 text-xs text-brand-gold">
                  <Star className="w-4 h-4 fill-brand-gold" />
                  <span className="font-bold text-brand-cream">{product.rating}</span>
                  <span className="text-brand-muted text-[11px]">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-cream mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Nutritional & Prep Spec Grid */}
              <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-brand-charcoal/40 rounded-2xl border border-brand-charcoal/60 text-xs text-brand-cream/90">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-secondary flex items-center justify-center text-brand-gold">
                    <Flame className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-muted block uppercase font-accent font-semibold">Calories</span>
                    <span className="font-bold">{product.calories || "350 kcal"}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-secondary flex items-center justify-center text-brand-gold">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-muted block uppercase font-accent font-semibold">Prep Time</span>
                    <span className="font-bold">{product.prepTime || "10-15 mins"}</span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center space-x-2 pt-2 border-t border-brand-charcoal/50 text-[11px] text-brand-sand font-accent">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>{product.dietary || "Chef Crafted • 100% Farm-Fresh Ingredients"}</span>
                </div>
              </div>

              {/* Chef Pairing Tip */}
              <div className="mt-3 p-2.5 rounded-xl bg-brand-gold/5 border border-brand-gold/20 text-[11px] text-brand-sand leading-relaxed">
                <span className="text-brand-gold font-bold font-accent uppercase text-[9px] block">
                  Sommelier Pairing Tip:
                </span>
                Pairs harmoniously with our Ethiopian Yirgacheffe pour-over or cold brew.
              </div>
            </div>

            {/* Price & Actions Row */}
            <div className="pt-4 border-t border-brand-charcoal/70 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-muted uppercase tracking-wider block font-accent">
                    Total Amount
                  </span>
                  <motion.span
                    key={quantity}
                    initial={{ scale: 1.1, color: "#FFFFFF" }}
                    animate={{ scale: 1, color: "#E9B949" }}
                    className="font-heading text-2xl sm:text-3xl font-bold text-brand-gold block"
                  >
                    ₹{product.price * quantity}
                  </motion.span>
                </div>

                {/* Tactile Quantity Selector */}
                <div className="flex items-center space-x-3 bg-brand-charcoal/80 border border-brand-charcoal px-3.5 py-1.5 rounded-full shadow-inner">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-brand-cream hover:text-brand-gold disabled:opacity-30 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-accent font-bold text-sm min-w-[20px] text-center text-brand-cream">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-brand-cream hover:text-brand-gold transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-brand-gold via-brand-warmSand to-brand-gold bg-[length:200%_auto] hover:bg-right text-brand-black font-accent font-bold uppercase tracking-widest py-3.5 px-6 rounded-full text-xs transition-all duration-500 shadow-xl shadow-brand-gold/25 hover:shadow-brand-gold/40 flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Add To Order • ₹{product.price * quantity}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md ${
                    inWishlist
                      ? "bg-brand-gold border-brand-gold text-brand-black scale-105"
                      : "border-brand-charcoal bg-brand-secondary text-brand-cream hover:text-brand-gold hover:border-brand-gold/50"
                  }`}
                  aria-label="Toggle Favourite"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? "fill-brand-black" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
