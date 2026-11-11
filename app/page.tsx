import { Metadata } from 'next';
import { HomeClient } from '@/app/HomeClient';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/lib/site';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
