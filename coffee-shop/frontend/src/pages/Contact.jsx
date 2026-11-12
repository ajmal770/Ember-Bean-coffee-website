import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  ArrowUpRight,
  UtensilsCrossed,
  CalendarCheck,
  Coffee,
  PartyPopper,
} from "lucide-react";

// Form Validation Schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters long"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(7, "Please provide a valid phone number (at least 7 digits)"),
  subject: z.string().min(3, "Subject must be at least 3 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default function Contact() {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInquiryType, setSelectedInquiryType] = useState("Table Reservation");

  useEffect(() => {
    document.title = "Contact & Table Reservations | EMBER & BEAN";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const inquiryTypes = [
    { label: "Table Reservation", icon: CalendarCheck, defaultSubject: "Table Reservation Inquiry" },
    { label: "Private Cupping", icon: Coffee, defaultSubject: "Private Coffee Cupping Session" },
    { label: "Events & Catering", icon: PartyPopper, defaultSubject: "Private Event & Catering Inquiry" },
    { label: "General Feedback", icon: UtensilsCrossed, defaultSubject: "General Inquiry / Feedback" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "Table Reservation Inquiry",
    },
  });

  const handleInquiryTypeSelect = (type) => {
    setSelectedInquiryType(type.label);
    setValue("subject", type.defaultSubject);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      // Connect to Express Backend POST /api/contact
      const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmissionStatus({
          type: "success",
          message: "Your reservation request has been confirmed!",
          note: "Our concierge will review your dining details and contact you promptly via email/phone.",
          details: result.data,
        });
        reset({ subject: "Table Reservation Inquiry" });
        setSelectedInquiryType("Table Reservation");
      } else {
        setSubmissionStatus({
          type: "error",
          message: result.message || "Failed to submit form. Please verify fields.",
        });
      }
    } catch (err) {
      // Graceful fallback for offline session
      console.warn("Backend unavailable, handling locally for demo session:", err);
      setSubmissionStatus({
        type: "success",
        message: "Your reservation request has been received!",
        note: "Our concierge will review your dining details and contact you promptly via email/phone.",
        details: { ...data, receivedAt: new Date().toISOString() },
      });
      reset({ subject: "Table Reservation Inquiry" });
      setSelectedInquiryType("Table Reservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-vantablack min-h-screen text-brand-cream pt-24 sm:pt-28 pb-16 sm:pb-20">
      {/* 1. Hero Header */}
      <section className="relative py-10 md:py-14 text-center overflow-hidden border-b border-brand-warmSand/10">
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/[0.04] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3.5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-deepBlack/90 border border-brand-gold/30 text-brand-gold text-[10.5px] font-accent uppercase tracking-[0.25em] font-bold shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Connect & Concierge</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-cream tracking-tight leading-[1.12]"
          >
            We Would Love To <br />
            <span className="italic font-normal text-brand-sandBeige">Welcome You.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-brand-warmSand/80 max-w-lg mx-auto leading-relaxed font-light"
          >
            Reserve a banquet table, inquire about private coffee cupping sessions, or arrange bespoke catering for your next private gathering.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Direct Inquiries & Interactive Location Map */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-1.5">
              <span className="text-[10px] font-accent uppercase tracking-[0.25em] text-brand-gold font-bold">
                Direct Inquiries
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-cream tracking-tight">
                Concierge & Sanctuary
              </h2>
            </div>

            {/* Info Cards in Obsidian Glass */}
            <div className="space-y-3">
              {/* Address */}
              <div className="p-4 rounded-2xl bg-brand-deepBlack/80 border border-brand-warmSand/15 hover:border-brand-gold/50 shadow-md flex items-start space-x-3.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-accent uppercase tracking-wider text-brand-gold font-bold text-[10px] block">
                    Sanctuary Address
                  </span>
                  <p className="text-brand-cream/90 font-light leading-snug">
                    42 Heritage Promenade, Bandra West, Mumbai, MH 400050, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-brand-deepBlack/80 border border-brand-warmSand/15 hover:border-brand-gold/50 shadow-md flex items-start space-x-3.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-accent uppercase tracking-wider text-brand-gold font-bold text-[10px] block">
                    Phone Reservations
                  </span>
                  <p className="text-brand-cream/90 font-light leading-snug">
                    +91 (022) 2640-8899 • +91 98200 44321
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-brand-deepBlack/80 border border-brand-warmSand/15 hover:border-brand-gold/50 shadow-md flex items-start space-x-3.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-0.5">
                  <span className="font-accent uppercase tracking-wider text-brand-gold font-bold text-[10px] block">
                    Electronic Concierge
                  </span>
                  <p className="text-brand-cream/90 font-light leading-snug">
                    concierge@emberandbean.com
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-2xl bg-brand-deepBlack/80 border border-brand-warmSand/15 hover:border-brand-gold/50 shadow-md flex items-start space-x-3.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs space-y-1">
                  <span className="font-accent uppercase tracking-wider text-brand-gold font-bold text-[10px] block">
                    Operating Hours
                  </span>
                  <div className="text-brand-cream/90 text-xs font-light space-y-0.5">
                    <div>Monday – Friday: 07:00 AM – 11:00 PM</div>
                    <div>Saturday – Sunday: 07:30 AM – 11:30 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-[11px] text-[#9E978E] font-accent uppercase tracking-wider font-medium">
                Follow Us:
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-brand-secondary/80 border border-white/10 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-black flex items-center justify-center text-brand-cream transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-brand-secondary/80 border border-white/10 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-black flex items-center justify-center text-brand-cream transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-brand-secondary/80 border border-white/10 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-black flex items-center justify-center text-brand-cream transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Stylized Google Maps Embed Section */}
            <div className="rounded-2xl overflow-hidden border border-brand-warmSand/20 shadow-xl bg-brand-deepBlack relative h-56 group">
              <iframe
                title="EMBER & BEAN Specialty Coffee & Kitchen Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.464619472304!2d72.8258!3d19.0558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c911303be189%3A0x6b40212ffba!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-brand-deepBlack/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-brand-warmSand/20 text-[10.5px] font-accent text-brand-gold flex items-center space-x-1.5 shadow-md">
                <span>Heritage Promenade, Bandra West</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Right Column: React Hook Form + Zod */}
          <div className="lg:col-span-7">
            <div className="bg-brand-deepBlack/85 border border-brand-warmSand/20 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden text-left">
              
              {/* Subtle Golden Corner Glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-accent uppercase tracking-[0.25em] text-brand-gold font-bold">
                  Send A Message
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-cream tracking-tight">
                  Table Inquiries & Private Dining
                </h3>
                <p className="text-xs text-brand-warmSand/80 font-light leading-relaxed">
                  Kindly select your inquiry type and provide your details. Our maitre d'hôtel will acknowledge your correspondence promptly.
                </p>
              </div>

              {/* Inquiry Type Selector Pills */}
              <div className="mb-6">
                <label className="block text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold mb-2">
                  Select Inquiry Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {inquiryTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedInquiryType === type.label;
                    return (
                      <button
                        key={type.label}
                        type="button"
                        onClick={() => handleInquiryTypeSelect(type)}
                        className={`p-2.5 rounded-xl text-xs font-accent font-medium flex flex-col items-center justify-center space-y-1.5 border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-brand-gold text-brand-deepBlack font-bold border-brand-gold shadow-md scale-[1.02]"
                            : "bg-brand-vantablack/60 text-brand-warmSand/80 border-brand-warmSand/15 hover:border-brand-gold/40 hover:text-brand-cream"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-brand-deepBlack" : "text-brand-gold"}`} />
                        <span className="text-[10.5px] whitespace-nowrap text-center leading-tight">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Banner */}
              <AnimatePresence>
                {submissionStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-2xl mb-6 text-xs flex items-start space-x-3 ${
                      submissionStatus.type === "success"
                        ? "bg-brand-gold/15 border border-brand-gold/40 text-brand-cream"
                        : "bg-red-500/10 border border-red-500/40 text-red-200"
                    }`}
                  >
                    {submissionStatus.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold text-brand-cream text-xs">{submissionStatus.message}</p>
                      {submissionStatus.note && (
                        <p className="text-[11px] text-brand-warmSand/90 font-light leading-relaxed">
                          {submissionStatus.note}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="e.g. Alistair Sterling"
                      className={`w-full bg-brand-vantablack/80 border rounded-xl px-3.5 py-2.5 text-xs text-brand-cream placeholder:text-brand-warmSand/40 focus:outline-none transition-all font-accent shadow-inner ${
                        errors.name
                          ? "border-red-500"
                          : "border-brand-warmSand/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-400 font-accent">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. alistair@domain.com"
                      className={`w-full bg-brand-vantablack/80 border rounded-xl px-3.5 py-2.5 text-xs text-brand-cream placeholder:text-brand-warmSand/40 focus:outline-none transition-all font-accent shadow-inner ${
                        errors.email
                          ? "border-red-500"
                          : "border-brand-warmSand/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-400 font-accent">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className={`w-full bg-brand-vantablack/80 border rounded-xl px-3.5 py-2.5 text-xs text-brand-cream placeholder:text-brand-warmSand/40 focus:outline-none transition-all font-accent shadow-inner ${
                        errors.phone
                          ? "border-red-500"
                          : "border-brand-warmSand/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-400 font-accent">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-semibold">
                      Subject / Occasion *
                    </label>
                    <input
                      type="text"
                      {...register("subject")}
                      placeholder="e.g. Table Reservation for 4"
                      className={`w-full bg-brand-vantablack/80 border rounded-xl px-3.5 py-2.5 text-xs text-brand-cream placeholder:text-brand-warmSand/40 focus:outline-none transition-all font-accent shadow-inner ${
                        errors.subject
                          ? "border-red-500"
                          : "border-brand-warmSand/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-[10px] text-red-400 font-accent">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-semibold">
                    Your Message / Dining Preferences *
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Provide preferred dining date, guest count, seating preferences, or dietary notes..."
                    className={`w-full bg-brand-vantablack/80 border rounded-xl p-3.5 text-xs text-brand-cream placeholder:text-brand-warmSand/40 focus:outline-none transition-all font-accent resize-none shadow-inner ${
                      errors.message
                        ? "border-red-500"
                        : "border-brand-warmSand/15 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-400 font-accent">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs font-bold uppercase tracking-widest py-3.5 rounded-full shadow-lg shadow-brand-gold/20 flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Transmitting To Concierge...</span>
                  ) : (
                    <>
                      <span>Transmit Correspondence</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
