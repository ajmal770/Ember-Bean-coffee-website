import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Tag,
  Sparkles,
  Check
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  generateId,
  addActivityLog,
} from "../utils/storage";

export default function CartDrawer() {
  const {
    cartItems,
    totalItems,
    subtotal,
    estimatedTax,
    grandTotal: initialGrandTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { currentUser, showToast } = useAuth();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (promoCode.trim().toUpperCase() === "EMBER20" || promoCode.trim().toUpperCase() === "AURELIA20") {
      setDiscountPercent(20);
      setPromoSuccess("20% Tasting Discount Applied!");
    } else if (promoCode.trim() === "") {
      setPromoError("Please enter a promo code");
    } else {
      setPromoError("Invalid code. Try 'EMBER20'");
    }
  };

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalSubtotal = subtotal - discountAmount;
  const calculatedTax = Math.round(finalSubtotal * 0.05);
  const finalGrandTotal = finalSubtotal + (finalSubtotal > 0 ? calculatedTax : 0);

  const handleCheckoutDemo = () => {
    // 1. Create order record in Local Storage
    const defaultAddress = currentUser?.addresses?.find((a) => a.isDefault);
    const shippingAddressText = defaultAddress
      ? `${defaultAddress.street}, ${defaultAddress.city} - ${defaultAddress.postalCode}`
      : "42 Heritage Promenade, Bandra West (Table Service)";

    const newOrder = {
      id: generateId("ord"),
      customerName: currentUser?.name || "Guest Patron",
      customerEmail: currentUser?.email || "guest@emberandbean.com",
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category || "Culinary",
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: finalSubtotal,
      discount: discountAmount,
      tax: calculatedTax,
      total: finalGrandTotal,
      status: "Pending",
      shippingAddress: shippingAddressText,
      createdAt: new Date().toISOString(),
    };

    const existingOrders = getStorage(STORAGE_KEYS.ORDERS, []);
    const updatedOrders = [newOrder, ...existingOrders];
    setStorage(STORAGE_KEYS.ORDERS, updatedOrders);

    addActivityLog(
      "CREATE",
      `New culinary order #${newOrder.id.toUpperCase()} ($${finalGrandTotal.toFixed(2)}) placed by ${newOrder.customerName}`,
      currentUser?.email || "guest@emberandbean.com"
    );

    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setDiscountPercent(0);
      setPromoCode("");
      setPromoSuccess("");
      setCheckoutComplete(false);
      setIsCartOpen(false);
      if (showToast) {
        showToast(`Order #${newOrder.id.toUpperCase()} confirmed! View in Profile.`);
      }
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-brand-secondary flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between bg-brand-black/40">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-brand-cream">
                      Your Order
                    </h2>
                    <span className="text-xs text-brand-sand font-accent">
                      {totalItems} {totalItems === 1 ? "creation" : "creations"} selected
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-brand-muted hover:text-red-400 font-accent uppercase tracking-wider px-2 py-1 transition-colors cursor-pointer"
                      title="Clear all items"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-brand-cream hover:text-brand-gold rounded-full transition-colors cursor-pointer"
                    aria-label="Close cart drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body / List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {checkoutComplete ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shadow-lg shadow-brand-gold/20">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-brand-cream">
                      Order Placed Successfully!
                    </h3>
                    <p className="text-xs text-brand-muted max-w-xs leading-relaxed">
                      Thank you for dining with EMBER & BEAN. Our barista and kitchen staff have
                      queued your order.
                    </p>
                  </motion.div>
                ) : cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-20 h-20 rounded-full bg-brand-charcoal/50 flex items-center justify-center text-brand-muted">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading text-xl font-bold text-brand-cream">
                        Your Order is Empty
                      </h3>
                      <p className="text-xs text-brand-muted max-w-xs">
                        Indulge in our handcrafted specialty coffee, prime burgers, and golden
                        starters.
                      </p>
                    </div>
                    <Link
                      to="/menu"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-black text-xs font-accent uppercase tracking-widest px-6 py-3 rounded-full font-bold shadow-md transition-all"
                    >
                      <span>Explore Our Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center space-x-4 bg-brand-charcoal/40 rounded-2xl p-3.5 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-sm font-bold text-brand-cream truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-brand-sand block mb-1">
                          ₹{item.price} each
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2 bg-brand-black/60 px-2 py-0.5 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-brand-cream hover:text-brand-gold p-0.5 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-accent font-bold text-brand-cream min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-brand-cream hover:text-brand-gold p-0.5 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-brand-gold font-heading">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-brand-muted hover:text-red-400 transition-colors cursor-pointer"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Promo Code Input & Summary */}
              {cartItems.length > 0 && !checkoutComplete && (
                <div className="p-6 bg-brand-black/80 space-y-3">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code (e.g. EMBER20)"
                          className="w-full bg-brand-secondary/90 text-brand-cream pl-9 pr-3 py-2 rounded-xl text-xs uppercase placeholder:text-brand-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-gold font-accent"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-brand-charcoal hover:bg-brand-gold hover:text-brand-black text-brand-cream px-4 py-2 rounded-xl text-xs font-accent font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoSuccess && (
                      <p className="text-[11px] text-green-400 font-accent flex items-center space-x-1 pt-0.5">
                        <Check className="w-3 h-3" />
                        <span>{promoSuccess}</span>
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-400 font-accent pt-0.5">{promoError}</p>
                    )}
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs pt-1">
                    <div className="flex justify-between text-brand-muted">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-cream">₹{subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-400 font-semibold">
                        <span>Promo Discount ({discountPercent}%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-brand-muted">
                      <span>Estimated GST (5%)</span>
                      <span className="font-semibold text-brand-cream">₹{calculatedTax}</span>
                    </div>

                    <div className="flex justify-between text-brand-muted">
                      <span>Delivery / Dine-in</span>
                      <span className="text-brand-gold font-accent uppercase text-[10px] tracking-wider">
                        Complimentary
                      </span>
                    </div>

                    <div className="pt-2 flex justify-between text-sm">
                      <span className="font-heading font-bold text-brand-cream">Grand Total</span>
                      <span className="font-heading text-lg font-bold text-brand-gold">
                        ₹{finalGrandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckoutDemo}
                    className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-accent text-xs uppercase tracking-widest font-bold py-3.5 rounded-full shadow-lg shadow-brand-gold/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Proceed to Checkout • ₹{finalGrandTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-brand-muted tracking-wide font-accent">
                    Cart automatically persisted in browser Local Storage.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
