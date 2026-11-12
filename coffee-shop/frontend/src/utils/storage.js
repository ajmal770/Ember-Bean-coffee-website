/**
 * EMBER & BEAN - Local Storage Architecture & Service Layer
 * Browser Local Storage ONLY.
 * Handles storage, retrieval, persistence, reactivity, multi-tab sync, and demo data seeding.
 */

import { initialMenuItems, categories } from "../data/menuData";

export const STORAGE_KEYS = {
  USERS: "ember_users",
  CURRENT_USER: "ember_current_user",
  PRODUCTS: "ember_products",
  CATEGORIES: "ember_categories",
  ORDERS: "ember_orders",
  CART: "ember_cart",
  WISHLIST: "ember_wishlist",
  ADMIN_SETTINGS: "ember_admin_settings",
  NOTIFICATIONS: "ember_notifications",
  ACTIVITY_LOGS: "ember_activity_logs",
  AUTH_SESSION: "ember_auth_session",
};

// Backward compatibility aliases
export const CART_STORAGE_KEY = STORAGE_KEYS.CART;
export const WISHLIST_STORAGE_KEY = STORAGE_KEYS.WISHLIST;
export const loadFromStorage = (key, fallback) => getStorage(key, fallback);
export const saveToStorage = (key, value) => setStorage(key, value);

/**
 * Safely parse JSON from Local Storage with fallback
 */
export const getStorage = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined || item === "undefined") {
      return fallback;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[LocalStorage] Error parsing key "${key}":`, error);
    return fallback;
  }
};

/**
 * Set item in Local Storage and dispatch custom window event for instant same-tab reactivity
 */
export const setStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);

    // Dispatch event for intra-window reactivity
    window.dispatchEvent(
      new CustomEvent("ember_storage_updated", {
        detail: { key, value },
      })
    );
    return true;
  } catch (error) {
    console.error(`[LocalStorage] Error setting key "${key}":`, error);
    return false;
  }
};

/**
 * Update an existing record or array using an updater function
 */
export const updateStorage = (key, updater, fallback = null) => {
  try {
    const current = getStorage(key, fallback);
    const updated = typeof updater === "function" ? updater(current) : updater;
    setStorage(key, updated);
    return updated;
  } catch (error) {
    console.error(`[LocalStorage] Error updating key "${key}":`, error);
    return fallback;
  }
};

/**
 * Remove a specific key from Local Storage
 */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(
      new CustomEvent("ember_storage_updated", {
        detail: { key, value: null },
      })
    );
    return true;
  } catch (error) {
    console.error(`[LocalStorage] Error removing key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all EMBER & BEAN keys
 */
export const clearStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    window.dispatchEvent(
      new CustomEvent("ember_storage_updated", {
        detail: { key: "ALL", value: null },
      })
    );
    return true;
  } catch (error) {
    console.error("[LocalStorage] Error clearing storage:", error);
    return false;
  }
};

/**
 * Unique ID generator
 */
