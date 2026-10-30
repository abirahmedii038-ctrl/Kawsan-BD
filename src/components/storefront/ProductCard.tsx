import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatBDT, toBengaliNumerals } from '../../utils/formatters';
import { ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, addToCart, setSelectedProduct, setIsCartOpen } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');

  const title = language === 'bn' ? product.titleBn || product.title : product.title;
  const activeColor = product.colors[selectedColorIndex] || {
    name: 'Standard',
    nameBn: 'স্ট্যান্ডার্ড',
    hex: '#111'
  };

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const currentImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, activeColor, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col bg-[#10121A] border border-[#1E2232] hover:border-[#383F58] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#151722]">
        <img
          src={currentImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-[#E2B755] text-black rounded-md shadow-sm">
              {language === 'bn' ? 'নতুন' : 'NEW'}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-white text-black rounded-md shadow-sm">
              {language === 'bn' ? 'বেস্ট সেলার' : 'BESTSELLER'}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-600/90 text-white rounded-md shadow-sm backdrop-blur-sm">
              {language === 'bn' ? `-${toBengaliNumerals(discountPercentage)}% ছাড়` : `-${discountPercentage}% OFF`}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 bg-[#141622]/90 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#E2B755]" />
            <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'Quick View'}</span>
          </span>
        </div>

        {/* Stock Alert */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[10px] text-amber-300 font-medium">
            {language === 'bn' ? `মাত্র ${toBengaliNumerals(product.stock)}টি বাকি!` : `Only ${product.stock} left!`}
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] uppercase tracking-wider text-[#7E8398] font-bold">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="mt-1 text-sm font-semibold text-white line-clamp-1 group-hover:text-[#E2B755] transition-colors">
            {title}
          </h3>

          {/* Fabric Note */}
          <p className="text-[11px] text-[#787D92] line-clamp-1 mt-0.5">
            {language === 'bn' ? product.fabricBn || product.fabric : product.fabric}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                style={{ backgroundColor: color.hex }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'border-[#E2B755] scale-110 shadow-sm'
                    : 'border-white/20 hover:scale-105'
                }`}
                title={language === 'bn' ? color.nameBn : color.name}
              />
            ))}
            <span className="text-[10px] text-[#8C91A5] ml-1">
              {language === 'bn' ? activeColor.nameBn : activeColor.name}
            </span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#1C2030] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-white tracking-tight">
              {formatBDT(product.price, language === 'bn')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#6F7488] line-through">
                {formatBDT(product.originalPrice, language === 'bn')}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2 bg-[#1A1D2B] hover:bg-[#E2B755] text-white hover:text-black rounded-lg transition-colors border border-[#2B3045] hover:border-[#E2B755]"
            title={language === 'bn' ? 'ব্যাগে যোগ করুন' : 'Add to Bag'}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
