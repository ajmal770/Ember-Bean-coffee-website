import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import ProfileSidebar from "../../components/ProfileSidebar";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  generateId,
  addActivityLog,
} from "../../utils/storage";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  Edit2,
  Trash2,
  Plus,
  Check,
  Receipt,
  X,
  Lock,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Profile() {
  const {
    currentUser,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    changePassword,
    setLogoutModalOpen,
    showToast,
  } = useAuth();

  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Tab derived from URL query or path
  const getTabFromLocation = () => {
    const params = new URLSearchParams(location.search);
    const queryTab = params.get("tab");
    if (queryTab) return queryTab;

    if (location.pathname.includes("/orders")) return "orders";
    if (location.pathname.includes("/addresses")) return "addresses";
    if (location.pathname.includes("/wishlist")) return "wishlist";
    if (location.pathname.includes("/settings")) return "settings";
    return "personal";
  };

  const [activeTab, setActiveTab] = useState(getTabFromLocation);

  useEffect(() => {
    setActiveTab(getTabFromLocation());
  }, [location.pathname, location.search]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "personal") navigate("/profile");
    else navigate(`/profile?tab=${tabId}`);
  };

  // Orders from Local Storage
  const [orders, setOrders] = useState(() => {
    const all = getStorage(STORAGE_KEYS.ORDERS, []);
    return all.filter((o) => o.customerEmail === currentUser?.email);
  });

  useEffect(() => {
    const syncOrders = () => {
      const all = getStorage(STORAGE_KEYS.ORDERS, []);
      setOrders(all.filter((o) => o.customerEmail === currentUser?.email));
    };
    window.addEventListener("storage", syncOrders);
    window.addEventListener("ember_storage_updated", syncOrders);
    return () => {
      window.removeEventListener("storage", syncOrders);
      window.removeEventListener("ember_storage_updated", syncOrders);
    };
  }, [currentUser?.email]);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    dob: currentUser?.dob || "",
    bio: currentUser?.bio || "",
    avatar: currentUser?.avatar || "",
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    street: "",
    city: "Mumbai",
    postalCode: "400050",
  });

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      label: "Home",
      street: "",
      city: "Mumbai",
      postalCode: "400050",
    });
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      label: addr.label || "Home",
      street: addr.street || "",
      city: addr.city || "Mumbai",
      postalCode: addr.postalCode || "400050",
    });
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.street) {
      showToast("Street address is required.", "error");
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, addressForm);
    } else {
      addAddress(addressForm);
    }
    setAddressModalOpen(false);
  };

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Password Change State
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (passwords.newPass.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (passwords.newPass !== passwords.confirmPass) {
      setPasswordError("New passwords do not match.");
      return;
    }

    const res = changePassword(passwords.current, passwords.newPass);
    if (!res.success) {
      setPasswordError(res.error || "Failed to update password.");
    } else {
      setPasswords({ current: "", newPass: "", confirmPass: "" });
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-left">
      {/* Top Banner */}
      <div className="mb-8 border-b border-brand-warmSand/10 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-accent uppercase tracking-widest font-black mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Patron Concierge Suite</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-cream tracking-tight">
          Welcome, {currentUser?.name}
        </h1>
        <p className="text-xs sm:text-sm text-brand-cream/60 mt-1 font-body">
          Manage your artisanal order history, verified delivery locations, and culinary preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Profile Sidebar */}
        <ProfileSidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

        {/* Dynamic Content Panel */}
        <main className="flex-1 w-full overflow-hidden space-y-6">
          {/* ===================================================================
              TAB 1: PERSONAL INFORMATION
              =================================================================== */}
          {activeTab === "personal" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-warmSand/10">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Personal Information
                  </h2>
                  <p className="text-xs text-brand-cream/60 font-body">
                    Your personal profile details saved in Browser Local Storage.
                  </p>
                </div>
                {!isEditingProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileForm({
                        name: currentUser?.name || "",
                        phone: currentUser?.phone || "",
                        dob: currentUser?.dob || "",
                        bio: currentUser?.bio || "",
                        avatar: currentUser?.avatar || "",
                      });
                      setIsEditingProfile(true);
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-brand-vantablack hover:bg-brand-gold hover:text-brand-deepBlack border border-brand-gold/40 text-brand-gold text-xs font-accent font-bold transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {!isEditingProfile ? (
                <div className="space-y-6">
                  {/* Avatar & Main Card */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 p-5 rounded-2xl bg-brand-vantablack/60 border border-brand-warmSand/10">
                    <img
                      src={
                        currentUser?.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                      }
                      alt={currentUser?.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-brand-gold/50 shadow-md shrink-0"
                    />
                    <div className="space-y-2 text-center sm:text-left">
                      <div>
                        <span className="text-[10px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold font-bold">
                          {currentUser?.role?.replace("_", " ")}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-brand-cream mt-1">
                          {currentUser?.name}
                        </h3>
                        <p className="text-xs text-brand-cream/60 font-body">
                          {currentUser?.bio || "EMBER & BEAN Culinary Connoisseur."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-brand-vantablack/40 border border-brand-warmSand/10 space-y-1">
                      <span className="text-brand-cream/50 text-[10px] font-accent uppercase font-bold flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Email Address</span>
                      </span>
                      <p className="font-mono text-brand-cream font-bold">{currentUser?.email}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-vantablack/40 border border-brand-warmSand/10 space-y-1">
                      <span className="text-brand-cream/50 text-[10px] font-accent uppercase font-bold flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Contact Number</span>
                      </span>
                      <p className="font-mono text-brand-cream font-bold">
                        {currentUser?.phone || "No phone registered"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-vantablack/40 border border-brand-warmSand/10 space-y-1">
                      <span className="text-brand-cream/50 text-[10px] font-accent uppercase font-bold flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Date of Birth</span>
                      </span>
                      <p className="font-mono text-brand-cream font-bold">
                        {currentUser?.dob || "Not specified"}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-vantablack/40 border border-brand-warmSand/10 space-y-1">
                      <span className="text-brand-cream/50 text-[10px] font-accent uppercase font-bold flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Account Role</span>
                      </span>
                      <p className="font-mono text-brand-gold font-bold">
                        {currentUser?.role} (Browser Local Storage)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Profile Edit Form */
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profileForm.dob}
                        onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                        className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                        Avatar Image URL
                      </label>
                      <input
                        type="url"
                        value={profileForm.avatar}
                        onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                        className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                        Bio / Taste Notes
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                        placeholder="Tell us about your culinary inclinations..."
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-5 py-2.5 rounded-2xl bg-brand-vantablack text-brand-cream/70 text-xs font-accent font-semibold hover:text-brand-cream"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20"
                    >
                      Save Profile
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* ===================================================================
              TAB 2: ORDERS & RECEIPTS
              =================================================================== */}
          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-6"
            >
              <div className="pb-4 border-b border-brand-warmSand/10">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Culinary Order History
                </h2>
                <p className="text-xs text-brand-cream/60 font-body">
                  All past dining orders and delivery dispatches linked to {currentUser?.email}.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-vantablack border border-brand-gold/30 flex items-center justify-center text-brand-gold mx-auto">
                    <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-brand-cream">
                    No Orders Recorded Yet
                  </h3>
                  <p className="text-xs text-brand-cream/50 max-w-sm mx-auto">
                    Explore our artisanal coffee and savory dishes to experience our culinary craftsmanship.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/menu")}
                    className="mt-2 px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 cursor-pointer"
                  >
                    Explore Menu & Order
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="p-5 rounded-2xl bg-brand-vantablack/70 border border-brand-warmSand/10 hover:border-brand-gold/30 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-brand-gold">
                            #{o.id.toUpperCase()}
                          </span>
                          <span
                            className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase font-accent ${
                              o.status === "Delivered"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : o.status === "Cancelled"
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
                            }`}
                          >
                            {o.status}
                          </span>
                        </div>
                        <p className="text-xs text-brand-cream/80 font-body">
                          {o.items?.map((i) => `${i.quantity || 1}x ${i.name}`).join(", ")}
                        </p>
                        <span className="text-[10px] text-brand-cream/40 font-mono block">
                          {new Date(o.createdAt || o.date).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-cream">
                          ${Number(o.total || 0).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(o)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-deepBlack hover:bg-brand-gold hover:text-brand-deepBlack border border-brand-warmSand/20 text-brand-cream text-xs font-accent transition-all cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>View Receipt</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ===================================================================
              TAB 3: DELIVERY ADDRESSES
              =================================================================== */}
          {activeTab === "addresses" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-brand-warmSand/10">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Delivery Addresses
                  </h2>
                  <p className="text-xs text-brand-cream/60 font-body">
                    Manage your shipping locations for rapid ordering.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddAddress}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Address</span>
                </button>
              </div>

              {(!currentUser?.addresses || currentUser.addresses.length === 0) ? (
                <div className="py-10 text-center text-xs text-brand-cream/50">
                  No addresses saved yet. Click "Add Address" above to save one.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentUser.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between space-y-3 ${
                        addr.isDefault
                          ? "bg-brand-vantablack/90 border-brand-gold/60 shadow-md shadow-brand-gold/10"
                          : "bg-brand-vantablack/50 border-brand-warmSand/15"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-accent font-bold text-xs text-brand-cream uppercase tracking-wide">
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-gold text-brand-deepBlack font-black font-accent">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-cream/80 font-body leading-relaxed pt-1">
                          {addr.street}
                        </p>
                        <p className="text-[11px] text-brand-cream/50 font-mono">
                          {addr.city} · {addr.postalCode}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-brand-warmSand/10 flex items-center justify-between text-xs font-accent">
                        {!addr.isDefault ? (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-brand-gold hover:underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-green-400 font-bold flex items-center space-x-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Active Destination</span>
                          </span>
                        )}

                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditAddress(addr)}
                            className="p-1.5 rounded-lg text-brand-cream/60 hover:text-brand-gold cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteAddress(addr.id)}
                            className="p-1.5 rounded-lg text-brand-cream/60 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ===================================================================
              TAB 4: SAVED WISHLIST
              =================================================================== */}
          {activeTab === "wishlist" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-6"
            >
              <div className="pb-4 border-b border-brand-warmSand/10">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Saved Culinary Wishlist
                </h2>
                <p className="text-xs text-brand-cream/60 font-body">
                  Dishes saved to your tasting shortlist ({wishlist.length} items).
                </p>
              </div>

              {wishlist.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Heart className="w-10 h-10 text-brand-gold/40 mx-auto" />
                  <p className="text-xs text-brand-cream/50">Your wishlist is currently empty.</p>
                  <button
                    type="button"
                    onClick={() => navigate("/menu")}
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold cursor-pointer"
                  >
                    Browse Selections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-brand-vantablack/70 border border-brand-warmSand/10 flex items-center justify-between space-x-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-brand-warmSand/20"
                      />
                      <div className="overflow-hidden flex-1">
                        <h4 className="font-bold text-xs text-brand-cream truncate">
                          {item.name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-brand-gold">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item);
                            showToast(`Added ${item.name} to cart!`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-brand-gold text-brand-deepBlack text-[11px] font-accent font-bold hover:shadow-md cursor-pointer"
                        >
                          Add to Order
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-1.5 rounded-xl text-brand-cream/40 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ===================================================================
              TAB 5: ACCOUNT SETTINGS
              =================================================================== */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-6"
            >
              <div className="pb-4 border-b border-brand-warmSand/10">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Account & Security Settings
                </h2>
                <p className="text-xs text-brand-cream/60 font-body">
                  Update local demo credentials and notification preferences.
                </p>
              </div>

              {/* Password Change Form */}
              <div className="space-y-4 max-w-md">
                <h3 className="font-heading text-sm font-bold text-brand-cream flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-brand-gold" />
                  <span>Change Password</span>
                </h3>

                {passwordError && (
                  <p className="text-xs text-red-400 font-accent">{passwordError}</p>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.newPass}
                      onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.confirmPass}
                      onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Sign Out Trigger */}
              <div className="pt-6 border-t border-brand-warmSand/10">
                <button
                  type="button"
                  onClick={() => setLogoutModalOpen(true)}
                  className="px-6 py-2.5 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-accent font-bold hover:bg-red-600/30 cursor-pointer"
                >
                  Sign Out of Demo Profile
                </button>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* =========================================================================
          ADDRESS MODAL
          ========================================================================= */}
      <AnimatePresence>
        {addressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-brand-deepBlack border border-brand-gold/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-warmSand/15">
                <h3 className="font-heading text-lg font-bold text-brand-cream">
                  {editingAddress ? "Edit Destination" : "Add Delivery Destination"}
                </h3>
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="p-1 text-brand-cream/60 hover:text-brand-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Location Label
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                    placeholder="e.g. Home, Creative Studio"
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Street Address & Apartment
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    placeholder="e.g. Flat 402, Sea Breeze, Carter Road"
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      City
                    </label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={addressForm.postalCode}
                      onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setAddressModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-brand-vantablack text-brand-cream/70 text-xs font-accent font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          RECEIPT DETAILS MODAL
          ========================================================================= */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-brand-deepBlack border border-brand-gold/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-warmSand/15">
                <div>
                  <span className="text-[10px] font-accent uppercase tracking-widest text-brand-gold font-bold">
                    Official Culinary Receipt
                  </span>
                  <h3 className="font-heading text-lg font-bold text-brand-cream">
                    Order #{selectedReceipt.id.toUpperCase()}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1 rounded-xl text-brand-cream/60 hover:text-brand-gold cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Customer Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-brand-vantablack/80 p-4 rounded-2xl border border-brand-warmSand/10">
                <div>
                  <span className="text-brand-cream/50 block text-[10px] uppercase font-accent">Customer</span>
                  <span className="font-bold text-brand-cream">{selectedReceipt.customerName}</span>
                  <p className="text-[11px] text-brand-cream/60 truncate">{selectedReceipt.customerEmail}</p>
                </div>
                <div>
                  <span className="text-brand-cream/50 block text-[10px] uppercase font-accent">Status</span>
                  <span className="font-bold text-brand-gold">{selectedReceipt.status}</span>
                  <p className="text-[11px] text-brand-cream/60">
                    {new Date(selectedReceipt.createdAt || selectedReceipt.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="text-xs bg-brand-vantablack/60 p-3 rounded-2xl border border-brand-warmSand/10">
                <span className="text-[10px] font-accent uppercase text-brand-gold font-bold block mb-1">
                  Delivery Destination
                </span>
                <p className="text-brand-cream/80 leading-relaxed">
                  {selectedReceipt.shippingAddress || selectedReceipt.deliveryAddress || "Flagship Table Service"}
                </p>
              </div>

              {/* Itemized Dishes List */}
              <div className="space-y-2 border-t border-b border-brand-warmSand/10 py-3">
                <span className="text-[10px] font-accent uppercase text-brand-cream/50 font-bold block">
                  Itemized Order Breakdown
                </span>
                {selectedReceipt.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1">
                    <span className="text-brand-cream font-medium">
                      {item.quantity || 1}x {item.name}
                    </span>
                    <span className="font-mono text-brand-gold">
                      ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="space-y-1.5 text-xs font-mono pt-1">
                <div className="flex justify-between text-brand-cream/70">
                  <span>Subtotal</span>
                  <span>${Number(selectedReceipt.subtotal || selectedReceipt.total || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-cream/70">
                  <span>Chef's Tax & Service</span>
                  <span>${Number(selectedReceipt.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-cream pt-2 border-t border-brand-warmSand/15">
                  <span className="font-heading">Total Paid</span>
                  <span className="text-brand-gold font-mono">${Number(selectedReceipt.total || 0).toFixed(2)}</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

