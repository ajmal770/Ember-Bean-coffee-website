import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { initSmoothScroll } from "./animations/gsapConfig";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import { WishlistProvider, useWishlist } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ConfirmationModal from "./components/ConfirmationModal";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";

// Auth Pages
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Role-Protected Dashboards
import Profile from "./pages/customer/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";

function GlobalToasts() {
  const { toastMessage: cartToast } = useCart();
  const { wishlistToast } = useWishlist();
  const { toastMessage: authToast } = useAuth();

  const activeMessage =
    cartToast ||
    wishlistToast ||
    (authToast ? authToast.text || authToast : null);

  const isError = authToast?.type === "error";

  return (
    <AnimatePresence>
      {activeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-6 left-6 z-50 border px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center space-x-3 text-xs font-accent ${isError
              ? "bg-red-950/90 border-red-500/60 text-red-200"
              : "bg-brand-deepBlack/95 border-brand-gold/60 text-brand-cream"
            }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-ping ${isError ? "bg-red-400" : "bg-brand-gold"
              }`}
          />
          <span className="font-semibold">{activeMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlobalLogoutModal() {
  const { logoutModalOpen, setLogoutModalOpen, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <ConfirmationModal
      isOpen={logoutModalOpen}
      title="Confirm Sign Out"
      message="Are you sure you want to end your current demo session? Your shopping cart and saved wishlist will remain safely preserved in Local Storage."
      confirmText="Yes, Sign Out"
      cancelText="Stay Signed In"
      isDestructive={false}
      onConfirm={() => {
        logout();
        setLogoutModalOpen(false);
        navigate("/");
      }}
      onCancel={() => setLogoutModalOpen(false)}
    />
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />

          {/* Authentication Routes - Login page removed; redirects to Home */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Customer Profile & Sub-Routes */}
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={["CUSTOMER", "ADMIN", "SUPER_ADMIN"]}>
                <Profile />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/profile/:tab"
            element={
              <RoleProtectedRoute allowedRoles={["CUSTOMER", "ADMIN", "SUPER_ADMIN"]}>
                <Profile />
              </RoleProtectedRoute>
            }
          />

          {/* Admin Operations & Sub-Routes */}
          <Route
            path="/admin"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/:tab"
            element={
              <RoleProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Super Admin Executive Console & Sub-Routes */}
          <Route
            path="/superadmin"
            element={
              <RoleProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SuperAdminDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/superadmin/:tab"
            element={
              <RoleProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <SuperAdminDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scrolling with GSAP ticker
    const lenis = initSmoothScroll();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen bg-brand-vantablack text-brand-cream">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />

        {/* Global Drawers, Modals & Floating Controls */}
        <CartDrawer />
        <WishlistDrawer />
        <ScrollToTop />
        <GlobalToasts />
        <GlobalLogoutModal />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MainLayout />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
