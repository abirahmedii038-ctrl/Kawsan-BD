import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatBDT, toBengaliNumerals } from '../../utils/formatters';
import {
  X,
  ShoppingBag,
  Zap,
  Ruler,
  Truck,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    language,
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsSizeGuideOpen,
    settings
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const title = language === 'bn' ? product.titleBn || product.title : product.title;
  const description = language === 'bn' ? product.descriptionBn || product.description : product.description;
  const fabric = language === 'bn' ? product.fabricBn || product.fabric : product.fabric;

  const activeColor = product.colors[selectedColorIndex] || {
    name: 'Standard',
    nameBn: 'স্ট্যান্ডার্ড',
    hex: '#111'
  };

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#10121B] border border-[#23273A] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#9AA0B8] hover:text-white bg-[#171A27]/80 hover:bg-[#23283E] rounded-full backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery */}
          <div className="p-4 sm:p-6 flex flex-col gap-3 bg-[#0D0E15] border-b md:border-b-0 md:border-r border-[#1E2232]">
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#151722] border border-[#1E2232]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-md shadow-md">
                  {language === 'bn' ? `-${toBengaliNumerals(discountPercentage)}% ছাড়` : `-${discountPercentage}% OFF`}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#E2B755] scale-105'
                        : 'border-[#222638] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5 overflow-y-auto max-h-[85vh]">
            <div>
              {/* Category & Stock */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="uppercase tracking-widest text-[#E2B755] font-bold text-[11px]">
                  {product.category}
                </span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'স্টকে প্রস্তুত (In Stock)' : 'Ready in Stock'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {title}
              </h2>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E2B755] tracking-tight">
                  {formatBDT(product.price, language === 'bn')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-[#6C7186] line-through font-normal">
                    {formatBDT(product.originalPrice, language === 'bn')}
                  </span>
                )}
              </div>

              {/* Fabric Specs */}
              {fabric && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161926] border border-[#24293D] text-xs text-[#C5C9DB]">
                  <Sparkles className="w-3.5 h-3.5 text-[#E2B755]" />
                  <span>{fabric}</span>
                </div>
              )}

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#A0A5BA] leading-relaxed">
                {description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                    {language === 'bn' ? 'কালার নির্বাচন করুন:' : 'Select Color:'}{' '}
                    <span className="text-[#E2B755] font-bold">
                      {language === 'bn' ? activeColor.nameBn : activeColor.name}
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`group relative p-0.5 rounded-full border-2 transition-all ${
                          selectedColorIndex === idx
                            ? 'border-[#E2B755] scale-110'
                            : 'border-transparent hover:border-white/30'
                        }`}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/30 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider">
                    {language === 'bn' ? 'সাইজ নির্বাচন করুন:' : 'Select Size:'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#E2B755] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সাইজ গাইড' : 'Size Guide'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#E2B755] text-black border-[#E2B755] shadow-sm'
                            : 'bg-[#151724] text-[#C2C6D8] border-[#24283C] hover:border-[#414868]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  {language === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
                </span>
                <div className="flex items-center border border-[#25293E] bg-[#141624] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-white hover:text-[#E2B755] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-white">
                    {language === 'bn' ? toBengaliNumerals(quantity) : quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-white hover:text-[#E2B755] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-[#1E2232]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#181B28] hover:bg-[#222638] text-white border border-[#2D334B] hover:border-[#E2B755] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E2B755]" />
                  <span>{language === 'bn' ? 'ব্যাগে যোগ করুন' : 'Add to Bag'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#E2B755] hover:bg-[#F3C868] text-black shadow-lg shadow-[#E2B755]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{language === 'bn' ? 'এক ক্লিকে অর্ডার (COD)' : 'Direct Buy (COD)'}</span>
                </button>
              </div>

              {/* Delivery Info */}
              <div className="p-3 bg-[#131520] rounded-xl border border-[#202436] space-y-1.5 text-[11px] text-[#8D92A6]">
                <div className="flex items-center gap-2 text-[#C2C6D8]">
                  <Truck className="w-3.5 h-3.5 text-[#E2B755]" />
                  <span>
                    {language === 'bn'
                      ? `ঢাকার ভেতরে ডেলিভারি চার্জ ৳${toBengaliNumerals(settings.insideDhakaDeliveryFee)} | ঢাকার বাইরে ৳${toBengaliNumerals(settings.outsideDhakaDeliveryFee)}`
                      : `Inside Dhaka ৳${settings.insideDhakaDeliveryFee} | Outside Dhaka ৳${settings.outsideDhakaDeliveryFee}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#C2C6D8]">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {language === 'bn'
                      ? '৭ দিনের মধ্যে ঝামেলাহীন সাইজ এক্সচেঞ্জ সুবিধা'
                      : '7-day easy size exchange support'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
