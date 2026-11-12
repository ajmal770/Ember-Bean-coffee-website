import React, { createContext, useContext, useState, useEffect } from "react";
import { WISHLIST_STORAGE_KEY, loadFromStorage, saveToStorage } from "../utils/storage";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    return loadFromStorage(WISHLIST_STORAGE_KEY, []);
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistToast, setWishlistToast] = useState(null);

  useEffect(() => {
    saveToStorage(WISHLIST_STORAGE_KEY, wishlistItems);
  }, [wishlistItems]);

  const showToast = (message) => {
    setWishlistToast(message);
    setTimeout(() => {
      setWishlistToast(null);
    }, 2800);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (!product || !product.id) return;

    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from favourites`);
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to favourites`);
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    showToast("Favourites cleared");
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist: wishlistItems,
        wishlistItems,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistToast,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

