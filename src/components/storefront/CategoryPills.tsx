import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpDown, Sparkles } from 'lucide-react';

interface CategoryPillsProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  activeFilter: 'all' | 'new' | 'bestseller';
  setActiveFilter: (filter: 'all' | 'new' | 'bestseller') => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  sortBy,
  setSortBy,
  activeFilter,
  setActiveFilter
}) => {
  const { selectedCategory, setSelectedCategory, language } = useStore();

  const categories = [
    { id: 'all', nameEn: 'All Drops', nameBn: 'সব পোশাক' },
    { id: 't-shirt', nameEn: 'T-Shirts (240 GSM)', nameBn: 'টি-শার্ট (২৪০ GSM)' },
    { id: 'shirt', nameEn: 'Cuban Shirts', nameBn: 'কিউবান শার্ট' },
    { id: 'hoodie', nameEn: 'Heavy Hoodies', nameBn: 'বক্সি হুডি' },
    { id: 'polo', nameEn: 'Pique Polo', nameBn: 'পিকে পোলো' },
    { id: 'panjabi', nameEn: 'Minimal Panjabi', nameBn: 'পাঞ্জাবি' },
    { id: 'pants', nameEn: 'Smart Trousers', nameBn: 'ট্রাউজার্স' },
    { id: 'jacket', nameEn: 'Jackets', nameBn: 'জ্যাকেট' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Top Filter Buttons (New Arrivals / Best Sellers / All) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E2230]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-black'
                : 'bg-[#141622] text-[#8E93AA] hover:text-white'
            }`}
          >
            {language === 'bn' ? 'সকল কালেকশন' : 'All Collection'}
          </button>
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              activeFilter === 'new'
                ? 'bg-[#E2B755] text-black font-bold shadow-sm'
                : 'bg-[#141622] text-[#8E93AA] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'নতুন আগমন (New)' : 'New Arrivals'}</span>
          </button>
          <button
            onClick={() => setActiveFilter('bestseller')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
              activeFilter === 'bestseller'
                ? 'bg-[#E2B755] text-black font-bold shadow-sm'
                : 'bg-[#141622] text-[#8E93AA] hover:text-white'
            }`}
          >
            {language === 'bn' ? 'সর্বাধিক বিক্রিত (Best Sellers)' : 'Best Sellers'}
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#8E93AA]" />
          <span className="text-[#8E93AA] hidden sm:inline">
            {language === 'bn' ? 'সর্ট করুন:' : 'Sort By:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#141622] border border-[#232738] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#E2B755]"
          >
            <option value="featured">{language === 'bn' ? 'নির্বাচিত (Featured)' : 'Featured'}</option>
            <option value="price-asc">{language === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
            <option value="price-desc">{language === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#E2B755] text-black border-[#E2B755] shadow-sm font-bold'
                  : 'bg-[#11131C] text-[#A6ABC0] border-[#1F2332] hover:text-white hover:border-[#323850]'
              }`}
            >
              {language === 'bn' ? cat.nameBn : cat.nameEn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
