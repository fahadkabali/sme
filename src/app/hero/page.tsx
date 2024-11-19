"use client";
import dynamic from 'next/dynamic';

// Dynamically import the AuroraHero component to ensure client-side rendering
const AuroraHero = dynamic(() => import('../../components/AuroraHero'), { 
  ssr: false 
});

export default function HeroPage() {
  return <AuroraHero />;
}