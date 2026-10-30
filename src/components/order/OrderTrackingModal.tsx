import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { formatBDT, formatOrderDate, getOrderStatusBadge, toBengaliNumerals } from '../../utils/formatters';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, orders, trackingQuery, setTrackingQuery, language } = useStore();
  const [searchInput, setSearchInput] = useState(trackingQuery || '');
  const [hasSearched, setHasSearched] = useState(Boolean(trackingQuery));

  if (!isTrackingOpen) return null;

  const trimmed = searchInput.trim().toUpperCase();
  const matchedOrder = orders.find(
    (o) =>
      o.orderNumber.toUpperCase() === trimmed ||
      o.customerPhone.includes(trimmed) ||
      o.id.toUpperCase() === trimmed
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const steps: { key: OrderStatus; labelEn: string; labelBn: string; descEn: string; descBn: string }[] = [
    {
      key: 'pending',
      labelEn: 'Order Placed',
      labelBn: 'অর্ডার গৃহীত হয়েছে',
      descEn: 'We received your order and verification is underway.',
      descBn: 'আমরা আপনার অর্ডার পেয়েছি, কল করে কনফার্ম করা হবে।'
    },
    {
      key: 'confirmed',
      labelEn: 'Order Confirmed',
      labelBn: 'অর্ডার নিশ্চিত',
      descEn: 'Customer care has verified your details.',
      descBn: 'কাস্টমার কেয়ার থেকে তথ্য যাচাই ও নিশ্চিত করা হয়েছে।'
    },
    {
      key: 'processing',
      labelEn: 'Packaging & QC',
      labelBn: 'প্যাকেজিং ও কোয়ালিটি চেক',
      descEn: 'Carefully folded, packed in luxury box at Dhaka hub.',
      descBn: 'ঢাকা ওয়ারহাউসে নিখুঁতভাবে প্যাকেট প্রস্তুত হচ্ছে।'
    },
    {
      key: 'shipped',
      labelEn: 'Out for Delivery',
      labelBn: 'ডেলিভারিতে বের হয়েছে',
      descEn: 'Handed over to courier. Arriving at your doorstep soon.',
      descBn: 'কুরিয়ারে হস্তান্তর করা হয়েছে। দ্রুতই আপনার ঠিকানায় পৌঁছাবে।'
    },
    {
      key: 'delivered',
      labelEn: 'Delivered',
      labelBn: 'ডেলিভারি সম্পন্ন',
      descEn: 'Cash on Delivery received. Enjoy your VIONEX garments!',
      descBn: 'পণ্য পৌঁছে দেয়া হয়েছে ও ক্যাশ মূল্য পরিশোধ সম্পন্ন।'
    }
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#10121B] border border-[#22273A] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E2232] bg-[#131624]">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-[#E2B755]" />
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'অর্ডার ট্র্যাকিং সিস্টেম' : 'Live Order Tracking'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsTrackingOpen(false);
              setTrackingQuery('');
            }}
            className="p-1.5 text-[#888EAA] hover:text-white rounded-lg hover:bg-[#1E2234] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  language === 'bn'
                    ? 'অর্ডার নম্বর (যেমন: VX-123456) বা মোবাইল নম্বর দিন'
                    : 'Enter Order Number (e.g. VX-123456) or Phone'
                }
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#131520] border border-[#23273A] focus:border-[#E2B755] text-xs sm:text-sm text-white rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none"
              />
              <Search className="w-4 h-4 text-[#757A90] absolute left-3 top-3 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#E2B755] hover:bg-[#F3C868] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              {language === 'bn' ? 'ট্র্যাক' : 'Search'}
            </button>
          </form>

          {/* Results Area */}
          {matchedOrder ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Order quick overview banner */}
              <div className="p-4 rounded-xl bg-[#141624] border border-[#23283C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#E2B755]">
                      {matchedOrder.orderNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getOrderStatusBadge(matchedOrder.status, language === 'bn').bg} ${getOrderStatusBadge(matchedOrder.status, language === 'bn').color}`}>
                      {getOrderStatusBadge(matchedOrder.status, language === 'bn').label}
                    </span>
                  </div>
                  <p className="text-xs text-[#8E93A8] mt-1">
                    {formatOrderDate(matchedOrder.createdAt, language === 'bn')}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-[#7B8096]">{language === 'bn' ? 'সর্বমোট প্রদেয়:' : 'Payable Amount:'}</p>
                  <p className="text-base font-extrabold text-white">
                    {formatBDT(matchedOrder.total, language === 'bn')}
                  </p>
                </div>
              </div>

              {/* Visual Stepper */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#202538]">
                {steps.map((st, idx) => {
                  const currentIdx = getStepIndex(matchedOrder.status);
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={st.key} className="relative flex items-start gap-4">
                      {/* Step Dot */}
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-[#E2B755] text-black ring-4 ring-[#E2B755]/20'
                            : 'bg-[#181B28] border border-[#2B3045] text-[#5A5F74]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 fill-black text-[#E2B755]" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Step Info */}
                      <div>
                        <h4
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-[#E2B755]'
                              : isDone
                              ? 'text-white'
                              : 'text-[#646A80]'
                          }`}
                        >
                          {language === 'bn' ? st.labelBn : st.labelEn}
                        </h4>
                        <p className="text-[11px] text-[#868C9F] mt-0.5 leading-relaxed">
                          {language === 'bn' ? st.descBn : st.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Items in this order */}
              <div className="p-3.5 rounded-xl bg-[#12141F] border border-[#1E2232] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#72778E] tracking-wider block">
                  {language === 'bn' ? 'অর্ডারকৃত পোশাকসমূহ' : 'Items in this delivery'}
                </span>
                <div className="divide-y divide-[#1E2232]">
                  {matchedOrder.items.map((item, i) => (
                    <div key={i} className="py-2 flex items-center justify-between text-xs text-[#C5C9DB]">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt="" className="w-8 h-10 object-cover rounded bg-[#181B28]" />
                        <div>
                          <p className="font-semibold text-white line-clamp-1">{item.title}</p>
                          <p className="text-[10px] text-[#7B8096]">
                            {item.size} • {item.colorName} • {item.quantity} pc
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-white">
                        {formatBDT(item.unitPrice * item.quantity, language === 'bn')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery destination */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#141624] text-xs text-[#8E93A8]">
                <MapPin className="w-4 h-4 text-[#E2B755] shrink-0 mt-0.5" />
                <span>
                  {matchedOrder.customerName} ({matchedOrder.customerPhone}) - {matchedOrder.address}, {matchedOrder.upazila}, {matchedOrder.district}
                </span>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="p-8 text-center bg-[#131520] rounded-xl border border-[#202436] space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                {language === 'bn' ? 'কোনো অর্ডার খুঁজে পাওয়া যায়নি' : 'No Order Found'}
              </h4>
              <p className="text-xs text-[#7B8096] max-w-xs mx-auto">
                {language === 'bn'
                  ? 'অনুগ্রহ করে আপনার সঠিক অর্ডার নম্বর (যেমন: VX-123456) অথবা অর্ডারে ব্যবহৃত মোবাইল নম্বর লিখুন।'
                  : 'Please ensure your Order ID or phone number is typed correctly.'}
              </p>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#6C7188] border border-dashed border-[#202538] rounded-xl">
              {language === 'bn'
                ? 'আপনার অর্ডার আইটেমের বর্তমান অবস্থান দেখতে উপরে অর্ডার নম্বর লিখে সার্চ করুন।'
                : 'Enter your order reference above to track live shipping progression.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
