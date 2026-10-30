import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatBDT, formatOrderDate, toBengaliNumerals } from '../../utils/formatters';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Truck,
  Printer,
  X,
  ExternalLink
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastCreatedOrder, setLastCreatedOrder, language, settings, setIsTrackingOpen, setTrackingQuery } = useStore();
  const [copied, setCopied] = useState(false);

  if (!lastCreatedOrder) return null;

  const order = lastCreatedOrder;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTrackThisOrder = () => {
    setTrackingQuery(order.orderNumber);
    setLastCreatedOrder(null);
    setIsTrackingOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello VIONEX, I placed order #${order.orderNumber} for ${order.customerName} (${order.customerPhone}). Total: ৳${order.total}.`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#10121B] border border-[#23283C] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Close */}
        <button
          onClick={() => setLastCreatedOrder(null)}
          className="absolute top-4 right-4 z-10 p-1.5 text-[#888EAA] hover:text-white rounded-lg hover:bg-[#1E2234] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="p-6 text-center border-b border-[#1E2232] bg-[#131624]">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {language === 'bn' ? 'আপনার অর্ডারটি সফল হয়েছে!' : 'Order Placed Successfully!'}
          </h2>
          <p className="text-xs text-[#8B90A5] mt-1 max-w-sm mx-auto">
            {language === 'bn'
              ? 'ধন্যবাদ! আমাদের টিম আপনার অর্ডারটি প্রস্তুত করছে এবং শিগগিরই ফোনে যোগাযোগ করবে।'
              : 'Thank you for choosing VIONEX. Our team will verify and dispatch your order promptly.'}
          </p>

          {/* Order ID Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D2B] border border-[#2A2F45] text-xs">
            <span className="text-[#8B90A5]">{language === 'bn' ? 'অর্ডার নম্বর:' : 'Order ID:'}</span>
            <span className="font-mono font-bold text-[#E2B755] tracking-wider">{order.orderNumber}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-[#8B90A5] hover:text-white ml-1 p-0.5"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-[#9EA3B6]">
          {/* Timeline banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141724] border border-[#22273A]">
            <Truck className="w-5 h-5 text-[#E2B755] shrink-0" />
            <div>
              <p className="font-semibold text-white">
                {language === 'bn' ? 'আনুমানিক ডেলিভারি সময়:' : 'Estimated Delivery Time:'}
              </p>
              <p className="text-[11px] text-[#7F849B]">
                {language === 'bn'
                  ? 'ঢাকার ভেতরে ২-৩ কার্যদিবস, ঢাকার বাইরে ৩-৫ কার্যদিবস।'
                  : 'Inside Dhaka: 2-3 business days | Outside Dhaka: 3-5 business days.'}
              </p>
            </div>
          </div>

          {/* Customer & Address block */}
          <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-[#12141F] border border-[#1E2232]">
            <div>
              <span className="text-[10px] text-[#6E7388] uppercase tracking-wider block mb-0.5">
                {language === 'bn' ? 'গ্রাহক' : 'Customer'}
              </span>
              <p className="font-bold text-white">{order.customerName}</p>
              <p className="text-[#A2A6BD]">{order.customerPhone}</p>
            </div>
            <div>
              <span className="text-[10px] text-[#6E7388] uppercase tracking-wider block mb-0.5">
                {language === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Address'}
              </span>
              <p className="text-white line-clamp-2">{order.address}</p>
              <p className="text-[#A2A6BD]">{order.upazila}, {order.district}</p>
            </div>
          </div>

          {/* Ordered items list */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2">
              {language === 'bn' ? 'অর্ডারকৃত পণ্যসমূহ:' : 'Ordered Items:'}
            </h4>
            <div className="divide-y divide-[#1E2232] border border-[#1E2232] rounded-xl overflow-hidden bg-[#12141F]">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-12 object-cover rounded bg-[#181B28]"
                    />
                    <div>
                      <p className="font-semibold text-white line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-[#787D94]">
                        {language === 'bn' ? 'সাইজ:' : 'Size:'} {item.size} • {item.colorName} • {language === 'bn' ? toBengaliNumerals(item.quantity) : item.quantity} টি
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

          {/* Totals */}
          <div className="p-3.5 rounded-xl bg-[#141724] space-y-1.5 border border-[#202538]">
            <div className="flex justify-between">
              <span>{language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
              <span className="text-white">{formatBDT(order.subtotal, language === 'bn')}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Fee'}</span>
              <span className="text-white">
                {order.deliveryFee === 0 ? 'FREE' : formatBDT(order.deliveryFee, language === 'bn')}
              </span>
            </div>
            <div className="pt-2 border-t border-[#23273A] flex justify-between text-sm font-bold text-white">
              <span>{language === 'bn' ? 'মোট মূল্য' : 'Total'}</span>
              <span className="text-[#E2B755]">{formatBDT(order.total, language === 'bn')}</span>
            </div>
            <div className="text-[11px] text-[#787D94] pt-1">
              {language === 'bn' ? 'পেমেন্ট মেথড:' : 'Payment Method:'}{' '}
              <span className="text-white font-medium capitalize">{order.paymentMethod.toUpperCase()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে জানান' : 'Chat on WhatsApp'}</span>
            </a>

            <button
              onClick={handleTrackThisOrder}
              className="py-3 px-4 rounded-xl bg-[#E2B755] hover:bg-[#F3C868] text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'bn' ? 'লাইভ ট্র্যাক করুন' : 'Track Order Status'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
