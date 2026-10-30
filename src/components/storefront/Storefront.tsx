import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Hero } from './Hero';
import { CategoryPills } from './CategoryPills';
import { ProductCard } from './ProductCard';
import { Sparkles, Flame, Search, MessageCircle } from 'lucide-react';

export const Storefront: React.FC = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    language,
    settings
  } = useStore();

  const [sortBy, setSortBy] = useState('featured');
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'bestseller'>('all');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // New arrivals or Best sellers pill filter
    if (activeFilter === 'new') {
      list = list.filter((p) => p.isNewArrival);
    } else if (activeFilter === 'bestseller') {
      list = list.filter((p) => p.isBestSeller);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleBn.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, activeFilter, searchQuery, sortBy]);

  // Featured sections
  const newArrivals = useMemo(() => products.filter((p) => p.isNewArrival), [products]);
  const bestSellers = useMemo(() => products.filter((p) => p.isBestSeller), [products]);

  const whatsappHref = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello VIONEX, I have a question about your clothing collection...'
  )}`;

  return (
    <div className="relative">
      {/* Editorial Fashion Hero */}
      <Hero />

      {/* Main Collection Container */}
      <main id="collection-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E2B755] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'bn' ? 'এক্সক্লুসিভ কালেকশন' : 'Contemporary Wardrobe'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
              {language === 'bn' ? 'সর্বশেষ পোশাক কালেকশন' : 'Latest Drops & Essentials'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#82889E] max-w-md font-light">
            {language === 'bn'
              ? 'আন্তর্জাতিক মানের হেভিওয়েট ফেব্রিক, আরামদায়ক কাট ও অনন্য ফিনিশিং।'
              : 'Precision engineered luxury silhouettes built with durable heavyweight cotton for Bangladesh.'}
          </p>
        </div>

        {/* Category & Sorting Controls */}
        <CategoryPills
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#10121B] rounded-2xl border border-[#1E2232] p-8">
            <Search className="w-10 h-10 text-[#676C82] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              {language === 'bn' ? 'কোনো পোশাক খুঁজে পাওয়া যায়নি' : 'No Garments Found'}
            </h3>
            <p className="text-xs text-[#7B8098] max-w-sm mx-auto mb-4">
              {language === 'bn'
                ? 'আপনার সার্চ ফিল্টারে পরিবর্তন এনে পুনরায় চেষ্টা করুন অথবা সব পোশাক দেখুন।'
                : 'Try adjusting your search terms or view our full collection.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-5 py-2 rounded-lg bg-[#E2B755] text-black text-xs font-bold uppercase tracking-wider"
            >
              {language === 'bn' ? 'সকল পোশাক দেখুন' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Spotlight Showcase: Best Sellers (if showing all) */}
        {selectedCategory === 'all' && !searchQuery && bestSellers.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#1C2030]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E2B755] mb-1">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>{language === 'bn' ? 'গ্রাহকদের পছন্দের শীর্ষে' : 'Most Wanted'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase">
                  {language === 'bn' ? 'টপ বেস্ট সেলার ড্রপস' : 'Signature Best Sellers'}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard key={`spotlight-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating WhatsApp Quick Action Button for Direct Bangladeshi Customer Support */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl shadow-[#25D366]/40 flex items-center gap-2 group transition-all duration-300 hover:scale-105"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs font-bold text-black uppercase pr-1">
          {language === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট' : 'WhatsApp'}
        </span>
      </a>
    </div>
  );
};
