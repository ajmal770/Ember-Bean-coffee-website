import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  UtensilsCrossed,
  Tags,
  ShoppingBag,
  Sliders,
  FileText,
  Activity,
  LogOut,
  Crown,
} from "lucide-react";

export default function SuperAdminSidebar({ activeTab, onSelectTab }) {
  const { currentUser, setLogoutModalOpen } = useAuth();

  const navItems = [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "users", label: "All Users Directory", icon: Users },
    { id: "admins", label: "Admin Management", icon: ShieldCheck },
    { id: "products", label: "Products Master", icon: UtensilsCrossed },
    { id: "categories", label: "Categories Master", icon: Tags },
    { id: "orders", label: "Global Orders", icon: ShoppingBag },
    { id: "roles", label: "Roles & Permissions", icon: Sliders },
    { id: "reports", label: "Sales & Analytics", icon: FileText },
    { id: "settings", label: "Website Settings", icon: Sliders },
    { id: "activity-logs", label: "Activity Audit Logs", icon: Activity },
  ];

  return (
    <aside className="w-full lg:w-64 bg-brand-deepBlack/95 border border-brand-gold/30 rounded-3xl p-5 shadow-2xl space-y-6 text-left flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Brand & Super Admin Crest */}
        <div className="flex items-center space-x-3 pb-5 border-b border-brand-warmSand/10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center text-brand-deepBlack shadow-lg shadow-brand-gold/20 shrink-0">
            <Crown className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[8.5px] font-accent uppercase tracking-widest text-brand-gold font-bold block">
              SaaS Master Suite
            </span>
            <h3 className="font-heading text-sm font-bold text-brand-cream">
              EMBER & BEAN
            </h3>
          </div>
        </div>

        {/* Current Super Admin Badge */}
        <div className="p-3 rounded-2xl bg-brand-vantablack/90 border border-brand-gold/25 flex items-center space-x-3">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
            }
            alt={currentUser?.name}
            className="w-10 h-10 rounded-xl object-cover border border-brand-gold/50 shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[8.5px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold text-brand-deepBlack font-black">
              SUPER ADMIN
            </span>
            <h4 className="text-xs font-bold text-brand-cream truncate mt-1">
              {currentUser?.name}
            </h4>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
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

      {/* Logout */}
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

