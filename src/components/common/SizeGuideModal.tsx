import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { toBengaliNumerals } from '../../utils/formatters';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, language } = useStore();
  const [activeTab, setActiveTab] = useState<'tee' | 'shirt' | 'hoodie' | 'panjabi' | 'pants'>('tee');

  if (!isSizeGuideOpen) return null;

  const sizeData = {
    tee: [
      { size: 'S', chest: '38-40', length: '28', shoulder: '20' },
      { size: 'M', chest: '40-42', length: '29', shoulder: '21' },
      { size: 'L', chest: '42-44', length: '30', shoulder: '22' },
      { size: 'XL', chest: '44-46', length: '31', shoulder: '23' },
      { size: 'XXL', chest: '46-48', length: '32', shoulder: '24' },
    ],
    shirt: [
      { size: 'M', chest: '40', length: '28.5', shoulder: '18.5' },
      { size: 'L', chest: '42', length: '29.5', shoulder: '19.5' },
      { size: 'XL', chest: '44', length: '30.5', shoulder: '20.5' },
      { size: 'XXL', chest: '46', length: '31.5', shoulder: '21.5' },
    ],
    hoodie: [
      { size: 'S', chest: '42', length: '27.5', shoulder: '22' },
      { size: 'M', chest: '44', length: '28.5', shoulder: '23' },
      { size: 'L', chest: '46', length: '29.5', shoulder: '24' },
      { size: 'XL', chest: '48', length: '30.5', shoulder: '25' },
    ],
    panjabi: [
      { size: 'M (40)', chest: '40', length: '40', shoulder: '18' },
      { size: 'L (42)', chest: '42', length: '42', shoulder: '18.5' },
      { size: 'XL (44)', chest: '44', length: '44', shoulder: '19' },
      { size: 'XXL (46)', chest: '46', length: '46', shoulder: '20' },
    ],
    pants: [
      { size: 'S (30)', chest: '30-31', length: '38', shoulder: '24' },
      { size: 'M (32)', chest: '32-33', length: '39', shoulder: '25' },
      { size: 'L (34)', chest: '34-35', length: '40', shoulder: '26' },
      { size: 'XL (36)', chest: '36-37', length: '41', shoulder: '27' },
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#11131B] border border-[#232738] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#212536] bg-[#141724]">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#E2B755]" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              {language === 'bn' ? 'VIONEX সাইজ গাইড ও মাপজোক (ইঞ্চি)' : 'VIONEX Official Size Guide (Inches)'}
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1.5 text-[#888EAA] hover:text-white rounded-lg hover:bg-[#202538] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-[#212536] bg-[#0E1017] overflow-x-auto text-xs">
          {[
            { id: 'tee', labelEn: 'T-Shirts & Polos', labelBn: 'টি-শার্ট ও পোলো' },
            { id: 'shirt', labelEn: 'Casual Shirts', labelBn: 'শার্ট' },
            { id: 'hoodie', labelEn: 'Hoodies', labelBn: 'হুডি' },
            { id: 'panjabi', labelEn: 'Panjabi', labelBn: 'পাঞ্জাবি' },
            { id: 'pants', labelEn: 'Pants / Trousers', labelBn: 'প্যান্টস' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#E2B755] text-[#E2B755] bg-[#141724]'
                  : 'border-transparent text-[#82889E] hover:text-white'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#212536] rounded-lg">
              <thead className="bg-[#181B29] text-[#A6ABC1] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3 border-b border-[#212536]">
                    {language === 'bn' ? 'সাইজ' : 'Size'}
                  </th>
                  <th className="p-3 border-b border-[#212536]">
                    {language === 'bn' ? 'বুকের মাপ (Chest)' : 'Chest (Inches)'}
                  </th>
                  <th className="p-3 border-b border-[#212536]">
                    {language === 'bn' ? 'দৈর্ঘ্য (Length)' : 'Length (Inches)'}
                  </th>
                  <th className="p-3 border-b border-[#212536]">
                    {activeTab === 'pants'
                      ? (language === 'bn' ? 'থাই (Thigh)' : 'Thigh')
                      : (language === 'bn' ? 'শোল্ডার (Shoulder)' : 'Shoulder')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212536] text-[#D8DCEB]">
                {sizeData[activeTab].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#161926] transition-colors">
                    <td className="p-3 font-bold text-[#E2B755]">{row.size}</td>
                    <td className="p-3">
                      {language === 'bn' ? toBengaliNumerals(row.chest) : row.chest}"
                    </td>
                    <td className="p-3">
                      {language === 'bn' ? toBengaliNumerals(row.length) : row.length}"
                    </td>
                    <td className="p-3">
                      {language === 'bn' ? toBengaliNumerals(row.shoulder) : row.shoulder}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit Advice */}
          <div className="mt-5 p-3.5 rounded-xl bg-[#141724] border border-[#23273A] text-xs text-[#9FA4BA] space-y-1.5">
            <div className="flex items-center gap-2 text-white font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'ফিটিংস টিপস:' : 'Fit Recommendation:'}</span>
            </div>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'আমাদের টি-শার্ট ও হুডিগুলো ট্রু-টু-ড্রপ শোল্ডার ও বক্সি কাট। রেগুলার ফিটের জন্য নিজের স্বাভাবিক সাইজ নির্বাচন করুন, অতিরিক্ত ঢিলেঢালা লুকের জন্য এক সাইজ বড় নিতে পারেন।'
                : 'Engineered with relaxed shoulders and tailored drape. Choose your standard size for the intended boxy silhouette, or size up for an exaggerated streetwear look.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#212536] bg-[#141724] flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#E2B755] text-black hover:bg-[#F3C868] transition-colors"
          >
            {language === 'bn' ? 'বুঝতে পেরেছি' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
