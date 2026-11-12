import React from "react";
import { motion } from "framer-motion";
import { Heart, Plus, Star, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleCardClick}
      className="group relative bg-brand-secondary/90 border border-brand-charcoal/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-500 cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container with Badges */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-brand-charcoal">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Bestseller Badge */}
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-brand-gold text-brand-black text-[10px] font-accent uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
            Bestseller
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3 bg-brand-black/75 backdrop-blur-md text-brand-sand text-[11px] font-accent tracking-wider px-2.5 py-0.5 rounded-full border border-brand-charcoal">
          {product.category}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-md cursor-pointer ${
            inWishlist
              ? "bg-brand-gold text-brand-black scale-105"
              : "bg-brand-black/60 text-brand-cream/80 hover:text-brand-gold hover:bg-brand-black/90"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-brand-black" : ""}`} />
        </button>

        {/* Hover Quick View Overlay Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-brand-black/90 text-brand-gold border border-brand-gold/40 text-[11px] font-accent uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-xl backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>View Dish</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1.5 text-xs text-brand-sand mb-1.5">
            <div className="flex items-center text-brand-gold">
              <Star className="w-3.5 h-3.5 fill-brand-gold" />
            </div>
            <span className="font-semibold text-brand-cream">{product.rating}</span>
            <span className="text-brand-muted text-[11px]">({product.reviews})</span>
            {product.dietary && (
              <>
                <span className="text-brand-charcoal">•</span>
                <span className="text-[10px] text-brand-muted truncate max-w-[100px]">
                  {product.dietary}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 mb-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="pt-3 border-t border-brand-charcoal/60 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-brand-muted font-accent">
              Price
            </span>
            <span className="font-heading text-lg font-bold text-brand-gold">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center space-x-1 bg-brand-gold/90 hover:bg-brand-gold text-brand-black font-accent text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-brand-gold/20 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
