import { Metadata } from 'next';
import { HomeClient } from '@/app/HomeClient';

export const metadata: Metadata = {
  title: 'TSV Bahria 1860 — German Football Academy in Bahria Town Karachi',
  description:
    'Train like a pro — right here in Karachi. Real pro-club training, fitness and smart tactics for players U9 to U23 with Head Coach Zain Rizvi Syed. Join the free waitlist.',
  keywords: [
    'football academy',
    'TSV Bahria 1860',
    'Bahria Town Karachi',
    'German football training',
    'youth football',
    'football coaching Karachi',
    'girls football',
    'soccer academy Pakistan',
  ],
};

export default function HomePage() {
  return <HomeClient />;
}
