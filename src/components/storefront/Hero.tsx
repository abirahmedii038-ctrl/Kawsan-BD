import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, language, setSelectedCategory } = useStore();

  const title = language === 'bn' ? settings.heroTitleBn : settings.heroTitle;
  const subtitle = language === 'bn' ? settings.heroSubtitleBn : settings.heroSubtitle;
  const badge = language === 'bn' ? settings.heroBadgeBn : settings.heroBadge;
  const bannerImage = settings.heroBannerUrl || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85';

  const scrollToCollection = () => {
    const el = document.getElementById('collection-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[75vh] md:min-h-[82vh] flex items-center overflow-hidden border-b border-[#1A1D29]">
      {/* Background Hero Image with dark luxury gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImage}
          alt="VIONEX Campaign"
          className="w-full h-full object-cover object-center filter brightness-[0.42] scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Multilayer gradient for atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-[#0B0C10]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-[#0B0C10]/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B26]/80 border border-[#E2B755]/30 backdrop-blur-md mb-6 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B755]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E2B755]">
              {badge || 'EXCLUSIVE DROP'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.1] font-['Plus_Jakarta_Sans',sans-serif] drop-shadow-md">
            {title || 'ARCHITECTURAL LUXURY STREETWEAR'}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#C8CCD9] leading-relaxed max-w-xl font-light">
            {subtitle || 'Heavyweight fabrics, razor-sharp silhouettes, and effortless comfort crafted for Bangladesh.'}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToCollection}
              className="group px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#E2B755] hover:bg-[#F3C868] text-black rounded-lg transition-all shadow-lg shadow-[#E2B755]/20 flex items-center gap-2.5 active:scale-95"
            >
              <span>{language === 'bn' ? 'কালেকশন দেখুন' : 'Explore The Drop'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('t-shirt');
                scrollToCollection();
              }}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#161824]/80 hover:bg-[#202434] text-white border border-[#2B3045] rounded-lg transition-colors backdrop-blur-md"
            >
              {language === 'bn' ? 'টি-শার্ট কালেকশন' : 'Heavy Tees (240 GSM)'}
            </button>
          </div>

          {/* Key Trust Stats */}
          <div className="mt-12 pt-8 border-t border-[#2A2E40]/50 grid grid-cols-3 gap-6 max-w-lg text-left">
            <div>
              <p className="text-base sm:text-lg font-bold text-white tracking-wide">100%</p>
              <p className="text-[11px] text-[#868B9F] uppercase tracking-wider">
                {language === 'bn' ? 'কম্বড কটন' : 'Combed Cotton'}
              </p>
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-[#E2B755] tracking-wide">COD</p>
              <p className="text-[11px] text-[#868B9F] uppercase tracking-wider">
                {language === 'bn' ? 'সারাদেশে হোম ডেলিভারি' : 'Cash on Delivery'}
              </p>
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-white tracking-wide">2-3 DAYS</p>
              <p className="text-[11px] text-[#868B9F] uppercase tracking-wider">
                {language === 'bn' ? 'দ্রুত ডেলিভারি' : 'Express Delivery'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-[#666B80] animate-bounce">
        <ChevronDown className="w-5 h-5 text-[#E2B755]" />
      </div>
    </div>
  );
};
