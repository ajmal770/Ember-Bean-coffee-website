import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardCard from "../../components/DashboardCard";
import DataTable from "../../components/DataTable";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  generateId,
  addActivityLog,
} from "../../utils/storage";
import {
  ShoppingBag,
  DollarSign,
  UtensilsCrossed,
  Users,
  Clock,
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
  Tags,
  Check,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  const { currentUser, isSuperAdmin, logoutModalOpen, setLogoutModalOpen, showToast } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Tab state derived from URL
  const getTabFromPath = () => {
    if (location.pathname.includes("/products")) return "products";
    if (location.pathname.includes("/categories")) return "categories";
    if (location.pathname.includes("/orders")) return "orders";
    if (location.pathname.includes("/customers")) return "customers";
    if (location.pathname.includes("/profile")) return "profile";
    if (location.pathname.includes("/settings")) return "settings";
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "dashboard") navigate("/admin");
    else navigate(`/admin/${tabId}`);
  };

  // State synchronized with Local Storage
  const [products, setProducts] = useState(() => getStorage(STORAGE_KEYS.PRODUCTS, []));
  const [categories, setCategories] = useState(() => getStorage(STORAGE_KEYS.CATEGORIES, []));
  const [orders, setOrders] = useState(() => getStorage(STORAGE_KEYS.ORDERS, []));
  const [users, setUsers] = useState(() => getStorage(STORAGE_KEYS.USERS, []));
  const [settings, setSettings] = useState(() => getStorage(STORAGE_KEYS.ADMIN_SETTINGS, {}));

  const refreshAll = () => {
    setProducts(getStorage(STORAGE_KEYS.PRODUCTS, []));
    setCategories(getStorage(STORAGE_KEYS.CATEGORIES, []));
    setOrders(getStorage(STORAGE_KEYS.ORDERS, []));
    setUsers(getStorage(STORAGE_KEYS.USERS, []));
    setSettings(getStorage(STORAGE_KEYS.ADMIN_SETTINGS, {}));
  };

  useEffect(() => {
    const sync = () => refreshAll();
    window.addEventListener("storage", sync);
    window.addEventListener("ember_storage_updated", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ember_storage_updated", sync);
    };
  }, []);

  // Metrics
  const metrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => {
      if (o.status !== "Cancelled") return sum + (Number(o.total) || 0);
      return sum;
    }, 0);

    const pending = orders.filter((o) => o.status === "Pending").length;
    const customersCount = users.filter((u) => u.role === "CUSTOMER").length;

    return {
      revenue: totalRev,
      ordersCount: orders.length,
      productsCount: products.length,
      customersCount,
      pendingCount: pending,
    };
  }, [orders, products, users]);

  // Product Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Coffee",
    price: "",
    stock: 25,
    inStock: true,
    rating: 4.8,
    image: "",
    description: "",
  });

  // Category Modals
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });

  // Receipt Modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    action: null,
    isDestructive: true,
  });

  // Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category: categories[0]?.name || "Coffee",
      price: "",
      stock: 30,
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
      stock: prod.stock ?? 25,
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
        `Admin updated product: ${productForm.name} ($${priceNum.toFixed(2)})`,
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
        `Admin created new product: ${productForm.name} in ${productForm.category}`,
        currentUser?.email
      );
      showToast(`Added "${productForm.name}" to menu catalog!`, "success");
    }

    setProducts(updatedProducts);
    setStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (prod) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Product",
      message: `Permanently delete "${prod.name}" from catalog?`,
      isDestructive: true,
      action: () => {
        const next = products.filter((p) => p.id !== prod.id);
        setProducts(next);
        setStorage(STORAGE_KEYS.PRODUCTS, next);
        addActivityLog("DELETE", `Admin deleted product: ${prod.name}`, currentUser?.email);
        showToast(`Product "${prod.name}" was removed.`, "success");
      },
    });
  };

  // Category CRUD
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
    if (!categoryForm.name.trim()) return;

    let nextCats;
    if (editingCategory) {
      nextCats = categories.map((c) =>
        c.id === editingCategory.id ? { ...c, ...categoryForm } : c
      );
      addActivityLog("UPDATE", `Admin updated category: ${categoryForm.name}`, currentUser?.email);
    } else {
      const newCat = {
        id: generateId("cat"),
        name: categoryForm.name.trim(),
        description: categoryForm.description.trim(),
      };
      nextCats = [...categories, newCat];
      addActivityLog("CREATE", `Admin created category: ${newCat.name}`, currentUser?.email);
    }

    setCategories(nextCats);
    setStorage(STORAGE_KEYS.CATEGORIES, nextCats);
    setCategoryModalOpen(false);
    showToast(`Saved category: ${categoryForm.name}`);
  };

  const handleDeleteCategory = (cat) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Category",
      message: `Delete category "${cat.name}"?`,
      isDestructive: true,
      action: () => {
        const next = categories.filter((c) => c.id !== cat.id);
        setCategories(next);
        setStorage(STORAGE_KEYS.CATEGORIES, next);
        showToast(`Category "${cat.name}" deleted.`);
      },
    });
  };

  // Order Status Update
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
    addActivityLog("UPDATE", `Admin updated order ${orderId} to "${newStatus}"`, currentUser?.email);
    showToast(`Order status updated to ${newStatus}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleCancelOrder = (order) => {
    setConfirmModal({
      isOpen: true,
      title: "Cancel Order",
      message: `Are you sure you want to cancel order ${order.id}?`,
      isDestructive: true,
      action: () => {
        handleUpdateOrderStatus(order.id, "Cancelled");
      },
    });
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-left">
      {/* Top Banner */}
      <div className="mb-8 border-b border-brand-warmSand/10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-accent uppercase tracking-widest font-black mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff Administration Suite</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-cream tracking-tight">
            Kitchen & Operations Console
          </h1>
          <p className="text-xs sm:text-sm text-brand-cream/60 mt-1 font-body">
            Manage live orders, menu products, categories, and customer directories in Browser Local Storage.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Admin Sidebar */}
        <AdminSidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

        {/* Content Area */}
        <main className="flex-1 w-full overflow-hidden space-y-6">
          {/* ===================================================================
              TAB 1: DASHBOARD OVERVIEW
              =================================================================== */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <DashboardCard
                  title="Total Orders"
                  value={metrics.ordersCount}
                  subtitle="Recorded in local storage"
                  icon={ShoppingBag}
                  trend="+12%"
                  isPositive={true}
                />
                <DashboardCard
                  title="Total Revenue"
                  value={`$${metrics.revenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  subtitle="Gross fulfillment revenue"
                  icon={DollarSign}
                  trend="+8.5%"
                  isPositive={true}
                />
                <DashboardCard
                  title="Pending Kitchen Orders"
                  value={metrics.pendingCount}
                  subtitle="Orders awaiting preparation"
                  icon={Clock}
                />
                <DashboardCard
                  title="Menu Dishes"
                  value={metrics.productsCount}
                  subtitle={`${categories.length} categories active`}
                  icon={UtensilsCrossed}
                />
                <DashboardCard
                  title="Registered Customers"
                  value={metrics.customersCount}
                  subtitle="Active local patron accounts"
                  icon={Users}
                />
              </div>

              {/* Recent Orders Preview */}
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-brand-warmSand/10 mb-4">
                  <h3 className="font-heading text-lg font-bold text-brand-cream">
                    Live Kitchen Queue
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleSelectTab("orders")}
                    className="text-xs text-brand-gold hover:underline font-accent"
                  >
                    View All Orders ({orders.length})
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-brand-cream/50 py-8 text-center">No orders recorded yet.</p>
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
                            {o.customerName} · {o.items?.length || 0} dishes
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
                            Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 2: PRODUCTS CATALOG
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
                    Culinary Menu Catalog
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Add, edit, or adjust prices and stock levels for public menu items.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add New Product</span>
                </button>
              </div>

              <DataTable
                data={products}
                searchPlaceholder="Search dishes, ingredients, or IDs..."
                filterCategoryKey="category"
                categories={categories.map((c) => c.name)}
                columns={[
                  {
                    header: "Dish",
                    accessor: "name",
                    render: (p) => (
                      <div className="flex items-center space-x-3 max-w-sm">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-11 h-11 rounded-xl object-cover border border-brand-warmSand/20 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-brand-cream text-xs truncate">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-brand-cream/50 truncate">
                            {p.description || "Artisanal specialty"}
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
                    header: "Stock",
                    accessor: "stock",
                    render: (p) => (
                      <span className="text-xs font-mono font-bold text-brand-cream">
                        {p.stock ?? 25} units
                      </span>
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
                          showToast(`Toggled ${p.name} availability.`);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-accent font-bold cursor-pointer transition-all ${
                          p.inStock
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {p.inStock ? "In Stock" : "Out of Stock"}
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
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p)}
                          className="p-1.5 rounded-lg text-brand-cream/60 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
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
              TAB 3: CATEGORIES
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
                    Culinary Categories
                  </h2>
                  <p className="text-xs text-brand-cream/60">
                    Manage food & beverage taxonomy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddCategory}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.name).length;
                  return (
                    <div
                      key={cat.id || cat.name}
                      className="p-5 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-xl flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="w-10 h-10 rounded-2xl bg-brand-vantablack border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                          <Tags className="w-5 h-5" />
                        </div>
                        <h3 className="font-heading text-base font-bold text-brand-cream">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-brand-cream/60 mt-1 line-clamp-2">
                          {cat.description || "Artisanal menu category."}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-brand-warmSand/10 flex items-center justify-between">
                        <span className="text-xs font-accent text-brand-gold font-bold">
                          {count} Dishes
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditCategory(cat)}
                            className="p-1.5 rounded-lg text-brand-cream/60 hover:text-brand-gold cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat)}
                            className="p-1.5 rounded-lg text-brand-cream/60 hover:text-red-400 cursor-pointer"
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
              TAB 4: ORDERS QUEUE
              =================================================================== */}
          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Orders Fulfillment Queue
                </h2>
                <p className="text-xs text-brand-cream/60">
                  Manage incoming patron orders, advance fulfillment statuses, and inspect receipts.
                </p>
              </div>

              <DataTable
                data={orders}
                searchPlaceholder="Search order ID, patron name, email..."
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
                    header: "Total",
                    accessor: "total",
                    render: (o) => (
                      <span className="font-mono text-xs font-bold text-brand-cream">
                        ${Number(o.total || 0).toFixed(2)}
                      </span>
                    ),
                  },
                  {
                    header: "Status",
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
              TAB 5: CUSTOMER DIRECTORY
              =================================================================== */}
          {activeTab === "customers" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-3xl bg-brand-deepBlack/80 border border-brand-warmSand/15">
                <h2 className="font-heading text-xl font-bold text-brand-cream">
                  Customer Directory
                </h2>
                <p className="text-xs text-brand-cream/60">
                  View registered patrons and contact records stored in Local Storage.
                </p>
              </div>

              <DataTable
                data={users.filter((u) => u.role === "CUSTOMER")}
                searchPlaceholder="Search patrons by name, email, or phone..."
                columns={[
                  {
                    header: "Customer",
                    accessor: "name",
                    render: (u) => (
                      <div className="flex items-center space-x-3">
                        <img
                          src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"}
                          alt={u.name}
                          className="w-9 h-9 rounded-xl object-cover border border-brand-warmSand/20 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-brand-cream text-xs">{u.name}</p>
                          <p className="text-[11px] text-brand-cream/50 font-mono">{u.email}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    header: "Phone",
                    accessor: "phone",
                    render: (u) => (
                      <span className="text-xs font-mono text-brand-cream/80">
                        {u.phone || "—"}
                      </span>
                    ),
                  },
                  {
                    header: "Status",
                    accessor: "status",
                    render: (u) => (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-accent font-bold ${
                          u.status === "Inactive"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : "bg-green-500/20 text-green-300 border border-green-500/30"
                        }`}
                      >
                        {u.status || "Active"}
                      </span>
                    ),
                  },
                ]}
              />
            </motion.div>
          )}

          {/* ===================================================================
              TAB 6: ADMIN PROFILE
              =================================================================== */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-5"
            >
              <h2 className="font-heading text-xl font-bold text-brand-cream">
                Administrator Profile
              </h2>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-brand-vantablack border border-brand-warmSand/15">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-brand-gold/50"
                />
                <div>
                  <span className="text-[10px] font-accent uppercase text-brand-gold font-bold">
                    {currentUser?.role}
                  </span>
                  <h3 className="text-base font-bold text-brand-cream">{currentUser?.name}</h3>
                  <p className="text-xs text-brand-cream/60 font-mono">{currentUser?.email}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================================================================
              TAB 7: STORE OPERATIONS / SETTINGS
              =================================================================== */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-brand-deepBlack/90 border border-brand-warmSand/20 shadow-2xl space-y-5"
            >
              <h2 className="font-heading text-xl font-bold text-brand-cream">
                Store Operations Settings
              </h2>
              <div className="p-4 rounded-2xl bg-brand-vantablack border border-brand-warmSand/15 space-y-2 text-xs">
                <p className="text-brand-cream/80">
                  Store operating schedule: <strong className="text-brand-cream">{settings.hours || "Mon - Sun: 7:00 AM - 11:30 PM"}</strong>
                </p>
                <p className="text-brand-cream/80">
                  Concierge contact: <strong className="text-brand-cream">{settings.contactEmail || "concierge@emberandbean.com"}</strong>
                </p>
              </div>
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
                  {editingProduct ? "Edit Product" : "Add Culinary Dish"}
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
                        id="adminInStockCheck"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="accent-brand-gold w-4 h-4 rounded"
                      />
                      <label htmlFor="adminInStockCheck" className="text-xs text-brand-cream font-medium">
                        Available on Menu
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
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-brand-warmSand/15 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-brand-vantablack text-brand-cream/70 text-xs font-accent font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold"
                  >
                    Save Product
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
                  {editingCategory ? "Edit Category" : "Add Category"}
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
                  />
                </div>

                <div>
                  <label className="block text-xs font-accent text-brand-cream/70 mb-1 font-bold">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold outline-none"
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

      {/* Order Receipt Modal */}
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
                    Culinary Order Receipt
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

              <div className="space-y-2 border-t border-b border-brand-warmSand/10 py-3">
                <span className="text-[10px] font-accent uppercase text-brand-cream/50 font-bold block">
                  Items
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

              <div className="flex justify-between text-sm font-bold text-brand-cream pt-2 border-t border-brand-warmSand/15 font-mono">
                <span>Total</span>
                <span className="text-brand-gold">${Number(selectedOrder.total || 0).toFixed(2)}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
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

