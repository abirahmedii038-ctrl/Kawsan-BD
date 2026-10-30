export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameBn: string;
  divisionEn: string;
  divisionBn: string;
  isDhakaCity: boolean;
  upazilas: { en: string; bn: string }[];
}

export const BANGLADESH_DISTRICTS: DistrictInfo[] = [
  {
    id: 'dhaka',
    nameEn: 'Dhaka',
    nameBn: 'ঢাকা',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: true,
    upazilas: [
      { en: 'Dhanmondi', bn: 'ধানমন্ডি' },
      { en: 'Gulshan', bn: 'গুলশান' },
      { en: 'Banani', bn: 'বনানী' },
      { en: 'Uttara', bn: 'উত্তরা' },
      { en: 'Mirpur', bn: 'মিরপুর' },
      { en: 'Mohammadpur', bn: 'মোহাম্মদপুর' },
      { en: 'Badda', bn: 'বাড্ডা' },
      { en: 'Khilgaon', bn: 'খিলগাঁও' },
      { en: 'Motijheel', bn: 'মতিঝিল' },
      { en: 'Old Dhaka (Kotwali)', bn: 'পুরান ঢাকা (কোতোয়ালি)' },
      { en: 'Tejgaon', bn: 'তেজগাঁও' },
      { en: 'Savar', bn: 'সাভার' },
      { en: 'Keraniganj', bn: 'কেরানীগঞ্জ' },
      { en: 'Dhamrai', bn: 'ধামরাই' }
    ]
  },
  {
    id: 'gazipur',
    nameEn: 'Gazipur',
    nameBn: 'গাজীপুর',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Gazipur Sadar', bn: 'গাজীপুর সদর' },
      { en: 'Tongi', bn: 'টঙ্গী' },
      { en: 'Kaliakair', bn: 'কালিয়াকৈর' },
      { en: 'Kapasia', bn: 'কাপাসিয়া' },
      { en: 'Sreepur', bn: 'শ্রীপুর' }
    ]
  },
  {
    id: 'narayanganj',
    nameEn: 'Narayanganj',
    nameBn: 'নারায়ণগঞ্জ',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Narayanganj Sadar', bn: 'নারায়ণগঞ্জ সদর' },
      { en: 'Bandar', bn: 'বন্দর' },
      { en: 'Rupganj', bn: 'রূপগঞ্জ' },
      { en: 'Sonargaon', bn: 'সোনারগাঁও' },
      { en: 'Araihazar', bn: 'আড়াইহাজার' }
    ]
  },
  {
    id: 'chattogram',
    nameEn: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    divisionEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    isDhakaCity: false,
    upazilas: [
      { en: 'Kotwali', bn: 'কোতোয়ালি' },
      { en: 'Panchlaish', bn: 'পাঁচলাইশ' },
      { en: 'Halishahar', bn: 'হালিশহর' },
      { en: 'Agrabad', bn: 'আগ্রাবাদ' },
      { en: 'Hathazari', bn: 'হাটহাজারী' },
      { en: 'Patiya', bn: 'পটিয়া' },
      { en: 'Sitakunda', bn: 'সীতাকুণ্ড' }
    ]
  },
  {
    id: 'sylhet',
    nameEn: 'Sylhet',
    nameBn: 'সিলেট',
    divisionEn: 'Sylhet',
    divisionBn: 'সিলেট',
    isDhakaCity: false,
    upazilas: [
      { en: 'Sylhet Sadar', bn: 'সিলেট সদর' },
      { en: 'Beanibazar', bn: 'বিয়ানীবাজার' },
      { en: 'Golapganj', bn: 'গোলাপগঞ্জ' },
      { en: 'Osmani Nagar', bn: 'ওসমানী নগর' },
      { en: 'Gowainghat', bn: 'গোয়াইনঘাট' }
    ]
  },
  {
    id: 'rajshahi',
    nameEn: 'Rajshahi',
    nameBn: 'রাজশাহী',
    divisionEn: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    isDhakaCity: false,
    upazilas: [
      { en: 'Boalia', bn: 'বোয়ালিয়া' },
      { en: 'Rajpara', bn: 'রাজপাড়া' },
      { en: 'Motihar', bn: 'মতিহার' },
      { en: 'Paba', bn: 'পবা' },
      { en: 'Godagari', bn: 'গোদাগাড়ী' }
    ]
  },
  {
    id: 'khulna',
    nameEn: 'Khulna',
    nameBn: 'খুলনা',
    divisionEn: 'Khulna',
    divisionBn: 'খুলনা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Khulna Sadar', bn: 'খুলনা সদর' },
      { en: 'Sonadanga', bn: 'সোনাডাঙ্গা' },
      { en: 'Khalishpur', bn: 'খালিশপুর' },
      { en: 'Daulatpur', bn: 'দৌলতপুর' },
      { en: 'Dighalia', bn: 'দিঘলিয়া' }
    ]
  },
  {
    id: 'barishal',
    nameEn: 'Barishal',
    nameBn: 'বরিশাল',
    divisionEn: 'Barishal',
    divisionBn: 'বরিশাল',
    isDhakaCity: false,
    upazilas: [
      { en: 'Barishal Sadar', bn: 'বরিশাল সদর' },
      { en: 'Babuganj', bn: 'বাবুগঞ্জ' },
      { en: 'Bakerganj', bn: 'বাকেরগঞ্জ' },
      { en: 'Gournadi', bn: 'গৌরনদী' }
    ]
  },
  {
    id: 'rangpur',
    nameEn: 'Rangpur',
    nameBn: 'রংপুর',
    divisionEn: 'Rangpur',
    divisionBn: 'রংপুর',
    isDhakaCity: false,
    upazilas: [
      { en: 'Rangpur Sadar', bn: 'রংপুর সদর' },
      { en: 'Pirgachha', bn: 'পীরগাছা' },
      { en: 'Mithapukur', bn: 'মিঠাপুকুর' },
      { en: 'Badarganj', bn: 'বদরগঞ্জ' }
    ]
  },
  {
    id: 'mymensingh',
    nameEn: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    divisionEn: 'Mymensingh',
    divisionBn: 'ময়মনসিংহ',
    isDhakaCity: false,
    upazilas: [
      { en: 'Mymensingh Sadar', bn: 'ময়মনসিংহ সদর' },
      { en: 'Muktagachha', bn: 'মুক্তাগাছা' },
      { en: 'Trishal', bn: 'ত্রিশাল' },
      { en: 'Bhaluka', bn: 'ভালুকা' }
    ]
  },
  {
    id: 'cumilla',
    nameEn: 'Cumilla',
    nameBn: 'কুমিল্লা',
    divisionEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    isDhakaCity: false,
    upazilas: [
      { en: 'Cumilla Sadar', bn: 'কুমিল্লা সদর' },
      { en: 'Laksam', bn: 'লাকসাম' },
      { en: 'Daudkandi', bn: 'দাউদকান্দি' },
      { en: 'Chandina', bn: 'চান্দিনা' }
    ]
  },
  {
    id: 'bogura',
    nameEn: 'Bogura',
    nameBn: 'বগুড়া',
    divisionEn: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    isDhakaCity: false,
    upazilas: [
      { en: 'Bogura Sadar', bn: 'বগুড়া সদর' },
      { en: 'Shajahanpur', bn: 'শাজাহানপুর' },
      { en: 'Sherpur', bn: 'শেরপুর' },
      { en: 'Dhunat', bn: 'ধুনট' }
    ]
  },
  {
    id: 'coxsbazar',
    nameEn: "Cox's Bazar",
    nameBn: "কক্সবাজার",
    divisionEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    isDhakaCity: false,
    upazilas: [
      { en: "Cox's Bazar Sadar", bn: 'কক্সবাজার সদর' },
      { en: 'Ramu', bn: 'রামু' },
      { en: 'Teknaf', bn: 'টেকনাফ' },
      { en: 'Chakaria', bn: 'চকোরিয়া' }
    ]
  },
  {
    id: 'tangail',
    nameEn: 'Tangail',
    nameBn: 'টাঙ্গাইল',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Tangail Sadar', bn: 'টাঙ্গাইল সদর' },
      { en: 'Mirzapur', bn: 'মির্জাপুর' },
      { en: 'Ghatail', bn: 'ঘাটাইল' }
    ]
  },
  {
    id: 'faridpur',
    nameEn: 'Faridpur',
    nameBn: 'ফরিদপুর',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Faridpur Sadar', bn: 'ফরিদপুর সদর' },
      { en: 'Boalmari', bn: 'বোয়ালমারী' },
      { en: 'Bhanga', bn: 'ভাঙ্গা' }
    ]
  },
  {
    id: 'jashore',
    nameEn: 'Jashore',
    nameBn: 'যশোর',
    divisionEn: 'Khulna',
    divisionBn: 'খুলনা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Jashore Sadar', bn: 'যশোর সদর' },
      { en: 'Jhikargachha', bn: 'ঝিকরগাছা' },
      { en: 'Abhaynagar', bn: 'অভয়নগর' }
    ]
  },
  {
    id: 'pabna',
    nameEn: 'Pabna',
    nameBn: 'পাবনা',
    divisionEn: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    isDhakaCity: false,
    upazilas: [
      { en: 'Pabna Sadar', bn: 'পাবনা সদর' },
      { en: 'Ishwardi', bn: 'ঈশ্বরদী' },
      { en: 'Chatmohar', bn: 'চাটমোহর' }
    ]
  },
  {
    id: 'dinajpur',
    nameEn: 'Dinajpur',
    nameBn: 'দিনাজপুর',
    divisionEn: 'Rangpur',
    divisionBn: 'রংপুর',
    isDhakaCity: false,
    upazilas: [
      { en: 'Dinajpur Sadar', bn: 'দিনাজপুর সদর' },
      { en: 'Birganj', bn: 'বীরগঞ্জ' },
      { en: 'Phulbari', bn: 'ফুলবাড়ী' }
    ]
  },
  {
    id: 'noakhali',
    nameEn: 'Noakhali',
    nameBn: 'নোয়াখালী',
    divisionEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    isDhakaCity: false,
    upazilas: [
      { en: 'Noakhali Sadar', bn: 'নোয়াখালী সদর' },
      { en: 'Begumganj', bn: 'বেগমগঞ্জ' },
      { en: 'Senbagh', bn: 'সেনবাগ' }
    ]
  },
  {
    id: 'feni',
    nameEn: 'Feni',
    nameBn: 'ফেনী',
    divisionEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    isDhakaCity: false,
    upazilas: [
      { en: 'Feni Sadar', bn: 'ফেনী সদর' },
      { en: 'Daganbhuiyan', bn: 'দাগনভূঞা' },
      { en: 'Chhagalnaiya', bn: 'ছাগলনাইয়া' }
    ]
  },
  {
    id: 'brahmanbaria',
    nameEn: 'Brahmanbaria',
    nameBn: 'ব্রাহ্মণবাড়িয়া',
    divisionEn: 'Chattogram',
    divisionBn: 'চট্টগ্রাম',
    isDhakaCity: false,
    upazilas: [
      { en: 'Brahmanbaria Sadar', bn: 'ব্রাহ্মণবাড়িয়া সদর' },
      { en: 'Ashuganj', bn: 'আশুগঞ্জ' },
      { en: 'Kasba', bn: 'কসবা' }
    ]
  },
  {
    id: 'kushtia',
    nameEn: 'Kushtia',
    nameBn: 'কুষ্টিয়া',
    divisionEn: 'Khulna',
    divisionBn: 'খুলনা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Kushtia Sadar', bn: 'কুষ্টিয়া সদর' },
      { en: 'Kumarkhali', bn: 'কুমারখালী' },
      { en: 'Bheramara', bn: 'ভেড়ামারা' }
    ]
  },
  {
    id: 'sirajganj',
    nameEn: 'Sirajganj',
    nameBn: 'সিরাজগঞ্জ',
    divisionEn: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    isDhakaCity: false,
    upazilas: [
      { en: 'Sirajganj Sadar', bn: 'সিরাজগঞ্জ সদর' },
      { en: 'Shahjadpur', bn: 'শাহজাদপুর' },
      { en: 'Ullapara', bn: 'উল্লাপাড়া' }
    ]
  },
  {
    id: 'jamalpur',
    nameEn: 'Jamalpur',
    nameBn: 'জামালপুর',
    divisionEn: 'Mymensingh',
    divisionBn: 'ময়মনসিংহ',
    isDhakaCity: false,
    upazilas: [
      { en: 'Jamalpur Sadar', bn: 'জামালপুর সদর' },
      { en: 'Sarishabari', bn: 'সরিষাবাড়ী' },
      { en: 'Melandaha', bn: 'মেলান্দহ' }
    ]
  },
  {
    id: 'moulvibazar',
    nameEn: 'Moulvibazar',
    nameBn: 'মৌলভীবাজার',
    divisionEn: 'Sylhet',
    divisionBn: 'সিলেট',
    isDhakaCity: false,
    upazilas: [
      { en: 'Moulvibazar Sadar', bn: 'মৌলভীবাজার সদর' },
      { en: 'Sreemangal', bn: 'শ্রীমঙ্গল' },
      { en: 'Kulaura', bn: 'কুলাউড়া' }
    ]
  },
  {
    id: 'habiganj',
    nameEn: 'Habiganj',
    nameBn: 'হবিগঞ্জ',
    divisionEn: 'Sylhet',
    divisionBn: 'সিলেট',
    isDhakaCity: false,
    upazilas: [
      { en: 'Habiganj Sadar', bn: 'হবিগঞ্জ সদর' },
      { en: 'Madhabpur', bn: 'মাধবপুর' },
      { en: 'Nabiganj', bn: 'নবীগঞ্জ' }
    ]
  },
  {
    id: 'sunamganj',
    nameEn: 'Sunamganj',
    nameBn: 'সুনামগঞ্জ',
    divisionEn: 'Sylhet',
    divisionBn: 'সিলেট',
    isDhakaCity: false,
    upazilas: [
      { en: 'Sunamganj Sadar', bn: 'সুনামগঞ্জ সদর' },
      { en: 'Chhatak', bn: 'ছাতক' },
      { en: 'Jagannathpur', bn: 'জগন্নাথপুর' }
    ]
  },
  {
    id: 'narsingdi',
    nameEn: 'Narsingdi',
    nameBn: 'নরসিংদী',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Narsingdi Sadar', bn: 'নরসিংদী সদর' },
      { en: 'Palash', bn: 'পলাশ' },
      { en: 'Raipura', bn: 'রায়পুরা' }
    ]
  },
  {
    id: 'manikganj',
    nameEn: 'Manikganj',
    nameBn: 'মানিকগঞ্জ',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Manikganj Sadar', bn: 'মানিকগঞ্জ সদর' },
      { en: 'Singair', bn: 'সিংগাইর' },
      { en: 'Saturia', bn: 'সাটুরিয়া' }
    ]
  },
  {
    id: 'munshiganj',
    nameEn: 'Munshiganj',
    nameBn: 'মুন্সীগঞ্জ',
    divisionEn: 'Dhaka',
    divisionBn: 'ঢাকা',
    isDhakaCity: false,
    upazilas: [
      { en: 'Munshiganj Sadar', bn: 'মুন্সীগঞ্জ সদর' },
      { en: 'Sreenagar', bn: 'শ্রীনগর' },
      { en: 'Sirajdikhan', bn: 'সিরাজদিখান' }
    ]
  },
  {
    id: 'other',
    nameEn: 'Other District (All 64 covered)',
    nameBn: 'অন্যান্য জেলা (বাংলাদেশের যেকোনো স্থান)',
    divisionEn: 'Bangladesh',
    divisionBn: 'বাংলাদেশ',
    isDhakaCity: false,
    upazilas: [
      { en: 'Sadar / Central', bn: 'সদর / প্রধান এলাকা' },
      { en: 'Sub-district Area', bn: 'উপজেলা এলাকা' }
    ]
  }
];

export function validateBdPhone(phone: string): boolean {
  // Accepts formats: 017XXXXXXXX, +88017XXXXXXXX, 88017XXXXXXXX
  const cleaned = phone.replace(/[\s\-]/g, '');
  const bdRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
  return bdRegex.test(cleaned);
}

export function formatBdPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-]/g, '');
  if (cleaned.startsWith('+88')) return cleaned.slice(3);
  if (cleaned.startsWith('88')) return cleaned.slice(2);
  return cleaned;
}
