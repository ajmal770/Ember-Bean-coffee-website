import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 350);
          }
          return 100;
        }
        return prev + 5;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center p-6"
    >
      <div className="flex flex-col items-center space-y-6 max-w-xs w-full text-center">
        {/* Animated Ember Flame & Bean Emblem */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-full border border-brand-gold/40 bg-brand-secondary flex items-center justify-center text-brand-gold shadow-2xl shadow-brand-gold/25"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8"
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
            <circle cx="12" cy="18" r="1.5" fill="#D8C3A5" />
          </svg>
        </motion.div>

        {/* Brand Name */}
        <div className="space-y-1">
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold tracking-[0.2em] text-brand-cream">
            EMBER & BEAN
          </h1>
          <p className="text-[9px] tracking-[0.38em] uppercase text-brand-sand font-accent font-semibold">
            Specialty Coffee & Kitchen
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-brand-charcoal h-1 rounded-full overflow-hidden mt-4">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-sand via-brand-gold to-brand-cream rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-accent text-brand-muted tracking-[0.25em] uppercase">
          Igniting Aromas • {progress}%
        </span>
      </div>
    </motion.div>
  );
}
