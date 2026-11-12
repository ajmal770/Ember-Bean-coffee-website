import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistDrawer() {
  const { wishlistItems, wishlistCount, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } =
    useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isWishlistOpen]);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-brand-secondary border-l border-brand-charcoal flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-charcoal/80 flex items-center justify-between bg-brand-black/40">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                    <Heart className="w-4 h-4 fill-brand-gold" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-brand-cream">
                      Saved Favourites
                    </h2>
                    <span className="text-xs text-brand-sand font-accent">
                      {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {wishlistItems.length > 0 && (
                    <button
                      onClick={clearWishlist}
                      className="text-xs text-brand-muted hover:text-red-400 font-accent uppercase tracking-wider px-2 py-1 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-2 text-brand-cream hover:text-brand-gold rounded-full transition-colors"
                    aria-label="Close wishlist drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlistItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-20 h-20 rounded-full bg-brand-charcoal/50 border border-brand-charcoal flex items-center justify-center text-brand-muted">
                      <Heart className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-xl font-bold text-brand-cream">
                        No Favourites Yet
                      </h3>
                      <p className="text-xs text-brand-muted max-w-xs">
                        Save your preferred dishes, single origins, and artisan delights by tapping
                        the heart icon anywhere on our menu.
                      </p>
                    </div>
                    <Link
                      to="/menu"
                      onClick={() => setIsWishlistOpen(false)}
                      className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-black text-xs font-accent uppercase tracking-widest px-6 py-3 rounded-full font-bold shadow-md transition-all"
                    >
                      <span>Explore Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  wishlistItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center space-x-4 bg-brand-charcoal/30 border border-brand-charcoal/60 rounded-2xl p-3.5 transition-colors hover:border-brand-gold/30"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-brand-charcoal"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-sm font-bold text-brand-cream truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs text-brand-sand block mb-1">
                          {item.category} • ₹{item.price}
                        </span>

                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="inline-flex items-center space-x-1.5 bg-brand-gold/20 hover:bg-brand-gold text-brand-gold hover:text-brand-black text-[11px] font-accent font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-brand-muted hover:text-red-400 transition-colors"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-6 border-t border-brand-charcoal bg-brand-black/60">
                  <button
                    onClick={() => {
                      wishlistItems.forEach((item) => addToCart(item, 1));
                      clearWishlist();
                      setIsWishlistOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-accent text-xs uppercase tracking-widest font-bold py-3.5 rounded-full shadow-lg shadow-brand-gold/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                  >
                    <span>Add All to Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

