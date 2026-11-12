import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (winScroll > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out border-none ${
          scrolled
            ? "py-3 bg-brand-deepBlack/95 backdrop-blur-xl shadow-2xl shadow-black/80"
            : isHome
            ? "py-6 bg-transparent"
            : "py-4 bg-brand-deepBlack/85 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 1. EMBER & BEAN Logo */}
            <Link
              to="/"
              className="group flex items-center space-x-2.5 text-brand-cream transition-all duration-300"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-deepBlack border border-brand-gold/30 group-hover:border-brand-gold/60 group-hover:scale-105 transition-all duration-300 shadow-sm shadow-brand-gold/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C9.5 5.5 8 8 8 11.5a4 4 0 0 0 8 0c0-3.5-1.5-6-4-9.5z"
                      fill="#E9B949"
                    />
                    <path
                      d="M12 11c-1 1-1.5 2-1 3s2 1.5 2 3"
                      stroke="#171717"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="18" r="1.4" fill="#D8C3A5" />
                  </svg>
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-heading text-base sm:text-lg tracking-[0.14em] font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                  EMBER & BEAN
                </span>
                <span className="text-[7px] sm:text-[7.5px] tracking-[0.25em] uppercase text-brand-sandBeige font-accent font-medium leading-none mt-0.5">
                  Specialty Coffee & Kitchen
                </span>
              </div>
            </Link>

            {/* 2. Desktop Navigation */}
            <nav
              onMouseLeave={() => setHoveredLink(null)}
              className="hidden md:flex items-center space-x-6 lg:space-x-8"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isHovered = hoveredLink === link.name;

                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    className="relative py-1 text-sm font-body tracking-wider transition-colors duration-300 select-none cursor-pointer group"
                  >
                    <span
                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? "text-brand-gold font-semibold"
                          : isHovered
                          ? "text-brand-cream scale-105"
                          : "text-brand-cream/70 hover:text-brand-cream"
                      }`}
                    >
                      {link.name}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-gold rounded-full shadow-sm shadow-brand-gold/80"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* 3. Action Buttons & User Menu */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5">
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-full text-brand-cream/80 hover:text-brand-gold bg-brand-deepBlack/80 hover:bg-brand-deepBlack border border-brand-warmSand/15 transition-all duration-300 focus:outline-none cursor-pointer group"
                aria-label="View Saved Favourites"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span
                    key={wishlistCount}
                    className="cart-badge-count"
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-brand-cream/80 hover:text-brand-gold bg-brand-deepBlack/80 hover:bg-brand-deepBlack border border-brand-warmSand/15 transition-all duration-300 focus:outline-none cursor-pointer group"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span
                    key={totalItems}
                    className="cart-badge-count"
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Golden Pill "Order Now" CTA */}
              <Link
                to="/menu"
                className="group relative hidden lg:inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest px-5 py-2.5 rounded-full font-bold shadow-lg shadow-brand-gold/20 transition-all duration-300 hover:scale-105 active:scale-95 border-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-deepBlack shrink-0" />
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-brand-deepBlack/80 text-brand-cream hover:text-brand-gold focus:outline-none cursor-pointer border border-brand-warmSand/15"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Luxury Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[65px] bottom-0 z-30 bg-brand-deepBlack/98 backdrop-blur-2xl px-6 py-8 md:hidden overflow-y-auto flex flex-col justify-between shadow-2xl border-none text-left"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-accent uppercase tracking-[0.3em] text-brand-gold font-bold block">
                EMBER & BEAN • SPECIALTY MENU
              </span>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between text-xl font-heading tracking-wide py-2.5 transition-colors ${
                          isActive
                            ? "text-brand-gold font-bold pl-2"
                            : "text-brand-cream/80 hover:text-brand-cream"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-brand-warmSand/40"}`} />
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-2">
                <Link
                  to="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest py-3.5 rounded-full font-bold shadow-xl shadow-brand-gold/20 flex items-center justify-center space-x-2 border-none"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Menu & Order</span>
                </Link>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 space-y-2 text-xs text-brand-cream/60">
              <div className="flex items-center space-x-2 text-brand-sandBeige">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                <span>Open Daily: 07:00 AM – 11:30 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                <span>Bandra West, Mumbai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>+91 (022) 2640-8899</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
