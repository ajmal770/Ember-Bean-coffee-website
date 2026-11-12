import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  removeStorage,
  generateId,
  addActivityLog,
  initDemoSeed,
  DEFAULT_USERS,
} from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Ensure demo seed records exist on startup
  useEffect(() => {
    initDemoSeed();
  }, []);

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = getStorage(STORAGE_KEYS.CURRENT_USER, null);
    if (stored) return stored;
    // Default to Super Admin for immediate, seamless access without a login page
    const defaultUser = DEFAULT_USERS[0];
    setStorage(STORAGE_KEYS.CURRENT_USER, defaultUser);
    return defaultUser;
  });

  const [session, setSession] = useState(() => {
    const stored = getStorage(STORAGE_KEYS.AUTH_SESSION, null);
    if (stored) return stored;
    const defaultSession = {
      sessionId: "sess_default_master",
      userId: DEFAULT_USERS[0].id,
      email: DEFAULT_USERS[0].email,
      role: DEFAULT_USERS[0].role,
      loggedInAt: new Date().toISOString(),
      rememberMe: true,
    };
    setStorage(STORAGE_KEYS.AUTH_SESSION, defaultSession);
    return defaultSession;
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Multi-tab storage sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.CURRENT_USER) {
        try {
          setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setCurrentUser(null);
        }
      }
      if (e.key === STORAGE_KEYS.AUTH_SESSION) {
        try {
          setSession(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setSession(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // User Roles
  const role = currentUser?.role || null;
  const isAuthenticated = Boolean(currentUser && session);
  const isSuperAdmin = role === "SUPER_ADMIN";
  const isAdmin = role === "ADMIN";
  const isCustomer = role === "CUSTOMER";

  // Login handler
  const login = async (email, password, rememberMe = true) => {
    setAuthLoading(true);
    setAuthError(null);

    // Simulate realistic luxury micro-delay
    await new Promise((res) => setTimeout(res, 550));

    const users = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const targetUser = users.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!targetUser) {
      setAuthError("No account found with this email. Please check your spelling or register.");
      setAuthLoading(false);
      return { success: false, error: "User not found" };
    }

    if (targetUser.password !== password) {
      setAuthError("Incorrect password. Try our 1-click Demo credentials below.");
      setAuthLoading(false);
      return { success: false, error: "Incorrect password" };
    }

    if (targetUser.status === "Inactive") {
      setAuthError("This demo account has been deactivated by the Super Administrator.");
      setAuthLoading(false);
      return { success: false, error: "Account inactive" };
    }

    // Session payload
    const sessionData = {
      sessionId: generateId("sess"),
      userId: targetUser.id,
      email: targetUser.email,
      role: targetUser.role,
      loggedInAt: new Date().toISOString(),
      rememberMe,
    };

    setStorage(STORAGE_KEYS.CURRENT_USER, targetUser);
    setStorage(STORAGE_KEYS.AUTH_SESSION, sessionData);
    setCurrentUser(targetUser);
    setSession(sessionData);

    addActivityLog("LOGIN", `User signed in: ${targetUser.name} (${targetUser.role})`, targetUser.email);
    showToast(`Welcome back, ${targetUser.name}!`);

    setAuthLoading(false);
    return { success: true, user: targetUser };
  };

  // Register Customer (strictly customer role)
  const register = async ({ name, email, phone, password }) => {
    setAuthLoading(true);
    setAuthError(null);

    await new Promise((res) => setTimeout(res, 600));

    const users = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const exists = users.some(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (exists) {
      setAuthError("An account with this email is already registered.");
      setAuthLoading(false);
      return { success: false, error: "Email exists" };
    }

    const newCustomer = {
      id: generateId("usr_cust"),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "CUSTOMER", // Public registration is strictly Customer
      phone: phone.trim() || "+91 98000 00000",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      bio: "Culinary & artisanal specialty coffee patron.",
      createdAt: new Date().toISOString(),
      addresses: [
        {
          id: generateId("addr"),
          label: "Primary Residence",
          street: "42 Sea View Avenue",
          city: "Bandra West, Mumbai",
          postalCode: "400050",
          isDefault: true,
        },
      ],
    };

    const updatedUsers = [...users, newCustomer];
    setStorage(STORAGE_KEYS.USERS, updatedUsers);

    // Auto login
    const sessionData = {
      sessionId: generateId("sess"),
      userId: newCustomer.id,
      email: newCustomer.email,
      role: newCustomer.role,
      loggedInAt: new Date().toISOString(),
      rememberMe: true,
    };

    setStorage(STORAGE_KEYS.CURRENT_USER, newCustomer);
    setStorage(STORAGE_KEYS.AUTH_SESSION, sessionData);
    setCurrentUser(newCustomer);
    setSession(sessionData);

    addActivityLog("REGISTER", `New customer registered: ${newCustomer.name}`, newCustomer.email);
    showToast(`Registration successful! Welcome to EMBER & BEAN, ${newCustomer.name}.`);

    setAuthLoading(false);
    return { success: true, user: newCustomer };
  };

  // Logout (switches to default customer patron, preserves cart and wishlist)
  const logout = () => {
    if (currentUser) {
      addActivityLog("LOGOUT", `User switched to Guest patron: ${currentUser.email}`, currentUser.email);
    }
    const defaultCustomer = DEFAULT_USERS[2] || DEFAULT_USERS[0];
    const sessionData = {
      sessionId: generateId("sess_guest"),
      userId: defaultCustomer.id,
      email: defaultCustomer.email,
      role: defaultCustomer.role,
      loggedInAt: new Date().toISOString(),
      rememberMe: false,
    };
    setStorage(STORAGE_KEYS.CURRENT_USER, defaultCustomer);
    setStorage(STORAGE_KEYS.AUTH_SESSION, sessionData);
    setCurrentUser(defaultCustomer);
    setSession(sessionData);
    showToast("Signed out. Returned to Guest Patron mode. Cart & wishlist preserved.");
  };

  // Switch demo account helper
  const switchDemoUser = (roleOrEmail) => {
    const users = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const target = users.find(
      (u) =>
        u.role === roleOrEmail ||
        u.email.toLowerCase() === roleOrEmail.toLowerCase()
    );

    if (target) {
      const sessionData = {
        sessionId: generateId("sess"),
        userId: target.id,
        email: target.email,
        role: target.role,
        loggedInAt: new Date().toISOString(),
        rememberMe: true,
      };
      setStorage(STORAGE_KEYS.CURRENT_USER, target);
      setStorage(STORAGE_KEYS.AUTH_SESSION, sessionData);
      setCurrentUser(target);
      setSession(sessionData);
      addActivityLog("SWITCH_USER", `Active profile switched to ${target.name} (${target.role})`, target.email);
      showToast(`Active profile switched to ${target.name} (${target.role.replace("_", " ")})`);
    }
  };

  // Update Profile
  const updateProfile = (data) => {
    if (!currentUser) return;
    const users = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const updated = { ...currentUser, ...data };

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updated : u));
    setStorage(STORAGE_KEYS.USERS, updatedUsers);
    setStorage(STORAGE_KEYS.CURRENT_USER, updated);
    setCurrentUser(updated);

    addActivityLog("UPDATE", `User updated profile information: ${updated.name}`, updated.email);
    showToast("Profile details updated successfully!");
  };

  // Addresses CRUD
  const addAddress = (address) => {
    if (!currentUser) return;
    const newAddr = {
      id: generateId("addr"),
      isDefault: (currentUser.addresses || []).length === 0,
      ...address,
    };
    const nextAddresses = [...(currentUser.addresses || []), newAddr];
    updateProfile({ addresses: nextAddresses });
    showToast(`Added new address: ${newAddr.label}`);
  };

  const updateAddress = (addrId, updatedFields) => {
    if (!currentUser) return;
    const nextAddresses = (currentUser.addresses || []).map((a) =>
      a.id === addrId ? { ...a, ...updatedFields } : a
    );
    updateProfile({ addresses: nextAddresses });
    showToast("Address updated successfully.");
  };

  const deleteAddress = (addrId) => {
    if (!currentUser) return;
    const nextAddresses = (currentUser.addresses || []).filter((a) => a.id !== addrId);
    if (nextAddresses.length > 0 && !nextAddresses.some((a) => a.isDefault)) {
      nextAddresses[0].isDefault = true;
    }
    updateProfile({ addresses: nextAddresses });
    showToast("Address removed.");
  };

  const setDefaultAddress = (addrId) => {
    if (!currentUser) return;
    const nextAddresses = (currentUser.addresses || []).map((a) => ({
      ...a,
      isDefault: a.id === addrId,
    }));
    updateProfile({ addresses: nextAddresses });
    showToast("Default delivery destination updated.");
  };

  // Change Password
  const changePassword = (currentPass, newPass) => {
    if (!currentUser) return { success: false, error: "Not logged in" };
    if (currentUser.password !== currentPass) {
      return { success: false, error: "Current password does not match." };
    }
    updateProfile({ password: newPass });
    addActivityLog("PASSWORD_CHANGE", `Password updated for ${currentUser.email}`, currentUser.email);
    showToast("Your password was updated successfully!");
    return { success: true };
  };

  // Demo Password Reset
  const requestDemoReset = (email) => {
    const users = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const target = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!target) {
      return { success: false, error: "No account found with this email." };
    }
    return { success: true, email: target.email };
  };

  const resetPassword = (email, newPass) => {
    const users = getStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) {
      return { success: false, error: "User not found." };
    }

    users[userIndex].password = newPass;
    setStorage(STORAGE_KEYS.USERS, users);
    addActivityLog("PASSWORD_RESET", `Password reset demo flow completed for ${email}`, email);
    showToast("Password reset successfully! Please log in.");
    return { success: true };
  };

  const value = {
    currentUser,
    session,
    isAuthenticated,
    role,
    isSuperAdmin,
    isAdmin,
    isCustomer,
    login,
    register,
    logout,
    switchDemoUser,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    changePassword,
    requestDemoReset,
    resetPassword,
    authLoading,
    authError,
    logoutModalOpen,
    setLogoutModalOpen,
    toastMessage,
    showToast,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

