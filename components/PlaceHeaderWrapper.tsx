// components/PlaceHeaderWrapper.tsx
'use client';

import { useState } from 'react';
import PlaceHeader from './PlaceHeader';
import { Business } from '@/lib/types';

interface Props {
  business: Business;
}

export default function PlaceHeaderWrapper({ business }: Props) {
  const [currency, setCurrency] = useState(business.currency);

  return (
    <PlaceHeader
      business={{ ...business, currency, nextOpening: business.nextOpening ?? undefined }}
      onCurrencyChange={setCurrency}
    />
  );
}