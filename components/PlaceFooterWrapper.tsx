// components/PlaceFooterWrapper.tsx
'use client';

import { useState } from 'react';
import PlaceFooter from './PlaceFooter';
import { Business } from '@/lib/types';

interface Props {
  business: Business;
}

export default function PlaceFooterWrapper({ business }: Props) {
  const [currency, setCurrency] = useState(business.currency);

  return (
    <PlaceFooter
    business={{
      ...business,
      currency,
      instagram: business.instagram ?? undefined,
      facebook: business.facebook ?? undefined,
      youtube: business.youtube ?? undefined,
      nextOpening: business.nextOpening ?? undefined,
    }}
      onCurrencyChange={setCurrency}
    />
  );
}