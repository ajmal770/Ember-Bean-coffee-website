import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function ProfileSidebar({ activeTab, onSelectTab }) {
  const { currentUser, setLogoutModalOpen } = useAuth();

  const navItems = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "orders", label: "Orders & Receipts", icon: ShoppingBag },
    { id: "addresses", label: "Delivery Addresses", icon: MapPin },
    { id: "wishlist", label: "Saved Wishlist", icon: Heart },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-brand-deepBlack/95 border border-brand-warmSand/20 rounded-3xl p-5 shadow-2xl space-y-6 text-left flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* User Card */}
        <div className="flex items-center space-x-3.5 pb-5 border-b border-brand-warmSand/10">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
            }
            alt={currentUser?.name}
            className="w-12 h-12 rounded-2xl object-cover border border-brand-gold/50 shadow-md shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[9px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold font-bold">
              {currentUser?.role?.replace("_", " ")}
            </span>
            <h3 className="font-heading text-sm font-bold text-brand-cream truncate mt-1">
              {currentUser?.name}
            </h3>
            <p className="text-[10px] text-brand-cream/50 truncate font-mono">
              {currentUser?.email}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-accent tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-brand-gold text-brand-deepBlack font-bold shadow-md shadow-brand-gold/20 scale-[1.01]"
                    : "text-brand-cream/80 hover:bg-brand-vantablack/60 hover:text-brand-gold"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? "text-brand-deepBlack" : "text-brand-gold"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-brand-warmSand/10">
        <button
          type="button"
          onClick={() => setLogoutModalOpen(true)}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-xs font-accent text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0 text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