export const generateId = (prefix = "id") => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${prefix}_${timestamp}_${randomStr}`;
};

/**
 * Add an entry to the central Activity Logs
 */
export const addActivityLog = (action, description, userEmail = "system@emberandbean.com") => {
  const logEntry = {
    id: generateId("log"),
    action: action.toUpperCase(),
    description,
    userEmail,
    timestamp: new Date().toISOString(),
    ip: "127.0.0.1 (Local Browser Session)",
  };

  updateStorage(STORAGE_KEYS.ACTIVITY_LOGS, (logs) => {
    const safeLogs = Array.isArray(logs) ? logs : [];
    return [logEntry, ...safeLogs].slice(0, 150); // Keep last 150 entries
  }, []);
};

/**
 * Default Seed Accounts (DEMO USE ONLY)
 */
export const DEFAULT_USERS = [
  {
    id: "usr_super_01",
    name: "Marcus Vance",
    email: "superadmin@emberandbean.com",
    password: "Admin@123",
    role: "SUPER_ADMIN",
    phone: "+91 98200 11001",
    dob: "1988-04-12",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    bio: "Chief Executive Roaster & Master Culinary Architect at EMBER & BEAN.",
    createdAt: "2024-01-15T09:00:00.000Z",
    addresses: [
      {
        id: "addr_super_1",
        label: "Flagship HQ",
        street: "42 Heritage Promenade, Bandra West",
        city: "Mumbai",
        postalCode: "400050",
        isDefault: true,
      },
    ],
  },
  {
    id: "usr_admin_02",
    name: "Elena Rostova",
    email: "admin@emberandbean.com",
    password: "Admin@123",
    role: "ADMIN",
    phone: "+91 98200 22002",
    dob: "1991-11-28",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    bio: "Head Roastery Manager & Culinary Operations Director.",
    createdAt: "2024-03-20T11:30:00.000Z",
    addresses: [
      {
        id: "addr_admin_1",
        label: "Roastery HQ",
        street: "Plot 12, Industrial Heritage Zone",
        city: "Bandra West, Mumbai",
        postalCode: "400050",
        isDefault: true,
      },
    ],
  },
  {
    id: "usr_cust_03",
    name: "Devika Malhotra",
    email: "customer@emberandbean.com",
    password: "Customer@123",
    role: "CUSTOMER",
    phone: "+91 98200 33003",
    dob: "1994-08-14",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    bio: "Specialty coffee lover & weekend brunch connoisseur.",
    createdAt: "2024-06-10T14:45:00.000Z",
    addresses: [
      {
        id: "addr_cust_1",
        label: "Home (Sanctuary)",
        street: "Flat 402, Sea Breeze Apartments, Carter Road",
        city: "Bandra West, Mumbai",
        postalCode: "400050",
        isDefault: true,
      },
      {
        id: "addr_cust_2",
        label: "Creative Studio",
        street: "Studio 18, Design District, Pali Hill",
        city: "Bandra West, Mumbai",
        postalCode: "400050",
        isDefault: false,
      },
    ],
  },
];

export const DEFAULT_SETTINGS = {
  siteName: "EMBER & BEAN",
  tagline: "Specialty Coffee & Kitchen",
  contactPhone: "+91 (022) 2640-8899",
  contactEmail: "concierge@emberandbean.com",
  address: "42 Heritage Promenade, Bandra West, Mumbai 400050",
  hours: "Mon – Fri: 07:00 AM – 11:00 PM | Sat – Sun: 07:30 AM – 11:30 PM",
  currency: "$",
  taxRate: 5,
  promotionalText: "Autumn Micro-Lot Tasting: Ethiopian Yirgacheffe Pour-Over is now in season.",
  enableRegistration: true,
  enableOrders: true,
};

export const DEFAULT_ORDERS = [
  {
    id: "ord_9430",
    customerEmail: "customer@emberandbean.com",
    customerName: "Devika Malhotra",
    customerPhone: "+91 98200 33003",
    status: "Preparing",
    shippingAddress: "Flat 402, Sea Breeze Apartments, Carter Road, Bandra West, Mumbai",
    items: [
      {
        id: 13,
        name: "Single-Origin Pour-Over",
        category: "Coffee",
        price: 6.5,
        quantity: 2,
      },
      {
        id: 7,
        name: "Truffle Smashed Wagyu",
        category: "Burgers",
        price: 18.5,
        quantity: 1,
      },
    ],
    subtotal: 31.5,
    tax: 1.58,
    discount: 0,
    total: 33.08,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "ord_9214",
    customerEmail: "customer@emberandbean.com",
    customerName: "Devika Malhotra",
    customerPhone: "+91 98200 33003",
    status: "Delivered",
    shippingAddress: "Studio 18, Design District, Pali Hill, Bandra West, Mumbai",
    items: [
      {
        id: 25,
        name: "Spicy Nashville Tenders",
        category: "Fried Chicken",
        price: 15.0,
        quantity: 2,
      },
      {
        id: 15,
        name: "Spanish Cortado",
        category: "Coffee",
        price: 5.5,
        quantity: 2,
      },
    ],
    subtotal: 41.0,
    tax: 2.05,
    discount: 8.2,
    total: 34.85,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "ord_8492",
    customerEmail: "rohan.s@example.com",
    customerName: "Rohan Singhania",
    customerPhone: "+91 98200 77123",
    status: "Delivered",
    shippingAddress: "Penthouse 12, Bandstand Promenade, Mumbai",
    items: [
      {
        id: 8,
        name: "Classic Double Smashed Angus",
        category: "Burgers",
        price: 16.5,
        quantity: 2,
      },
      {
        id: 29,
        name: "Truffle Parmesan French Fries",
        category: "Starters",
        price: 8.5,
        quantity: 1,
      },
    ],
    subtotal: 41.5,
    tax: 2.08,
    discount: 0,
    total: 43.58,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

/**
 * Initialize / Seed demo storage data if not present
 */
export const initDemoSeed = (force = false) => {
  // 1. Seed Users
  const existingUsers = getStorage(STORAGE_KEYS.USERS, null);
  if (!existingUsers || force || existingUsers.length === 0) {
    setStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
  }

  // 2. Seed Products
  const existingProducts = getStorage(STORAGE_KEYS.PRODUCTS, null);
  if (!existingProducts || force || existingProducts.length === 0) {
    const productsWithStock = initialMenuItems.map((p) => ({
      ...p,
      stock: p.stock ?? 30,
      inStock: p.inStock ?? true,
    }));
    setStorage(STORAGE_KEYS.PRODUCTS, productsWithStock);
  }

  // 3. Seed Categories
  const existingCategories = getStorage(STORAGE_KEYS.CATEGORIES, null);
  if (!existingCategories || force || existingCategories.length === 0) {
    setStorage(STORAGE_KEYS.CATEGORIES, categories);
  }

  // 4. Seed Settings
  const existingSettings = getStorage(STORAGE_KEYS.ADMIN_SETTINGS, null);
  if (!existingSettings || force) {
    setStorage(STORAGE_KEYS.ADMIN_SETTINGS, DEFAULT_SETTINGS);
  }

  // 5. Seed Orders
  const existingOrders = getStorage(STORAGE_KEYS.ORDERS, null);
  if (!existingOrders || force || existingOrders.length === 0) {
    setStorage(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
  }

  // 6. Seed Activity Logs if empty
  const existingLogs = getStorage(STORAGE_KEYS.ACTIVITY_LOGS, null);
  if (!existingLogs || force || existingLogs.length === 0) {
    const initialLogs = [
      {
        id: generateId("log"),
        action: "SEED",
        description: "Local demo storage initialized with 40 culinary creations and verified demo accounts.",
        userEmail: "superadmin@emberandbean.com",
        timestamp: new Date().toISOString(),
        ip: "127.0.0.1 (Local Browser Session)",
      },
      {
        id: generateId("log"),
        action: "CREATE",
        description: "Initial culinary catalog synced to Browser Local Storage.",
        userEmail: "superadmin@emberandbean.com",
        timestamp: new Date().toISOString(),
        ip: "127.0.0.1 (Local Browser Session)",
      },
    ];
    setStorage(STORAGE_KEYS.ACTIVITY_LOGS, initialLogs);
  }
};
