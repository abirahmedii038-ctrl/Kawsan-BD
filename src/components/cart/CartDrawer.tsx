import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatBDT, toBengaliNumerals } from '../../utils/formatters';
import { X, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartCount,
    cartSubtotal,
    language,
    setIsCheckoutOpen,
    settings
  } = useStore();

  if (!isCartOpen) return null;

  const freeDeliveryTarget = settings.freeDeliveryThreshold || 4000;
  const remainingForFreeShipping = Math.max(0, freeDeliveryTarget - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryTarget) * 100));

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dark overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E1017] border-l border-[#1F2332] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#1E2232] bg-[#12141F] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#E2B755]" />
              <h3 className="text-base font-bold text-white tracking-wide">
                {language === 'bn' ? 'শপিং ব্যাগ' : 'Shopping Bag'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E2B755] text-black">
                {language === 'bn' ? toBengaliNumerals(cartCount) : cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#888EAA] hover:text-white rounded-lg hover:bg-[#1E2234] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#151724] border-b border-[#1E2232] text-xs">
            <div className="flex items-center gap-2 mb-1.5 text-[#C0C4D6]">
              <Truck className="w-3.5 h-3.5 text-[#E2B755]" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  {language === 'bn'
                    ? `আর মাত্র ${formatBDT(remainingForFreeShipping, true)} কেনাকাটায় সারা দেশে ফ্রি ডেলিভারি!`
                    : `Add ${formatBDT(remainingForFreeShipping, false)} more for FREE nationwide delivery!`}
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold">
                  {language === 'bn' ? '🎉 আপনি ফ্রি ডেলিভারি পেয়েছেন!' : '🎉 You unlocked FREE Delivery!'}
                </span>
              )}
            </div>
            <div className="w-full bg-[#202538] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#E2B755] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="p-4 rounded-full bg-[#161826] text-[#60657B] mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  {language === 'bn' ? 'আপনার ব্যাগটি খালি' : 'Your bag is empty'}
                </h4>
                <p className="text-xs text-[#7B8096] max-w-xs mb-6">
                  {language === 'bn'
                    ? 'আমাদের প্রিমিয়াম কালেকশন থেকে আপনার পছন্দের পোশাক যুক্ত করুন।'
                    : 'Explore our contemporary drops and add pieces to your bag.'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#E2B755] text-black text-xs font-bold uppercase tracking-wider"
                >
                  {language === 'bn' ? 'কালেকশন দেখুন' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const title = language === 'bn' ? item.product.titleBn || item.product.title : item.product.title;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-xl bg-[#12141F] border border-[#1E2232] hover:border-[#2D334B] transition-colors"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={title}
                      className="w-16 h-20 object-cover rounded-lg bg-[#181B28] shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white line-clamp-1">
                            {title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6C7186] hover:text-rose-400 transition-colors p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Size & Color Tags */}
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8E93AA]">
                          <span>
                            {language === 'bn' ? 'সাইজ:' : 'Size:'}{' '}
                            <strong className="text-white">{item.selectedSize}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {language === 'bn' ? item.selectedColor.nameBn : item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#252A3E] bg-[#161826] rounded-md">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#A0A5BA] hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-white">
                            {language === 'bn' ? toBengaliNumerals(item.quantity) : item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#A0A5BA] hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#E2B755]">
                          {formatBDT(item.product.price * item.quantity, language === 'bn')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1E2232] bg-[#12141F] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#8E93AA]">
                <span>{language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span className="text-sm font-bold text-white">
                  {formatBDT(cartSubtotal, language === 'bn')}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#71768C]">
                <span>{language === 'bn' ? 'আনুমানিক ডেলিভারি চার্জ' : 'Delivery estimate'}</span>
                <span>
                  {language === 'bn'
                    ? `ঢাকা ৳${toBengaliNumerals(settings.insideDhakaDeliveryFee)} / বাইরে ৳${toBengaliNumerals(settings.outsideDhakaDeliveryFee)}`
                    : `Dhaka ৳${settings.insideDhakaDeliveryFee} / Outside ৳${settings.outsideDhakaDeliveryFee}`}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#E2B755] hover:bg-[#F3C868] text-black shadow-lg shadow-[#E2B755]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{language === 'bn' ? 'অর্ডার সম্পন্ন করুন (চেকআউট)' : 'Proceed to Checkout (COD)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#686D82]">
                {language === 'bn'
                  ? '🔒 নিরাপদ ক্যাশ অন ডেলিভারি | ডেলিভারি ম্যানের সামনে পণ্য চেক করুন'
                  : '🔒 Safe Cash on Delivery | Inspect before payment'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
