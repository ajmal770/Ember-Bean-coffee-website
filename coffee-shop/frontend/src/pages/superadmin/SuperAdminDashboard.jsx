import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";
import DashboardCard from "../../components/DashboardCard";
import DataTable from "../../components/DataTable";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  generateId,
  addActivityLog,
  initDemoSeed,
} from "../../utils/storage";
import {
  Crown,
  LayoutDashboard,
  Users,
  ShieldCheck,
  UtensilsCrossed,
  Tags,
  ShoppingBag,
  Sliders,
  FileText,
  Activity,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Sparkles,
  Receipt,
  DollarSign,
  TrendingUp,
  Download,
  RotateCcw,
  UserCheck,
  UserX,
  Lock,
  Mail,
  Phone,
  Calendar,
  Layers,
  Check,
  AlertTriangle,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const { currentUser, setLogoutModalOpen, showToast } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Tab state derived from URL
  const getTabFromPath = () => {
    if (location.pathname.includes("/users")) return "users";
    if (location.pathname.includes("/admins")) return "admins";
    if (location.pathname.includes("/products")) return "products";
    if (location.pathname.includes("/categories")) return "categories";
    if (location.pathname.includes("/orders")) return "orders";
    if (location.pathname.includes("/roles")) return "roles";
    if (location.pathname.includes("/reports")) return "reports";
    if (location.pathname.includes("/settings")) return "settings";
    if (location.pathname.includes("/activity-logs")) return "activity-logs";
    return "overview";
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "overview") navigate("/superadmin");
    else navigate(`/superadmin/${tabId}`);
  };

  // State synchronized with Local Storage
  const [products, setProducts] = useState(() => getStorage(STORAGE_KEYS.PRODUCTS, []));
  const [categories, setCategories] = useState(() => getStorage(STORAGE_KEYS.CATEGORIES, []));
  const [orders, setOrders] = useState(() => getStorage(STORAGE_KEYS.ORDERS, []));
  const [users, setUsers] = useState(() => getStorage(STORAGE_KEYS.USERS, []));
  const [settings, setSettings] = useState(() => getStorage(STORAGE_KEYS.ADMIN_SETTINGS, {}));
  const [logs, setLogs] = useState(() => getStorage(STORAGE_KEYS.ACTIVITY_LOGS, []));

  const refreshAll = () => {
    setProducts(getStorage(STORAGE_KEYS.PRODUCTS, []));
    setCategories(getStorage(STORAGE_KEYS.CATEGORIES, []));
    setOrders(getStorage(STORAGE_KEYS.ORDERS, []));
    setUsers(getStorage(STORAGE_KEYS.USERS, []));
    setSettings(getStorage(STORAGE_KEYS.ADMIN_SETTINGS, {}));
    setLogs(getStorage(STORAGE_KEYS.ACTIVITY_LOGS, []));
  };

  useEffect(() => {
    const handleStorageChange = () => refreshAll();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("ember_storage_updated", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("ember_storage_updated", handleStorageChange);
    };
  }, []);

  // Metrics
  const metrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => {
      if (o.status !== "Cancelled") return sum + (Number(o.total) || 0);
      return sum;
    }, 0);

    const pendingCount = orders.filter((o) => o.status === "Pending").length;
    const customersCount = users.filter((u) => u.role === "CUSTOMER").length;
    const adminsCount = users.filter((u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length;

    return {
      revenue: totalRev,
      ordersCount: orders.length,
      productsCount: products.length,
      customersCount,
      adminsCount,
      pendingCount,
    };
  }, [orders, products, users]);

  // Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Coffee",
    price: "",
    stock: 20,
    inStock: true,
    rating: 4.8,
    image: "",
    description: "",
  });

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    phone: "",
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    action: null,
    isDestructive: true,
  });

  // Product Actions
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category: categories[0]?.name || "Coffee",
      price: "",
      stock: 25,
      inStock: true,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
      description: "",
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name || "",
      category: prod.category || "Coffee",
      price: prod.price || "",
      stock: prod.stock ?? 20,
      inStock: prod.inStock ?? true,
      rating: prod.rating || 4.8,
      image: prod.image || "",
      description: prod.description || "",
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast("Please provide product name and price.", "error");
      return;
    }

    const priceNum = parseFloat(productForm.price);
    const stockNum = parseInt(productForm.stock, 10) || 0;

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              ...productForm,
              price: priceNum,
              stock: stockNum,
              inStock: stockNum > 0 ? productForm.inStock : false,
            }
          : p
      );
      addActivityLog(
        "UPDATE",
        `Super Admin updated product: ${productForm.name} ($${priceNum.toFixed(2)})`,
        currentUser?.email
      );
      showToast(`Updated "${productForm.name}" successfully!`, "success");
    } else {
      const newProduct = {
        id: generateId("prod"),
        ...productForm,
        price: priceNum,
        stock: stockNum,
        inStock: stockNum > 0 ? productForm.inStock : false,
        createdAt: new Date().toISOString(),
      };
      updatedProducts = [newProduct, ...products];
      addActivityLog(
        "CREATE",
        `Super Admin created new product: ${productForm.name} in ${productForm.category}`,
        currentUser?.email
      );
      showToast(`Added "${productForm.name}" to catalog!`, "success");
    }

    setProducts(updatedProducts);
    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (prod) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Culinary Dish",
      message: `Are you sure you want to permanently delete "${prod.name}"? This action removes it from the menu immediately.`,
      isDestructive: true,
      action: () => {
        const next = products.filter((p) => p.id !== prod.id);
        setProducts(next);
        setStorage(STORAGE_KEYS.PRODUCTS, next);
        addActivityLog("DELETE", `Super Admin deleted product: ${prod.name}`, currentUser?.email);
        showToast(`Product "${prod.name}" was removed.`, "success");
      },
    });
  };

  // Category Actions
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", description: "" });
    setCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({ name: cat.name, description: cat.description || "" });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      showToast("Category name is required.", "error");
      return;
    }

    let nextCats;
    if (editingCategory) {
      nextCats = categories.map((c) =>
        c.id === editingCategory.id ? { ...c, ...categoryForm } : c
      );
      addActivityLog("UPDATE", `Super Admin updated category: ${categoryForm.name}`, currentUser?.email);
      showToast(`Category updated to "${categoryForm.name}"`, "success");
    } else {
      const newCat = {
        id: generateId("cat"),
        name: categoryForm.name.trim(),
        description: categoryForm.description.trim(),
      };
      nextCats = [...categories, newCat];
      addActivityLog("CREATE", `Super Admin created category: ${newCat.name}`, currentUser?.email);
      showToast(`Category "${newCat.name}" created!`, "success");
    }

    setCategories(nextCats);
    setStorage(STORAGE_KEYS.CATEGORIES, nextCats);
    setCategoryModalOpen(false);
  };

  const handleDeleteCategory = (cat) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Category",
      message: `Delete "${cat.name}" category? Products under this category will remain, but the filter will be removed.`,
      isDestructive: true,
      action: () => {
        const next = categories.filter((c) => c.id !== cat.id);
        setCategories(next);
        setStorage(STORAGE_KEYS.CATEGORIES, next);
        addActivityLog("DELETE", `Super Admin deleted category: ${cat.name}`, currentUser?.email);
        showToast(`Category "${cat.name}" removed.`, "success");
      },
    });
  };

  // Order Actions
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const nextOrders = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : o
    );
    setOrders(nextOrders);
    setStorage(STORAGE_KEYS.ORDERS, nextOrders);
    addActivityLog("UPDATE", `Super Admin updated order ${orderId} status to "${newStatus}"`, currentUser?.email);
    showToast(`Order status updated to ${newStatus}`, "success");
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleCancelOrder = (order) => {
    setConfirmModal({
      isOpen: true,
      title: "Cancel Order",
      message: `Are you sure you want to cancel order ${order.id} for ${order.customerName}?`,
      isDestructive: true,
      action: () => {
        handleUpdateOrderStatus(order.id, "Cancelled");
      },
    });
  };

  // Admin Account Actions
  const handleOpenAddAdmin = () => {
    setAdminForm({
      name: "",
      email: "",
      password: "Admin@" + Math.floor(100 + Math.random() * 900),
      role: "ADMIN",
      phone: "+91 98200 " + Math.floor(10000 + Math.random() * 90000),
    });
    setAdminModalOpen(true);
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      showToast("Please provide name, email, and password.", "error");
      return;
    }

    if (users.some((u) => u.email.toLowerCase() === adminForm.email.toLowerCase())) {
      showToast("A user with this email already exists.", "error");
      return;
    }

    const newAdmin = {
      id: generateId("user"),
      name: adminForm.name.trim(),
      email: adminForm.email.trim().toLowerCase(),
      password: adminForm.password,
      role: adminForm.role,
      phone: adminForm.phone || "+91 98200 00000",
      status: "Active",
      avatar:
        adminForm.role === "SUPER_ADMIN"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      createdAt: new Date().toISOString(),
      addresses: [],
    };

    const nextUsers = [newAdmin, ...users];
    setUsers(nextUsers);
    setStorage(STORAGE_KEYS.USERS, nextUsers);
    addActivityLog(
      "CREATE",
      `Super Admin provisioned new ${adminForm.role} account: ${newAdmin.email}`,
      currentUser?.email
    );
    showToast(`Provisioned ${adminForm.role} account for ${newAdmin.name}!`, "success");
    setAdminModalOpen(false);
  };

  const handleToggleUserStatus = (user) => {
    if (user.id === currentUser?.id) {
      showToast("Cannot deactivate your own active Super Admin session.", "error");
      return;
    }

    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    const nextUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    setUsers(nextUsers);
    setStorage(STORAGE_KEYS.USERS, nextUsers);
    addActivityLog(
      "UPDATE",
      `Super Admin changed status of ${user.email} to ${newStatus}`,
      currentUser?.email
    );
    showToast(`User ${user.name} is now ${newStatus}.`, "success");
  };

  const handleChangeUserRole = (user, newRole) => {
    if (user.id === currentUser?.id) {
      showToast("Cannot demote your own Super Admin account.", "error");
      return;
    }

    const nextUsers = users.map((u) =>
      u.id === user.id ? { ...u, role: newRole } : u
    );
    setUsers(nextUsers);
    setStorage(STORAGE_KEYS.USERS, nextUsers);
    addActivityLog(
      "UPDATE",
      `Super Admin changed role of ${user.email} from ${user.role} to ${newRole}`,
      currentUser?.email
    );
    showToast(`Updated role of ${user.name} to ${newRole}.`, "success");
  };

  const handleDeleteUser = (user) => {
    if (user.id === currentUser?.id) {
      showToast("Cannot delete your own active account.", "error");
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: "Delete User Account",
      message: `Permanently delete account for "${user.name}" (${user.email})?`,
      isDestructive: true,
      action: () => {
        const nextUsers = users.filter((u) => u.id !== user.id);
        setUsers(nextUsers);
        setStorage(STORAGE_KEYS.USERS, nextUsers);
        addActivityLog("DELETE", `Super Admin deleted user: ${user.email}`, currentUser?.email);
        showToast(`User "${user.name}" removed from directory.`, "success");
      },
    });
  };

  // Settings & Reset
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setStorage(STORAGE_KEYS.ADMIN_SETTINGS, settings);
    addActivityLog("SETTINGS", "Super Admin updated website and store parameters", currentUser?.email);
    showToast("Website configuration saved to Local Storage!", "success");
  };

  const handleResetDemoSeed = () => {
    setConfirmModal({
      isOpen: true,
      title: "Re-Seed & Reset All Demo Data",
      message:
        "This will restore all culinary products, default customer & admin accounts, categories, sample orders, and activity logs to pristine defaults. Are you sure?",
      isDestructive: true,
      action: () => {
        initDemoSeed(true);
        refreshAll();
        addActivityLog("SEED", "Super Admin executed complete demo seed re-initialization", currentUser?.email);
        showToast("Demo data re-seeded successfully!", "success");
      },
    });
  };

  const handleClearLogs = () => {
    setConfirmModal({
      isOpen: true,
      title: "Purge Activity Logs",
      message: "Are you sure you want to clear all recorded activity audit logs from Local Storage?",
      isDestructive: true,
      action: () => {
        setStorage(STORAGE_KEYS.ACTIVITY_LOGS, []);
        setLogs([]);
        showToast("Activity logs purged.", "success");
      },
    });
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      usersCount: users.length,
      productsCount: products.length,
      ordersCount: orders.length,
      categoriesCount: categories.length,
      revenueTotal: metrics.revenue,
      users,
      products,
      orders,
      categories,
      settings,
      activityLogs: logs,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ember_and_bean_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Local Storage backup exported as JSON file!", "success");
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-left">
      {/* Top Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-brand-warmSand/10 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-accent uppercase tracking-widest font-black mb-2">
            <Crown className="w-3.5 h-3.5" />
            <span>Executive Super Admin Console</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-cream tracking-tight">
            Governance & Master Control
          </h1>
          <p className="text-xs sm:text-sm text-brand-cream/60 mt-1 max-w-2xl font-body">
            Full authority dashboard powered by Browser Local Storage. Manage catalog, users, administrators, orders, and system audit logs in real time.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-brand-deepBlack border border-brand-warmSand/20 text-brand-cream text-xs font-accent font-semibold hover:border-brand-gold/50 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-brand-gold" />
            <span>Export Snapshot</span>
          </button>
          <button
            type="button"
            onClick={handleResetDemoSeed}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-brand-deepBlack border border-red-500/30 text-red-300 text-xs font-accent font-semibold hover:bg-red-500/10 transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-400" />
            <span>Reset Demo Seed</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <SuperAdminSidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

        {/* Dynamic Content Panel */}
        <main className="flex-1 w-full overflow-hidden space-y-8">
          {/* ===================================================================
              TAB 1: EXECUTIVE OVERVIEW
              =================================================================== */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <DashboardCard
                  title="Total Gross Revenue"
                  value={`$${metrics.revenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  subtitle="Persisted from paid orders"
                  icon={DollarSign}
                  trend="+18.4%"
                  isPositive={true}
                />
                <DashboardCard
                  title="Global Orders"
                  value={metrics.ordersCount}
                  subtitle={`${metrics.pendingCount} pending culinary fulfillment`}
                  icon={ShoppingBag}
                  trend="+12%"
                  isPositive={true}
                />
                <DashboardCard
                  title="Registered Customers"
                  value={metrics.customersCount}
                  subtitle="Active browser client accounts"
                  icon={Users}
                  trend="+6%"
                  isPositive={true}
                />
                <DashboardCard
                  title="Culinary Catalog"
                  value={metrics.productsCount}
                  subtitle={`${categories.length} active menu categories`}
                  icon={UtensilsCrossed}
                />
                <DashboardCard
                  title="System Administrators"
                  value={metrics.adminsCount}
                  subtitle="Admin & Super Admin accounts"
                  icon={ShieldCheck}
                />
                <DashboardCard
                  title="Audit Trail Logs"
                  value={logs.length}
                  subtitle="Logged browser events"
                  icon={Activity}
                />
              </div>

              {/* Graphical Overview & Analytics Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-brand-warmSand/10">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-brand-cream">
                        Culinary Sales Revenue by Category
                      </h3>
                      <p className="text-xs text-brand-cream/60">
                        Derived from live Local Storage orders
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-[10px] font-accent uppercase tracking-wider font-bold">
                      Live Calculated
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    {categories.map((cat, idx) => {
                      const count = products.filter((p) => p.category === cat.name).length;
                      const percentage = Math.min(100, Math.round((count / (products.length || 1)) * 100));

                      return (
                        <div key={cat.id || idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-accent">
                            <span className="text-brand-cream font-medium">{cat.name}</span>
                            <span className="text-brand-gold font-bold">
                              {count} items ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-brand-vantablack overflow-hidden border border-brand-warmSand/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-brand-gold transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-cream mb-1">
                      Popular Master Selections
                    </h3>
                    <p className="text-xs text-brand-cream/60 mb-4">
                      Top rated creations in catalog
                    </p>

                    <div className="space-y-3">
                      {products.slice(0, 5).map((p, idx) => (
                        <div
                          key={p.id || idx}
                          className="flex items-center justify-between p-2.5 rounded-2xl bg-brand-vantablack/60 border border-brand-warmSand/10"
                        >
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-brand-warmSand/20"
                            />
                            <div className="overflow-hidden">
                              <h4 className="text-xs font-bold text-brand-cream truncate">
                                {p.name}
                              </h4>
                              <span className="text-[10px] text-brand-sandBeige font-accent">
                                {p.category} · ★ {p.rating || 4.8}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-brand-gold shrink-0 pl-2">
                            ${Number(p.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectTab("products")}
                    className="mt-4 w-full py-2.5 rounded-2xl bg-brand-vantablack hover:bg-brand-gold hover:text-brand-deepBlack border border-brand-gold/30 text-brand-gold text-xs font-accent font-bold transition-all text-center cursor-pointer"
                  >
                    Manage All {products.length} Products
                  </button>
                </div>
              </div>

              {/* Recent Orders Preview & Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-brand-warmSand/10 mb-4">
                    <h3 className="font-heading text-lg font-bold text-brand-cream">
                      Recent Queue Orders
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleSelectTab("orders")}
                      className="text-xs text-brand-gold hover:underline font-accent"
                    >
                      View All ({orders.length})
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-brand-cream/50 py-8 text-center font-accent">
                      No orders recorded yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 5).map((o) => (
                        <div
                          key={o.id}
                          className="flex items-center justify-between p-3 rounded-2xl bg-brand-vantablack/60 border border-brand-warmSand/10 hover:border-brand-gold/30 transition-all"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-xs font-bold text-brand-gold">
                                #{o.id.toUpperCase()}
                              </span>
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase font-accent ${
                                  o.status === "Delivered"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : o.status === "Cancelled"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
                                }`}
                              >
                                {o.status}
                              </span>
                            </div>
                            <p className="text-xs text-brand-cream/70 mt-1">
                              {o.customerName} · {o.items?.length || 0} items
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-brand-cream block font-mono">
                              ${Number(o.total || 0).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(o)}
                              className="text-[10px] text-brand-gold hover:underline cursor-pointer"
                            >
                              Inspect Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-brand-warmSand/10 mb-4">
                    <h3 className="font-heading text-lg font-bold text-brand-cream">
                      Recent System Actions
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleSelectTab("activity-logs")}
                      className="text-xs text-brand-gold hover:underline font-accent"
                    >
                      Audit Trail ({logs.length})
                    </button>
                  </div>

                  {logs.length === 0 ? (
                    <p className="text-xs text-brand-cream/50 py-8 text-center font-accent">
                      No activity logs recorded.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {logs.slice(0, 5).map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-2xl bg-brand-vantablack/60 border border-brand-warmSand/10 flex items-start space-x-3 text-xs"
                        >
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold uppercase shrink-0 mt-0.5 ${
                              log.action === "CREATE"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : log.action === "DELETE"
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : log.action === "UPDATE"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
                            }`}
                          >
                            {log.action}
                          </span>
                          <div className="overflow-hidden flex-1">
                            <p className="text-brand-cream/90 font-medium truncate">
                              {log.description}
                            </p>
                            <span className="text-[10px] text-brand-cream/40 font-mono">
                              {new Date(log.timestamp).toLocaleTimeString()} · {log.userEmail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 2: ALL USERS DIRECTORY
              =================================================================== */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Global User Accounts Directory
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Total {users.length} accounts stored in Browser Local Storage (Customers, Admins, Super Admins)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddAdmin}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Provision New User / Admin</span>
                </button>
              </div>

              <DataTable
                data={users}
                searchPlaceholder="Search by name, email, or role..."
                filterCategoryKey="role"
                categories={["CUSTOMER", "ADMIN", "SUPER_ADMIN"]}
                columns={[
                  {
                    header: "User Identity",
                    accessor: "name",
                    render: (u) => (
                      <div className="flex items-center space-x-3">
                        <img
                          src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                          alt={u.name}
                          className="w-9 h-9 rounded-xl object-cover border border-brand-warmSand/20 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-brand-cream truncate">{u.name}</p>
                          <p className="text-[11px] text-brand-cream/50 truncate font-mono">{u.email}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    header: "Role",
                    accessor: "role",
                    render: (u) => (
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-accent font-black tracking-wider uppercase ${
                          u.role === "SUPER_ADMIN"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : u.role === "ADMIN"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                            : "bg-brand-sandBeige/20 text-brand-sandBeige border border-brand-sandBeige/30"
                        }`}
                      >
                        {u.role.replace("_", " ")}
                      </span>
                    ),
                  },
                  {
                    header: "Contact Phone",
                    accessor: "phone",
                    render: (u) => (
                      <span className="text-xs text-brand-cream/80 font-mono">
                        {u.phone || "—"}
                      </span>
                    ),
                  },
                  {
                    header: "Account Status",
                    accessor: "status",
                    render: (u) => (
                      <button
                        type="button"
                        onClick={() => handleToggleUserStatus(u)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-accent font-bold cursor-pointer transition-all ${
                          u.status === "Inactive"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-green-500/20 text-green-300 border border-green-500/30"
                        }`}
                        title="Click to toggle status"
                      >
                        {u.status || "Active"}
                      </button>
                    ),
                  },
                  {
                    header: "Actions",
                    accessor: "id",
                    render: (u) => (
                      <div className="flex items-center space-x-2">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeUserRole(u, e.target.value)}
                          disabled={u.id === currentUser?.id}
                          className="bg-brand-vantablack border border-brand-warmSand/20 rounded-xl px-2 py-1 text-[11px] text-brand-cream focus:border-brand-gold outline-none"
                        >
                          <option value="CUSTOMER">Customer</option>
                          <option value="ADMIN">Admin</option>
                          <option value="SUPER_ADMIN">Super Admin</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u)}
                          disabled={u.id === currentUser?.id}
                          className="p-1.5 rounded-lg text-brand-cream/40 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-20 cursor-pointer"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ),
                  },
                ]}
              />
            </motion.div>
          )}

          {/* ===================================================================
              TAB 3: ADMINISTRATOR MANAGEMENT
              =================================================================== */}
          {activeTab === "admins" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Administrator Governance
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Grant administrative credentials, assign roles, and revoke elevated system permissions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddAdmin}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Provision New Admin</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {users
                  .filter((u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN")
                  .map((admin) => (
                    <div
                      key={admin.id}
                      className="p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={admin.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                            alt={admin.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-brand-gold/40 shrink-0"
                          />
                          <div>
                            <span
                              className={`text-[9px] font-accent uppercase tracking-wider px-2 py-0.5 rounded-full font-black ${
                                admin.role === "SUPER_ADMIN"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                  : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                              }`}
                            >
                              {admin.role.replace("_", " ")}
                            </span>
                            <h4 className="text-sm font-bold text-brand-cream mt-1 truncate">
                              {admin.name}
                            </h4>
                          </div>
                        </div>

                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            admin.status === "Inactive" ? "bg-red-400" : "bg-green-400"
                          }`}
                          title={admin.status || "Active"}
                        />
                      </div>

                      <div className="space-y-1.5 text-xs text-brand-cream/70 font-mono bg-brand-vantablack/60 p-3 rounded-2xl border border-brand-warmSand/10">
                        <div className="flex items-center space-x-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span className="truncate">{admin.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>{admin.phone || "No phone registered"}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-brand-warmSand/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(admin)}
                          disabled={admin.id === currentUser?.id}
                          className="text-xs text-brand-cream/60 hover:text-brand-gold font-accent disabled:opacity-30 cursor-pointer"
                        >
                          {admin.status === "Inactive" ? "Activate" : "Suspend"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleChangeUserRole(admin, "CUSTOMER")}
                          disabled={admin.id === currentUser?.id}
                          className="text-xs text-red-400 hover:text-red-300 font-accent disabled:opacity-30 cursor-pointer"
                        >
                          Revoke Access
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 4: MASTER PRODUCTS CATALOG
              =================================================================== */}
          {activeTab === "products" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Master Culinary Catalog
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Control products, prices, descriptions, images, and live inventory.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Culinary Dish</span>
                </button>
              </div>

              <DataTable
                data={products}
                searchPlaceholder="Search catalog dishes, ingredients, or IDs..."
                filterCategoryKey="category"
                categories={categories.map((c) => c.name)}
                columns={[
                  {
                    header: "Dish & Description",
                    accessor: "name",
                    render: (p) => (
                      <div className="flex items-center space-x-3 max-w-sm">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-brand-warmSand/20 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-brand-cream text-xs truncate">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-brand-cream/50 truncate">
                            {p.description || "Artisanal preparation"}
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    header: "Category",
                    accessor: "category",
                    render: (p) => (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-sandBeige/15 text-brand-sandBeige font-accent border border-brand-sandBeige/20">
                        {p.category}
                      </span>
                    ),
                  },
                  {
                    header: "Price",
                    accessor: "price",
                    render: (p) => (
                      <span className="font-mono text-xs font-bold text-brand-gold">
                        ${Number(p.price).toFixed(2)}
                      </span>
                    ),
                  },
                  {
                    header: "Inventory Stock",
                    accessor: "stock",
                    render: (p) => (
                      <div className="text-xs font-mono">
                        <span className="font-bold text-brand-cream">{p.stock ?? 20}</span>
                        <span className="text-[10px] text-brand-cream/40 ml-1">units</span>
                      </div>
                    ),
                  },
                  {
                    header: "Availability",
                    accessor: "inStock",
                    render: (p) => (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = products.map((item) =>
                            item.id === p.id ? { ...item, inStock: !item.inStock } : item
                          );
                          setProducts(updated);
                          setStorage(STORAGE_KEYS.PRODUCTS, updated);
                          showToast(`Toggled ${p.name} availability`, "success");
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-accent font-bold cursor-pointer transition-all ${
                          p.inStock
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {p.inStock ? "In Stock" : "Sold Out"}
                      </button>
                    ),
                  },
                  {
                    header: "Actions",
                    accessor: "id",
                    render: (p) => (
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 rounded-lg text-brand-cream/60 hover:text-brand-gold hover:bg-brand-gold/10 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p)}
                          className="p-1.5 rounded-lg text-brand-cream/60 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ),
                  },
                ]}
              />
            </motion.div>
          )}

          {/* ===================================================================
              TAB 5: CATEGORIES MASTER
              =================================================================== */}
          {activeTab === "categories" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Culinary Category Taxonomy
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Define menu categories shown on the public menu and order system.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddCategory}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => {
                  const itemsInCat = products.filter((p) => p.category === cat.name).length;

                  return (
                    <div
                      key={cat.id || cat.name}
                      className="p-6 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-2xl bg-brand-vantablack border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                            <Tags className="w-5 h-5" />
                          </div>
                          <h3 className="font-heading text-base font-bold text-brand-cream">
                            {cat.name}
                          </h3>
                          <p className="text-xs text-brand-cream/60 mt-1 line-clamp-2">
                            {cat.description || "Artisanal gourmet category"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-brand-warmSand/10 flex items-center justify-between">
                        <span className="text-xs font-accent text-brand-gold font-bold">
                          {itemsInCat} Active Dishes
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditCategory(cat)}
                            className="p-1.5 rounded-lg text-brand-cream/60 hover:text-brand-gold hover:bg-brand-gold/10 transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-1.5 rounded-lg text-brand-cream/60 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 6: GLOBAL ORDERS MASTER
              =================================================================== */}
          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Global Orders Dispatch & Fulfillment
                </h2>
                <p className="text-xs text-brand-cream/60">
                  Inspect customer orders, advance status from Kitchen to Dispatch, and generate itemized receipts.
                </p>
              </div>

              <DataTable
                data={orders}
                searchPlaceholder="Search by order ID, customer name, email..."
                filterCategoryKey="status"
                categories={["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"]}
                columns={[
                  {
                    header: "Order ID",
                    accessor: "id",
                    render: (o) => (
                      <span className="font-mono text-xs font-bold text-brand-gold">
                        #{o.id.toUpperCase()}
                      </span>
                    ),
                  },
                  {
                    header: "Customer",
                    accessor: "customerName",
                    render: (o) => (
                      <div>
                        <p className="text-xs font-bold text-brand-cream">{o.customerName}</p>
                        <p className="text-[11px] text-brand-cream/50 font-mono">{o.customerEmail}</p>
                      </div>
                    ),
                  },
                  {
                    header: "Items",
                    accessor: "items",
                    render: (o) => (
                      <span className="text-xs text-brand-cream/80">
                        {o.items?.length || 0} dishes
                      </span>
                    ),
                  },
                  {
                    header: "Total",
                    accessor: "total",
                    render: (o) => (
                      <span className="font-mono text-xs font-bold text-brand-cream">
                        ${Number(o.total || 0).toFixed(2)}
                      </span>
                    ),
                  },
                  {
                    header: "Fulfillment Status",
                    accessor: "status",
                    render: (o) => (
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className={`text-[10px] font-accent font-bold px-2 py-1 rounded-xl outline-none cursor-pointer border ${
                          o.status === "Delivered"
                            ? "bg-green-500/20 text-green-300 border-green-500/40"
                            : o.status === "Cancelled"
                            ? "bg-red-500/20 text-red-300 border-red-500/40"
                            : "bg-brand-gold/20 text-brand-gold border-brand-gold/40"
                        }`}
                      >
                        <option value="Pending" className="bg-brand-deepBlack text-brand-cream">Pending</option>
                        <option value="Preparing" className="bg-brand-deepBlack text-brand-cream">Preparing</option>
                        <option value="Out for Delivery" className="bg-brand-deepBlack text-brand-cream">Out for Delivery</option>
                        <option value="Delivered" className="bg-brand-deepBlack text-brand-cream">Delivered</option>
                        <option value="Cancelled" className="bg-brand-deepBlack text-brand-cream">Cancelled</option>
                      </select>
                    ),
                  },
                  {
                    header: "Receipt Details",
                    accessor: "id",
                    render: (o) => (
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(o)}
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-brand-vantablack hover:bg-brand-gold hover:text-brand-deepBlack border border-brand-warmSand/20 text-brand-cream text-xs font-accent transition-all cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                        {o.status !== "Cancelled" && (
                          <button
                            type="button"
                            onClick={() => handleCancelOrder(o)}
                            className="p-1 rounded-lg text-brand-cream/40 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                            title="Cancel Order"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ),
                  },
                ]}
              />
            </motion.div>
          )}

          {/* ===================================================================
              TAB 7: ROLES & PERMISSIONS MATRIX
              =================================================================== */}
          {activeTab === "roles" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Role-Based Access Control (RBAC) Matrix
                </h2>
                <p className="text-xs text-brand-cream/60">
                  Granular permission overview across Customer, Admin, and Super Admin tiers.
                </p>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-brand-warmSand/15 bg-brand-deepBlack/90 shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-brand-vantablack border-b border-brand-warmSand/15 font-accent text-brand-cream/70 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-4 px-6">System Capability</th>
                      <th className="py-4 px-6 text-center">Customer</th>
                      <th className="py-4 px-6 text-center">Admin</th>
                      <th className="py-4 px-6 text-center text-brand-gold">Super Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-warmSand/10">
                    {[
                      { cap: "Explore Public Menu & Culinary Selection", cust: true, adm: true, sup: true },
                      { cap: "Save Items to Wishlist & Shopping Cart", cust: true, adm: true, sup: true },
                      { cap: "Place Orders & Check Out", cust: true, adm: true, sup: true },
                      { cap: "Manage Personal Addresses & Profile", cust: true, adm: true, sup: true },
                      { cap: "Access /admin Operations Dashboard", cust: false, adm: true, sup: true },
                      { cap: "Add / Edit / Delete Menu Dishes", cust: false, adm: true, sup: true },
                      { cap: "Manage Categories & Stock Toggles", cust: false, adm: true, sup: true },
                      { cap: "Update Order Fulfillment Statuses", cust: false, adm: true, sup: true },
                      { cap: "View Customer Directory (Read Only)", cust: false, adm: true, sup: true },
                      { cap: "Access /superadmin Executive Console", cust: false, adm: false, sup: true },
                      { cap: "Provision & Revoke Administrator Accounts", cust: false, adm: false, sup: true },
                      { cap: "Edit Global Store Settings & Hours", cust: false, adm: false, sup: true },
                      { cap: "View & Purge Activity Audit Logs", cust: false, adm: false, sup: true },
                      { cap: "Execute Demo Seed & Factory Reset", cust: false, adm: false, sup: true },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-brand-vantablack/40 transition-colors">
                        <td className="py-3 px-6 text-brand-cream font-medium">
                          {row.cap}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {row.cust ? (
                            <Check className="w-4 h-4 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-brand-cream/20 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {row.adm ? (
                            <Check className="w-4 h-4 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-brand-cream/20 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-6 text-center bg-brand-gold/5">
                          {row.sup ? (
                            <Check className="w-4 h-4 text-brand-gold mx-auto stroke-[2.5]" />
                          ) : (
                            <X className="w-4 h-4 text-brand-cream/20 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 8: SALES & ANALYTICS REPORTS
              =================================================================== */}
          {activeTab === "reports" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Culinary Sales & Business Intelligence
                </h2>
                <p className="text-xs text-brand-cream/60">
                  Synthesized metrics calculated from completed browser transactions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl">
                  <span className="text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold">
                    Average Order Value (AOV)
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-gold mt-1">
                    ${orders.length > 0 ? (metrics.revenue / orders.length).toFixed(2) : "0.00"}
                  </h3>
                  <p className="text-[11px] text-brand-cream/50 mt-1">Per transaction average</p>
                </div>

                <div className="p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl">
                  <span className="text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold">
                    Fulfillment Rate
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-green-400 mt-1">
                    {orders.length > 0
                      ? `${Math.round(
                          (orders.filter((o) => o.status === "Delivered").length / orders.length) * 100
                        )}%`
                      : "100%"}
                  </h3>
                  <p className="text-[11px] text-brand-cream/50 mt-1">Completed vs cancelled</p>
                </div>

                <div className="p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl">
                  <span className="text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold">
                    Active Catalog Stock
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-cream mt-1">
                    {products.filter((p) => p.inStock).length} / {products.length}
                  </h3>
                  <p className="text-[11px] text-brand-cream/50 mt-1">Dishes ready to serve</p>
                </div>

                <div className="p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl">
                  <span className="text-[10px] font-accent uppercase tracking-wider text-brand-sandBeige font-bold">
                    Customer Base Growth
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-brand-gold mt-1">
                    +{metrics.customersCount} Members
                  </h3>
                  <p className="text-[11px] text-brand-cream/50 mt-1">Local profile registrations</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15 shadow-xl">
                <h3 className="font-heading text-base font-bold text-brand-cream mb-4">
                  Category Revenue Distribution
                </h3>
                <div className="space-y-3">
                  {categories.map((c) => {
                    const catItems = products.filter((p) => p.category === c.name);
                    const avgPrice =
                      catItems.length > 0
                        ? catItems.reduce((acc, curr) => acc + Number(curr.price), 0) / catItems.length
                        : 0;

                    return (
                      <div
                        key={c.id || c.name}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-vantablack/60 border border-brand-warmSand/10 text-xs"
                      >
                        <div>
                          <p className="font-bold text-brand-cream">{c.name}</p>
                          <p className="text-[11px] text-brand-cream/50">
                            {catItems.length} culinary selections available
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-brand-gold">
                            ${avgPrice.toFixed(2)} Avg. Price
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 9: WEBSITE SETTINGS & DEMO RESET
              =================================================================== */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Website Identity & Store Parameters
                </h2>
                <p className="text-xs text-brand-cream/60">
                  Configure brand identity, operating hours, contact channels, and demo seed controls.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1.5 font-bold">
                      Store Brand Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName || "EMBER & BEAN"}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1.5 font-bold">
                      Brand Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.tagline || "Specialty Coffee & Kitchen"}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1.5 font-bold">
                      Concierge Support Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail || "concierge@emberandbean.com"}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1.5 font-bold">
                      Concierge Phone Line
                    </label>
                    <input
                      type="text"
                      value={settings.contactPhone || "+91 (022) 2640-8899"}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1.5 font-bold">
                      Flagship Location Address
                    </label>
                    <input
                      type="text"
                      value={settings.address || "42 Heritage Promenade, Bandra West, Mumbai 400050"}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1.5 font-bold">
                      Operating Hours Schedule
                    </label>
                    <input
                      type="text"
                      value={settings.hours || "Mon - Fri: 07:00 AM – 11:00 PM | Sat - Sun: 07:30 AM – 11:30 PM"}
                      onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-warmSand/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                  >
                    Save Configuration Changes
                  </button>
                </div>
              </form>

              <div className="p-6 rounded-3xl bg-red-950/20 border border-red-500/30 shadow-xl space-y-4">
                <div className="flex items-center space-x-3 text-red-400">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <h3 className="font-heading text-base font-bold">
                    Demo Storage Management & Reset
                  </h3>
                </div>
                <p className="text-xs text-brand-cream/70 leading-relaxed font-body">
                  Reset the Browser Local Storage to initial state with culinary dishes, seed accounts (Super Admin, Admin, Customer), sample orders, and fresh categories.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetDemoSeed}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-accent font-bold transition-all cursor-pointer shadow-lg shadow-red-900/30"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Re-Seed Pristine Demo Catalog</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClearLogs}
                    className="px-4 py-2.5 rounded-2xl bg-brand-vantablack border border-red-500/30 text-red-300 text-xs font-accent hover:bg-red-500/10 transition-all cursor-pointer"
                  >
                    Purge Activity Logs
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 10: ACTIVITY AUDIT LOGS
              =================================================================== */}
          {activeTab === "activity-logs" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <div>
                  <h2 className="font-heading text-xl font-bold text-brand-cream">
                    Activity & Governance Audit Trail
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Comprehensive chronological ledger of actions performed across the client system.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearLogs}
                  className="px-4 py-2.5 rounded-2xl bg-brand-deepBlack border border-brand-warmSand/20 text-brand-cream/70 hover:text-red-400 hover:border-red-500/30 text-xs font-accent font-semibold transition-all cursor-pointer"
                >
                  Clear Log History
                </button>
              </div>

              <DataTable
                data={logs}
                searchPlaceholder="Search audit events, users, or descriptions..."
                filterCategoryKey="action"
                categories={["LOGIN", "LOGOUT", "CREATE", "UPDATE", "DELETE", "SEED", "SETTINGS"]}
                columns={[
                  {
                    header: "Timestamp",
                    accessor: "timestamp",
                    render: (l) => (
                      <span className="font-mono text-[11px] text-brand-cream/60">
                        {new Date(l.timestamp).toLocaleString()}
                      </span>
                    ),
                  },
                  {
                    header: "Action Type",
                    accessor: "action",
                    render: (l) => (
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                          l.action === "CREATE"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : l.action === "DELETE"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : l.action === "UPDATE"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
                        }`}
                      >
                        {l.action}
                      </span>
                    ),
                  },
                  {
                    header: "Event Description",
                    accessor: "description",
                    render: (l) => (
                      <span className="text-xs text-brand-cream font-medium">
                        {l.description}
                      </span>
                    ),
                  },
                  {
                    header: "User Identity",
                    accessor: "userEmail",
                    render: (l) => (
                      <span className="text-xs text-brand-sandBeige font-mono">
                        {l.userEmail || "anonymous"}
                      </span>
                    ),
                  },
                ]}
              />
            </motion.div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {productModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-brand-deepBlack border border-brand-gold/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-warmSand/15">
                <h3 className="font-heading text-lg font-bold text-brand-cream">
                  {editingProduct ? "Edit Master Dish" : "Create New Culinary Dish"}
                </h3>
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="p-1 rounded-xl text-brand-cream/60 hover:text-brand-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Dish Name
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="e.g. Truffle Smoked Burger"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Category
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id || c.name} value={c.name} className="bg-brand-deepBlack text-brand-cream">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Price ($ USD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                      placeholder="e.g. 14.50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Availability
                    </label>
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="inStockCheck"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="accent-brand-gold w-4 h-4 rounded"
                      />
                      <label htmlFor="inStockCheck" className="text-xs text-brand-cream font-medium">
                        Available for ordering
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Culinary Description
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="Describe flavour profile, artisanal techniques..."
                  />
                </div>

                <div className="pt-3 border-t border-brand-warmSand/15 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-brand-vantablack text-brand-cream/70 text-xs font-accent font-semibold hover:text-brand-cream"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20"
                  >
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Provision Modal */}
      <AnimatePresence>
        {adminModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-brand-deepBlack border border-brand-gold/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-warmSand/15">
                <h3 className="font-heading text-lg font-bold text-brand-cream flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  <span>Provision Administrative Account</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setAdminModalOpen(false)}
                  className="p-1 rounded-xl text-brand-cream/60 hover:text-brand-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="e.g. Chef Marcus Vance"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="admin@emberandbean.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Temporary Password
                  </label>
                  <input
                    type="text"
                    required
                    value={adminForm.password}
                    onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Assigned Role
                    </label>
                    <select
                      value={adminForm.role}
                      onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    >
                      <option value="ADMIN" className="bg-brand-deepBlack text-brand-cream">ADMIN</option>
                      <option value="SUPER_ADMIN" className="bg-brand-deepBlack text-brand-cream">SUPER_ADMIN</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={adminForm.phone}
                      onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                      className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                      placeholder="+91 98200..."
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-warmSand/15 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setAdminModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-brand-vantablack text-brand-cream/70 text-xs font-accent font-semibold hover:text-brand-cream"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20"
                  >
                    Provision Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {categoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-brand-deepBlack border border-brand-gold/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-brand-warmSand/15">
                <h3 className="font-heading text-lg font-bold text-brand-cream">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="p-1 rounded-xl text-brand-cream/60 hover:text-brand-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="e.g. Specialty Desserts"
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Category Description
                  </label>
                  <textarea
                    rows={3}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                    placeholder="Brief description for menu highlights..."
                  />
                </div>

                <div className="pt-3 border-t border-brand-warmSand/15 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setCategoryModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-brand-vantablack text-brand-cream/70 text-xs font-accent font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Details Receipt Modal */}
      <AnimatePresence>
        {selectedOrder && (
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
                    Order #{selectedOrder.id.toUpperCase()}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-xl text-brand-cream/60 hover:text-brand-gold cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-brand-vantablack/80 p-4 rounded-2xl border border-brand-warmSand/10">
                <div>
                  <span className="text-brand-cream/50 block text-[10px] uppercase font-accent">Customer</span>
                  <span className="font-bold text-brand-cream">{selectedOrder.customerName}</span>
                  <p className="text-[11px] text-brand-cream/60 truncate">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-brand-cream/50 block text-[10px] uppercase font-accent">Status</span>
                  <span className="font-bold text-brand-gold">{selectedOrder.status}</span>
                  <p className="text-[11px] text-brand-cream/60">
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-xs bg-brand-vantablack/60 p-3 rounded-2xl border border-brand-warmSand/10">
                <span className="text-[10px] font-accent uppercase text-brand-gold font-bold block mb-1">
                  Delivery Destination
                </span>
                <p className="text-brand-cream/80 leading-relaxed">
                  {selectedOrder.shippingAddress?.street || selectedOrder.shippingAddress || "Flagship Table Service"}
                </p>
              </div>

              <div className="space-y-2 border-t border-b border-brand-warmSand/10 py-3">
                <span className="text-[10px] font-accent uppercase text-brand-cream/50 font-bold block">
                  Itemized Order Breakdown
                </span>
                {selectedOrder.items?.map((item, idx) => (
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

              <div className="space-y-1.5 text-xs font-mono pt-1">
                <div className="flex justify-between text-brand-cream/70">
                  <span>Subtotal</span>
                  <span>${Number(selectedOrder.subtotal || selectedOrder.total || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-cream/70">
                  <span>Chef's Tax & Service</span>
                  <span>${Number(selectedOrder.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-brand-cream pt-2 border-t border-brand-warmSand/15">
                  <span className="font-heading">Total Paid</span>
                  <span className="text-brand-gold font-mono">${Number(selectedOrder.total || 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        isDestructive={confirmModal.isDestructive}
        onConfirm={() => {
          if (confirmModal.action) confirmModal.action();
          setConfirmModal({ ...confirmModal, isOpen: false });
        }}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />
    </div>
  );
}

