import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  ShoppingBag,
  Users,
  User,
  Sliders,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar({ activeTab, onSelectTab }) {
  const { currentUser, setLogoutModalOpen, isSuperAdmin } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Operations Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Menu Products", icon: UtensilsCrossed },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "orders", label: "Orders Queue", icon: ShoppingBag },
    { id: "customers", label: "Customer Directory", icon: Users },
    { id: "profile", label: "My Admin Profile", icon: User },
    { id: "settings", label: "Store Operations", icon: Sliders },
  ];

  return (
    <aside className="w-full lg:w-64 bg-brand-deepBlack/95 border border-brand-warmSand/20 rounded-3xl p-5 shadow-2xl space-y-6 text-left flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 pb-5 border-b border-brand-warmSand/10">
          <div className="w-10 h-10 rounded-2xl bg-brand-vantablack border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-md">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[8.5px] font-accent uppercase tracking-widest text-brand-gold font-bold block">
              Staff Portal
            </span>
            <h3 className="font-heading text-sm font-bold text-brand-cream">
              ADMIN CONSOLE
            </h3>
          </div>
        </div>

        {/* Admin Card */}
        <div className="p-3 rounded-2xl bg-brand-vantablack/80 border border-brand-warmSand/15 flex items-center space-x-3">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
            }
            alt={currentUser?.name}
            className="w-10 h-10 rounded-xl object-cover border border-brand-gold/40 shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[8.5px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
              {currentUser?.role?.replace("_", " ")}
            </span>
            <h4 className="text-xs font-bold text-brand-cream truncate mt-1">
              {currentUser?.name}
            </h4>
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

