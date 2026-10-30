import { Product, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-heavy-oversized-tee-black',
    title: 'VIONEX Signature 240 GSM Oversized Heavyweight Tee',
    titleBn: 'ভায়োনেক্স সিগনেচার ২৪০ জিএসএম ওভারসাইজড হেভিওয়েট টি-শার্ট',
    slug: 'vionex-signature-240gsm-oversized-tee-black',
    category: 't-shirt',
    price: 1150,
    originalPrice: 1450,
    description: 'Crafted from 100% combed heavyweight cotton (240 GSM). Features dropped shoulders, a tight micro-rib collar, and a modern boxy silhouette engineered for superior drape and breathability in Bangladesh weather.',
    descriptionBn: '১০০% প্রিমিয়াম কম্বড হেভিওয়েট কটন (২৪০ জিএসএম) দিয়ে তৈরি। ড্রপ শোল্ডার, মজবুত কলার এবং আধুনিক বক্সি ফিট—যা বাংলাদেশের আবহাওয়ায় দীর্ঘস্থায়ী আরাম ও এলিগেন্ট লুক প্রদান করে।',
    stock: 45,
    fabric: '240 GSM 100% Combed Heavy Cotton, Bio-Washed',
    fabricBn: '২৪০ জিএসএম শতভাগ কম্বড হেভি কটন, বায়ো-ওয়াশড',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', nameBn: 'পিচ ব্ল্যাক', hex: '#0F0F11' },
      { name: 'Vintage Olive', nameBn: 'ভিন্টেজ অলিভ', hex: '#3B4235' },
      { name: 'Bone Off-White', nameBn: 'অফ হোয়াইট', hex: '#EBE5D8' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'prod-cuban-collar-linen-shirt',
    title: 'Structured Relaxed Cuban Collar Camp Shirt',
    titleBn: 'স্ট্রাকচার্ড রিলাক্সড কিউবান কলার ক্যাম্প শার্ট',
    slug: 'structured-relaxed-cuban-collar-camp-shirt',
    category: 'shirt',
    price: 1650,
    originalPrice: 2100,
    description: 'A contemporary take on classic smart-casual luxury. Features a relaxed notch collar, custom matte shell buttons, side split hem, and ultra-breathable high-density linen blend fabric.',
    descriptionBn: 'আধুনিক স্মার্ট-ক্যাজুয়াল আভিজাত্যের নিখুঁত মিশ্রণ। কিউবান নচ কলার, কাস্টম ম্যাট বোতাম এবং প্রিমিয়াম সফট লিনেন ব্লেন্ড ফেব্রিক যা অত্যন্ত আরামদায়ক ও ট্রেন্ডি।',
    stock: 32,
    fabric: 'High-Density Linen & Tencel Blend',
    fabricBn: 'হাই-ডেনসিটি লিনেন ও টেনসেল ব্লেন্ড',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Chalk White', nameBn: 'চক হোয়াইট', hex: '#F3F4F6' },
      { name: 'Desert Sand', nameBn: 'ডেজার্ট স্যান্ড', hex: '#D2B48C' },
      { name: 'Midnight Navy', nameBn: 'মিডনাইট নেভি', hex: '#1B263B' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: 'prod-french-terry-heavy-hoodie',
    title: 'VIONEX 420 GSM French Terry Boxy Hoodie',
    titleBn: 'ভায়োনেক্স ৪২০ জিএসএম ফ্রেঞ্চ টেরি বক্সি হুডি',
    slug: 'vionex-420gsm-french-terry-boxy-hoodie',
    category: 'hoodie',
    price: 2450,
    originalPrice: 2950,
    description: 'Engineered from ultra-dense 420 GSM unbrushed French terry. Double-layered crossover hood without drawstrings for an uncompromising minimalist silhouette, hidden kangaroo pocket, and tight ribbed cuffs.',
    descriptionBn: '৪২০ জিএসএম আনব্রাশড ফ্রেঞ্চ টেরি দিয়ে তৈরি। মিনিমালিস্ট ডাবল-লেয়ার হুড (নো ড্রস্ট্রিং), হিডেন পকেট এবং দীর্ঘস্থায়ী আরামদায়ক থিক ফেব্রিক।',
    stock: 28,
    fabric: '420 GSM 100% Compact French Terry Cotton',
    fabricBn: '৪২০ জিএসএম শতভাগ কমপ্যাক্ট ফ্রেঞ্চ টেরি কটন',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Shadow', nameBn: 'চারকোল শ্যাডো', hex: '#232528' },
      { name: 'Washed Ash', nameBn: 'অ্যাশ গ্রে', hex: '#8C929D' },
      { name: 'Mocha Brown', nameBn: 'মোকা ব্রাউন', hex: '#4A3B32' }
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: 'prod-minimalist-tailored-panjabi',
    title: 'VIONEX Architectural Cut Minimalist Panjabi',
    titleBn: 'ভায়োনেক্স আর্কিটেকচারাল কাট মিনিমালিস্ট পাঞ্জাবি',
    slug: 'vionex-architectural-cut-minimalist-panjabi',
    category: 'panjabi',
    price: 2850,
    originalPrice: 3400,
    description: 'Redefining festive and Friday smart wear. Features a structured Mandarin band collar, hidden placket with metal snap buttons, sharp tailored shoulders, and premium matte cotton-silk feel.',
    descriptionBn: 'ঐতিহ্য আর আধুনিক আর্কিটেকচারাল ডিজাইনের অসাধারণ সমন্বয়। হিডেন প্ল্যাকেট, মেটালিক স্ন্যাপ বাটন, শার্প শোল্ডার কাট ও আরামদায়ক ম্যাট টেক্সচার কটন।',
    stock: 35,
    fabric: 'Premium Mercerized Cotton & Microfiber Silk Touch',
    fabricBn: 'মার্সারাইজড কটন ও সিল্ক টাচ ব্লেন্ড',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Noir', nameBn: 'অবসিডিয়ান ব্ল্যাক', hex: '#111215' },
      { name: 'Oatmeal Silk', nameBn: 'ওটমিল ক্রিম', hex: '#DDD6CC' },
      { name: 'Royal Emerald', nameBn: 'রয়েল এমারেল্ড', hex: '#14342B' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'prod-tailored-pleated-trousers',
    title: 'Relaxed Tapered Pleated Smart Trousers',
    titleBn: 'রিলাক্সড টেপার্ড প্লিটেড স্মার্ট ট্রাউজার্স',
    slug: 'relaxed-tapered-pleated-smart-trousers',
    category: 'pants',
    price: 1850,
    originalPrice: 2300,
    description: 'Double front pleats, slightly tapered relaxed leg opening, elasticated back waistband for all-day comfort, and tailored crease lines. Pairs seamlessly with both tees and luxury shirts.',
    descriptionBn: 'ডাবল ফ্রন্ট প্লিট, ইলাস্টিক ব্যাক কোমর এবং ট্রেন্ডি টেপার্ড লেগ কাট। টি-শার্ট অথবা ফর্মাল শার্টের সাথে সমানভাবে আকর্ষণীয় ও মানানসই।',
    stock: 22,
    fabric: 'Wrinkle-Resistant Poly-Rayon Gabardine',
    fabricBn: 'রিঙ্কল-রেজিস্ট্যান্ট পলি-রেয়ন গ্যাবার্ডিন',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pitch Black', nameBn: 'কালো', hex: '#121212' },
      { name: 'Charcoal Grey', nameBn: 'চারকোল গ্রে', hex: '#373A40' },
      { name: 'Warm Khaki', nameBn: 'খাকি', hex: '#9E8B6E' }
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: 'prod-pique-luxury-polo-green',
    title: 'VIONEX Heavy Honeycomb Pique Knit Polo',
    titleBn: 'ভায়োনেক্স হেভি হানিকম্ব পিকে নিট পোলো',
    slug: 'vionex-heavy-honeycomb-pique-knit-polo',
    category: 'polo',
    price: 1350,
    originalPrice: 1750,
    description: 'Substantial 260 GSM honeycomb pique cotton with a firm knit collar that never curls. Clean 2-button placket, tonal embroidery at hem, and athletic tailored sleeves.',
    descriptionBn: '২৬০ জিএসএম প্রিমিয়াম হানিকম্ব পিকে কটন। শক্ত নিট কলার যা ব্যবহারে ভাঁজ হয় না, মসৃণ ফিনিশ এবং ট্রেন্ডি ফিটিংস।',
    stock: 40,
    fabric: '260 GSM 100% Combed Pique Cotton',
    fabricBn: '২৬০ জিএসএম শতভাগ কম্বড পিকে কটন',
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1625910513413-56291a13e2f0?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Forest Green', nameBn: 'ফরেস্ট গ্রিন', hex: '#1C3B2B' },
      { name: 'Deep Navy', nameBn: 'ডিপ নেভি', hex: '#131E3A' },
      { name: 'Chalk White', nameBn: 'হোয়াইট', hex: '#F8F9FA' }
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: 'prod-acid-wash-vintage-drop-tee',
    title: 'Vintage Acid Wash Drop-Shoulder Graphic Tee',
    titleBn: 'ভিন্টেজ অ্যাসিড ওয়াশ ড্রপ-শোল্ডার গ্রাফিক টি',
    slug: 'vintage-acid-wash-drop-shoulder-graphic-tee',
    category: 't-shirt',
    price: 1250,
    originalPrice: 1550,
    description: 'Individually dyed and acid stone-washed for an authentic vintage texture. Subtle distressed collar detailing with micro typography branding on chest.',
    descriptionBn: 'আসল ভিন্টেজ স্টোন-ওয়াশড টেক্সচার। ড্রপ শোল্ডার এবং চেস্টে মিনিমালিস্ট মাইক্রো টাইপোগ্রাফি আর্ট।',
    stock: 38,
    fabric: '220 GSM Acid-Washed Ring-Spun Cotton',
    fabricBn: '২২০ জিএসএম অ্যাসিড-ওয়াশড রিং-স্পান কটন',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Acid Washed Black', nameBn: 'অ্যাসিড ব্ল্যাক', hex: '#2B2B2E' },
      { name: 'Mineral Grey', nameBn: 'মিনারেল গ্রে', hex: '#585C64' }
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'prod-denim-trucker-oversized-jacket',
    title: 'VIONEX Heavy Twill Raw Selvedge Over-Jacket',
    titleBn: 'ভায়োনেক্স হেভি টুইল র সেলভেজ ওভার-জ্যাকেট',
    slug: 'vionex-heavy-twill-raw-selvedge-over-jacket',
    category: 'jacket',
    price: 3450,
    originalPrice: 4200,
    description: '14 oz heavy raw cotton twill with matte gunmetal branded hardware. Drop-shoulder boxy cut that layers effortlessly over tees and knitwear.',
    descriptionBn: '১৪ আউন্স প্রিমিয়াম হেভি টুইল কটন এবং গানমেটাল বোতাম। যেকোনো টি-শার্টের উপর স্টাইলিশ লেয়ারিং করার জন্য পারফেক্ট।',
    stock: 18,
    fabric: '14 oz 100% Rigid Heavy Cotton Twill',
    fabricBn: '১৪ আউন্স ১০০% রিজিড হেভি কটন টুইল',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Raw Black Indigo', nameBn: 'র ব্ল্যাক ইন্ডিগো', hex: '#171B26' },
      { name: 'Washed Olive Drab', nameBn: 'অলিভ ড্র্যাব', hex: '#444A3C' }
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'VIONEX',
  ownerName: 'VIONEX Apparel Studio',
  phone: '+880 1700-123456',
  whatsapp: '+8801700123456',
  email: 'support@vionex.com.bd',
  address: 'Level 4, House 18, Road 11, Banani, Dhaka 1213, Bangladesh',
  logoText: 'VIONEX',
  heroBadge: 'AUTUMN / WINTER 2026 DROP',
  heroBadgeBn: 'ফল / উইন্টার ২০২৬ সিগনেচার ড্রপ',
  heroTitle: 'ARCHITECTURAL LUXURY STREETWEAR',
  heroTitleBn: 'সমকালীন আন্তর্জাতিক ডিজাইন, দেশীয় পোশাক সংস্কৃতি',
  heroSubtitle: 'Heavyweight fabrics, razor-sharp silhouettes, and effortless comfort crafted for Dhaka and beyond.',
  heroSubtitleBn: 'আন্তর্জাতিক মানের প্রিমিয়াম ফেব্রিক ও অনন্য কাটিং। ক্যাশ অন ডেলিভারিতে সারাদেশে দ্রুততম হোম ডেলিভারি।',
  heroBannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85',
  insideDhakaDeliveryFee: 70,
  outsideDhakaDeliveryFee: 130,
  freeDeliveryThreshold: 4000,
  announcementText: 'FREE SHIPPING ACROSS BANGLADESH ON ORDERS OVER ৳ 4,000 | CASH ON DELIVERY AVAILABLE',
  announcementTextBn: '৳ ৪,০০০ এর বেশি অর্ডারে সারা দেশে ফ্রি ডেলিভারি | ক্যাশ অন ডেলিভারি সুবিধা',
  facebookUrl: 'https://facebook.com/vionex.official',
  instagramUrl: 'https://instagram.com/vionex.official',
  codEnabled: true,
  bkashNumber: '01700123456 (Personal - Send Money)',
  nagadNumber: '01700123456 (Personal - Send Money)'
};
