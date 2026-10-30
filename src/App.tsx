/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { testFirestoreConnection } from './firebase';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Storefront } from './components/storefront/Storefront';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/order/OrderSuccessModal';
import { OrderTrackingModal } from './components/order/OrderTrackingModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, toastMessage } = useStore();

  useEffect(() => {
    // Validate Firestore connection on boot per Firebase guidelines
    testFirestoreConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C10] text-[#E0E2EC]">
      {/* Dynamic Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-fadeIn pointer-events-none">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#141724]/95 border border-[#E2B755]/50 shadow-2xl backdrop-blur-md text-white text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#E2B755]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {currentView === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <AnnouncementBar />
          <Header />
          <div className="flex-1">
            <Storefront />
          </div>
          <Footer />
        </>
      )}

      {/* Global Interactive Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      <SizeGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainLayout />
      </StoreProvider>
    </AuthProvider>
  );
}
