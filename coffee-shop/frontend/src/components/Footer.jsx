import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Crown,
  ShieldCheck,
  User,
  Receipt,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-deepBlack text-brand-cream/80 pt-7 pb-4 border-t border-brand-warmSand/15 relative overflow-hidden select-none">
      {/* Subtle ambient gold glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-5 sm:gap-6 pb-6 border-b border-brand-warmSand/10">
          
          {/* 1. Brand Info (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <Link to="/" className="flex items-center space-x-2.5 text-brand-cream">
              <div className="w-8 h-8 rounded-full border border-brand-gold/40 flex items-center justify-center bg-brand-vantablack shadow-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C9.5 5.5 8 8 8 11.5a4 4 0 0 0 8 0c0-3.5-1.5-6-4-9.5z" fill="#E9B949" />
                  <path d="M12 11c-1 1-1.5 2-1 3s2 1.5 2 3" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="18" r="1.4" fill="#D8C3A5" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-base tracking-[0.16em] font-extrabold text-brand-cream leading-tight">
                  EMBER & BEAN
                </span>
                <span className="text-[7.5px] tracking-[0.3em] uppercase text-brand-sandBeige font-accent font-semibold">
                  Specialty Coffee & Kitchen
                </span>
              </div>
            </Link>

            <p className="text-xs text-brand-warmSand/80 font-light leading-relaxed max-w-xs">
              Crafting transcendent culinary moments with micro-lot extractions, 24-hour buttermilk poultry, and bespoke smashed wagyu.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 pt-0.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-brand-vantablack border border-brand-warmSand/20 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-brand-deepBlack flex items-center justify-center text-brand-cream/80 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-brand-vantablack border border-brand-warmSand/20 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-brand-deepBlack flex items-center justify-center text-brand-cream/80 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-brand-vantablack border border-brand-warmSand/20 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-brand-deepBlack flex items-center justify-center text-brand-cream/80 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-brand-cream">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Artisanal Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Culinary Selections (2 cols) */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-brand-cream">
              Culinary Selections
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/menu?category=coffee" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Specialty Coffee
                </Link>
              </li>
              <li>
                <Link to="/menu?category=burgers" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Artisan Burgers
                </Link>
              </li>
              <li>
                <Link to="/menu?category=salads" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Garden Salads
                </Link>
              </li>
              <li>
                <Link to="/menu?category=sandwiches" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Toasted Sandwiches
                </Link>
              </li>
              <li>
                <Link to="/menu?category=fried-chicken" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Crispy Fried Chicken
                </Link>
              </li>
              <li>
                <Link to="/menu?category=starters" className="text-brand-warmSand/80 hover:text-brand-gold transition-colors">
                  Starters & Sides
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Portals & Access (2.5 cols - Requested Links) */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-brand-cream">
              Portals & Access
            </h4>
            <ul className="space-y-1.5 text-xs font-accent">
              <li>
                <Link
                  to="/superadmin"
                  className="text-amber-300/90 hover:text-amber-200 font-semibold transition-colors flex items-center space-x-1.5 group"
                >
                  <Crown className="w-3.5 h-3.5 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Super Admin Console</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-brand-warmSand/85 hover:text-brand-gold transition-colors flex items-center space-x-1.5 group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Admin Operations</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-brand-warmSand/85 hover:text-brand-gold transition-colors flex items-center space-x-1.5 group"
                >
                  <User className="w-3.5 h-3.5 text-brand-sandBeige shrink-0 group-hover:scale-110 transition-transform" />
                  <span>My Customer Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/orders"
                  className="text-brand-warmSand/85 hover:text-brand-gold transition-colors flex items-center space-x-1.5 group"
                >
                  <Receipt className="w-3.5 h-3.5 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Orders & Receipts</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 5. Find Us & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-brand-cream">
              Find Us
            </h4>
            <ul className="space-y-1.5 text-xs text-brand-warmSand/80">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <span>42 Heritage Promenade, Bandra West, Mumbai</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <a href="tel:+919876543210" className="hover:text-brand-gold transition-colors">
                  +91 (022) 2640-8899
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <a href="mailto:concierge@emberandbean.com" className="hover:text-brand-gold transition-colors truncate">
                  concierge@emberandbean.com
                </a>
              </li>
              <li className="flex items-start space-x-2 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight text-brand-warmSand/70">
                  <div>Mon – Fri: 07:00 AM – 11:00 PM</div>
                  <div>Sat – Sun: 07:30 AM – 11:30 PM</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Bottom Bar (Clean without Back to Top button) */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-sandBeige/70 space-y-1.5 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} EMBER & BEAN Specialty Coffee & Kitchen. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-brand-warmSand/70 font-light">Crafted with passion for gastronomy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
