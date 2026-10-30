import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Truck, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, language } = useStore();
  const text = language === 'bn' ? settings.announcementTextBn : settings.announcementText;

  return (
    <div className="bg-[#12141A] border-b border-[#252836] text-[11px] sm:text-xs text-[#C5C8D4] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#E2B755]" />
          <span>{text || 'সারা দেশে ক্যাশ অন ডেলিভারি | ঢাকার ভেতরে ২-৩ দিনে ডেলিভারি'}</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#8C90A2]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {language === 'bn' ? '১০০% অরিজিনাল কোয়ালিটি নিশ্চয়তা' : '100% Quality Guaranteed'}
          </span>
          <span className="text-[#3F4458]">•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E2B755]" />
            {language === 'bn' ? 'ক্যাশ অন ডেলিভারি (পণ্য দেখে পেমেন্ট)' : 'Cash on Delivery Available'}
          </span>
        </div>
      </div>
    </div>
  );
};
