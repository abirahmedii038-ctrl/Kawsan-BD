import React, { useState, useId } from 'react';
import { useStore } from '../../context/StoreContext';
import { BANGLADESH_DISTRICTS, validateBdPhone, formatBdPhone } from '../../data/bangladeshData';
import { formatBDT, toBengaliNumerals } from '../../utils/formatters';
import { OrderItem } from '../../types';
import {
  X,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Banknote,
  Send,
  Loader2
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    settings,
    language,
    createOrder
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('dhaka');
  const [selectedUpazila, setSelectedUpazila] = useState('Dhanmondi');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDistrict = BANGLADESH_DISTRICTS.find((d) => d.id === selectedDistrictId) || BANGLADESH_DISTRICTS[0];

  // Delivery fee calculation
  const isDhaka = selectedDistrict.isDhakaCity;
  const deliveryFee = isDhaka
    ? (cartSubtotal >= (settings.freeDeliveryThreshold || 4000) ? 0 : settings.insideDhakaDeliveryFee)
    : (cartSubtotal >= (settings.freeDeliveryThreshold || 4000) ? 0 : settings.outsideDhakaDeliveryFee);

  const totalAmount = cartSubtotal + deliveryFee;

  if (!isCheckoutOpen) return null;

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
    const district = BANGLADESH_DISTRICTS.find((d) => d.id === districtId);
    if (district && district.upazilas.length > 0) {
      setSelectedUpazila(district.upazilas[0].en);
    } else {
      setSelectedUpazila('Sadar');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert(language === 'bn' ? 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।' : 'Please enter your full name.');
      return;
    }

    if (!validateBdPhone(customerPhone)) {
      setPhoneError(
        language === 'bn'
          ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)'
          : 'Please enter a valid 11-digit Bangladesh phone number (e.g. 017XXXXXXXX)'
      );
      return;
    }
    setPhoneError('');

    if (!address.trim()) {
      alert(language === 'bn' ? 'অনুগ্রহ করে পূর্ণ ঠিকানা লিখুন।' : 'Please enter your full delivery address.');
      return;
    }

    if (cart.length === 0) {
      alert(language === 'bn' ? 'আপনার শপিং ব্যাগটি খালি!' : 'Your bag is empty!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems: OrderItem[] = cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        titleBn: item.product.titleBn,
        size: item.selectedSize,
        colorName: language === 'bn' ? item.selectedColor.nameBn : item.selectedColor.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        image: item.product.images[0]
      }));

      await createOrder({
        orderNumber: '',
        customerName: customerName.trim(),
        customerPhone: formatBdPhone(customerPhone),
        district: language === 'bn' ? selectedDistrict.nameBn : selectedDistrict.nameEn,
        upazila: selectedUpazila,
        address: address.trim(),
        notes: orderNotes.trim(),
        items: orderItems,
        subtotal: cartSubtotal,
        deliveryFee,
        total: totalAmount,
        paymentMethod,
        paymentDetails: paymentMethod !== 'cod' ? `Payment requested via ${paymentMethod}` : 'Cash on Delivery'
      });

      setIsCheckoutOpen(false);
    } catch (err) {
      console.error('Order creation error:', err);
      alert(language === 'bn' ? 'অর্ডার প্রসেস করতে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Order processing failed, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#10121B] border border-[#222638] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E2232] bg-[#131622]">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-[#E2B755]" />
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'বাংলাদেশ ক্যাশ অন ডেলিভারি চেকআউট' : 'Bangladesh Express Checkout'}
              </h3>
              <p className="text-[11px] text-[#868B9F]">
                {language === 'bn' ? 'পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন' : 'Cash on delivery across all 64 districts'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#858BA2] hover:text-white rounded-lg hover:bg-[#1E2234] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-7 space-y-6">
          {/* Order Summary Snapshot */}
          <div className="p-4 rounded-xl bg-[#141624] border border-[#202436] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A0A5BA]">
              <span>{language === 'bn' ? 'নির্বাচিত আইটেম সংখ্যা' : 'Total Items'}</span>
              <span className="font-semibold text-white">
                {language === 'bn' ? toBengaliNumerals(cart.reduce((a, b) => a + b.quantity, 0)) : cart.reduce((a, b) => a + b.quantity, 0)} টি
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A0A5BA]">
              <span>{language === 'bn' ? 'পণ্যের মোট মূল্য' : 'Subtotal'}</span>
              <span className="font-semibold text-white">
                {formatBDT(cartSubtotal, language === 'bn')}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A0A5BA]">
              <span className="flex items-center gap-1">
                <span>{language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Charge'}</span>
                <span className="text-[10px] text-[#71768C]">
                  ({isDhaka ? (language === 'bn' ? 'ঢাকার ভেতরে' : 'Inside Dhaka') : (language === 'bn' ? 'ঢাকার বাইরে' : 'Outside Dhaka')})
                </span>
              </span>
              <span className="font-semibold text-[#E2B755]">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-bold">{language === 'bn' ? 'ফ্রি' : 'FREE'}</span>
                ) : (
                  formatBDT(deliveryFee, language === 'bn')
                )}
              </span>
            </div>
            <div className="pt-2 border-t border-[#23273A] flex items-center justify-between text-sm font-bold text-white">
              <span>{language === 'bn' ? 'সর্বমোট পরিশোধযোগ্য' : 'Payable Total'}</span>
              <span className="text-lg text-[#E2B755]">
                {formatBDT(totalAmount, language === 'bn')}
              </span>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2B755]" />
              <span>{language === 'bn' ? 'ডেলিভারি তথ্য পূরণ করুন' : 'Delivery Information'}</span>
            </h4>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#C5C9DB] mb-1.5">
                {language === 'bn' ? 'আপনার পুরো নাম *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'bn' ? 'যেমন: রাফসান আহমেদ' : 'e.g. Rafsan Ahmed'}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#131520] border border-[#23273A] focus:border-[#E2B755] text-xs sm:text-sm text-white rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#C5C9DB] mb-1.5">
                {language === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Mobile Number (11 Digits) *'}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  className={`w-full bg-[#131520] border text-xs sm:text-sm text-white rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors ${
                    phoneError ? 'border-rose-500' : 'border-[#23273A] focus:border-[#E2B755]'
                  }`}
                />
              </div>
              {phoneError && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{phoneError}</span>
                </p>
              )}
            </div>

            {/* District & Upazila Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#C5C9DB] mb-1.5">
                  {language === 'bn' ? 'জেলা (District) *' : 'District *'}
                </label>
                <select
                  value={selectedDistrictId}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full bg-[#131520] border border-[#23273A] focus:border-[#E2B755] text-xs sm:text-sm text-white rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  {BANGLADESH_DISTRICTS.map((dist) => (
                    <option key={dist.id} value={dist.id} className="bg-[#12141F]">
                      {language === 'bn' ? `${dist.nameBn} (${dist.nameEn})` : dist.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#C5C9DB] mb-1.5">
                  {language === 'bn' ? 'থানা / উপজেলা (Upazila/Thana) *' : 'Thana / Upazila *'}
                </label>
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="w-full bg-[#131520] border border-[#23273A] focus:border-[#E2B755] text-xs sm:text-sm text-white rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  {selectedDistrict.upazilas.map((u, i) => (
                    <option key={i} value={u.en} className="bg-[#12141F]">
                      {language === 'bn' ? u.bn : u.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Detailed Address */}
            <div>
              <label className="block text-xs font-semibold text-[#C5C9DB] mb-1.5">
                {language === 'bn' ? 'পূর্ণাঙ্গ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা) *' : 'Full Delivery Address *'}
              </label>
              <textarea
                required
                rows={2}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: বাড়ি #১২, রোড #০৫, ব্লক-ডি, ধানমন্ডি, ঢাকা'
                    : 'e.g. House 12, Road 5, Block D, Dhanmondi, Dhaka'
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#131520] border border-[#23273A] focus:border-[#E2B755] text-xs sm:text-sm text-white rounded-xl px-3.5 py-2.5 focus:outline-none resize-none"
              />
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-semibold text-[#8B90A4] mb-1">
                {language === 'bn' ? 'অতিরিক্ত নির্দেশিকা (অপশনাল)' : 'Order Notes (Optional)'}
              </label>
              <input
                type="text"
                placeholder={
                  language === 'bn'
                    ? 'ডেলিভারির সময় বা বিশেষ কোনো অনুরোধ থাকলে লিখুন'
                    : 'Any special delivery instructions'
                }
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full bg-[#131520] border border-[#23273A] text-xs text-white rounded-xl px-3.5 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2B755]" />
              <span>{language === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Cash on Delivery */}
              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-[#181B29] border-[#E2B755] text-white shadow-sm'
                    : 'bg-[#121420] border-[#202436] text-[#8C91A6] hover:border-[#30364F]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Banknote className="w-4 h-4 text-[#E2B755]" />
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#E2B755]"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
                  </p>
                  <p className="text-[10px] text-[#787D94]">
                    {language === 'bn' ? 'পণ্য দেখে মূল্য দিন' : 'Pay when received'}
                  </p>
                </div>
              </label>

              {/* bKash */}
              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#181B29] border-[#E2B755] text-white shadow-sm'
                    : 'bg-[#121420] border-[#202436] text-[#8C91A6] hover:border-[#30364F]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-black text-[#E2136E] bg-white px-1.5 py-0.5 rounded">bKash</span>
                  <input
                    type="radio"
                    name="payment"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="accent-[#E2B755]"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {language === 'bn' ? 'বিকাশ পেমেন্ট' : 'bKash Send Money'}
                  </p>
                  <p className="text-[10px] text-[#787D94]">
                    {settings.bkashNumber ? settings.bkashNumber.slice(0, 11) : 'Personal / Agent'}
                  </p>
                </div>
              </label>

              {/* Nagad */}
              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  paymentMethod === 'nagad'
                    ? 'bg-[#181B29] border-[#E2B755] text-white shadow-sm'
                    : 'bg-[#121420] border-[#202436] text-[#8C91A6] hover:border-[#30364F]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-black text-[#F7941D] bg-white px-1.5 py-0.5 rounded">Nagad</span>
                  <input
                    type="radio"
                    name="payment"
                    value="nagad"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="accent-[#E2B755]"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {language === 'bn' ? 'নগদ পেমেন্ট' : 'Nagad Send Money'}
                  </p>
                  <p className="text-[10px] text-[#787D94]">
                    {settings.nagadNumber ? settings.nagadNumber.slice(0, 11) : 'Personal / Agent'}
                  </p>
                </div>
              </label>
            </div>

            {paymentMethod !== 'cod' && (
              <div className="p-3 bg-[#161826] border border-[#262C42] rounded-xl text-xs text-[#A2A7BE] space-y-1">
                <p className="font-semibold text-white">
                  {language === 'bn' ? 'পেমেন্ট নির্দেশিকা:' : 'Payment Instructions:'}
                </p>
                <p>
                  {paymentMethod === 'bkash' ? settings.bkashNumber : settings.nagadNumber} নম্বরে সর্বমোট{' '}
                  <strong className="text-[#E2B755]">{formatBDT(totalAmount, language === 'bn')}</strong> সেন্ড মানি করুন। অর্ডার প্লেসের পর আমাদের প্রতিনিধি যোগাযোগ করে ট্রানজেকশন নিশ্চিত করবেন।
                </p>
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <div className="pt-3 border-t border-[#1E2232]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#E2B755] hover:bg-[#F3C868] text-black shadow-xl shadow-[#E2B755]/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{language === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing Order...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 fill-black text-[#E2B755]" />
                  <span>
                    {language === 'bn'
                      ? `অর্ডার কনফার্ম করুন (${formatBDT(totalAmount, true)})`
                      : `Confirm Order (${formatBDT(totalAmount, false)})`}
                  </span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#74798E] mt-2.5">
              {language === 'bn'
                ? 'অর্ডার নিশ্চিত করার পর আমাদের টিম থেকে ফোনে যোগাযোগ করা হবে।'
                : 'Our customer support representative will call to confirm your order details.'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
