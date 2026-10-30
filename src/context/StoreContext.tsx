import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Product, CartItem, Order, StoreSettings, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  cart: CartItem[];
  orders: Order[];
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  toggleLanguage: () => void;
  // UI modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingQuery: string;
  setTrackingQuery: (q: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  lastCreatedOrder: Order | null;
  setLastCreatedOrder: (order: Order | null) => void;
  currentView: 'store' | 'admin' | 'tracking';
  setCurrentView: (view: 'store' | 'admin' | 'tracking') => void;
  // Cart Actions
  addToCart: (product: Product, size: string, color: { name: string; nameBn: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  // Firestore mutations
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  saveSettings: (newSettings: StoreSettings) => Promise<void>;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  seedInitialCatalog: () => Promise<void>;
  loadingProducts: boolean;
  dbConnected: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn'); // default Bengali per prompt
  
  // UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingQuery, setTrackingQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'tracking'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vionex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vionex_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  // 1. Sync Settings from Firestore
  useEffect(() => {
    const settingsDocRef = doc(db, 'settings', 'store');
    const unsubSettings = onSnapshot(
      settingsDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings({ ...INITIAL_SETTINGS, ...(docSnap.data() as StoreSettings) });
        }
      },
      (error) => {
        console.warn('Settings snapshot fallback to defaults:', error.message);
      }
    );

    return () => unsubSettings();
  }, []);

  // 2. Sync Products from Firestore
  useEffect(() => {
    const productsColRef = collection(db, 'products');
    const unsubProducts = onSnapshot(
      productsColRef,
      (snapshot) => {
        setDbConnected(true);
        setLoadingProducts(false);
        if (!snapshot.empty) {
          const fetchedProducts = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Product, 'id'>)
          }));
          setProducts(fetchedProducts);
        } else {
          // If Firestore collection is empty, use initial products
          setProducts(INITIAL_PRODUCTS);
        }
      },
      (error) => {
        console.warn('Products snapshot offline/fallback:', error.message);
        setLoadingProducts(false);
        setProducts(INITIAL_PRODUCTS);
      }
    );

    return () => unsubProducts();
  }, []);

  // 3. Sync Orders from Firestore (for admin & customer tracking)
  useEffect(() => {
    const ordersColRef = collection(db, 'orders');
    const unsubOrders = onSnapshot(
      ordersColRef,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Order, 'id'>)
        }));
        // Sort newest first
        fetchedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(fetchedOrders);
      },
      (error) => {
        console.warn('Orders snapshot permission/network fallback:', error.message);
      }
    );

    return () => unsubOrders();
  }, []);

  // Cart operations
  const addToCart = (product: Product, size: string, color: { name: string; nameBn: string; hex: string }, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });

    showToast(language === 'bn' ? 'ব্যাগ এ যুক্ত করা হয়েছে' : 'Added to bag');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Firestore Admin mutations
  const saveProduct = async (product: Product) => {
    try {
      const id = product.id || `prod-${Date.now()}`;
      const productRef = doc(db, 'products', id);
      const payload = {
        ...product,
        id,
        updatedAt: new Date().toISOString()
      };
      await setDoc(productRef, payload, { merge: true });
      showToast(language === 'bn' ? 'পণ্য সফলভাবে সংরক্ষিত হয়েছে' : 'Product saved successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${product.id}`);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      showToast(language === 'bn' ? 'পণ্য মুছে ফেলা হয়েছে' : 'Product deleted');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${productId}`);
    }
  };

  const saveSettings = async (newSettings: StoreSettings) => {
    try {
      await setDoc(doc(db, 'settings', 'store'), newSettings);
      setSettings(newSettings);
      showToast(language === 'bn' ? 'সেটিংস আপডেট সম্পন্ন হয়েছে' : 'Settings updated successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/store');
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const orderId = `VX-${Math.floor(100000 + Math.random() * 900000)}`;
    const fullOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber: orderId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'orders', orderId), fullOrder);
    } catch (error) {
      console.warn('Firestore order save failed; keeping local fallback for customer:', error);
    }

    setOrders((prev) => [fullOrder, ...prev]);
    setLastCreatedOrder(fullOrder);
    clearCart();
    return fullOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: new Date().toISOString()
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
      showToast(language === 'bn' ? `অর্ডার স্ট্যাটাস: ${status}` : `Order status: ${status}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const seedInitialCatalog = async () => {
    try {
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), {
          ...prod,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      await setDoc(doc(db, 'settings', 'store'), INITIAL_SETTINGS);
      showToast(language === 'bn' ? 'ক্যাটালগ সফলভাবে সিড করা হয়েছে!' : 'Catalog seeded successfully!');
    } catch (error) {
      console.error('Seed error:', error);
      showToast('Error seeding catalog');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        orders,
        language,
        setLanguage,
        toggleLanguage,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingQuery,
        setTrackingQuery,
        selectedProduct,
        setSelectedProduct,
        lastCreatedOrder,
        setLastCreatedOrder,
        currentView,
        setCurrentView,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        saveProduct,
        deleteProduct,
        saveSettings,
        createOrder,
        updateOrderStatus,
        seedInitialCatalog,
        loadingProducts,
        dbConnected,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
