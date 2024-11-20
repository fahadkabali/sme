"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AuroraHero = dynamic(() => import('../../components/hero'), { 
  ssr: false 
});

export default function HeroPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuroraHero />
    </Suspense>
  );
}