import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  isPositive = true,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl transition-all duration-300 relative overflow-hidden text-left flex flex-col justify-between ${
        onClick ? "hover:border-brand-gold/60 hover:scale-[1.01] cursor-pointer" : ""
      }`}
    >
      {/* Background ambient gold tint */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/[0.03] rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold block mb-1">
            {title}
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-cream tracking-tight">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="w-11 h-11 rounded-2xl bg-brand-vantablack border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-md shadow-brand-gold/10 shrink-0">
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>
        )}
      </div>

      <div className="pt-4 mt-2 border-t border-brand-warmSand/10 flex items-center justify-between text-xs relative z-10">
        <span className="text-brand-cream/60 text-[11px] truncate">{subtitle}</span>

        {trend && (
          <div
            className={`flex items-center space-x-1 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                : "bg-red-500/15 text-red-400 border border-red-500/30"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}

