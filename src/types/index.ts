export interface Product {
  id: string;
  title: string;
  titleBn: string;
  slug: string;
  category: 't-shirt' | 'shirt' | 'hoodie' | 'polo' | 'panjabi' | 'pants' | 'jacket' | 'accessories';
  price: number;
  originalPrice?: number;
  description: string;
  descriptionBn: string;
  stock: number;
  fabric: string;
  fabricBn?: string;
  images: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: { name: string; nameBn: string; hex: string }[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string; // unique composite: productId-size-color
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; nameBn: string; hex: string };
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  titleBn: string;
  size: string;
  colorName: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  district: string;
  upazila: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  paymentDetails?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface StoreSettings {
  storeName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  logoText: string;
  heroBadge: string;
  heroBadgeBn: string;
  heroTitle: string;
  heroTitleBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  heroBannerUrl: string;
  insideDhakaDeliveryFee: number;
  outsideDhakaDeliveryFee: number;
  freeDeliveryThreshold?: number;
  announcementText: string;
  announcementTextBn: string;
  facebookUrl: string;
  instagramUrl: string;
  codEnabled: boolean;
  bkashNumber: string;
  nagadNumber: string;
}
