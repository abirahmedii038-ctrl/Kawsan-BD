import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { Product, StoreSettings, OrderStatus, Order } from '../../types';
import { formatBDT, formatOrderDate, getOrderStatusBadge, toBengaliNumerals } from '../../utils/formatters';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sliders,
  Download,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Phone,
  RefreshCw,
  Sparkles,
  Lock,
  Unlock,
  Shield,
  Save,
  Image,
  ArrowLeft,
  X
} from 'lucide-react';
import JSZip from 'jszip';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    settings,
    orders,
    saveProduct,
    deleteProduct,
    saveSettings,
    updateOrderStatus,
    seedInitialCatalog,
    setCurrentView,
    language
  } = useStore();

  const { currentUser, isAdmin, isDemoAdmin, signInWithGoogle, logOut, toggleDemoAdmin, adminEmail } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings' | 'export'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Settings local edit state
  const [editableSettings, setEditableSettings] = useState<StoreSettings>({ ...settings });

  // Sample curated luxury fashion images for quick admin selection
  const PRESET_IMAGES = [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
  ];

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  // New product blank template
  const blankProduct: Product = {
    id: '',
    title: '',
    titleBn: '',
    slug: '',
    category: 't-shirt',
    price: 1200,
    originalPrice: 1500,
    description: '',
    descriptionBn: '',
    stock: 25,
    fabric: '240 GSM 100% Combed Heavy Cotton',
    fabricBn: '২৪০ জিএসএম প্রিমিয়াম কম্বড কটন',
    images: [PRESET_IMAGES[0]],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', nameBn: 'কালো', hex: '#111215' },
      { name: 'Off-White', nameBn: 'অফ হোয়াইট', hex: '#EDE8DF' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false
  };

  const handleOpenCreateProduct = () => {
    setEditingProduct({ ...blankProduct, id: `prod-${Date.now()}` });
    setIsCreatingProduct(true);
  };

  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      await saveProduct(editingProduct);
      setEditingProduct(null);
      setIsCreatingProduct(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveSettings(editableSettings);
    } finally {
      setIsSaving(false);
    }
  };

  // ZIP Source Code Exporter
  const handleExportSourceZip = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      // README & Setup Documentation
      const readmeContent = `# VIONEX — Bangladesh Premium Fashion E-Commerce Platform

VIONEX is a modern, high-performance apparel e-commerce web application engineered with the aesthetic sophistication of top American luxury streetwear brands (Kith, Fear of God, Represent, Zara) and localized for the Bangladeshi market.

## Key Features
- **Bangla Localization**: BDT (৳) pricing with Bengali numerals, 64 districts & upazilas autocomplete, Cash on Delivery support.
- **Firebase Real-Time Backend**: Firestore database for live product synchronization, orders, and store settings.
- **Role-Based Admin Dashboard**: Live product CRUD, image management, order status pipeline, instant store customization.
- **Tailwind CSS v4 & React 19**: Ultra-responsive, dark luxury theme, sleek typography (Cinzel & Plus Jakarta Sans).

## Deployment & Setup Instructions
1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
2. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`
3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Firebase Configuration
Add your credentials in \`firebase-applet-config.json\` or deploy Firestore security rules using:
\`\`\`bash
firebase deploy --only firestore:rules
\`\`\`

Created by VIONEX Apparel Studio.
`;

      zip.file('README.md', readmeContent);
      zip.file('SETUP_GUIDE.md', `# VIONEX Setup & Customization Guide\n\n1. Admin Email: ${adminEmail}\n2. To deploy rules, run: firebase deploy --only firestore:rules\n3. Set delivery charges and store numbers in the Admin Dashboard.`);

      // Configuration files
      zip.file(
        'package.json',
        JSON.stringify(
          {
            name: 'vionex-fashion-bangladesh',
            private: true,
            version: '1.0.0',
            type: 'module',
            scripts: {
              dev: 'vite --port=3000 --host=0.0.0.0',
              build: 'vite build',
              preview: 'vite preview'
            },
            dependencies: {
              firebase: '^11.4.0',
              jszip: '^3.10.1',
              'lucide-react': '^0.546.0',
              react: '^19.0.1',
              'react-dom': '^19.0.1',
              tailwindcss: '^4.3.3',
              vite: '^8.3.0'
            }
          },
          null,
          2
        )
      );

      zip.file(
        'firebase-applet-config.json.template',
        JSON.stringify(
          {
            projectId: 'YOUR_FIREBASE_PROJECT_ID',
            appId: 'YOUR_APP_ID',
            apiKey: 'YOUR_API_KEY',
            authDomain: 'YOUR_PROJECT.firebaseapp.com',
            firestoreDatabaseId: '(default)',
            storageBucket: 'YOUR_PROJECT.firebasestorage.app',
            messagingSenderId: 'YOUR_SENDER_ID'
          },
          null,
          2
        )
      );

      // Security rules
      const rulesContent = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} { allow read, write: if false; }
    function isSignedIn() { return request.auth != null; }
    function isAdmin() { return isSignedIn() && request.auth.token.email == '${adminEmail}'; }
    match /products/{productId} { allow read: if true; allow write: if isAdmin(); }
    match /settings/{settingId} { allow read: if true; allow write: if isAdmin(); }
    match /orders/{orderId} {
      allow create: if request.resource.data.orderNumber is string;
      allow read, update: if isAdmin();
    }
  }
}`;
      zip.file('firestore.rules', rulesContent);
      zip.file('storage.rules', `rules_version = '2';\nservice firebase.storage { match /b/{bucket}/o { match /{allPaths=**} { allow read: if true; allow write: if request.auth != null; } } }`);

      // Generate ZIP and trigger browser download
      const blob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `VIONEX-SourceCode-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to generate zip export');
    } finally {
      setIsExporting(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#D8DCEB] pb-16">
      {/* Top Banner */}
      <div className="bg-[#12141F] border-b border-[#1E2232] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('store')}
              className="p-2 bg-[#1A1D2B] hover:bg-[#252A3E] text-[#8E93AA] hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'স্টোরফ্রন্টে ফিরুন' : 'Back to Store'}</span>
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#E2B755]" />
                <span>VIONEX Admin Management Console</span>
              </h1>
              <p className="text-xs text-[#7F849B]">
                {language === 'bn' ? 'স্টোর সেটিংস, ক্যাটালগ ও অর্ডার নিয়ন্ত্রণ কেন্দ্র' : 'Full real-time store control & synchronization'}
              </p>
            </div>
          </div>

          {/* Admin Auth Status / Switcher */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 text-xs bg-[#171A27] px-3 py-1.5 rounded-lg border border-[#272B3E]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-medium">{currentUser.email}</span>
                <button onClick={logOut} className="text-[#888EAA] hover:text-rose-400 ml-2 underline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={signInWithGoogle}
                  className="px-3.5 py-1.5 bg-[#E2B755] hover:bg-[#F3C868] text-black font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Google Sign In ({adminEmail.slice(0, 5)}...)</span>
                </button>
                {/* Frictionless Dev Admin Mode Toggle */}
                <button
                  onClick={() => toggleDemoAdmin()}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isDemoAdmin
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-[#181B28] text-[#8E93AA] border-[#2A2E44]'
                  }`}
                  title="Toggle Admin simulation for instant preview"
                >
                  {isDemoAdmin ? 'Admin Access: ACTIVE' : 'Enable Demo Admin'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1E2232] pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: language === 'bn' ? 'ওভারভিউ ও অ্যানালিটিক্স' : 'Overview', icon: LayoutDashboard },
            { id: 'products', label: language === 'bn' ? 'পোশাক ক্যাটালগ' : 'Products', icon: Package },
            { id: 'orders', label: language === 'bn' ? 'অর্ডার তালিকা' : 'Orders', icon: ShoppingBag, badge: pendingOrders.length },
            { id: 'settings', label: language === 'bn' ? 'স্টোর সেটিংস' : 'Store Settings', icon: Sliders },
            { id: 'export', label: language === 'bn' ? 'সোর্স কোড এক্সপোর্ট (ZIP)' : 'Export ZIP', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#E2B755] text-black shadow-md shadow-[#E2B755]/20'
                    : 'text-[#8E93AA] hover:text-white hover:bg-[#161825]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white font-black">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#11131E] border border-[#1E2335]">
                <span className="text-xs text-[#7F849D] font-semibold uppercase tracking-wider">
                  {language === 'bn' ? 'সর্বমোট বিক্রয় রেভিনিউ' : 'Total Revenue'}
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#E2B755] mt-2">
                  {formatBDT(totalRevenue, language === 'bn')}
                </p>
                <p className="text-[11px] text-emerald-400 mt-1">
                  {orders.length} {language === 'bn' ? 'টি মোট অর্ডার' : 'total orders placed'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#11131E] border border-[#1E2335]">
                <span className="text-xs text-[#7F849D] font-semibold uppercase tracking-wider">
                  {language === 'bn' ? 'অপেক্ষমান অর্ডার' : 'Pending Orders'}
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">
                  {language === 'bn' ? toBengaliNumerals(pendingOrders.length) : pendingOrders.length}
                </p>
                <p className="text-[11px] text-[#868B9E] mt-1">
                  {language === 'bn' ? 'গ্রাহকের সাথে ফোন কনফার্মেশন প্রয়োজন' : 'Awaiting confirmation'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#11131E] border border-[#1E2335]">
                <span className="text-xs text-[#7F849D] font-semibold uppercase tracking-wider">
                  {language === 'bn' ? 'মোট সক্রিয় পণ্য' : 'Active Products'}
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {language === 'bn' ? toBengaliNumerals(products.length) : products.length}
                </p>
                <p className="text-[11px] text-[#868B9E] mt-1">
                  {lowStockCount > 0 ? (
                    <span className="text-rose-400 font-semibold">
                      {lowStockCount} {language === 'bn' ? 'টি পণ্যে স্টক কম' : 'items low stock'}
                    </span>
                  ) : (
                    language === 'bn' ? 'স্টক পর্যাপ্ত রয়েছে' : 'Healthy inventory'
                  )}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#11131E] border border-[#1E2335]">
                <span className="text-xs text-[#7F849D] font-semibold uppercase tracking-wider">
                  {language === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered Orders'}
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">
                  {language === 'bn' ? toBengaliNumerals(deliveredOrders.length) : deliveredOrders.length}
                </p>
                <p className="text-[11px] text-[#868B9E] mt-1">
                  {language === 'bn' ? 'সফল ক্যাশ অন ডেলিভারি' : 'Successful deliveries'}
                </p>
              </div>
            </div>

            {/* Quick Actions & Catalog Seed */}
            <div className="p-6 rounded-2xl bg-[#11131E] border border-[#1E2335] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'ক্যাটালগ ও ডাটাবেজ কুইক টুলস' : 'Database & Catalog Fast Actions'}
                </h3>
                <p className="text-xs text-[#7D8298] mt-0.5">
                  {language === 'bn'
                    ? 'ডাটাবেজে প্রি-সেট প্রিমিয়াম পোশাকের ক্যাটালগ সিড করুন অথবা নতুন পণ্য যুক্ত করুন।'
                    : 'Initialize default luxury garments into Firestore or launch new drops.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={seedInitialCatalog}
                  className="px-4 py-2 bg-[#1A1D2B] hover:bg-[#252A3E] text-white border border-[#2E3348] text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#E2B755]" />
                  <span>{language === 'bn' ? 'ডেমো ক্যাটালগ সিড করুন' : 'Seed Catalog to Firestore'}</span>
                </button>

                <button
                  onClick={handleOpenCreateProduct}
                  className="px-4 py-2 bg-[#E2B755] hover:bg-[#F3C868] text-black text-xs font-bold uppercase rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'bn' ? 'নতুন পোশাক যুক্ত করুন' : 'Add New Product'}</span>
                </button>
              </div>
            </div>

            {/* Recent Orders Snapshot */}
            <div className="p-6 rounded-2xl bg-[#11131E] border border-[#1E2335]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  {language === 'bn' ? 'সাম্প্রতিক কাস্টমার অর্ডার' : 'Recent Customer Orders'}
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#E2B755] hover:underline"
                >
                  {language === 'bn' ? 'সব অর্ডার দেখুন' : 'View All'}
                </button>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs text-[#6F748B] py-6 text-center">
                  {language === 'bn' ? 'এখনও কোনো অর্ডার পাওয়া যায়নি।' : 'No orders recorded yet.'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#161826] text-[#868B9E] uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">District</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1D2132]">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-[#141624]">
                          <td className="p-3 font-mono font-bold text-[#E2B755]">{o.orderNumber}</td>
                          <td className="p-3 font-medium text-white">{o.customerName}</td>
                          <td className="p-3 text-[#A0A4B8]">{o.customerPhone}</td>
                          <td className="p-3 text-[#A0A4B8]">{o.district}</td>
                          <td className="p-3 font-bold text-white">{formatBDT(o.total, language === 'bn')}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getOrderStatusBadge(o.status, language === 'bn').bg} ${getOrderStatusBadge(o.status, language === 'bn').color}`}>
                              {o.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setOrderStatusFilter('all');
                                setActiveTab('orders');
                              }}
                              className="text-xs text-[#E2B755] hover:underline"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'bn' ? 'পোশাক ক্যাটালগ ও ইনভেন্টরি' : 'Product Inventory Management'}
                </h3>
                <p className="text-xs text-[#7B8096]">
                  {products.length} {language === 'bn' ? 'টি পোশাক তালিকাভুক্ত আছে' : 'products currently listed'}
                </p>
              </div>

              <button
                onClick={handleOpenCreateProduct}
                className="px-4 py-2.5 bg-[#E2B755] hover:bg-[#F3C868] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'bn' ? 'নতুন পোশাক যোগ করুন' : 'Add Product'}</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-[#11131E] border border-[#1E2335] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161826] text-[#868B9E] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5">Image</th>
                      <th className="p-3.5">Title & Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Sizes</th>
                      <th className="p-3.5">Tags</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D2132]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#151726] transition-colors">
                        <td className="p-3.5">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-12 h-14 object-cover rounded-lg bg-[#191C2C]"
                          />
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <p className="font-bold text-white line-clamp-1">{p.title}</p>
                          <p className="text-[11px] text-[#E2B755] uppercase font-semibold">{p.category}</p>
                          <p className="text-[10px] text-[#787D94] line-clamp-1">{p.fabric}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-white text-sm">
                            {formatBDT(p.price, language === 'bn')}
                          </span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-[#71768C] block line-through">
                              {formatBDT(p.originalPrice, language === 'bn')}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`font-bold ${p.stock <= 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex gap-1">
                            {p.sizes.map((s) => (
                              <span key={s} className="px-1.5 py-0.5 bg-[#1C1F2E] rounded text-[10px] text-[#9EA3B8]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {p.isNewArrival && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E2B755]/20 text-[#E2B755]">NEW</span>}
                            {p.isBestSeller && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/20 text-white">BEST</span>}
                          </div>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct({ ...p });
                                setIsCreatingProduct(false);
                              }}
                              className="p-1.5 bg-[#1B1E2D] hover:bg-[#282D42] text-[#A6ABC0] hover:text-white rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this product?')) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 bg-[#1B1E2D] hover:bg-rose-500/20 text-[#A6ABC0] hover:text-rose-400 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT EDIT / CREATE MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#10121B] border border-[#23273C] rounded-2xl shadow-2xl overflow-hidden my-auto">
              <div className="flex items-center justify-between p-5 border-b border-[#1E2232] bg-[#141624]">
                <h3 className="text-base font-bold text-white">
                  {isCreatingProduct ? 'Add New Product to VIONEX' : 'Edit Product Details'}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 text-[#888EAA] hover:text-white rounded-lg hover:bg-[#1E2234]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProductForm} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Product Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.title}
                      onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#E2B755]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Product Title (Bengali) *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.titleBn}
                      onChange={(e) => setEditingProduct({ ...editingProduct, titleBn: e.target.value })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#E2B755]"
                    />
                  </div>
                </div>

                {/* Category & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Category *</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    >
                      <option value="t-shirt">T-Shirt (টি-শার্ট)</option>
                      <option value="shirt">Shirt (শার্ট)</option>
                      <option value="hoodie">Hoodie (হুডি)</option>
                      <option value="polo">Polo (পোলো)</option>
                      <option value="panjabi">Panjabi (পাঞ্জাবি)</option>
                      <option value="pants">Pants (প্যান্টস)</option>
                      <option value="jacket">Jacket (জ্যাকেট)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Selling Price (৳ BDT) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Original Price (for discount) *</label>
                    <input
                      type="number"
                      value={editingProduct.originalPrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Stock & Fabric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Fabric & GSM (English)</label>
                    <input
                      type="text"
                      value={editingProduct.fabric}
                      onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                      className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-[#A2A6BC] font-semibold mb-1">Description (Bengali)</label>
                  <textarea
                    rows={2}
                    value={editingProduct.descriptionBn}
                    onChange={(e) => setEditingProduct({ ...editingProduct, descriptionBn: e.target.value })}
                    className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none resize-none"
                  />
                </div>

                {/* Primary Image URL */}
                <div>
                  <label className="block text-[#A2A6BC] font-semibold mb-1">Primary Image URL *</label>
                  <input
                    type="url"
                    required
                    value={editingProduct.images[0] || ''}
                    onChange={(e) => {
                      const newImages = [...editingProduct.images];
                      newImages[0] = e.target.value;
                      setEditingProduct({ ...editingProduct, images: newImages });
                    }}
                    className="w-full bg-[#131520] border border-[#23273A] rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                  />
                  {/* Preset Luxury Image Selector */}
                  <p className="text-[10px] text-[#737990] mt-1.5">Or choose a preset high-resolution editorial photo:</p>
                  <div className="flex gap-2 overflow-x-auto py-1">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const newImages = [...editingProduct.images];
                          newImages[0] = img;
                          setEditingProduct({ ...editingProduct, images: newImages });
                        }}
                        className={`w-12 h-14 rounded-lg overflow-hidden border-2 shrink-0 ${
                          editingProduct.images[0] === img ? 'border-[#E2B755]' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isNewArrival}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                      className="accent-[#E2B755]"
                    />
                    <span>New Arrival (নতুন আগমন)</span>
                  </label>
                  <label className="flex items-center gap-2 text-white font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isBestSeller}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                      className="accent-[#E2B755]"
                    />
                    <span>Best Seller (সর্বাধিক বিক্রিত)</span>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-[#1E2232] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-[#1A1D2B] text-white rounded-xl hover:bg-[#24283C]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-[#E2B755] text-black font-bold uppercase rounded-xl hover:bg-[#F3C868] transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      orderStatusFilter === st
                        ? 'bg-[#E2B755] text-black font-bold'
                        : 'bg-[#141624] text-[#8C91A5] hover:text-white'
                    }`}
                  >
                    {st} ({st === 'all' ? orders.length : orders.filter((o) => o.status === st).length})
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-[#11131E] rounded-2xl border border-[#1E2335]">
                <p className="text-xs text-[#71768C]">No orders found for this status filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const statusInfo = getOrderStatusBadge(order.status, language === 'bn');
                  const whatsappUrl = `https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${order.customerName}, regarding your VIONEX order #${order.orderNumber}...`)}`;

                  return (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-[#11131E] border border-[#1E2335] space-y-4"
                    >
                      {/* Top Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E2232]">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#E2B755]">
                            {order.orderNumber}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusInfo.bg} ${statusInfo.color}`}>
                            {order.status.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-[#71768C]">
                            {formatOrderDate(order.createdAt, language === 'bn')}
                          </span>
                        </div>

                        {/* Status Updater Select */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[#8E93AA]">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-[#171A27] border border-[#272B3E] text-white rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-[#E2B755]"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing / QC</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Middle: Customer Info & Items */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        {/* Customer */}
                        <div className="p-3 bg-[#151724] rounded-xl border border-[#202538] space-y-1">
                          <p className="font-bold text-white text-sm">{order.customerName}</p>
                          <p className="text-[#A2A6BD] flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#E2B755]" />
                            <span>{order.customerPhone}</span>
                          </p>
                          <p className="text-[#7F849B]">{order.address}, {order.upazila}, {order.district}</p>
                          {order.notes && <p className="text-[11px] text-amber-300">Note: {order.notes}</p>}
                          
                          <div className="pt-2 flex items-center gap-2">
                            <a
                              href={`tel:${order.customerPhone}`}
                              className="px-2.5 py-1 bg-[#202538] hover:bg-[#2B324A] text-white rounded text-[10px] flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3 text-[#E2B755]" />
                              <span>Call</span>
                            </a>
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 bg-[#25D366]/20 text-[#25D366] rounded text-[10px] flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="md:col-span-2 p-3 bg-[#151724] rounded-xl border border-[#202538] space-y-2">
                          <span className="text-[10px] uppercase font-bold text-[#72778E]">Ordered Garments</span>
                          <div className="divide-y divide-[#1F2336]">
                            {order.items.map((item, i) => (
                              <div key={i} className="py-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <img src={item.image} alt="" className="w-8 h-10 object-cover rounded bg-[#1B1E2E]" />
                                  <div>
                                    <p className="font-semibold text-white">{item.title}</p>
                                    <p className="text-[10px] text-[#7E839A]">Size: {item.size} • Color: {item.colorName} • {item.quantity} pc</p>
                                  </div>
                                </div>
                                <span className="font-bold text-white">{formatBDT(item.unitPrice * item.quantity, language === 'bn')}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-[#1F2336] flex items-center justify-between font-bold text-xs">
                            <span className="text-[#8E93AA]">Total (including Delivery ৳{order.deliveryFee}):</span>
                            <span className="text-base text-[#E2B755]">{formatBDT(order.total, language === 'bn')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STORE SETTINGS CUSTOMIZATION */}
        {activeTab === 'settings' && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-[#11131E] border border-[#1E2335]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1E2232]">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {language === 'bn' ? 'স্টোর কাস্টমাইজেশন ও সেটিংস' : 'Full Store Customization & Firebase Sync'}
                  </h3>
                  <p className="text-xs text-[#7F849B]">
                    {language === 'bn'
                      ? 'এখানে পরিবর্তন করলে সাথে সাথে পাবলিক ওয়েবসাইটে প্রযোজ্য হবে (কোনো কোড পরিবর্তন ছাড়াই)।'
                      : 'Changes saved here instantly update in Firebase and apply to public visitors.'}
                  </p>
                </div>
                <button
                  onClick={handleSaveSettingsSubmit}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-[#E2B755] hover:bg-[#F3C868] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 text-xs">
                {/* Brand Identity */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2B755]" />
                    <span>Brand & Contact Information</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Store Name</label>
                      <input
                        type="text"
                        value={editableSettings.storeName}
                        onChange={(e) => setEditableSettings({ ...editableSettings, storeName: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Owner / Studio Name</label>
                      <input
                        type="text"
                        value={editableSettings.ownerName}
                        onChange={(e) => setEditableSettings({ ...editableSettings, ownerName: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Logo Text</label>
                      <input
                        type="text"
                        value={editableSettings.logoText}
                        onChange={(e) => setEditableSettings({ ...editableSettings, logoText: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Customer Care Phone</label>
                    <input
                      type="text"
                      value={editableSettings.phone}
                      onChange={(e) => setEditableSettings({ ...editableSettings, phone: e.target.value })}
                      className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">WhatsApp Support Number</label>
                    <input
                      type="text"
                      value={editableSettings.whatsapp}
                      onChange={(e) => setEditableSettings({ ...editableSettings, whatsapp: e.target.value })}
                      className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Support Email</label>
                    <input
                      type="email"
                      value={editableSettings.email}
                      onChange={(e) => setEditableSettings({ ...editableSettings, email: e.target.value })}
                      className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Physical Address */}
                <div>
                  <label className="block text-[#A2A6BC] font-semibold mb-1">Physical Store / Studio Address</label>
                  <input
                    type="text"
                    value={editableSettings.address}
                    onChange={(e) => setEditableSettings({ ...editableSettings, address: e.target.value })}
                    className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                {/* Delivery Charges */}
                <div className="pt-4 border-t border-[#1E2232]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2B755]" />
                    <span>Bangladesh Shipping Charges</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Inside Dhaka Delivery Fee (৳)</label>
                      <input
                        type="number"
                        value={editableSettings.insideDhakaDeliveryFee}
                        onChange={(e) => setEditableSettings({ ...editableSettings, insideDhakaDeliveryFee: Number(e.target.value) })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Outside Dhaka Delivery Fee (৳)</label>
                      <input
                        type="number"
                        value={editableSettings.outsideDhakaDeliveryFee}
                        onChange={(e) => setEditableSettings({ ...editableSettings, outsideDhakaDeliveryFee: Number(e.target.value) })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Free Shipping Threshold (৳)</label>
                      <input
                        type="number"
                        value={editableSettings.freeDeliveryThreshold || 4000}
                        onChange={(e) => setEditableSettings({ ...editableSettings, freeDeliveryThreshold: Number(e.target.value) })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Homepage Hero Settings */}
                <div className="pt-4 border-t border-[#1E2232]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2B755]" />
                    <span>Hero Section & Announcement Bar</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Hero Title (Bengali)</label>
                      <input
                        type="text"
                        value={editableSettings.heroTitleBn}
                        onChange={(e) => setEditableSettings({ ...editableSettings, heroTitleBn: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Hero Title (English)</label>
                      <input
                        type="text"
                        value={editableSettings.heroTitle}
                        onChange={(e) => setEditableSettings({ ...editableSettings, heroTitle: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Hero Subtitle (Bengali)</label>
                      <input
                        type="text"
                        value={editableSettings.heroSubtitleBn}
                        onChange={(e) => setEditableSettings({ ...editableSettings, heroSubtitleBn: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Hero Subtitle (English)</label>
                      <input
                        type="text"
                        value={editableSettings.heroSubtitle}
                        onChange={(e) => setEditableSettings({ ...editableSettings, heroSubtitle: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-[#A2A6BC] font-semibold mb-1">Hero Banner Image URL</label>
                    <input
                      type="url"
                      value={editableSettings.heroBannerUrl}
                      onChange={(e) => setEditableSettings({ ...editableSettings, heroBannerUrl: e.target.value })}
                      className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Numbers */}
                <div className="pt-4 border-t border-[#1E2232]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E2B755]" />
                    <span>bKash & Nagad Numbers (Manual Verification)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">bKash Send Money Number / Details</label>
                      <input
                        type="text"
                        value={editableSettings.bkashNumber}
                        onChange={(e) => setEditableSettings({ ...editableSettings, bkashNumber: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#A2A6BC] font-semibold mb-1">Nagad Send Money Number / Details</label>
                      <input
                        type="text"
                        value={editableSettings.nagadNumber}
                        onChange={(e) => setEditableSettings({ ...editableSettings, nagadNumber: e.target.value })}
                        className="w-full bg-[#141624] border border-[#23273A] rounded-xl px-3 py-2 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 bg-[#E2B755] hover:bg-[#F3C868] text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Updating...' : 'Save All Settings'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: SOURCE CODE EXPORT (ZIP) */}
        {activeTab === 'export' && (
          <div className="mt-6 space-y-6 animate-fadeIn">
            <div className="p-8 rounded-2xl bg-[#11131E] border border-[#1E2335] max-w-2xl mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#E2B755]/10 text-[#E2B755] mx-auto flex items-center justify-center border border-[#E2B755]/30">
                <Download className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white">
                Download Complete VIONEX Project ZIP
              </h3>

              <p className="text-xs text-[#8E93AA] leading-relaxed">
                Download the complete codebase for VIONEX as an archive. The generated ZIP includes full frontend source code, admin dashboard, Firebase configuration template, Firestore security rules, setup instructions, and deployment guide.
              </p>

              <div className="p-4 bg-[#141624] rounded-xl border border-[#202538] text-left text-xs text-[#A2A6BC] space-y-1.5">
                <p className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Package Contents:</span>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#7F849D]">
                  <li>Frontend Source Code (React 19 + TypeScript + Tailwind CSS)</li>
                  <li>Admin Dashboard with RBAC authorization & product/order manager</li>
                  <li>Firebase Configuration template & Firestore Rules</li>
                  <li>Bangladeshi 64 Districts database & Cash on Delivery workflows</li>
                  <li>Comprehensive README & Setup deployment manual</li>
                </ul>
              </div>

              <button
                onClick={handleExportSourceZip}
                disabled={isExporting}
                className="w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#E2B755] hover:bg-[#F3C868] text-black shadow-xl shadow-[#E2B755]/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating ZIP Package...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Project ZIP Archive</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
