import React from "react";
import "./CoffeeSteam.css";

/**
 * CoffeeSteam - Realistic Animated Hot Coffee & Tea Steam Effect
 * 
 * Features:
 * - Fluid, multi-layered semi-transparent white & light beige vapor trails
 * - Natural upward curving movement with subtle rightward thermal drift
 * - Heat haze glow with warm amber/golden crema lighting at the cup opening
 * - 60fps GPU-accelerated CSS keyframe transforms (translateY, translateX, scale, rotate)
 * - Proportional positioning anchored directly above the coffee cup rim
 * - Full responsive scaling across mobile, tablet, and desktop
 * - Respects prefers-reduced-motion for accessibility
 */
export default function CoffeeSteam() {
  return (
    <div
      className="coffee-steam-container"
      aria-hidden="true"
      role="presentation"
    >
      {/* Anchor Point anchored at the cup rim (56% X, 70.5% Y) */}
      <div className="steam-rim-anchor">
        
        {/* 1. Subtle Golden Heat Glow & Breathing Crema Warmth */}
        <div className="steam-crema-glow" />

        {/* 2. Layered SVG Curving Vapor Tendrils */}
        <svg
          className="steam-svg-container"
          viewBox="0 0 140 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* White to translucent light-beige gradient */}
            <linearGradient id="steamGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E9B949" stopOpacity="0.3" />
              <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#F7F3EC" stopOpacity="0.35" />
              <stop offset="90%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Warm ivory steam gradient */}
            <linearGradient id="steamGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#D8C3A5" stopOpacity="0.25" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#E8D8C3" stopOpacity="0.3" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Delicate wispy gradient */}
            <linearGradient id="steamGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#F7F3EC" stopOpacity="0.38" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Curving Natural Stream Paths */}
          {/* Path 1: Center-left natural S-curve */}
          <path
            d="M 52 380 Q 40 300 58 220 T 78 110 Q 90 50 98 0"
            className="steam-svg-path steam-path-1"
          />

          {/* Path 2: Broader center-right thermal drift */}
          <path
            d="M 64 380 Q 82 290 68 190 T 94 90 Q 110 40 118 0"
            className="steam-svg-path steam-path-2"
          />

          {/* Path 3: Tight delicate ribbon */}
          <path
            d="M 44 380 Q 34 310 48 230 T 64 120 Q 76 60 84 0"
            className="steam-svg-path steam-path-3"
          />
        </svg>

        {/* 3. Multi-Layer Volumetric Billowing Steam Plumes */}
        {/* Background Broad Vapor Body */}
        <div className="steam-plume steam-wisp-4 steam-gradient-soft" />

        {/* Midground Flowing Ribbons */}
        <div className="steam-plume steam-wisp-1 steam-gradient-warm" />
        <div className="steam-plume steam-wisp-2 steam-gradient-primary" />
        <div className="steam-plume steam-wisp-6 steam-gradient-warm" />

        {/* Foreground Delicate Thin Wisps */}
        <div className="steam-plume steam-wisp-3 steam-gradient-primary" />
        <div className="steam-plume steam-wisp-5 steam-gradient-soft" />

        {/* 4. Subtle Floating Golden Micro Heat Motes */}
        <div className="steam-mote steam-mote-1" />
        <div className="steam-mote steam-mote-2" />
        <div className="steam-mote steam-mote-3" />
      </div>
    </div>
  );
}

