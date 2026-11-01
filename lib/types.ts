import type {
  Business as PrismaBusiness,
  Category as PrismaCategory,
  Product as PrismaProduct,
} from '@/generated/prisma/browser';

export type Business = Pick<
  PrismaBusiness,
  | 'id'
  | 'slug'
  | 'name'
  | 'logo'
  | 'cover'
  | 'description'
  | 'address'
  | 'city'
  | 'state'
  | 'country'
  | 'phone'
  | 'email'
  | 'website'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'isOpen'
  | 'nextOpening'
  | 'currency'
  | 'priceRange'
  | 'rating'
  | 'reviewsCount'
  | 'delivery'
  | 'pickup'
>;

export type Category = Pick<
  PrismaCategory,
  'id' | 'name' | 'slug' | 'image' | 'description'
> & {
  productsCount?: number;
};

export type Product = Pick<
  PrismaProduct,
  | 'id'
  | 'name'
  | 'slug'
  | 'price'
  | 'description'
  | 'reviews'
  | 'image'
  | 'categoryId'
  | 'active'
>;

export interface SellerUser {
  name: string;
  email?: string;
  avatar?: string;
}

export interface DaySchedule {
  day: string; // 'Lunes', 'Martes', ...
  isOpen: boolean;
  openTime: string; // '09:00'
  closeTime: string; // '18:00'
}

export interface BusinessSettings {
  id: string;
  name: string;
  logo: string;
  heroImage: string | File;
  description: string;
  schedule: DaySchedule[];
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  currency: string;
  delivery: boolean;
  pickup: boolean;
}

export type EditableImage = string | File;