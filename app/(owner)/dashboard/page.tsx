import type { Business, SellerUser } from '@/lib/types';
import { requireStore } from '@/lib/auth/dal';
import SellerDashboardClient from './dashboard-client';

export default async function SellerDashboardPage() {
  const { user, profile, store } = await requireStore();

  const business: Business = {
    id: store.id,
    slug: store.slug,
    name: store.name,
    logo: store.logo,
    cover: store.cover,
    description: store.description,
    address: store.address,
    city: store.city,
    state: store.state,
    country: store.country,
    phone: store.phone,
    email: store.email,
    website: store.website,
    instagram: store.instagram,
    facebook: store.facebook,
    youtube: store.youtube,
    isOpen: store.isOpen,
    nextOpening: store.nextOpening,
    currency: store.currency,
    priceRange: store.priceRange,
    rating: store.rating,
    reviewsCount: store.reviewsCount,
    delivery: store.delivery,
    pickup: store.pickup,
  };

  const seller: SellerUser = {
    name: profile.fullName || user.email?.split('@')[0] || 'Vendedor',
    email: user.email,
    avatar: profile.avatarUrl ?? undefined,
  };

  return <SellerDashboardClient user={seller} business={business} />;
}
