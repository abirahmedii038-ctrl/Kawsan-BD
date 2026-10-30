import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Instagram,
  Facebook
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, language, setIsSizeGuideOpen, setIsTrackingOpen } = useStore();

  const whatsappHref = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="bg-[#090A0E] border-t border-[#1C1F2B] text-[#9EA3B5] pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#1A1D28]">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#10121A] border border-[#1F2332]">
            <div className="p-3 bg-[#E2B755]/10 text-[#E2B755] rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">
                {language === 'bn' ? 'সারা দেশে ক্যাশ অন ডেলিভারি' : 'Nationwide Cash on Delivery'}
              </h4>
              <p className="text-xs text-[#82879B] leading-relaxed">
                {language === 'bn'
                  ? 'পণ্য হাতে পেয়ে কোয়ালিটি যাচাই করে মূল্য পরিশোধ করুন।'
                  : 'Pay cash upon doorstep delivery after inspecting quality.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#10121A] border border-[#1F2332]">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">
                {language === 'bn' ? 'সহজ সাইজ এক্সচেঞ্জ সুবিধা' : '7-Day Easy Size Exchange'}
              </h4>
              <p className="text-xs text-[#82879B] leading-relaxed">
                {language === 'bn'
                  ? 'সাইজ বা ফিটিংসে সমস্যা হলে দ্রুত এক্সচেঞ্জ সাপোর্ট।'
                  : 'Instant support for size adjustments and hassle-free swaps.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#10121A] border border-[#1F2332]">
            <div className="p-3 bg-[#E2B755]/10 text-[#E2B755] rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">
                {language === 'bn' ? '১০০% অরিজিনাল প্রিমিয়াম ফ্যাব্রিক' : '100% Premium Fabrication'}
              </h4>
              <p className="text-xs text-[#82879B] leading-relaxed">
                {language === 'bn'
                  ? 'আন্তর্জাতিক মানের কম্বড কটন ও নিটওয়্যার।'
                  : 'International standard fabrics tailored for Bangladesh.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-[#1A1D28]">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <span className="text-2xl font-extrabold tracking-[0.2em] text-white font-['Cinzel',sans-serif]">
              {settings.logoText || 'VIONEX'}
            </span>
            <p className="text-xs text-[#82879B] mt-3 leading-relaxed">
              {language === 'bn'
                ? 'আন্তর্জাতিক ফ্যাশন স্ট্যান্ডার্ডে বাংলাদেশে তৈরি প্রিমিয়াম পোশাকের আধুনিক ঠিকানা।'
                : 'Contemporary luxury streetwear engineered with international refinement for Bangladesh.'}
            </p>
            <div className="flex items-center gap-3 mt-4">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#141622] hover:bg-[#1E2234] text-[#A0A5BA] hover:text-[#E2B755] rounded-lg transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#141622] hover:bg-[#1E2234] text-[#A0A5BA] hover:text-[#E2B755] rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {language === 'bn' ? 'গ্রাহক সেবা' : 'Customer Care'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  {language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Your Order'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white hover:underline transition-colors text-left"
                >
                  {language === 'bn' ? 'সাইজ চার্ট ও গাইড' : 'Size Chart & Fit Guide'}
                </button>
              </li>
              <li>
                <span className="text-[#82879B]">
                  {language === 'bn' ? 'ডেলিভারি চার্জ: ঢাকা ৳৭০ | ঢাকার বাইরে ৳১৩০' : 'Shipping: Dhaka ৳70 | Outside ৳130'}
                </span>
              </li>
              <li>
                <span className="text-[#82879B]">
                  {language === 'bn' ? 'পেমেন্ট: ক্যাশ অন ডেলিভারি / বিকাশ / নগদ' : 'Payment: Cash on Delivery / bKash'}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              {language === 'bn' ? 'যোগাযোগ ও আউটলেট' : 'Store & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#9EA3B5]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E2B755] shrink-0 mt-0.5" />
                <span>{settings.address || 'Banani, Dhaka, Bangladesh'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E2B755] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone || '+880 1700-123456'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E2B755] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email || 'support@vionex.com.bd'}
                </a>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1C2030] text-[#C5C8D4] border border-[#2B3046]">
                  bKash
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1C2030] text-[#C5C8D4] border border-[#2B3046]">
                  Nagad
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1C2030] text-[#C5C8D4] border border-[#2B3046]">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7186] gap-3">
          <p>© {new Date().getFullYear()} {settings.storeName || 'VIONEX'}. All rights reserved.</p>
          <p className="text-[11px]">
            {language === 'bn'
              ? 'প্রিমিয়াম বাংলাদেশি ফ্যাশন ই-কমার্স প্ল্যাটফর্ম'
              : 'Engineered for Bangladesh | Premium Fashion Experience'}
          </p>
        </div>
      </div>
    </footer>
  );
};
