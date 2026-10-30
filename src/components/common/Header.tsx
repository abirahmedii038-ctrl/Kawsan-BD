import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingBag,
  Search,
  Compass,
  SlidersHorizontal,
  X,
  Menu,
  Globe,
  Shield,
  Truck
} from 'lucide-react';
import { toBengaliNumerals } from '../../utils/formatters';

export const Header: React.FC = () => {
  const {
    settings,
    language,
    toggleLanguage,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsTrackingOpen,
    currentView,
    setCurrentView
  } = useStore();

  const { isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const categories = [
    { id: 'all', nameEn: 'All Products', nameBn: 'সব কালেকশন' },
    { id: 't-shirt', nameEn: 'T-Shirts', nameBn: 'টি-শার্ট' },
    { id: 'shirt', nameEn: 'Shirts', nameBn: 'শার্ট' },
    { id: 'hoodie', nameEn: 'Hoodies', nameBn: 'হুডি' },
    { id: 'polo', nameEn: 'Polo Shirts', nameBn: 'পোলো' },
    { id: 'panjabi', nameEn: 'Panjabi', nameBn: 'পাঞ্জাবি' },
    { id: 'pants', nameEn: 'Pants', nameBn: 'প্যান্টস' },
    { id: 'jacket', nameEn: 'Jackets', nameBn: 'জ্যাকেট' }
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    if (currentView !== 'store') {
      setCurrentView('store');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0C10]/95 backdrop-blur-md border-b border-[#1E222D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#C0C4D6] hover:text-white rounded-lg hover:bg-[#161822] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="p-2 text-[#C0C4D6] hover:text-white rounded-lg hover:bg-[#161822] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setCurrentView('store');
                setSelectedCategory('all');
              }}
              className="group flex flex-col text-left focus:outline-none"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.22em] text-white font-['Cinzel',sans-serif] group-hover:text-[#E2B755] transition-colors">
                {settings.logoText || 'VIONEX'}
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#8C90A2] uppercase font-sans -mt-1 group-hover:text-white transition-colors">
                BANGLADESH
              </span>
            </button>
          </div>

          {/* Desktop Nav Categories */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {categories.map((cat) => {
              const isActive = currentView === 'store' && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-md ${
                    isActive
                      ? 'text-black bg-[#E2B755] font-bold shadow-sm shadow-[#E2B755]/20'
                      : 'text-[#B0B4C6] hover:text-white hover:bg-[#161924]'
                  }`}
                >
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search */}
            <div className="hidden sm:flex relative items-center">
              <input
                type="text"
                placeholder={language === 'bn' ? 'পোশাক অনুসন্ধান করুন...' : 'Search clothing...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 md:w-56 bg-[#141620] border border-[#232736] focus:border-[#E2B755] text-xs text-white placeholder-[#686D82] rounded-full pl-8 pr-3 py-1.5 focus:outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#686D82] absolute left-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-[#686D82] hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#C0C4D6] hover:text-white border border-[#232736] hover:border-[#E2B755]/40 rounded-full bg-[#141620] transition-colors"
              title="Toggle Bengali / English"
            >
              <Globe className="w-3.5 h-3.5 text-[#E2B755]" />
              <span className="font-semibold">{language === 'bn' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Order Tracking Button */}
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#C0C4D6] hover:text-white border border-[#232736] hover:border-[#E2B755]/40 rounded-full bg-[#141620] transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-[#E2B755]" />
              <span>{language === 'bn' ? 'ট্র্যাকিং' : 'Track Order'}</span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                currentView === 'admin'
                  ? 'bg-[#E2B755] text-black border-[#E2B755] shadow-sm shadow-[#E2B755]/30'
                  : 'bg-[#141620] text-[#C0C4D6] border-[#232736] hover:text-white hover:border-[#E2B755]/50'
              }`}
              title="Admin Dashboard"
            >
              <Shield className={`w-3.5 h-3.5 ${currentView === 'admin' ? 'text-black' : 'text-[#E2B755]'}`} />
              <span className="hidden md:inline">{language === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white bg-[#161824] hover:bg-[#1E2234] border border-[#262B3D] hover:border-[#E2B755]/40 rounded-full transition-all group"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 text-white group-hover:text-[#E2B755] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E2B755] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {language === 'bn' ? toBengaliNumerals(cartCount) : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Row if active */}
        {isSearchActive && (
          <div className="py-2.5 sm:hidden border-t border-[#1C202C]">
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'bn' ? 'পোশাক অনুসন্ধান করুন...' : 'Search clothing...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141620] border border-[#232736] text-sm text-white rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-[#E2B755]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#686D82] absolute left-3 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#686D82] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#1C202C] animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                    selectedCategory === cat.id && currentView === 'store'
                      ? 'bg-[#E2B755] text-black'
                      : 'bg-[#141622] text-[#C0C4D6] hover:bg-[#1C2030] hover:text-white'
                  }`}
                >
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-[#1C202C]">
              <button
                onClick={() => {
                  setIsTrackingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#C0C4D6] bg-[#141622] rounded-lg"
              >
                <Truck className="w-4 h-4 text-[#E2B755]" />
                <span>{language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order'}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView(currentView === 'admin' ? 'store' : 'admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#C0C4D6] bg-[#141622] rounded-lg"
              >
                <Shield className="w-4 h-4 text-[#E2B755]" />
                <span>{language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
